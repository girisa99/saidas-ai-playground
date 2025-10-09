# Universal Knowledge Base - Advanced Scraping & Crawling Strategy

## Executive Summary

This document outlines a comprehensive strategy for building an AI-powered knowledge scraping, crawling, and ingestion system for the Universal Knowledge Base. The system will support multi-format content (videos, images, PDFs, documents, web pages) with intelligent extraction and storage.

---

## 1. Current State Assessment

### Existing Capabilities
✅ **Manual knowledge entry** - Admin dashboard & forms  
✅ **Document upload** - PDF, DOCX, TXT support  
✅ **API integration** - External API responses  
✅ **Kaggle/re3data sync** - Automated weekly repository sync  
✅ **Vector embeddings** - OpenAI text-embedding-ada-002  
✅ **RAG search** - Vector similarity + full-text search  

### Gaps Identified
❌ **No web crawling** - Cannot automatically discover and extract web content  
❌ **No video processing** - Cannot extract transcripts/insights from videos  
❌ **No image analysis** - No OCR or vision-based extraction  
❌ **Limited PDF parsing** - Basic text extraction only  
❌ **No recursive crawling** - Cannot follow links and build knowledge graphs  
❌ **No content scheduling** - Manual triggers only  

---

## 2. Implementation Options Analysis

### Option A: Firecrawl Integration (RECOMMENDED for MVP)

#### Pros
✅ **Fastest time to market** - Pre-built API, no infrastructure  
✅ **Comprehensive features** - Markdown, HTML, screenshots, PDF support  
✅ **Handles complexity** - JavaScript rendering, pagination, authentication  
✅ **Scalable** - Cloud-based, auto-scaling  
✅ **Maintained** - Regular updates, bug fixes  

#### Cons
❌ **Cost per crawl** - Pay-per-use pricing model  
❌ **Vendor lock-in** - Dependency on third-party service  
❌ **Rate limits** - API rate limits may constrain bulk operations  
❌ **Data privacy** - Content passes through external servers  

#### Implementation Strategy
```typescript
// Edge Function: crawl-knowledge-source
import FirecrawlApp from '@mendable/firecrawl-js';

const firecrawl = new FirecrawlApp({ 
  apiKey: Deno.env.get('FIRECRAWL_API_KEY') 
});

// Crawl website and extract content
const result = await firecrawl.crawlUrl('https://example.com', {
  limit: 100,
  scrapeOptions: {
    formats: ['markdown', 'html'],
  }
});

// Process and store in universal_knowledge_base
for (const page of result.data) {
  await supabase.from('universal_knowledge_base').insert({
    finding_name: page.metadata?.title || 'Untitled',
    description: page.markdown,
    domain: 'conversational',
    content_type: 'educational_content',
    metadata: {
      source_type: 'crawl',
      source_url: page.url,
      crawled_at: new Date().toISOString(),
      html: page.html,
      links: page.links
    }
  });
}
```

**Cost Estimate:** $0.10-$0.50 per 100 pages crawled

---

### Option B: Custom Solution (RECOMMENDED for Long-term)

#### Pros
✅ **Full control** - Own infrastructure and data pipeline  
✅ **Cost effective** - Fixed infrastructure costs  
✅ **Custom features** - Tailored to specific needs  
✅ **Data privacy** - All processing stays internal  
✅ **Integration flexibility** - Direct integration with existing systems  

#### Cons
❌ **Development time** - 2-4 weeks for MVP  
❌ **Maintenance burden** - Need to handle edge cases, updates  
❌ **Infrastructure costs** - Server/compute resources  
❌ **Complexity** - JavaScript rendering, anti-bot detection  

#### Architecture Components

```
┌─────────────────────────────────────────────────────────────┐
│                   Content Discovery Layer                    │
│  • URL Queue Management                                      │
│  • Sitemap Parsing                                          │
│  • Link Graph Building                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Content Extraction Layer                   │
│  • Puppeteer/Playwright (JS rendering)                      │
│  • Cheerio (HTML parsing)                                   │
│  • PDF.js (PDF extraction)                                  │
│  • Tesseract OCR (Image text extraction)                    │
│  • YouTube Transcript API (Video transcripts)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   AI Processing Layer                        │
│  • GPT-5/Claude (Content summarization)                     │
│  • GPT-4 Vision (Image analysis)                            │
│  • OpenAI Whisper (Audio transcription)                     │
│  • Embedding Generation (Vector representations)            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Storage & Indexing Layer                   │
│  • universal_knowledge_base (Primary storage)               │
│  • Vector embeddings (Semantic search)                      │
│  • Full-text indexes (Keyword search)                       │
│  • Metadata tags (Filtering)                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Multi-Format Content Processing

### Web Pages (HTML/Markdown)

**Tools:** Cheerio, Readability, Turndown  
**Process:**
1. Fetch HTML content
2. Extract main article content (remove ads, navs)
3. Convert to Markdown
4. Extract metadata (title, description, author, date)
5. Store in `universal_knowledge_base`

```typescript
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

async function processWebPage(url: string) {
  const html = await fetch(url).then(r => r.text());
  const $ = cheerio.load(html);
  
  // Extract main content
  const mainContent = $('article, main, .content').html() || $('body').html();
  
  // Convert to Markdown
  const turndown = new TurndownService();
  const markdown = turndown.turndown(mainContent);
  
  return {
    title: $('title').text(),
    content: markdown,
    metadata: {
      author: $('meta[name="author"]').attr('content'),
      description: $('meta[name="description"]').attr('content'),
      publishedDate: $('meta[property="article:published_time"]').attr('content')
    }
  };
}
```

---

### PDFs

**Tools:** pdf-parse, pdf.js, Apache Tika  
**Process:**
1. Download PDF
2. Extract text content
3. Extract images (OCR if needed)
4. Detect structure (headings, sections)
5. Store with metadata

```typescript
import pdf from 'pdf-parse';

async function processPDF(pdfBuffer: Buffer) {
  const data = await pdf(pdfBuffer);
  
  return {
    text: data.text,
    pages: data.numpages,
    metadata: data.info,
    images: [], // Extract with pdf-lib if needed
  };
}
```

---

### Images

**Tools:** Tesseract OCR, GPT-4 Vision API  
**Process:**
1. Download image
2. Run OCR for text extraction
3. Use GPT-4 Vision for content understanding
4. Generate descriptive embeddings
5. Store image URL + analysis

```typescript
import Tesseract from 'tesseract.js';

async function processImage(imageUrl: string) {
  // OCR for text extraction
  const { data: { text } } = await Tesseract.recognize(imageUrl);
  
  // AI vision analysis
  const visionAnalysis = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-5',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this image in detail. Extract key concepts and information.' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }]
    })
  });
  
  return {
    ocrText: text,
    aiDescription: visionAnalysis.choices[0].message.content,
    imageUrl
  };
}
```

---

### Videos (YouTube, Vimeo)

**Tools:** YouTube Transcript API, OpenAI Whisper  
**Process:**
1. Extract video ID
2. Get transcript (if available)
3. Use Whisper for audio transcription (if needed)
4. Summarize with GPT-5
5. Extract key moments/timestamps

```typescript
import { YoutubeTranscript } from 'youtube-transcript';

async function processVideo(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  
  // Get transcript
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);
  const fullText = transcript.map(t => t.text).join(' ');
  
  // Summarize with GPT-5
  const summary = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [{
        role: 'user',
        content: `Summarize this video transcript:\n\n${fullText}`
      }]
    })
  });
  
  return {
    transcript: fullText,
    summary: summary.choices[0].message.content,
    timestamps: transcript
  };
}
```

---

## 4. Recommended Implementation Roadmap

### Phase 1: Quick Win with Firecrawl (Week 1-2)
- ✅ Set up Firecrawl API integration
- ✅ Create edge function for crawling
- ✅ Build admin UI for crawl job management
- ✅ Store crawled content in `universal_knowledge_base`
- ✅ Test with 5-10 key knowledge sources

### Phase 2: Multi-Format Support (Week 3-4)
- ✅ PDF processing integration
- ✅ Image OCR + GPT-4 Vision analysis
- ✅ Video transcript extraction
- ✅ Document format conversion (DOCX, TXT)

### Phase 3: Advanced Features (Week 5-8)
- ✅ Recursive crawling with depth control
- ✅ Content deduplication
- ✅ Auto-categorization with AI
- ✅ Quality scoring algorithm
- ✅ Scheduled crawling (daily/weekly)

### Phase 4: Custom Scraper Development (Week 9-12)
- ✅ Build custom Puppeteer-based scraper
- ✅ JavaScript rendering support
- ✅ Anti-bot detection handling
- ✅ Distributed crawling architecture
- ✅ Cost optimization vs Firecrawl

---

## 5. Data Processing Pipeline

### JSON Processing
```typescript
// Process structured JSON data sources
async function processJSON(jsonData: any, source: string) {
  const entries = Array.isArray(jsonData) ? jsonData : [jsonData];
  
  for (const entry of entries) {
    await supabase.from('universal_knowledge_base').insert({
      finding_name: entry.title || entry.name,
      description: JSON.stringify(entry, null, 2),
      domain: inferDomain(entry),
      content_type: 'api_data',
      metadata: {
        source_type: 'api',
        source: source,
        raw_json: entry
      }
    });
  }
}
```

### Markdown Processing
```typescript
// Process Markdown files
async function processMarkdown(markdown: string, metadata: any) {
  // Extract frontmatter
  const { data: frontmatter, content } = extractFrontmatter(markdown);
  
  await supabase.from('universal_knowledge_base').insert({
    finding_name: frontmatter.title || metadata.filename,
    description: content,
    domain: frontmatter.domain || 'conversational',
    content_type: frontmatter.type || 'educational_content',
    metadata: {
      source_type: 'document',
      ...frontmatter,
      ...metadata
    }
  });
}
```

### Crawling Pipeline
```typescript
// Comprehensive crawling pipeline
async function crawlAndProcess(startUrl: string, options: CrawlOptions) {
  const urlQueue = [startUrl];
  const visited = new Set<string>();
  
  while (urlQueue.length > 0) {
    const url = urlQueue.shift()!;
    if (visited.has(url)) continue;
    
    visited.add(url);
    
    // Fetch content
    const content = await fetchContent(url);
    
    // Detect content type
    const type = detectContentType(url, content);
    
    // Process based on type
    let processed;
    switch (type) {
      case 'html':
        processed = await processWebPage(url);
        break;
      case 'pdf':
        processed = await processPDF(content);
        break;
      case 'image':
        processed = await processImage(url);
        break;
      case 'video':
        processed = await processVideo(url);
        break;
    }
    
    // Store in knowledge base
    await storeKnowledge(processed);
    
    // Extract and queue new URLs (if recursive)
    if (options.recursive && type === 'html') {
      const newUrls = extractLinks(content, url);
      urlQueue.push(...newUrls);
    }
  }
}
```

---

## 6. Storage Schema Enhancements

### Recommended Table Updates

```sql
-- Add crawl job tracking
CREATE TABLE knowledge_crawl_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name TEXT NOT NULL,
  start_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  pages_crawled INTEGER DEFAULT 0,
  pages_total INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  configuration JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id)
);

-- Add content version tracking
ALTER TABLE universal_knowledge_base 
ADD COLUMN content_hash TEXT,
ADD COLUMN last_crawled_at TIMESTAMPTZ,
ADD COLUMN crawl_frequency TEXT DEFAULT 'weekly'; -- daily, weekly, monthly

-- Add media references
CREATE TABLE knowledge_media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_id UUID REFERENCES universal_knowledge_base(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL, -- image, video, audio, document
  media_url TEXT NOT NULL,
  storage_path TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. Cost Analysis

### Firecrawl Costs
- **Starter Plan:** $49/month (500 credits)
- **Professional:** $199/month (5000 credits)
- **Estimated usage:** 1000 pages/month = $100-150/month

### Custom Solution Costs
- **Development:** 2-4 weeks ($8K-16K one-time)
- **Infrastructure:** $100-300/month (servers, storage)
- **Maintenance:** 10-20 hours/month ($2K-4K/month)

### Hybrid Approach (RECOMMENDED)
- **Start with Firecrawl** for immediate value ($49-199/month)
- **Build custom scraper** for high-volume sources (3-month project)
- **Use both** for optimal cost/performance

---

## 8. Implementation Steps

### Immediate (Week 1)
1. ✅ Set up Firecrawl API key in Supabase secrets
2. ✅ Create `crawl-knowledge-source` edge function
3. ✅ Build admin UI for crawl job management
4. ✅ Test with 3-5 knowledge sources

### Short-term (Week 2-4)
1. ✅ Implement PDF processing
2. ✅ Add image OCR + vision analysis
3. ✅ Integrate video transcript extraction
4. ✅ Create automated crawl scheduler

### Medium-term (Month 2-3)
1. ✅ Build content deduplication
2. ✅ Implement AI-based categorization
3. ✅ Add quality scoring
4. ✅ Create knowledge graph relationships

### Long-term (Month 4-6)
1. ✅ Develop custom scraper for cost optimization
2. ✅ Build distributed crawling system
3. ✅ Implement real-time content updates
4. ✅ Add advanced analytics dashboard

---

## 9. Success Metrics

- **Coverage:** 10,000+ knowledge entries in 6 months
- **Quality:** 85%+ accuracy in AI categorization
- **Freshness:** 90%+ content updated within 30 days
- **Cost:** <$500/month for 1000 pages crawled
- **Performance:** <5 seconds average search response time

---

## 10. Conclusion

**Recommended Approach:**
1. **Start with Firecrawl** for immediate MVP (Week 1-2)
2. **Add multi-format processing** (Week 3-4)
3. **Build custom scraper** for high-volume sources (Month 2-3)
4. **Optimize costs** by migrating to hybrid approach (Month 4+)

This strategy balances **speed to market**, **feature richness**, and **long-term cost optimization** while maintaining data quality and system reliability.
