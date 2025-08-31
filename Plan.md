# Clothr Extension - AI Clothing Try-On Plan

## Project Overview

Clothr is a browser extension that allows users to virtually try on clothing items from e-commerce websites using AI image generation. Users upload their photo, select clothing from any shopping site, and generate realistic try-on images using Google Gemini AI.

## Current Status ✅

The extension is **95% complete** with a fully functional architecture:

### ✅ Completed Features

- **Extension Structure**: Manifest v3, React + TypeScript, Tailwind CSS
- **Content Script**: Injects UI overlay on shopping sites
- **Photo Upload**: File input with preview functionality
- **Clothing Selection**: Interactive overlay to select clothing items from pages
- **Background Service**: Handles API communication
- **Options Page**: API key configuration interface
- **Storage**: Chrome storage for API key management
- **UI/UX**: Complete modal interface with DaisyUI components

### 🔄 Current Implementation Issue

The current Gemini API implementation uses text generation instead of image generation. Gemini's text generation API cannot create new images - it can only analyze existing images.

## Technical Architecture

### Components

```
src/
├── content/Content.tsx     # Main UI modal and clothing selection
├── background/index.ts     # API calls and message handling
├── options/Options.tsx     # Settings page for API key
├── popup/                  # Extension popup (minimal)
└── manifest.ts            # Extension permissions and config
```

### Data Flow

1. **User Action**: Clicks Clothr button on shopping site
2. **Photo Upload**: User selects their image via file input
3. **Clothing Selection**: Interactive overlay highlights selectable images
4. **API Call**: Background script processes images with Gemini
5. **Result Display**: Generated try-on image shown in modal

### Permissions

- `activeTab`: Access current website content
- `storage`: Save API key
- `host_permissions`: All URLs for content script injection

## Implementation Plan

### Phase 1: Fix AI Integration 🚨

**Priority: Critical**

**Issue**: Current code tries to use Gemini for image generation, but Gemini doesn't generate images from prompts.

**Solutions**:

1. **Option A - Image Analysis (Recommended)**: Use Gemini to analyze compatibility and provide recommendations
2. **Option B - Alternative Service**: Integrate with image generation APIs (Stable Diffusion, DALL-E)
3. **Option C - Local Processing**: Use client-side image compositing

**Recommended Approach**: Switch to image analysis mode where Gemini:

- Analyzes clothing compatibility with user's body type
- Provides size/fit recommendations
- Suggests styling tips
- Rates how well the item would look (1-10 score)

### Phase 2: Enhanced Features 🎯

- **Saved Looks**: Store favorite try-on results
- **Shopping Integration**: Direct purchase links
- **Size Recommendations**: ML-based size suggestions
- **Style Matching**: Find similar items across sites

### Phase 3: Performance Optimization ⚡

- **Image Processing**: Optimize file sizes before API calls
- **Caching**: Store results to avoid duplicate API calls
- **Rate Limiting**: Handle API quota management

## Key Files to Modify

### 1. `src/background/index.ts`

```typescript
// Change from image generation to image analysis
const prompt = `Analyze this person and clothing item. Provide:
1. Compatibility score (1-10)
2. Size recommendation
3. Style notes
4. Fit assessment`;
```

### 2. `src/content/Content.tsx`

```typescript
// Update UI to show analysis instead of generated image
{response.analysis && (
  <div className="analysis-result">
    <div className="score">Match: {response.score}/10</div>
    <div className="recommendations">{response.recommendations}</div>
  </div>
)}
```

## Next Steps

### Immediate (Today)

1. **Update API Implementation**: Switch from image generation to analysis
2. **Test Workflow**: Verify complete user journey works
3. **Error Handling**: Improve error messages and fallbacks

### Short Term (This Week)

1. **User Testing**: Get feedback on analysis vs image generation
2. **Site Compatibility**: Test on major e-commerce platforms
3. **Performance**: Optimize image processing pipeline

### Long Term (Next Month)

1. **Advanced Features**: Saved looks, shopping integration
2. **Analytics**: Usage tracking and optimization
3. **Store Publishing**: Prepare for Chrome Web Store

## Success Metrics

- **Functionality**: 100% of core workflow works end-to-end
- **Compatibility**: Works on top 10 e-commerce sites
- **Performance**: < 5 second response time for analysis
- **User Experience**: Intuitive interface with clear feedback

## Risk Assessment

- **API Limits**: Gemini has rate limits and costs per request
- **Image Quality**: User photos may be low quality or unsuitable
- **Site Changes**: E-commerce sites may update layouts breaking selection
- **Privacy**: Ensure user images are not stored or logged

## Deployment

- **Development**: Local testing with `pnpm dev`
- **Build**: `pnpm build` creates extension files
- **Install**: Load unpacked extension for testing
- **Distribution**: Chrome Web Store after final testing

---

_This plan reflects the current state where the extension is nearly complete but needs the AI integration corrected from impossible image generation to practical image analysis._
