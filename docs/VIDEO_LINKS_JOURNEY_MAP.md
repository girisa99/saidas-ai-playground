# Video Links in Journey Maps - Technical Documentation

## Overview
Journey maps support embedded video links as resources in each step. These links open in a new tab when clicked, providing users with additional learning resources without leaving the conversation flow.

## Implementation

### Journey Map Data Structure
```json
{
  "title": "Kymriah Patient Treatment Journey",
  "context": "healthcare",
  "steps": [
    {
      "id": "step-4",
      "title": "Cell Manufacturing",
      "description": "Your T-cells are genetically modified...",
      "status": "upcoming",
      "icon": "Pill",
      "resources": [
        {
          "label": "How Kymriah is Made",
          "url": "https://www.youtube.com/watch?v=ffo-1-pSxxU",
          "type": "video"
        }
      ]
    }
  ]
}
```

### Resource Types Supported
- `video`: YouTube or video URLs (displays 🎥 icon)
- `pdf`: PDF documents (displays 📄 icon)
- `link`: General web links (displays 🔗 icon)

### Frontend Rendering
Resources are rendered in `src/components/public-genie/VisualJourneyMap.tsx` (lines 165-181):

```tsx
{step.resources && step.resources.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {step.resources.map((resource, idx) => (
      <a
        key={idx}
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
      >
        <span>{getResourceIcon(resource.type)}</span>
        <span>{resource.label}</span>
      </a>
    ))}
  </div>
)}
```

### Security Attributes
All external links include:
- `target="_blank"`: Opens in new tab
- `rel="noopener noreferrer"`: Prevents security vulnerabilities

## AI Generation Pattern

When generating journey maps with video resources, use this format:

```json
"resources": [
  { 
    "label": "How Kymriah is Made", 
    "url": "https://www.youtube.com/watch?v=ffo-1-pSxxU", 
    "type": "video" 
  }
]
```

## Troubleshooting

### Videos Not Opening?
1. **Check URL format**: Ensure URLs are complete with `https://`
2. **Verify JSON structure**: Resources must be in `resources` array with correct properties
3. **Browser popup blockers**: Some browsers may block new tabs - users should allow popups
4. **Network issues**: Video platform (YouTube, etc.) must be accessible

### Common Issues
- Missing `target="_blank"`: Links won't open in new tab
- Invalid URL: Link appears but doesn't work when clicked
- Wrong resource type: Icon may not match content

## Testing
To test video links:
1. Ask Genie for a treatment journey (e.g., "Show me the Kymriah treatment journey")
2. Verify journey map appears with video resources
3. Click video link - should open in new tab
4. Confirm video loads correctly

## Related Files
- `src/components/public-genie/VisualJourneyMap.tsx` - Journey map rendering
- `src/components/public-genie/RichResponseRenderer.tsx` - Journey map parsing
- `supabase/functions/ai-universal-processor/index.ts` - AI response generation

## Status
✅ **Implemented and Working**
- Video links render correctly
- Open in new tab with security attributes
- Support for multiple resource types
- Icon differentiation by type
