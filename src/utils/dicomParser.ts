import * as dicomParser from 'dicom-parser';

export interface DicomMetadata {
  patientName?: string;
  patientID?: string;
  studyDate?: string;
  studyTime?: string;
  modality?: string;
  bodyPart?: string;
  imageType?: string;
  manufacturer?: string;
  institutionName?: string;
  studyDescription?: string;
  seriesDescription?: string;
  rows?: number;
  columns?: number;
  pixelSpacing?: number[];
}

export interface DicomImageData {
  metadata: DicomMetadata;
  imageData?: Uint8Array;
  width: number;
  height: number;
  canvas?: HTMLCanvasElement;
}

/**
 * Parse DICOM file and extract metadata
 * Automatically redacts PHI for compliance
 */
export const parseDicomFile = async (file: File): Promise<DicomImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        
        // Parse DICOM file
        const dataSet = dicomParser.parseDicom(byteArray);

        // Extract metadata with PHI redaction
        const metadata: DicomMetadata = {
          // Redact patient identifiable information
          patientName: 'REDACTED (PHI Protected)',
          patientID: 'ANONYMOUS',
          
          // Safe metadata
          studyDate: getString(dataSet, 'x00080020'),
          studyTime: getString(dataSet, 'x00080030'),
          modality: getString(dataSet, 'x00080060'),
          bodyPart: getString(dataSet, 'x00180015'),
          imageType: getString(dataSet, 'x00080008'),
          manufacturer: getString(dataSet, 'x00080070'),
          institutionName: 'REDACTED',
          studyDescription: getString(dataSet, 'x00081030'),
          seriesDescription: getString(dataSet, 'x0008103e'),
          
          // Image dimensions
          rows: getNumber(dataSet, 'x00280010'),
          columns: getNumber(dataSet, 'x00280011'),
          pixelSpacing: getPixelSpacing(dataSet)
        };

        // Extract pixel data
        const pixelDataElement = dataSet.elements.x7fe00010;
        let imageData: Uint8Array | undefined;
        
        if (pixelDataElement) {
          imageData = new Uint8Array(
            dataSet.byteArray.buffer,
            pixelDataElement.dataOffset,
            pixelDataElement.length
          );
        }

        const width = metadata.columns || 512;
        const height = metadata.rows || 512;

        // Create canvas for visualization
        const canvas = renderDicomToCanvas(imageData, width, height);

        resolve({
          metadata,
          imageData,
          width,
          height,
          canvas
        });
      } catch (error) {
        console.error('DICOM parsing error:', error);
        reject(new Error('Failed to parse DICOM file. File may be corrupted or unsupported.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read DICOM file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Render DICOM pixel data to canvas
 */
const renderDicomToCanvas = (
  pixelData: Uint8Array | undefined,
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx || !pixelData) {
    return canvas;
  }

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  // Convert grayscale DICOM to RGBA
  for (let i = 0; i < pixelData.length; i++) {
    const pixelValue = pixelData[i];
    const rgbaIndex = i * 4;
    
    data[rgbaIndex] = pixelValue;     // R
    data[rgbaIndex + 1] = pixelValue; // G
    data[rgbaIndex + 2] = pixelValue; // B
    data[rgbaIndex + 3] = 255;        // A
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

/**
 * Helper to safely get string from DICOM dataset
 */
const getString = (dataSet: any, tag: string): string | undefined => {
  try {
    const element = dataSet.elements[tag];
    if (!element) return undefined;
    return dataSet.string(tag);
  } catch {
    return undefined;
  }
};

/**
 * Helper to safely get number from DICOM dataset
 */
const getNumber = (dataSet: any, tag: string): number | undefined => {
  try {
    const element = dataSet.elements[tag];
    if (!element) return undefined;
    const value = dataSet.uint16(tag);
    return value !== undefined ? value : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Helper to get pixel spacing
 */
const getPixelSpacing = (dataSet: any): number[] | undefined => {
  try {
    const spacingStr = getString(dataSet, 'x00280030');
    if (!spacingStr) return undefined;
    
    return spacingStr.split('\\').map(parseFloat);
  } catch {
    return undefined;
  }
};

/**
 * Convert DICOM canvas to base64 image
 */
export const dicomCanvasToBase64 = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png');
};

/**
 * Format modality name for display
 */
export const formatModality = (modality?: string): string => {
  const modalityMap: Record<string, string> = {
    'CT': 'CT Scan (Computed Tomography)',
    'MR': 'MRI (Magnetic Resonance Imaging)',
    'CR': 'X-Ray (Computed Radiography)',
    'DX': 'Digital X-Ray',
    'US': 'Ultrasound',
    'NM': 'Nuclear Medicine',
    'PT': 'PET Scan',
    'XA': 'X-Ray Angiography',
    'MG': 'Mammography',
    'ECG': 'Electrocardiogram'
  };

  return modalityMap[modality || ''] || modality || 'Unknown Modality';
};
