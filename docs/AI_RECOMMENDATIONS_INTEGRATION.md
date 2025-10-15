# AI-Powered Recommendations & Intelligent Context Switching

## Overview

This document describes the enhanced treatment center map integration with AI-powered recommendations, proactive suggestions, and intelligent context switching based on user queries and intent.

## Architecture

### Components

1. **AI Recommendation Engine** (`ai-universal-processor/index.ts`)
   - `generateMapRecommendations()`: Generates context-aware suggestions
   - `generateContextualInsights()`: Provides personalized insights and warnings

2. **AI Recommendations Panel** (`AIRecommendationsPanel.tsx`)
   - Displays AI-generated suggestions
   - Shows next steps and related queries
   - Highlights warnings and opportunities
   - Supports click actions for filters

3. **Enhanced PublicGenieInterface** (`PublicGenieInterface.tsx`)
   - Integrates recommendations into chat flow
   - Handles recommendation actions
   - Manages related query clicks

## Features

### 1. Proactive Suggestions

The AI analyzes user queries and automatically suggests:

- **Clinical Trial Centers**: When user mentions trials, studies, enrollment
- **Product Availability**: When querying specific drugs or medications
- **Nearby Centers**: When location-based queries are detected
- **NCI-Designated Centers**: When quality/accreditation is important
- **Immediate Availability**: For urgent care scenarios

### 2. Contextual Insights

AI provides:

- **Summary**: Context-aware summary based on domain (healthcare/technology)
- **Key Points**: Important considerations (insurance, eligibility, etc.)
- **Warnings**: Critical notices (urgency, trial requirements, etc.)
- **Opportunities**: Optimization suggestions (use filters, compare centers, etc.)

### 3. Intelligent Context Switching

Based on query analysis:

- **Domain Detection**: Healthcare vs technology context
- **Format Recommendation**: Text, table, list, or map display
- **Urgency Detection**: Prioritizes urgent recommendations
- **Filter Extraction**: Automatically extracts therapeutic area, product, manufacturer, etc.

## User Experience Flow

```mermaid
graph TD
    A[User Query] --> B[AI Triage & Analysis]
    B --> C{Intent Detection}
    C -->|Clinical Trials| D[Trial Center Recommendations]
    C -->|Product Search| E[Product Availability Suggestions]
    C -->|Location Query| F[Nearby Center Recommendations]
    C -->|Urgent Need| G[Immediate Availability Priority]
    D --> H[Display AI Recommendations Panel]
    E --> H
    F --> H
    G --> H
    H --> I[Show Treatment Center Map]
    I --> J[User Interacts with Suggestions]
    J -->|Click Action| K[Apply Filter/Navigate]
    J -->|Click Related Query| L[Send New Query]
