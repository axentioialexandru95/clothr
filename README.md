# 🎨 Clothr - AI-Powered Virtual Try-On Chrome Extension

Experience the future of online shopping with Clothr! Our Chrome extension brings AI-powered virtual try-on technology directly to your browser, letting you see how clothes will look on you before you buy.

## ✨ What is Clothr?

Clothr transforms your online shopping experience by using cutting-edge AI to generate realistic photos of you wearing any clothing item you find on the web. No more guessing - see exactly how that shirt, dress, or jacket will look on you!

## 🚀 Key Features

- 🤖 **AI-Powered Virtual Try-On**: Advanced Google Gemini AI creates realistic photos of you wearing selected clothing
- 📱 **One-Click Integration**: Simple floating button appears on shopping sites for instant access
- 🖼️ **Smart Image Selection**: Upload your photo once, then click any clothing image on the page to try it on
- 💾 **Persistent Storage**: Your uploaded photo is saved locally for convenience across sessions
- ⚡ **Lightning Fast**: Optimized with Vite for instant loading and smooth performance
- 🎨 **Beautiful UI**: Clean, modern interface with step-by-step workflow
- 📥 **Download Results**: Save your virtual try-on images directly to your device
- 🔒 **Privacy First**: All processing happens securely through Google's Gemini API

## 🛠️ Technical Stack

- ⚛️ **React + TypeScript**: Type-safe, component-based architecture
- ⚡ **Vite**: Lightning-fast development and optimized production builds
- 🎨 **Inline Styles**: Shadow DOM compatible styling for universal compatibility
- 🤖 **Google Gemini API**: State-of-the-art AI image generation
- 📦 **Chrome Manifest V3**: Latest Chrome extension standards
- 🧹 **ESLint + Prettier**: Automated code formatting and quality assurance

## 🎯 How It Works

1. **Upload Your Photo**: Take or upload a clear photo of yourself
2. **Browse & Select**: Navigate any shopping site and click on clothing items
3. **AI Magic**: Our AI generates a realistic photo of you wearing the selected item
4. **Download & Share**: Save your virtual try-on results

## 📦 Installation & Development

### Prerequisites

- Node.js 18+ and pnpm
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/clothr.git
cd clothr

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint
```

### Loading the Extension

1. Build the extension: `pnpm build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder
5. Configure your Gemini API key in the extension options

## 🔧 Configuration

After installing, click the extension icon and go to Options to:

- Set your Google Gemini API key
- Configure extension preferences
- View usage statistics

## 🏗️ Architecture

Clothr is built with a modular component architecture:

```
src/
├── content/
│   ├── components/          # Reusable UI components
│   │   ├── FloatingButton.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── ClothingSelection.tsx
│   │   └── TryOnResult.tsx
│   └── Content.tsx          # Main content script
├── background/
│   └── index.ts             # Background script with AI integration
├── popup/
│   └── Popup.tsx            # Extension popup interface
└── options/
    └── Options.tsx          # Settings and configuration
```

## 🔐 Privacy & Security

- **Local Storage**: Your photos are stored locally in your browser
- **Secure API**: All AI processing uses Google's secure Gemini API
- **No Tracking**: We don't collect or store any personal data
- **Open Source**: Full transparency with open source code

## 🌟 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines

- Follow the existing code style (ESLint + Prettier configured)
- Add TypeScript types for all new code
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful image generation
- The Chrome extension community for inspiration and guidance
- All contributors and users who make this project better

---

**Ready to revolutionize your online shopping?** Install Clothr today and never wonder "how will this look on me?" again! 🛍️✨
