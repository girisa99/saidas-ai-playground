# RFC: Internal Web Scraping & Crawling Platform

**Status**: Draft  
**Author**: Architecture Team  
**Date**: 2025-10-09  
**Version**: 1.0

---

## Executive Summary

This RFC proposes building an internal web scraping and crawling platform to replace commercial solutions like Firecrawl. The system will provide automated web crawling, content extraction, JavaScript rendering, and multi-format processing capabilities while maintaining full control over costs, data privacy, and feature development.

**Key Benefits**:
- Cost reduction: ~$0.02-0.05/page vs Firecrawl's $0.10-0.25/page
- Full data privacy and control
- Custom extraction logic tailored to specific domains
- No vendor lock-in
- Seamless integration with existing Universal Knowledge Base

**Estimated Break-even**: 6 months for projects crawling >10,000 pages/month

---

## 1. Problem Statement

### Current Limitations
Our existing knowledge base system has several gaps:
- ✅ Manual entry and document upload
- ✅ API integration and vector embeddings
- ❌ Automated web crawling
- ❌ JavaScript rendering for dynamic sites
- ❌ Recursive multi-page crawling
- ❌ Multi-format content extraction (videos, images, PDFs)

### Commercial Solution Gaps
While commercial solutions like Firecrawl offer these capabilities, they have limitations:
- **Cost**: $0.10-0.25 per page becomes expensive at scale
- **Privacy**: Sensitive data leaves our infrastructure
- **Customization**: Limited ability to customize extraction logic
- **Vendor Lock-in**: Dependency on third-party availability and pricing

---

## 2. Proposed Solution Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface Layer                      │
│  (Admin Dashboard - KnowledgeCrawlManager Component)            │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Orchestration Layer (Supabase)                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Crawl Orchestrator Edge Function                        │  │
│  │  - Job management, scheduling, rate limiting             │  │
│  │  - Progress tracking, error handling                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌─────────────────┐    ┌─────────────────────────┐
│  Content        │    │  JavaScript Renderer    │
│  Fetcher        │    │  Microservice          │
│  (Edge Fn)      │    │  (External Node.js)    │
│                 │    │  - Playwright          │
│  - Static HTML  │    │  - Dynamic content     │
│  - Robots.txt   │    │  - Wait strategies     │
│  - Sitemap      │    │  - Screenshot capture  │
└────────┬────────┘    └──────────┬──────────────┘
         │                        │
         └────────────┬───────────┘
                      ▼
         ┌────────────────────────┐
         │  Content Processor     │
         │  (Edge Function)       │
         │                        │
         │  - HTML Cleaner        │
         │  - Readability.js      │
         │  - Domain Templates    │
         │  - LLM Extraction      │
         └────────┬───────────────┘
                  ▼
         ┌────────────────────────┐
         │  Format Converters     │
         │  (Edge Functions)      │
         │                        │
         │  - Markdown Generator  │
         │  - Structured Data     │
         │  - Metadata Extractor  │
         └────────┬───────────────┘
                  ▼
         ┌────────────────────────┐
         │  Storage Layer         │
         │  (Supabase)            │
         │                        │
         │  - crawl_jobs          │
         │  - crawled_pages       │
         │  - universal_knowledge │
         │  - Vector embeddings   │
         └────────────────────────┘
```

### 2.2 Component Details

#### A. Crawl Orchestrator Edge Function
**Responsibilities**:
- Accept crawl requests from admin interface
- Create and manage crawl jobs
- Coordinate between fetcher and renderer
- Handle pagination and recursive crawling
- Implement rate limiting and politeness policies
- Track progress and handle errors

**Key Features**:
- Respect robots.txt and sitemap.xml
- Configurable crawl depth and breadth
- Domain-specific crawl rules
- Duplicate URL detection
- Retry logic with exponential backoff

#### B. Content Fetcher (Edge Function)
**Responsibilities**:
- Fetch static HTML content
- Handle HTTP headers and redirects
- Parse robots.txt and sitemaps
- Initial content type detection

**Technology**:
- Deno native fetch API
- Custom user-agent rotation
- Cookie and session management

#### C. JavaScript Renderer Microservice
**Responsibilities**:
- Render JavaScript-heavy pages
- Execute client-side rendering
- Wait for dynamic content loading
- Capture screenshots for verification

**Technology**:
- Node.js + Playwright
- Headless browser pool management
- Custom wait strategies (network idle, selectors)
- Resource blocking (ads, trackers)

**Deployment**:
- Separate microservice (Railway, Render, or Fly.io)
- Horizontal scaling for high-volume crawling
- Health checks and auto-restart

#### D. Content Processor (Edge Function)
**Responsibilities**:
- Clean HTML and extract main content
- Apply domain-specific extraction templates
- Use LLM for intelligent content extraction
- Generate structured data

**Extraction Strategies**:
1. **Readability.js**: General article extraction
2. **Domain Templates**: Custom CSS selectors for known sites
3. **LLM-Assisted**: GPT-4 for complex layouts
4. **Schema.org**: Structured data extraction

#### E. Format Converters (Edge Functions)
**Responsibilities**:
- Convert HTML to clean Markdown
- Extract metadata (title, description, author, date)
- Generate embeddings for vector search
- Store in Universal Knowledge Base

**Formats Supported**:
- Markdown (primary format)
- JSON structured data
- Plain text fallback

---

## 3. Database Schema

### 3.1 New Tables

#### `crawl_jobs`
Tracks crawling jobs and their status.

```sql
CREATE TABLE public.crawl_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  start_url TEXT NOT NULL,
  domain TEXT NOT NULL,
  max_pages INTEGER DEFAULT 100,
  max_depth INTEGER DEFAULT 3,
  crawl_type TEXT DEFAULT 'recursive', -- 'single', 'recursive', 'sitemap'
  status TEXT DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  pages_crawled INTEGER DEFAULT 0,
  pages_failed INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crawl_jobs_user_id ON public.crawl_jobs(user_id);
CREATE INDEX idx_crawl_jobs_status ON public.crawl_jobs(status);
CREATE INDEX idx_crawl_jobs_domain ON public.crawl_jobs(domain);
```

#### `crawled_pages`
Stores individual crawled pages with content and metadata.

```sql
CREATE TABLE public.crawled_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crawl_job_id UUID REFERENCES public.crawl_jobs(id) ON DELETE CASCADE,
  url TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL,
  title TEXT,
  content_markdown TEXT,
  content_html TEXT,
  metadata JSONB DEFAULT '{}',
  extracted_links TEXT[],
  depth INTEGER DEFAULT 0,
  http_status INTEGER,
  content_type TEXT,
  word_count INTEGER,
  crawled_at TIMESTAMPTZ DEFAULT now(),
  processing_time_ms INTEGER,
  screenshot_url TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crawled_pages_job_id ON public.crawled_pages(crawl_job_id);
CREATE INDEX idx_crawled_pages_url ON public.crawled_pages(url);
CREATE INDEX idx_crawled_pages_domain ON public.crawled_pages(domain);
```

#### `crawl_schedules`
Manages scheduled recurring crawls.

```sql
CREATE TABLE public.crawl_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  start_url TEXT NOT NULL,
  frequency TEXT DEFAULT 'daily', -- 'hourly', 'daily', 'weekly', 'monthly'
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  crawl_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_crawl_schedules_user_id ON public.crawl_schedules(user_id);
CREATE INDEX idx_crawl_schedules_next_run ON public.crawl_schedules(next_run_at);
```

### 3.2 Schema Modifications

#### Link `universal_knowledge_base` to `crawled_pages`

```sql
ALTER TABLE public.universal_knowledge_base
ADD COLUMN crawled_page_id UUID REFERENCES public.crawled_pages(id) ON DELETE SET NULL,
ADD COLUMN source_type TEXT DEFAULT 'manual', -- 'manual', 'crawled', 'api', 'upload'
ADD COLUMN last_synced_at TIMESTAMPTZ;

CREATE INDEX idx_knowledge_crawled_page ON public.universal_knowledge_base(crawled_page_id);
CREATE INDEX idx_knowledge_source_type ON public.universal_knowledge_base(source_type);
```

---

## 4. Implementation Phases

### Phase 1: Core Crawling Engine (Weeks 1-4)

**Deliverables**:
- Crawl Orchestrator Edge Function
- Content Fetcher Edge Function
- Basic database schema (crawl_jobs, crawled_pages)
- Admin UI for initiating crawls
- Single-page crawling support

**Success Criteria**:
- Successfully crawl and store single pages
- Basic error handling and logging
- Admin can view crawl job status

### Phase 2: JavaScript Rendering (Weeks 5-7)

**Deliverables**:
- JavaScript Renderer microservice (Playwright)
- Integration with Crawl Orchestrator
- Dynamic content detection and rendering
- Screenshot capture

**Success Criteria**:
- Render JavaScript-heavy pages (React, Angular, Vue)
- Capture screenshots for verification
- Handle common anti-bot mechanisms

### Phase 3: Intelligent Content Extraction (Weeks 8-10)

**Deliverables**:
- Content Processor with Readability.js
- Domain-specific extraction templates
- LLM-assisted extraction for complex layouts
- Markdown conversion

**Success Criteria**:
- Extract clean, readable content from 90%+ of pages
- Preserve formatting (headings, lists, links)
- Handle common content types (articles, blogs, docs)

### Phase 4: Recursive Crawling & Scheduling (Weeks 11-12)

**Deliverables**:
- Recursive crawling with depth/breadth limits
- Sitemap.xml parsing and crawling
- Scheduled recurring crawls
- Rate limiting and politeness policies

**Success Criteria**:
- Crawl entire websites up to configurable depth
- Respect robots.txt and rate limits
- Schedule and execute recurring crawls

---

## 5. Data Flow Diagram

### 5.1 Single Page Crawl Flow

```
Admin UI → Crawl Orchestrator → Content Fetcher → Content Processor → Universal Knowledge Base
                                       ↓
                                Is JavaScript needed?
                                       ↓
                                JavaScript Renderer
```

### 5.2 Recursive Crawl Flow

```
1. Admin initiates crawl with start_url
2. Orchestrator creates crawl_job
3. Orchestrator fetches start_url
4. Orchestrator extracts all links from page
5. For each link:
   - Check if already crawled
   - Check depth limit
   - Check domain restrictions
   - Add to crawl queue
6. Process queue (breadth-first or depth-first)
7. Update crawl_job status and progress
8. Store crawled_pages
9. Sync to universal_knowledge_base
```

---

## 6. Technology Stack

### Backend
- **Supabase Edge Functions** (Deno/TypeScript)
  - Crawl orchestration
  - Content fetching
  - Content processing
  - Format conversion

### JavaScript Rendering
- **Node.js + Playwright**
  - Deployed as separate microservice
  - Horizontal scaling support
  - Browser pooling

### Content Extraction
- **Readability.js**: Article extraction
- **Cheerio**: HTML parsing and CSS selectors
- **OpenAI GPT-4**: LLM-assisted extraction

### Document Parsing
- **Mammoth.js**: Word documents
- **PDF.js**: PDF parsing
- **Tesseract.js**: OCR for images

### Storage
- **Supabase Postgres**: Crawl jobs, pages, metadata
- **Supabase Storage**: Screenshots, raw HTML archives
- **pgvector**: Embeddings for semantic search

---

## 7. Cost Analysis

### 7.1 Firecrawl (Commercial Solution)
- **Per-page cost**: $0.10 - $0.25
- **Monthly for 10K pages**: $1,000 - $2,500
- **Annual for 10K pages/month**: $12,000 - $30,000

### 7.2 Internal Solution (First Year)
- **Development**: $20,000 - $30,000 (one-time)
- **Playwright microservice**: $20 - $100/month
- **Supabase**: $25 - $250/month (based on storage and compute)
- **OpenAI API (optional LLM extraction)**: $50 - $200/month

**Total Year 1**: $20,000 - $30,000 + $1,140 - $6,600 = **$21,140 - $36,600**

### 7.3 Break-even Analysis
- **10K pages/month**: 6-12 months
- **50K pages/month**: 2-3 months
- **100K pages/month**: 1-2 months

---

## 8. Risk Assessment

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Anti-bot detection | High | Rotate user agents, use residential proxies, implement human-like delays |
| JavaScript rendering complexity | Medium | Use Playwright with browser pool, implement fallback strategies |
| Rate limiting from target sites | Medium | Implement politeness policies, respect robots.txt, configurable delays |
| Content extraction accuracy | Medium | Multiple extraction strategies (Readability, templates, LLM), manual review tools |

### Operational Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Maintenance burden | Medium | Modular design, comprehensive logging, automated testing |
| Scaling challenges | Medium | Horizontal scaling for renderer, queue-based architecture |
| Legal/ethical concerns | High | Respect robots.txt, terms of service, implement opt-out mechanisms |

---

## 9. Success Metrics

### Phase 1 (Core Crawling)
- ✅ Successfully crawl 100 single pages
- ✅ 95%+ success rate for static HTML sites
- ✅ Average processing time < 5 seconds/page

### Phase 2 (JavaScript Rendering)
- ✅ Render 90%+ of JavaScript-heavy sites
- ✅ Screenshot capture success rate > 95%
- ✅ Average rendering time < 15 seconds/page

### Phase 3 (Content Extraction)
- ✅ Extract clean content from 90%+ of pages
- ✅ Maintain formatting accuracy > 85%
- ✅ Reduce manual review time by 70%

### Phase 4 (Recursive Crawling)
- ✅ Crawl 1,000-page sites without errors
- ✅ Respect rate limits (0 complaints from site owners)
- ✅ Scheduled crawls execute on time 99%+

### Long-term
- ✅ Cost per page < $0.05
- ✅ Break-even within 12 months
- ✅ System uptime > 99.5%

---

## 10. Alternative Approaches Considered

### 10.1 Keep Using Firecrawl
**Pros**: Immediate availability, no development effort  
**Cons**: High ongoing costs, vendor lock-in, limited customization  
**Decision**: Rejected due to long-term costs at scale

### 10.2 Hybrid Approach
**Pros**: Use Firecrawl for complex sites, internal for simple ones  
**Cons**: Increased complexity, split knowledge base  
**Decision**: Possible fallback strategy

### 10.3 Open-Source Solutions (Scrapy, Puppeteer)
**Pros**: Battle-tested, large community  
**Cons**: Requires significant integration work, not serverless-friendly  
**Decision**: Consider for Phase 2+ enhancements

---

## 11. Open Questions

1. **Legal compliance**: What mechanisms should we implement to ensure we respect site owners' wishes beyond robots.txt?
2. **Rate limiting**: Should we implement a global rate limiter across all crawl jobs or per-domain?
3. **Storage retention**: How long should we keep raw HTML and screenshots?
4. **LLM costs**: Should LLM-assisted extraction be opt-in or automatic for failed extractions?
5. **Multi-tenancy**: Should different users share the same crawled_pages cache or keep separate copies?

---

## 12. Next Steps

1. **Review & Approval**: Stakeholder review of this RFC (1 week)
2. **Detailed Design**: Create detailed technical designs for each component (1 week)
3. **Prototype**: Build Phase 1 prototype with single-page crawling (2 weeks)
4. **Pilot Testing**: Test with 10 diverse websites (1 week)
5. **Full Implementation**: Execute 12-week roadmap (12 weeks)

---

## 13. Appendices

### A. Sample Crawl Configuration

```json
{
  "start_url": "https://example.com",
  "max_pages": 100,
  "max_depth": 3,
  "crawl_type": "recursive",
  "allowed_domains": ["example.com"],
  "exclude_patterns": ["/admin/*", "/api/*"],
  "rate_limit": {
    "requests_per_second": 2,
    "concurrent_requests": 3
  },
  "rendering": {
    "enable_javascript": true,
    "wait_for": "networkidle",
    "timeout": 30000
  },
  "extraction": {
    "strategy": "auto",
    "fallback": "llm"
  }
}
```

### B. Example Domain Template

```javascript
{
  "domain": "medium.com",
  "article": {
    "title": "h1.pw-post-title",
    "content": "article section",
    "author": ".author-name",
    "date": "time",
    "tags": ".tags a"
  }
}
```

---

**Document History**:
- v1.0 (2025-10-09): Initial RFC draft