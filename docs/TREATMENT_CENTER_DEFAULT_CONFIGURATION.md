# Treatment Center Map - Default Configuration Guide

## ✅ Current Default Settings (No Breaking Changes)

### 1. **Smart Routing is Always Enabled**
```typescript
enableSmartRouting: true  // ✅ Default in ALL modes
```

**What this means:**
- Treatment center map detection works automatically
- No user configuration needed
- Filters (therapeutic areas, manufacturers, products) populate automatically
- AI recommendations and contextual insights are always generated

### 2. **Works Across ALL AI Modes**

| Mode | Status | Map Support | Filters | Recommendations |
|------|--------|-------------|---------|-----------------|
| **Default (Auto-Select)** | ✅ Active | ✅ Full | ✅ All | ✅ Yes |
| **Single Model** | ✅ Active | ✅ Full | ✅ All | ✅ Yes |
| **Multi-Agent (Chaining)** | ✅ Active | ✅ Full | ✅ All | ✅ Yes |
| **Multi-Agent (Ensemble)** | ✅ Active | ✅ Full | ✅ All | ✅ Yes |
| **Split-Screen** | ✅ Active | ✅ Full | ✅ All | ✅ Yes |

### 3. **Automatic Filter Detection**

The system automatically detects and applies filters from user queries:

**Therapeutic Areas:**
- "CAR-T therapy centers" → filters to `therapeutic_area: CAR-T`
- "Gene therapy hospitals" → filters to `therapeutic_area: Gene Therapy`
- "BMT centers" → filters to `therapeutic_area: BMT`

**Products:**
- "Kymriah treatment centers" → filters to `product: Kymriah`
- "Where can I get Yescarta?" → filters to `product: Yescarta`
- "Zolgensma administration sites" → filters to `product: Zolgensma`

**Manufacturers:**
- "Novartis authorized centers" → filters to `manufacturer: Novartis`
- "Kite Pharma locations" → filters to `manufacturer: Kite`
- "Gilead treatment sites" → filters to `manufacturer: Gilead`

**Location:**
- "Treatment centers in California" → filters to `state: CA`
- "Boston area hospitals" → filters to `city: Boston`
- "Near me in Texas" → filters to `state: TX`

**Insurance Type:**
- "Medicare coverage" → adds `insuranceType: medicare`
- "Commercial insurance pricing" → adds `insuranceType: commercial`
- "340B program" → adds `insuranceType: 340b`

### 4. **Default Metadata Structure**

All responses now use a consistent nested metadata structure:

```typescript
{
  content: "AI response text",
  provider: "lovable",
  model: "google/gemini-2.5-flash",
  metadata: {
    // Treatment center map
    showTreatmentMap: true,
    centerType: "gene_therapy",
    therapeuticArea: "CAR-T",
    product: "Kymriah",
    manufacturer: "Novartis",
    state: "CA",
    city: "San Francisco",
    
    // AI recommendations
    aiRecommendations: {
      suggestions: [...],
      nextSteps: [...],
      relatedQueries: [...]
    },
    
    // Contextual insights
    contextualInsights: {
      summary: "...",
      keyPoints: [...],
      warnings: [...],
      opportunities: [...]
    },
    
    // Smart routing
    triageData: {
      complexity: "medium",
      domain: "healthcare",
      urgency: "medium",
      best_format: "map",
      confidence: 0.85
    }
  }
}
```

### 5. **How To Use Guide**

The guide now shows **every time** a treatment center map is displayed (removed the "show once" restriction):

```typescript
{(message as any).metadata?.showTreatmentMap && (
  <div className="mt-4 space-y-4">
    <HowToUseGuide />  // ✅ Shows every time
    <InteractiveTreatmentCenterMap {...filters} />
  </div>
)}
```

### 6. **Multi-Agent Collaboration Support**

When using multi-agent mode (chaining or ensemble voting):

**Sequential Chaining:**
```
User Query → Specialist Agent → Generalist Agent → Response with Map Metadata
```

**Ensemble Voting:**
```
User Query → Multiple Specialist Agents → Synthesizer → Response with Map Metadata
```

Both modes preserve ALL filter metadata and pass it through correctly.

### 7. **No Configuration Required**

Users don't need to:
- ❌ Enable smart routing manually (it's always on)
- ❌ Configure filters (auto-detected from queries)
- ❌ Set up treatment center detection (automatic)
- ❌ Choose specific modes for map support (works in all)

### 8. **Backward Compatibility**

✅ **Zero breaking changes:**
- Existing conversations continue to work
- Old metadata structure still supported (fallback logic in `useUniversalAI`)
- All features work with or without explicit configuration
- Users who never configured anything will see no difference

### 9. **Mapbox Token Management**

**Default Flow:**
1. Admin sets token once in `app_configuration` table
2. All users automatically use this token
3. Fallback to localStorage if admin token not set
4. User can enter token if neither exists

**No breaking changes:**
- Token only needs to be set once by admin
- Users never need to re-enter token
- Session persistence works automatically

### 10. **Database Query Optimization**

The system now correctly handles the `centerType=all` case:

```typescript
// ✅ CORRECT (current implementation)
if (centerType && centerType !== 'all') {
  query = query.eq('center_type', centerType);
}

// Returns ALL 157 centers when centerType is 'all'
// Returns filtered centers when specific type is selected
```

## Testing Verification

### Test Case 1: Default Mode
```
User: "Where can I get CAR-T therapy in California?"

Expected:
✅ Map displays automatically
✅ Filtered to CAR-T centers
✅ California centers highlighted
✅ HowToUseGuide shows
✅ AI recommendations appear
```

### Test Case 2: Multi-Agent Mode
```
User: "Find Kymriah treatment centers near Boston"

Expected:
✅ Multiple agents collaborate
✅ Consensus response includes map
✅ Filtered to Kymriah centers
✅ Boston area centers shown
✅ All metadata preserved
```

### Test Case 3: Split-Screen Mode
```
User: "Compare gene therapy centers in Texas"

Expected:
✅ Both models show map
✅ Filtered to gene therapy
✅ Texas centers displayed
✅ Recommendations in both panels
```

## Configuration File Locations

All changes are in these files:
1. `supabase/functions/ai-universal-processor/index.ts` (lines 1720-1790, 1945-1991)
2. `src/hooks/useUniversalAI.ts` (lines 15-46, 147-179)
3. `src/components/public-genie/PublicGenieInterface.tsx` (lines 1786-1817)
4. `src/services/treatmentCenterService.ts` (lines 112-120, 193-200)

## Summary

**Everything works by default** with:
- ✅ Zero configuration needed
- ✅ No breaking changes
- ✅ Consistent across all AI modes
- ✅ Automatic filter detection
- ✅ Full metadata support
- ✅ Multi-agent collaboration preserved
- ✅ Treatment center map shows automatically
- ✅ AI recommendations included
- ✅ HowToUseGuide displays every time

---

**Last Updated:** 2025-01-16
**Status:** ✅ Production Ready - Default Configuration Active
