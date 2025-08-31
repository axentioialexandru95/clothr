import { GoogleGenAI } from '@google/genai';

async function getApiKey(): Promise<string | null> {
  try {
    const result = await chrome.storage.sync.get(['geminiApiKey']);
    return result.geminiApiKey || null;
  } catch (error) {
    console.error('Error getting API key:', error);
    return null;
  }
}

// Note: Image processing moved to content script due to DOM API limitations in background script

async function generateTryOnImage(
  userImage: string,
  clothingImage: string
): Promise<string> {
  try {
    console.log('🔍 Debug - Input parameters:', {
      userImageType: typeof userImage,
      clothingImageType: typeof clothingImage,
      userImageExists: !!userImage,
      clothingImageExists: !!clothingImage,
      userImageLength: userImage?.length,
      clothingImageLength: clothingImage?.length,
    });

    const apiKey = await getApiKey();
    if (!apiKey) {
      throw new Error(
        'Gemini API key not configured. Please set it in the extension options.'
      );
    }

    const genai = new GoogleGenAI({
      apiKey,
    });

    const model = 'gemini-2.5-flash-image-preview';
    const prompt = `Based on these reference images, create a realistic photo showing the person wearing the clothing item. 
    Make it look like a natural photo with the person actually wearing the clothes. 
    Keep the person's face, body proportions, and overall pose similar to their original photo.
    Ensure realistic lighting, shadows, and fabric appearance.`;

    // Both images should now be base64 data URLs (processed in content script)
    if (!userImage || !clothingImage) {
      console.error('❌ Missing image data:', {
        userImage: !!userImage,
        clothingImage: !!clothingImage,
      });
      throw new Error('Missing image data');
    }

    if (!userImage.startsWith('data:') || !clothingImage.startsWith('data:')) {
      console.error('❌ Images must be base64 data URLs');
      throw new Error(
        'Invalid image format - both images must be base64 data URLs'
      );
    }

    // Extract base64 data from data URLs
    const userImageParts = userImage.split(',');
    const clothingImageParts = clothingImage.split(',');

    if (userImageParts.length < 2 || clothingImageParts.length < 2) {
      throw new Error('Invalid image data format');
    }

    const userImageBase64 = userImageParts[1];
    const clothingImageBase64 = clothingImageParts[1];

    if (!userImageBase64 || !clothingImageBase64) {
      throw new Error('Invalid base64 image data');
    }

    console.log('🚀 Starting Gemini API image generation...');
    console.log('📊 Image data sizes:', {
      userImageSize: userImageBase64.length,
      clothingImageSize: clothingImageBase64.length,
    });

    // Use the streaming API with proper image input format
    const response = await genai.models.generateContentStream({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: userImageBase64,
                mimeType: 'image/jpeg',
              },
            },
            {
              inlineData: {
                data: clothingImageBase64,
                mimeType: 'image/jpeg',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    for await (const chunk of response) {
      if (chunk.candidates && chunk.candidates[0]?.content?.parts) {
        for (const part of chunk.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log('✅ Image generated successfully');
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }

    throw new Error('No image generated from Gemini API');
  } catch (error) {
    console.error('Error generating try-on image:', error);

    // Parse and format error messages for better user experience
    let userFriendlyMessage = 'Unknown error occurred';

    if (error instanceof Error) {
      const errorMessage = error.message;

      // Try to parse nested JSON error messages
      try {
        if (errorMessage.includes('"error"')) {
          const errorMatch = errorMessage.match(/\{[\s\S]*\}/);
          if (errorMatch) {
            const parsedError = JSON.parse(errorMatch[0]);
            if (parsedError.error) {
              const apiError = parsedError.error;

              // Handle specific error codes
              if (apiError.code === 429) {
                userFriendlyMessage = `Rate limit exceeded: ${apiError.message}`;

                // Extract quota details for more specific message
                if (
                  apiError.details &&
                  apiError.details[0] &&
                  apiError.details[0]['@type']?.includes('QuotaFailure')
                ) {
                  const violations = apiError.details[0].violations || [];
                  if (violations.length > 0) {
                    const quotaType = violations[0].quotaId;
                    if (quotaType.includes('FreeTier')) {
                      userFriendlyMessage =
                        'Free tier quota exceeded. Please wait before trying again or upgrade your API plan.';
                    } else if (quotaType.includes('PerMinute')) {
                      userFriendlyMessage =
                        'Rate limit exceeded. Please wait a minute before trying again.';
                    } else if (quotaType.includes('PerDay')) {
                      userFriendlyMessage =
                        'Daily quota exceeded. Please try again tomorrow or upgrade your API plan.';
                    }
                  }
                }
              } else if (apiError.code === 400) {
                if (
                  apiError.message.includes('token count exceeds') ||
                  apiError.message.includes('maximum number of tokens')
                ) {
                  userFriendlyMessage =
                    'Images are too large or complex. Please try with smaller images or compress them first.';
                } else {
                  userFriendlyMessage = `Invalid request: ${apiError.message}`;
                }
              } else if (apiError.code === 401) {
                userFriendlyMessage =
                  'Invalid API key. Please check your Gemini API key in the extension settings.';
              } else if (apiError.code === 403) {
                userFriendlyMessage =
                  'Access denied. Please check your API key permissions.';
              } else if (apiError.code === 404) {
                userFriendlyMessage =
                  'Model not found. The requested model may not be available.';
              } else {
                userFriendlyMessage = `API Error (${apiError.code}): ${apiError.message}`;
              }
            }
          }
        } else {
          userFriendlyMessage = errorMessage;
        }
      } catch (parseError) {
        // If JSON parsing fails, use original error message
        userFriendlyMessage = errorMessage;
      }
    }

    throw new Error(userFriendlyMessage);
  }
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('🎯 Background script received message:', request);

  if (request.action === 'generateTryOn') {
    console.log('🚀 Processing generateTryOn request...');

    generateTryOnImage(request.userImage, request.clothingImage)
      .then((result) => {
        console.log('✅ Successfully generated image');
        sendResponse({ imageUrl: result });
      })
      .catch((error) => {
        console.error('❌ Error in background script:', error);
        sendResponse({ error: error.message });
      });
    return true;
  }

  console.log('ℹ️ Unknown action:', request.action);
  return undefined;
});

export {};
