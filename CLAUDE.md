# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm build` - Build the extension for production (TypeScript compilation + Vite build)
- `pnpm lint` - Run ESLint with TypeScript support and report unused disable directives
- `pnpm preview` - Preview the built extension
- **Never run `pnpm dev`** - Development server is already running, only use build commands

## Project Architecture

This is a Chrome Extension (Manifest V3) built with React, TypeScript, and Vite. The extension provides AI-powered virtual try-on functionality for clothing items on any website.

### Core Architecture Components

- **Background Script** (`src/background/index.ts`) - Handles Google Gemini API integration for AI image generation
- **Content Script** (`src/content/Content.tsx`) - Injected into web pages, provides the main UI overlay and clothing selection functionality
- **Popup** (`src/popup/Popup.tsx`) - Extension popup for API key configuration
- **Options Page** (`src/options/Options.tsx`) - Extension settings page

### Key Technical Details

- Uses **Shadow DOM** for content script isolation (`src/utils/createShadowRoot.tsx`)
- **Development vs Production** content scripts:
  - Dev: `src/content/index.dev.tsx` (with HMR support for CSS changes)
  - Prod: `src/content/index.prod.tsx` (optimized build)
- **Chrome Extension APIs**: Uses `activeTab`, `storage` permissions and communicates via `chrome.runtime.sendMessage`
- **AI Integration**: Google Gemini 2.5 Flash Image Preview model for virtual try-on generation

### Styling Architecture

- **Tailwind CSS** + **DaisyUI** for component styling
- **PostCSS** configuration with rem-to-px conversion for extension compatibility
- CSS is injected into shadow roots to avoid conflicts with host pages
- Custom Vite plugin (`touchGlobalCSSPlugin`) for improved CSS HMR during development

### File Structure

```
src/
├── background/     # Service worker for API calls
├── content/        # Content script injected into web pages
├── popup/          # Extension popup interface
├── options/        # Extension options/settings page
├── utils/          # Shared utilities (shadow root creation)
├── assets/         # Fonts and global styles
└── manifest.ts     # Chrome extension manifest configuration
```

## Code Standards

- Never use `eslint-disable-next-line` - fix ESLint issues properly
- Always use proper TypeScript types
- Maintain strict TypeScript configuration (strict mode enabled)
- Use Chrome Extension APIs properly with error handling
- Never use inline css, use tailwind, if it is not working, try to find a way to fix tailwind
- sto
- stop running build, only run lint or type check to test since we already run dev server
