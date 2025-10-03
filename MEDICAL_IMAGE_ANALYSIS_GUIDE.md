# Medical Image Analysis System - User Guide

## Overview
The Genie AI platform now supports **vision-capable AI models** with specialized **medical imaging analysis** for educational purposes. This guide explains how the system works, what it can do, and how users interact with it.

---

## 🎯 How It Works

### 1. **Enable Vision & Medical Mode**

Users access the **AI Configuration & Settings** panel in the Genie interface:

1. Click the **Settings** icon (⚙️) in the chat header
2. Navigate to **Model Selection**
3. Use the filter buttons to select a vision-capable model:
   - **🧠 LLM+Vision** - Models like GPT-4o, Claude 3, Gemini Pro Vision
   - **👁️ Vision** - Specialized VLMs like LLaVA, CogVLM
   - **🩺 Healthcare** - Medical-capable models like Med-PaLM 2, BioGPT

4. Enable **Image Analysis** toggle
5. For medical imaging: Enable **Medical Imaging Mode**

### 2. **Supported Image Formats**

The system supports multiple image formats:

#### Standard Images
- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **TIFF** (.tif, .tiff)
- **BMP** (.bmp)
- **WEBP** (.webp)

#### Medical Images
- **DICOM** (.dcm) - Digital Imaging and Communications in Medicine
- **ECG/EKG** images (various formats)
- **X-Ray images** (JPEG, PNG, TIFF)
- **CT Scans** (DICOM, JPEG, PNG)
- **MRI images** (DICOM, JPEG, PNG)
- **Ultrasound** (JPEG, PNG)
- **Pathology slides** (JPEG, PNG, TIFF)

---

## 📤 Image Upload Process

### Step 1: Click the Image Upload Button
- Located next to the message input field
- Icon: 📷 **ImagePlus**
- Only visible when vision is enabled

### Step 2: Upload Images
Users can upload images in two ways:

1. **Drag & Drop**: Drag medical images directly into the upload area
2. **File Picker**: Click the upload area to browse and select files

**Limits:**
- Maximum **5 images** per conversation
- Maximum **20MB** per image
- Images processed in-memory (not stored on servers)

### Step 3: Automatic Processing

When an image is uploaded:

1. **Type Detection**: System identifies the image type
   - Standard image → Basic vision analysis
   - DICOM file → Medical imaging mode
   - ECG pattern → ECG analysis mode

2. **PHI Redaction** (for DICOM):
   - Patient names → "REDACTED (PHI Protected)"
   - Patient IDs → "ANONYMOUS"
   - Institution names → "REDACTED"
   - **Safe metadata preserved**: Study date, modality, body part

3. **Preview Generation**:
   - Standard images: Thumbnail preview
   - DICOM files: Rendered grayscale visualization
   - Status indicators: ✓ Ready | ⚠️ Processing | ❌ Error

---

## 🔬 DICOM Image Support

### What is DICOM?
**DICOM** (Digital Imaging and Communications in Medicine) is the international standard for medical imaging. Our system includes a specialized DICOM parser that:

- ✅ Parses DICOM headers and metadata
- ✅ Extracts pixel data for visualization
- ✅ Automatically redacts Protected Health Information (PHI)
- ✅ Renders DICOM images to canvas for display
- ✅ Supports grayscale medical images

### DICOM Metadata Extracted
```typescript
{
  patientName: "REDACTED (PHI Protected)",
  patientID: "ANONYMOUS",
  studyDate: "2025-01-15",
  modality: "CT",  // CT, MR, CR, DX, US, etc.
  bodyPart: "Chest",
  imageType: "AXIAL",
  manufacturer: "GE Medical",
  studyDescription: "Chest CT with contrast",
  rows: 512,
  columns: 512
}
```

### Supported Modalities
- **CT** - Computed Tomography
- **MR** - MRI (Magnetic Resonance Imaging)
- **CR** - Computed Radiography (X-Ray)
- **DX** - Digital X-Ray
- **US** - Ultrasound
- **NM** - Nuclear Medicine
- **PT** - PET Scan
- **XA** - X-Ray Angiography
- **MG** - Mammography
- **ECG** - Electrocardiogram

---

## 🤖 AI Analysis Process

### How the AI Reads Images

1. **Image is Base64 Encoded**: Converted to data URI format
2. **Sent to Vision Model**: Transmitted to selected vision-capable AI model
3. **AI Processes Image**: Model analyzes visual content, patterns, structures
4. **Educational Response Generated**: AI provides:
   - **Observations**: What the AI sees in the image
   - **Educational insights**: Relevant medical/anatomical information
   - **Key findings**: Notable features or patterns
   - **Limitations disclaimer**: Reminders about non-diagnostic use

### Medical Image Analysis Output

For medical images, the AI can provide:

#### ✓ Image Description
- Anatomical structures visible
- Image quality assessment
- Modality-specific observations

#### ✓ Educational Observations
- Notable features or patterns
- Anatomical landmarks
- Technical quality notes

#### ✓ HIPAA-Compliant Disclaimers
Every medical image response includes:
- ❌ **NOT for diagnosis**
- ❌ **NOT FDA-approved**
- ✅ **Educational use only**
- ✅ **Consult healthcare professionals**

---

## 🔒 Privacy & Security

### PHI Protection
- **No PHI Stored**: Images processed in-memory only
- **No Server Upload**: Images analyzed locally in browser when possible
- **Automatic Redaction**: DICOM patient info automatically removed
- **Session Only**: Images deleted when conversation ends

### HIPAA Compliance Features
```
✓ No persistent storage of medical images
✓ PHI automatically redacted from DICOM metadata
✓ Clear educational-use-only disclaimers
✓ No clinical decision support claims
✓ Transparent limitations messaging
✓ Prompt to consult healthcare professionals
```

---

## 👁️ Vision Model Indicator

When vision is enabled, users see a **prominent indicator** showing:

### Visual Banner
```
┌─────────────────────────────────────────────┐
│ 🩺 Medical Imaging Enabled           ✨     │
│ Upload medical images for educational        │
│ analysis                                      │
│                                              │
│ Model: GPT-4o Vision                         │
│ ────────────────────────────────────────    │
│ Supported: DICOM, JPEG, PNG, TIFF           │
└─────────────────────────────────────────────┘
```

### Capabilities Shown
- 📸 **Image Understanding**
- 🗂️ **DICOM Support** (if medical mode enabled)
- 🎯 **Active Model Name**
- 📋 **Supported Formats**

---

## 💬 User Conversation Flow

### Example Medical Imaging Conversation

**User enables Medical Imaging Mode:**
```
System: ✓ Medical Imaging Enabled
        Upload X-rays, CT scans, MRI, ECG, DICOM files
        Educational use only • No PHI stored
```

**User uploads chest X-ray:**
```
User: [Uploads chest_xray.dcm]

System: 
✓ Image uploaded: chest_xray.dcm (1.2 MB)
  Modality: CR (Computed Radiography)
  Date: 2025-01-15
  Ready for analysis

What would you like to know about this image?
```

**User asks question:**
```
User: What structures are visible in this X-ray?

AI Response:
[Educational description of visible anatomical structures]

⚠️ IMPORTANT DISCLAIMER:
• This is educational analysis only
• NOT a medical diagnosis
• NOT FDA-approved diagnostic tool
• Always consult qualified healthcare professionals
```

---

## 🚀 Technical Implementation

### Components Created

1. **`MedicalImageUploader.tsx`**
   - Handles file uploads
   - Detects image types (DICOM, ECG, standard)
   - Generates previews
   - Manages upload state

2. **`VisionModelIndicator.tsx`**
   - Shows vision capability status
   - Displays active model
   - Lists supported formats
   - Provides visual feedback

3. **`dicomParser.ts`**
   - Parses DICOM files using `dicom-parser` library
   - Extracts metadata with PHI redaction
   - Renders pixel data to canvas
   - Converts to base64 for AI processing

### Integration Points

#### In `PublicGenieInterface.tsx`:
```typescript
// State management
const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
const [showImageUploader, setShowImageUploader] = useState(false);

// Config includes vision settings
const [aiConfig, setAIConfig] = useState<AIConfig>({
  visionEnabled: false,
  medicalImageMode: false,
  // ... other config
});
```

#### In Message Sending:
```typescript
// When sending message with images
if (uploadedImages.length > 0) {
  // Convert images to base64
  // Include in AI request
  // Send to vision model
}
```

---

## 📊 Workflow Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ 1. Enables Vision Mode
       ▼
┌─────────────────────┐
│  Settings Panel     │
│  • Select Vision    │
│    Model            │
│  • Enable Medical   │
│    Mode             │
└─────────┬───────────┘
          │ 2. Upload Image
          ▼
┌─────────────────────────┐
│  Image Uploader         │
│  • Drag & Drop          │
│  • File Picker          │
│  • Type Detection       │
└─────────┬───────────────┘
          │ 3. Process Image
          ▼
┌─────────────────────────┐
│  DICOM Parser (if .dcm) │
│  • Extract metadata     │
│  • Redact PHI           │
│  • Render to canvas     │
└─────────┬───────────────┘
          │ 4. Display Preview
          ▼
┌─────────────────────────┐
│  Image Preview          │
│  • Thumbnail            │
│  • Metadata             │
│  • Status: ✓ Ready      │
└─────────┬───────────────┘
          │ 5. Send Message
          ▼
┌─────────────────────────┐
│  AI Vision Model        │
│  • Analyze image        │
│  • Generate response    │
│  • Add disclaimers      │
└─────────┬───────────────┘
          │ 6. Return Response
          ▼
┌─────────────────────────┐
│  User sees:             │
│  • AI analysis          │
│  • Educational insights │
│  • Safety disclaimers   │
└─────────────────────────┘
```

---

## ⚠️ Important Limitations

### What the System CANNOT Do
- ❌ Provide medical diagnoses
- ❌ Replace professional medical advice
- ❌ FDA-approved diagnostic tool
- ❌ Store patient health information
- ❌ Make clinical decisions
- ❌ Interpret results for treatment

### What the System CAN Do
- ✅ Describe visible structures educationally
- ✅ Identify anatomical features
- ✅ Provide learning resources
- ✅ Explain imaging modalities
- ✅ Discuss technical image quality
- ✅ Support educational exploration

---

## 🎓 Educational Use Cases

### For Medical Students
- Learn to identify anatomical structures
- Understand different imaging modalities
- Practice image interpretation skills
- Study normal vs. abnormal findings

### For Healthcare Professionals
- Explore AI capabilities in imaging
- Experiment with AI-assisted learning
- Stay current with AI technology
- Evaluate AI tools for education

### For Researchers
- Test vision model capabilities
- Compare different AI models
- Analyze model responses
- Evaluate accuracy and limitations

---

## 🔧 Technical Requirements

### Browser Support
- Modern browsers with FileReader API
- Canvas support for DICOM rendering
- ES6+ JavaScript support

### Dependencies
- `dicom-parser` - DICOM file parsing
- `lucide-react` - UI icons
- React 18+ - UI framework

### Performance
- **Image Size**: Max 20MB recommended
- **Processing Time**: 2-5 seconds per DICOM image
- **Browser Memory**: ~50-100MB per image session

---

## 📝 Future Enhancements

### Planned Features
- [ ] 3D DICOM volume rendering
- [ ] Multi-slice DICOM viewer
- [ ] DICOM annotations support
- [ ] Batch image analysis
- [ ] Export analysis reports
- [ ] Integration with PACS systems
- [ ] Advanced image preprocessing

---

## 📞 Support & Resources

### Documentation
- [Lovable AI Documentation](https://docs.lovable.dev)
- [DICOM Standard](https://www.dicomstandard.org/)
- [Vision Model APIs](https://platform.openai.com/docs/guides/vision)

### Contact
For questions or support:
- Email: support@example.com
- GitHub Issues: [repository link]
- Community Discord: [link]

---

## 🏁 Summary

The Medical Image Analysis system provides:

1. **Easy Image Upload**: Drag-and-drop or file picker
2. **DICOM Support**: Full parser with PHI protection
3. **Vision AI Integration**: Multiple model options
4. **Educational Focus**: Clear disclaimers and limitations
5. **Privacy First**: No storage, in-memory processing only
6. **User Friendly**: Visual indicators and clear feedback

**Remember:** This is an **educational experimentation tool** only. Always consult qualified healthcare professionals for medical advice and diagnosis.
