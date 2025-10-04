# Medical Imaging Datasets Reference

Comprehensive reference for authoritative medical imaging datasets used in RAG-enhanced medical image analysis.

**Sources:**
- https://sites.google.com/site/aacruzr/image-datasets
- https://github.com/beamandrew/medical-data

## Multimodal Databases

### Center for Invivo Microscopy (CIVM)
- **Content**: Embryonic and Neonatal Mouse (H&E, MR)
- **URL**: http://www.civm.duhs.duke.edu/devatlas/
- **User Guide**: http://www.civm.duhs.duke.edu/devatlas/UserGuide.pdf
- **Use Case**: Developmental biology, anatomical studies

### LONI Image Data Archive
- **URL**: https://ida.loni.usc.edu/services/Menu/IdaData.jsp?project=
- **Content**: Multi-modal neuroimaging data
- **Use Case**: Neurological research, brain imaging

## Radiology Datasets

### Collaborative Informatics and Neuroimaging Suite (COINS)
- **URL**: https://portal.mrn.org/micis/index.php?subsite=dx
- **Content**: Neuroimaging data sharing platform
- **Modalities**: fMRI, sMRI, DTI

### The Cancer Imaging Archive (TCIA)
- **URL**: http://www.cancerimagingarchive.net/
- **Content**: Large archive of medical images of cancer
- **Collections**: Multiple cancer types, various modalities
- **Open Access**: Yes
- **Use Case**: Cancer detection, treatment planning, research

### Alzheimer's Disease Neuroimaging Initiative (ADNI)
- **URL**: http://adni.loni.ucla.edu/
- **Content**: MRI, PET, clinical data for Alzheimer's research
- **Use Case**: Neurodegenerative disease detection, progression tracking

### The Open Access Series of Imaging Studies (OASIS)
- **URL**: http://www.oasis-brains.org/
- **Content**: Neuroimaging datasets (MRI)
- **Use Case**: Normal aging, Alzheimer's disease research

### Breast Cancer Digital Repository (BCDR)
- **URL**: https://bcdr.eu/
- **Content**: Mammography images with annotations
- **Use Case**: Breast cancer detection, CAD systems

### Digital Database for Screening Mammography (DDSM)
- **URL**: http://marathon.csee.usf.edu/Mammography/Database.html
- **Content**: 2,620+ cases, 10,000+ images
- **Ground Truth**: Yes, with radiologist annotations
- **Use Case**: Mammography CAD development, validation

### Mammographic Image Analysis Society (MIAS) Database
- **URL**: http://peipa.essex.ac.uk/info/mias.html
- **Content**: 322 mammogram images
- **Ground Truth**: Yes, abnormality type and location
- **Use Case**: Mammography research, algorithm validation

### NLM Visible Human Project
- **URL**: http://www.nlm.nih.gov/research/visible/visible_human.html
- **Content**: Complete anatomical datasets (CT, MRI)
- **Use Case**: Anatomical education, 3D reconstruction

### CT Colonography Dataset
- **URL**: https://wiki.cancerimagingarchive.net/display/Public/CT+COLONOGRAPHY
- **Content**: CT scans for colon cancer detection
- **Use Case**: Colorectal cancer screening, polyp detection

### BreastScreening Datasets (UTA4, UTA7)
- **UTA4**: https://github.com/MIMBCD-UI/dataset-uta4-dicom
- **UTA7**: https://github.com/MIMBCD-UI/dataset-uta7-dicom
- **Content**: DICOM files (MG, US, MRI)
- **Use Case**: Multi-modal breast cancer imaging

### Facebook AI + NYU FastMRI
- **Content**: Knee and brain MRI scans
- **Sets**: Training, validation, masked test
- **Format**: DICOM with PyTorch data loaders
- **Open Source**: Yes, with GitHub repository
- **Use Case**: MRI reconstruction, deep learning research

### National Cancer Institute Imaging Data Commons (IDC)
- **URL**: https://portal.imaging.datacommons.cancer.gov/explore/
- **Content**: Cancer imaging data from multiple sources
- **Use Case**: Multi-cancer research, data integration

## Histology & Microscopy Datasets

### Pap Smear Databases
- **SIPAKMed**: https://www.cse.uoi.gr/~marina/sipakmed.html
- **Database #2**: https://www.cs.uoi.gr/~marina/data_set_TITB.zip
- **Database #3**: http://mde-lab.aegean.gr/index.php/downloads
- **Content**: Cervical cell images
- **Use Case**: Cervical cancer screening, cell classification

### The Cancer Genome Atlas (TCGA)
- **URL**: http://cancergenome.nih.gov/
- **Data Portal**: https://tcga-data.nci.nih.gov/tcga/
- **Content**: Genomic and histopathology data
- **Use Case**: Multi-omic cancer research

### International Cancer Genome Consortium (ICGC)
- **URL**: http://icgc.org
- **Data Portal**: http://dcc.icgc.org/
- **Content**: Genomic data from multiple cancers
- **Use Case**: International cancer genomics research

### Stanford Tissue Microarray Database (TMA)
- **URL**: http://tma.im
- **Content**: Tissue microarray images
- **Use Case**: Protein expression studies

### MedPix Database
- **URL**: https://medpix.nlm.nih.gov/home
- **Content**: Medical images with expert-written captions, patient demographics, organ systems
- **Searchable By**: Symptoms, diagnosis, keywords, pathologies
- **Use Case**: Educational reference, differential diagnosis, symptom-based image search
- **Key Feature**: Detailed metadata with patient context and expert annotations

### MedMNIST Collection
- **URL**: https://medmnist.com
- **Content**: Standardized lightweight 2D and 3D medical imaging datasets
- **Datasets**: PathMNIST, ChestMNIST, RetinaMNIST, OrganMNIST3D, and more
- **Use Case**: Machine learning benchmarking, model training, algorithm validation
- **Key Feature**: FAIR-compliant, standardized formats (28x28 to 224x224)

### NIH Chest X-ray Dataset (ChestX-ray14)
- **URL**: https://nihcc.app.box.com/v/ChestXray-NIHCC
- **Content**: 112,120 frontal-view chest X-rays from 30,805 patients
- **Disease Labels**: 14 thoracic diseases including pneumonia, tuberculosis, pneumothorax
- **Use Case**: Computer-aided diagnosis, public health screening tools
- **Key Feature**: Large-scale, publicly available with bounding boxes

### OpenNeuro Platform
- **URL**: https://openneuro.org
- **Content**: Open-access neuroimaging datasets (fMRI, sMRI, DTI)
- **Format**: BIDS-compliant with preprocessed connectivity maps
- **Use Case**: Brain network research, developmental neuroscience, aging studies
- **Key Feature**: FAIR principles, longitudinal data, lifespan coverage

### MIDRC (Medical Imaging Data Resource Center)
- **URL**: https://www.midrc.org
- **Content**: COVID-19 imaging data (CT, X-ray) with clinical outcomes
- **NIH Funded**: Yes, with treatment and patient outcome data
- **Use Case**: COVID-19 research, disease progression tracking, treatment response
- **Key Feature**: Longitudinal imaging linked to clinical outcomes and genomic data

### MITOS Dataset
- **URL**: http://www.ipal.cnrs.fr/event/icpr-2012
- **Content**: Mitosis detection in breast histology
- **Use Case**: Mitotic figure detection, cell division analysis

### DPA's Whole Slide Imaging Repository
- **URL**: https://digitalpathologyassociation.org/whole-slide-imaging-repository
- **Content**: Whole slide images (WSI)
- **Use Case**: Digital pathology, slide scanning

### Histology (CIMA) Dataset
- **URL**: http://cmp.felk.cvut.cz/~borovji3/?page=dataset
- **Content**: Histological image registration
- **Use Case**: Image alignment, registration algorithms

### ANHIR Dataset
- **URL**: https://anhir.grand-challenge.org/
- **Content**: Automatic Non-rigid Histological Image Registration
- **Use Case**: Image registration challenges

### BDGP FlyExpress Database
- **URL**: www.flyexpress.net
- **Content**: Drosophila gene expression patterns
- **Use Case**: Developmental biology, pattern recognition

### UCSB Bio-Segmentation Benchmark
- **URL**: http://www.bioimage.ucsb.edu/research/biosegmentation
- **Content**: Cell segmentation benchmarks
- **Use Case**: Cell segmentation algorithm validation

### Genome RNAi Dataset
- **URL**: http://www.genomernai.org/
- **Content**: RNAi screening data
- **Use Case**: Gene function studies

### Chinese Hamster Ovary (CHO) Dataset
- **URL**: http://www.chogenome.org/data.html
- **Content**: CHO cell line data
- **Use Case**: Biopharmaceutical production research

### Allen Brain Atlas
- **URL**: http://www.brain-map.org/
- **Content**: Comprehensive brain maps (gene expression, connectivity)
- **Use Case**: Neuroscience research, brain mapping

### 1000 Functional Connectomes Project
- **URL**: http://fcon_1000.projects.nitrc.org/
- **Content**: Resting-state fMRI data
- **Use Case**: Brain connectivity studies

### Cell Centered Database (CCDB)
- **URL**: https://library.ucsd.edu/dc/collection/bb5940732k
- **Content**: Cellular and subcellular imaging
- **Use Case**: Cell biology, microscopy

### Human Protein Atlas
- **URL**: http://www.proteinatlas.org/
- **Content**: Protein expression in tissues and cells
- **Use Case**: Proteomics, immunohistochemistry

### El Salvador Gastrointestinal Atlas
- **URL**: http://www.gastrointestinalatlas.com/
- **Content**: Gastrointestinal endoscopy images/videos
- **Use Case**: GI disease diagnosis, endoscopy training

### BCNB: Breast Cancer Core-Needle Biopsy Dataset
- **URL**: https://bupt-ai-cz.github.io/BCNB/
- **GitHub**: https://github.com/bupt-ai-cz/BALNMP#bcnb-dataset
- **Content**: Whole slide images of core-needle biopsies
- **Use Case**: Early breast cancer detection

### BCI: Breast Cancer Immunohistochemical Dataset
- **URL**: https://bupt-ai-cz.github.io/BCI/
- **GitHub**: https://github.com/bupt-ai-cz/BCI
- **Content**: IHC image generation
- **Use Case**: Breast cancer biomarker analysis

## Benchmarking Resources

- **Essex Benchmark Databases**: http://peipa.essex.ac.uk/benchmark/databases/
- **Mulan Multi-Label Datasets**: http://mulan.sourceforge.net/datasets-mlc.html
- **Pathology Reporting Formats**: http://www.rcpath.org/publications-media/publications/datasets

## Knowledge Base Integration Strategy

### Priority 1: High-Impact Clinical Datasets
1. **TCIA** - Multiple cancer types, widely validated
2. **MedPix** - Expert-annotated with clinical context
3. **NIH ChestX-ray14** - Large-scale thoracic disease benchmark
4. **ADNI** - Gold standard for Alzheimer's imaging
5. **MIDRC** - COVID-19 with clinical outcomes
6. **FastMRI** - State-of-the-art MRI reconstruction
7. **TCGA** - Multi-modal cancer genomics + imaging
8. **DDSM/MIAS** - Mammography standards

### Priority 2: Specialized Modality Datasets
1. **MedMNIST** - ML benchmarks across modalities
2. **OpenNeuro** - Neuroimaging platform (BIDS)
3. **OASIS** - Brain MRI reference
4. **BCDR** - Breast imaging
5. **CT Colonography** - GI imaging
6. **Pap Smear DBs** - Cytology

### Priority 3: Research & Benchmark Datasets
1. **MITOS** - Mitosis detection
2. **ANHIR** - Image registration
3. **Allen Brain Atlas** - Neuroanatomy
4. **UCSB Bio-Seg** - Cell segmentation

## Dataset Characteristics for RAG

Each dataset entry in the knowledge base should include:
- **Modality**: CT, MRI, X-Ray, Microscopy, etc.
- **Body Part/System**: Brain, breast, colon, cells, etc.
- **Finding Categories**: Normal anatomy, pathology, artifacts
- **Clinical Context**: Diagnostic, screening, research
- **Ground Truth**: Radiologist annotations, expert labels
- **Validation Status**: Peer-reviewed, clinically validated
- **Access**: Open, restricted, requires registration

## Updating the Knowledge Base

To add new findings from these datasets:
1. Extract key imaging characteristics from dataset papers
2. Map to standardized medical terminology (SNOMED, RadLex)
3. Generate vector embeddings using text-embedding-ada-002
4. Insert into `medical_imaging_knowledge` table
5. Validate retrieval accuracy with test queries

## Citation & Attribution

When using these datasets in analysis:
- Always cite the original dataset source
- Acknowledge dataset creators and institutions
- Follow dataset-specific usage terms and licenses
- Indicate educational/research use only disclaimers
