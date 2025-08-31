import React, { JSX, useCallback, useEffect, useState } from 'react';

import ClothingSelection from './components/ClothingSelection';
import DrawerHeader from './components/DrawerHeader';
import FloatingButton from './components/FloatingButton';
import ImageUpload from './components/ImageUpload';
import TryOnButton from './components/TryOnButton';
import TryOnResult from './components/TryOnResult';

interface ClothrState {
  isSelectionMode: boolean;
  userImage: string | null;
  selectedClothingImage: string | null;
  generatedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}

export default function Content(): JSX.Element {
  const [state, setState] = useState<ClothrState>({
    isSelectionMode: false,
    userImage: null,
    selectedClothingImage: null,
    generatedImage: null,
    isProcessing: false,
    error: null,
  });

  const [showModal, setShowModal] = useState(false);

  // Load saved user image on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('clothr-user-image');
    if (savedImage) {
      setState((prev) => ({
        ...prev,
        userImage: savedImage,
      }));
    }
  }, []);

  // Cleanup selection mode on component unmount and mount
  useEffect(() => {
    // Clean up immediately on mount in case there are leftovers
    const cleanupSelectionMode = () => {
      // Remove instruction overlays
      const instructions = document.querySelectorAll(
        'div[style*="🎯 Click on any image"]'
      );
      instructions.forEach((el) => el.remove());

      // Remove blue outline accessibility message
      const accessibilityMessages = document.querySelectorAll(
        'div[style*="Ajustarea cititirorului"]'
      );
      accessibilityMessages.forEach((el) => el.remove());

      // Remove any blue overlays or selection boxes
      const overlays = document.querySelectorAll(
        'div[style*="position: fixed"][style*="blue"], div[style*="3b82f6"]'
      );
      overlays.forEach((el) => el.remove());

      // Remove outlines from all images
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        img.style.outline = '';
        img.style.boxShadow = '';
        img.style.cursor = '';
      });

      // Remove all event listeners that might be lingering
      const newImages = document.querySelectorAll('img');
      newImages.forEach((img) => {
        img.style.outline = '';
        img.style.boxShadow = '';
        img.style.cursor = '';
        // Clone and replace to remove all event listeners
        const newImg = img.cloneNode(true) as HTMLImageElement;
        img.parentNode?.replaceChild(newImg, img);
      });
    };

    // Clean up on mount
    cleanupSelectionMode();

    // Return cleanup function for unmount
    return cleanupSelectionMode;
  }, []);

  // Debug logging

  console.log('🔥 Clothr Content Script Loaded!');

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          // Save to localStorage
          localStorage.setItem('clothr-user-image', imageData);
          setState((prev) => ({
            ...prev,
            userImage: imageData,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleFileDrop = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      // Save to localStorage
      localStorage.setItem('clothr-user-image', imageData);
      setState((prev) => ({
        ...prev,
        userImage: imageData,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const { files } = e.dataTransfer;
      if (files && files[0] && files[0].type.startsWith('image/')) {
        handleFileDrop(files[0]);
      }
    },
    [handleFileDrop]
  );

  const enableSelectionMode = useCallback(() => {
    setState((prevState) => ({ ...prevState, isSelectionMode: true }));

    // Create instructions
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      font-weight: 600;
      z-index: 2147483647;
      border: 2px solid #3b82f6;
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
    `;
    instructions.innerHTML =
      '🎯 Click on any image on the page • Press ESC to cancel';

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();

        const img = target as HTMLImageElement;
        setState((prev) => ({
          ...prev,
          selectedClothingImage: img.src,
          isSelectionMode: false,
        }));
        cleanup();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'IMG') {
        target.style.outline = '3px solid #3b82f6';
        target.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';
        target.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'IMG') {
        target.style.outline = '';
        target.style.boxShadow = '';
        target.style.cursor = '';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState((prev) => ({ ...prev, isSelectionMode: false }));
        cleanup();
      }
    };

    const cleanup = () => {
      // Remove instructions overlay
      if (instructions && instructions.parentNode) {
        instructions.remove();
      }

      // Remove all event listeners
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('keydown', handleKeyDown);

      // Clear all image outlines immediately
      const allImages = document.querySelectorAll('img');
      allImages.forEach((img) => {
        (img as HTMLImageElement).style.outline = '';
        (img as HTMLImageElement).style.boxShadow = '';
        (img as HTMLImageElement).style.cursor = '';
      });

      // Remove any accessibility overlays that might have been created
      const accessibilityMessages = document.querySelectorAll(
        'div[style*="Ajustarea cititirorului"], div[style*="position: fixed"][style*="blue"]'
      );
      accessibilityMessages.forEach((el) => el.remove());
    };

    document.body.appendChild(instructions);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  // Helper function to convert URL to base64
  const convertUrlToBase64 = async (url: string): Promise<string> => {
    try {
      console.log('🌐 Fetching image from URL:', url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          if (!dataUrl) {
            reject(new Error('Failed to convert image to base64'));
            return;
          }
          console.log('✅ Successfully converted URL to base64');
          resolve(dataUrl);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read image blob'));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('❌ Error converting URL to base64:', error);
      throw new Error(
        `Failed to load image from URL: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const generateTryOn = async () => {
    if (!state.userImage || !state.selectedClothingImage) {
      console.error('❌ Missing required images:', {
        hasUserImage: !!state.userImage,
        hasClothingImage: !!state.selectedClothingImage,
      });
      setState((prev) => ({
        ...prev,
        error:
          'Please ensure you have uploaded your photo and selected clothing.',
      }));
      return;
    }

    console.log('🚀 Starting try-on generation...');
    console.log('📊 State check:', {
      hasUserImage: !!state.userImage,
      hasClothingImage: !!state.selectedClothingImage,
      userImageLength: state.userImage?.length,
      clothingImageUrl: state.selectedClothingImage,
    });

    setState((prev) => ({ ...prev, isProcessing: true, error: null }));

    try {
      // Process clothing image if it's a URL
      let clothingImageData = state.selectedClothingImage;
      if (state.selectedClothingImage.startsWith('http')) {
        console.log('🔄 Converting clothing image URL to base64...');
        clothingImageData = await convertUrlToBase64(
          state.selectedClothingImage
        );
      }

      console.log('📤 Sending message to background script...');
      const response = await chrome.runtime.sendMessage({
        action: 'generateTryOn',
        userImage: state.userImage,
        clothingImage: clothingImageData,
      });

      console.log('📥 Response from background:', response);

      if (!response) {
        console.error('❌ No response from background script');
        setState((prev) => ({
          ...prev,
          error:
            'Extension error: No response from background script. Please check if the extension is properly installed.',
        }));
        setState((prev) => ({ ...prev, isProcessing: false }));
        return;
      }

      if (response.error) {
        console.error('❌ API Error:', response.error);

        // Show user-friendly error message
        const errorMessage = response.error;
        let displayMessage = errorMessage;

        // Format specific common errors
        if (
          errorMessage.includes('quota exceeded') ||
          errorMessage.includes('Rate limit exceeded')
        ) {
          displayMessage = `⚠️ ${errorMessage}\n\n💡 Tip: The Gemini API has usage limits. Try again in a few minutes.`;
        } else if (errorMessage.includes('Invalid API key')) {
          displayMessage = `🔑 ${errorMessage}\n\n💡 Tip: Go to extension settings to update your API key.`;
        } else if (errorMessage.includes('Model not found')) {
          displayMessage = `🤖 ${errorMessage}\n\n💡 Tip: The image generation model might be temporarily unavailable.`;
        } else if (
          errorMessage.includes('too large') ||
          errorMessage.includes('compress')
        ) {
          displayMessage = `📸 ${errorMessage}\n\n💡 Tip: Try using smaller or lower resolution images.`;
        }

        setState((prev) => ({ ...prev, error: displayMessage }));
        setState((prev) => ({ ...prev, isProcessing: false }));
        return;
      }

      if (response.imageUrl) {
        console.log('✅ Try-on generated successfully');
        setState((prev) => ({
          ...prev,
          generatedImage: response.imageUrl,
          isProcessing: false,
        }));
      } else {
        console.error('❌ No image URL in response');
        setState((prev) => ({
          ...prev,
          error: 'No image was generated. Please try again.',
        }));
        setState((prev) => ({ ...prev, isProcessing: false }));
      }
    } catch (error) {
      console.error('❌ Error generating try-on:', error);
      if (error instanceof Error) {
        if (error.message.includes('Could not establish connection')) {
          setState((prev) => ({
            ...prev,
            error:
              'Extension error: Could not connect to background script. Please reload the extension.',
          }));
        } else {
          setState((prev) => ({ ...prev, error: `Error: ${error.message}` }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          error: 'Unknown error occurred. Please try again.',
        }));
      }
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Show on all sites for testing
  const isShoppingSite = () => true; // Always show for testing

  if (!isShoppingSite()) {
    return <div />;
  }

  return (
    <>
      {!showModal && (
        <FloatingButton
          onClick={() => {
            console.log('🎯 Clothr button clicked!');
            setShowModal(true);
          }}
        />
      )}

      {showModal && (
        <>
          {/* Right Drawer */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              height: '100vh',
              background: '#ffffff',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
              zIndex: 2147483646,
              overflowY: 'auto',
              animation: 'slideInRight 0.2s ease-out',
              pointerEvents: 'auto',
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            <style>
              {`
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to { transform: translateX(0); }
                }
              `}
            </style>

            <div
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <DrawerHeader onClose={handleCloseModal} />

              {/* Main Content - Connected Steps */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px',
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  flex: '0 0 auto',
                  marginBottom: '16px',
                }}
              >
                {/* Step 1 - User Photo */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '-8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: state.userImage
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : '#d1d5db',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      zIndex: 10,
                      border: '2px solid white',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    1
                  </div>
                  <ImageUpload
                    userImage={state.userImage}
                    onImageUpload={handleImageUpload}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  />
                </div>

                {/* Step 2 - Clothing Selection */}
                <div style={{ position: 'relative' }}>
                  {/* Separator Line */}
                  <div
                    style={{
                      height: '1px',
                      background:
                        'linear-gradient(to right, transparent, #e5e7eb, transparent)',
                      margin: '0 24px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '-12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: state.selectedClothingImage
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : state.userImage
                          ? 'linear-gradient(135deg, #ec4899, #be185d)'
                          : '#d1d5db',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      zIndex: 10,
                      border: '2px solid white',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    2
                  </div>
                  <ClothingSelection
                    isSelectionMode={state.isSelectionMode}
                    selectedClothingImage={state.selectedClothingImage}
                    onEnableSelectionMode={enableSelectionMode}
                  />
                </div>

                {/* Step 3 - Try On */}
                <div
                  style={{
                    position: 'relative',
                    opacity:
                      state.userImage && state.selectedClothingImage ? 1 : 0.4,
                  }}
                >
                  {/* Separator Line */}
                  <div
                    style={{
                      height: '1px',
                      background:
                        'linear-gradient(to right, transparent, #e5e7eb, transparent)',
                      margin: '0 24px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '-12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: state.generatedImage
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : state.userImage && state.selectedClothingImage
                          ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                          : '#d1d5db',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      zIndex: 10,
                      border: '2px solid white',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    3
                  </div>
                  <TryOnButton
                    isProcessing={state.isProcessing}
                    onClick={generateTryOn}
                  />
                  {/* Connection Line */}
                  {state.generatedImage && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '31px',
                        bottom: '0px',
                        width: '2px',
                        height: '2px',
                        background:
                          'linear-gradient(to bottom, #f59e0b, #10b981)',
                        zIndex: 5,
                      }}
                    />
                  )}
                </div>

                {/* Loading State */}
                {state.isProcessing && !state.generatedImage && (
                  <div style={{ position: 'relative', marginTop: '0px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '-8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        zIndex: 10,
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        animation: 'pulse 2s infinite',
                      }}
                    >
                      <span style={{ animation: 'spin 2s linear infinite' }}>
                        🔄
                      </span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '40px 24px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ marginBottom: '24px' }}>
                        <div
                          style={{
                            fontSize: '48px',
                            marginBottom: '16px',
                            animation: 'spin 3s linear infinite',
                          }}
                        >
                          ✨
                        </div>
                        <h3
                          style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0 0 8px 0',
                          }}
                        >
                          Creating Your Try-On
                        </h3>
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: 0,
                            lineHeight: '1.5',
                          }}
                        >
                          Our AI is working its magic to show you how the
                          clothing will look on you. This may take a few
                          moments...
                        </p>
                      </div>

                      {/* Progress dots */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '8px',
                          marginTop: '20px',
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#f59e0b',
                              animation: `bounce 1.4s infinite both`,
                              animationDelay: `${i * 0.16}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <style>
                      {`
                        @keyframes spin {
                          from { transform: rotate(0deg); }
                          to { transform: rotate(360deg); }
                        }
                        @keyframes pulse {
                          0%, 100% { opacity: 1; }
                          50% { opacity: 0.5; }
                        }
                        @keyframes bounce {
                          0%, 80%, 100% {
                            transform: scale(0);
                            opacity: 0.5;
                          }
                          40% {
                            transform: scale(1);
                            opacity: 1;
                          }
                        }
                      `}
                    </style>
                  </div>
                )}

                {/* Result */}
                {state.generatedImage && (
                  <div style={{ position: 'relative', marginTop: '0px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '-8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        zIndex: 10,
                        border: '2px solid white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      ✓
                    </div>
                    <TryOnResult
                      generatedImage={state.generatedImage}
                      onTryAgain={() => {
                        setState((prev) => ({
                          ...prev,
                          generatedImage: null,
                          selectedClothingImage: null,
                          isProcessing: false,
                        }));
                      }}
                    />
                  </div>
                )}

                {/* Error Display */}
                {state.error && (
                  <div
                    style={{
                      background: 'rgba(254, 242, 242, 0.95)',
                      border: '1px solid rgba(248, 113, 113, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        color: '#dc2626',
                        lineHeight: 1,
                      }}
                    >
                      ⚠️
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '14px',
                          color: '#dc2626',
                          fontWeight: '500',
                          marginBottom: '4px',
                        }}
                      >
                        Error
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#7f1d1d',
                          lineHeight: '1.4',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {state.error}
                      </div>
                    </div>
                    <button
                      type='button'
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        color: '#dc2626',
                        cursor: 'pointer',
                        padding: '0',
                        lineHeight: 1,
                      }}
                      onClick={() =>
                        setState((prev) => ({ ...prev, error: null }))
                      }
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
