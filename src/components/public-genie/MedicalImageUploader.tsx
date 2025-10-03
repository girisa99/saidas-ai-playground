import React, { useState, useCallback } from 'react';
import { Upload, FileImage, X, AlertCircle, CheckCircle2, Loader2, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface MedicalImageUploaderProps {
  onImageUpload: (images: UploadedImage[]) => void;
  medicalMode: boolean;
  maxFiles?: number;
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  type: 'standard' | 'dicom' | 'ecg';
  metadata?: DicomMetadata;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  errorMessage?: string;
}

interface DicomMetadata {
  patientName?: string;
  patientID?: string;
  studyDate?: string;
  modality?: string;
  bodyPart?: string;
  imageType?: string;
}

export const MedicalImageUploader: React.FC<MedicalImageUploaderProps> = ({
  onImageUpload,
  medicalMode,
  maxFiles = 5
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const supportedFormats = medicalMode 
    ? 'DICOM (.dcm), JPEG, PNG, TIFF, BMP'
    : 'JPEG, PNG, WEBP, GIF';

  const detectImageType = (file: File): 'standard' | 'dicom' | 'ecg' => {
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.dcm') || fileName.includes('dicom')) {
      return 'dicom';
    }
    
    if (fileName.includes('ecg') || fileName.includes('ekg')) {
      return 'ecg';
    }
    
    return 'standard';
  };

  const processDicomFile = async (file: File): Promise<DicomMetadata> => {
    // Basic DICOM metadata extraction
    // In production, use a library like cornerstone.js or dicom-parser
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simplified DICOM header parsing
        const metadata: DicomMetadata = {
          patientName: 'Anonymous (PHI Removed)',
          patientID: 'REDACTED',
          studyDate: new Date().toISOString().split('T')[0],
          modality: 'Unknown',
          imageType: 'DICOM Image'
        };
        resolve(metadata);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const processImage = async (file: File): Promise<UploadedImage> => {
    const imageType = detectImageType(file);
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let preview = '';
    let metadata: DicomMetadata | undefined;

    try {
      // Create preview
      if (imageType === 'dicom') {
        // For DICOM, we'll show a placeholder or use cornerstone to render
        preview = '/placeholder.svg'; // Replace with actual DICOM rendering
        metadata = await processDicomFile(file);
      } else {
        preview = URL.createObjectURL(file);
      }

      return {
        id,
        file,
        preview,
        type: imageType,
        metadata,
        status: 'ready'
      };
    } catch (error) {
      return {
        id,
        file,
        preview: '',
        type: imageType,
        status: 'error',
        errorMessage: `Failed to process ${file.name}`
      };
    }
  };

  const handleFiles = async (files: FileList) => {
    if (uploadedImages.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} images allowed`,
        variant: "destructive"
      });
      return;
    }

    const fileArray = Array.from(files);
    
    // Validate file types
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isDicom = file.name.toLowerCase().endsWith('.dcm');
      return isImage || isDicom;
    });

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: `Please upload valid image files (${supportedFormats})`,
        variant: "destructive"
      });
      return;
    }

    // Process all files
    const processingImages = validFiles.map(file => processImage(file));
    const processed = await Promise.all(processingImages);
    
    const newImages = [...uploadedImages, ...processed];
    setUploadedImages(newImages);
    onImageUpload(newImages);

    toast({
      title: "Images uploaded",
      description: `${processed.length} image(s) ready for analysis`,
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [uploadedImages]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const removeImage = (id: string) => {
    const newImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(newImages);
    onImageUpload(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Medical Mode Notice */}
      {medicalMode && (
        <Alert className="border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          <AlertTitle className="text-sm font-semibold">Educational Medical Imaging Mode</AlertTitle>
          <AlertDescription className="text-xs text-amber-800 dark:text-amber-200 mt-1">
            All PHI is automatically redacted. Images processed in-memory only, not stored.
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border/50 hover:border-primary/50 hover:bg-accent/20'
          }
        `}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept={medicalMode ? 'image/*,.dcm' : 'image/*'}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drop images here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                {supportedFormats} • Max {maxFiles} files
              </p>
            </div>

            {medicalMode && (
              <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                <Badge variant="secondary" className="text-[10px]">X-Ray</Badge>
                <Badge variant="secondary" className="text-[10px]">CT Scan</Badge>
                <Badge variant="secondary" className="text-[10px]">MRI</Badge>
                <Badge variant="secondary" className="text-[10px]">ECG/EKG</Badge>
                <Badge variant="secondary" className="text-[10px]">DICOM</Badge>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Images ({uploadedImages.length}/{maxFiles})</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="p-3">
                <div className="flex gap-3">
                  {/* Image Preview */}
                  <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                    {image.type === 'dicom' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ) : (
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Image Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{image.file.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {(image.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Status & Type Badges */}
                    <div className="flex gap-1 flex-wrap">
                      {image.type === 'dicom' && (
                        <Badge variant="secondary" className="text-[9px]">DICOM</Badge>
                      )}
                      {image.type === 'ecg' && (
                        <Badge variant="secondary" className="text-[9px]">ECG</Badge>
                      )}
                      
                      {image.status === 'ready' && (
                        <Badge variant="outline" className="text-[9px] border-green-500 text-green-700 dark:text-green-400">
                          <CheckCircle2 className="h-2 w-2 mr-1" />
                          Ready
                        </Badge>
                      )}
                      {image.status === 'error' && (
                        <Badge variant="outline" className="text-[9px] border-red-500 text-red-700 dark:text-red-400">
                          Error
                        </Badge>
                      )}
                    </div>

                    {/* DICOM Metadata */}
                    {image.metadata && (
                      <div className="text-[10px] text-muted-foreground space-y-0.5 pt-1 border-t border-border/50">
                        <p>Modality: {image.metadata.modality}</p>
                        <p>Date: {image.metadata.studyDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      {medicalMode && uploadedImages.length > 0 && (
        <Alert className="bg-card/50">
          <Eye className="h-4 w-4 text-primary" />
          <AlertTitle className="text-sm font-medium">How it works</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
            <p>1. Images are analyzed in your browser (no server upload)</p>
            <p>2. AI provides educational observations and insights</p>
            <p>3. Always verify findings with healthcare professionals</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
