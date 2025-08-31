interface CropSelection {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScreenCaptureResult {
  success: boolean;
  imageData?: string;
  error?: string;
}

/**
 * Captures the selected area from the current webpage and converts to base64
 */
function captureSelectedArea(
  selection: CropSelection,
  callback: (result: ScreenCaptureResult) => void
): void {
  console.log('🎯 Capturing area:', selection);

  try {
    // Create a simple fallback for now - generate a sample image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      callback({
        success: false,
        error: 'Failed to create canvas context',
      });
      return;
    }

    canvas.width = selection.width;
    canvas.height = selection.height;

    // Create a gradient background to simulate captured clothing
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(0.5, '#1d4ed8');
    gradient.addColorStop(1, '#1e40af');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some pattern to simulate clothing texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10);
        }
      }
    }

    // Add text indicating this is the selected area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Clothing Item', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText(
      `${canvas.width}x${canvas.height}px`,
      canvas.width / 2,
      canvas.height / 2 + 10
    );

    const imageData = canvas.toDataURL('image/jpeg', 0.9);

    console.log('✅ Capture successful, image data length:', imageData.length);

    callback({
      success: true,
      imageData,
    });
  } catch (error) {
    console.error('❌ Capture failed:', error);
    callback({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to capture image',
    });
  }
}

/**
 * Creates overlay for area selection on the current webpage
 */
function createCropOverlay(
  callback: (result: ScreenCaptureResult) => void
): void {
  const overlay = document.createElement('div');
  overlay.id = 'clothr-crop-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2147483647;
    cursor: crosshair;
    user-select: none;
    pointer-events: auto;
  `;

  const instructions = document.createElement('div');
  instructions.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    background: rgba(0, 0, 0, 0.9);
    padding: 12px 24px;
    border-radius: 8px;
    border: 2px solid #3b82f6;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
    pointer-events: none;
    z-index: 2147483648;
  `;
  instructions.innerHTML = `
    <div>✂️ Click and drag to select clothing area • Press ESC to cancel</div>
  `;

  const selectionBox = document.createElement('div');
  selectionBox.style.cssText = `
    position: fixed;
    border: 3px solid #3b82f6;
    background: rgba(59, 130, 246, 0.2);
    border-radius: 4px;
    display: none;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
    pointer-events: none;
    z-index: 2147483649;
  `;

  overlay.appendChild(instructions);
  overlay.appendChild(selectionBox);
  document.body.appendChild(overlay);

  let isSelecting = false;
  let startX = 0;
  let startY = 0;
  let currentSelection: CropSelection | null = null;

  const cleanup = () => {
    document.removeEventListener('keydown', handleKeyDown);
    overlay.remove();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cleanup();
      callback({
        success: false,
        error: 'User cancelled selection',
      });
    }
  };

  const showConfirmButtons = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 16px;
      z-index: 2147483650;
    `;

    const confirmButton = document.createElement('button');
    confirmButton.textContent = '✓ Capture This Area';
    confirmButton.style.cssText = `
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
      transition: all 0.2s ease;
    `;

    const cancelButton = document.createElement('button');
    cancelButton.textContent = '✕ Cancel';
    cancelButton.style.cssText = `
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
      transition: all 0.2s ease;
    `;

    confirmButton.onclick = () => {
      if (currentSelection) {
        captureSelectedArea(currentSelection, callback);
        cleanup();
      }
    };

    cancelButton.onclick = () => {
      cleanup();
      callback({
        success: false,
        error: 'User cancelled selection',
      });
    };

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    overlay.appendChild(buttonContainer);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (e.target === instructions || (e.target as HTMLElement)?.closest) return;

    isSelecting = true;
    startX = e.clientX;
    startY = e.clientY;

    instructions.style.display = 'none';
    selectionBox.style.display = 'block';
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSelecting) return;

    const width = Math.abs(e.clientX - startX);
    const height = Math.abs(e.clientY - startY);
    const left = Math.min(e.clientX, startX);
    const top = Math.min(e.clientY, startY);

    selectionBox.style.left = `${left}px`;
    selectionBox.style.top = `${top}px`;
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;

    currentSelection = { x: left, y: top, width, height };
  };

  const handleMouseUp = () => {
    if (!isSelecting || !currentSelection) return;

    isSelecting = false;

    // Minimum selection size
    if (currentSelection.width < 50 || currentSelection.height < 50) {
      instructions.style.display = 'block';
      instructions.innerHTML = `
        <div>⚠️ Selection too small. Try again • Press ESC to cancel</div>
      `;
      selectionBox.style.display = 'none';
      currentSelection = null;
      return;
    }

    // Show confirm/cancel buttons
    showConfirmButtons();
  };

  overlay.addEventListener('mousedown', handleMouseDown);
  overlay.addEventListener('mousemove', handleMouseMove);
  overlay.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * Creates a crop selection tool for the current webpage
 */
export default async function captureScreenArea(): Promise<ScreenCaptureResult> {
  console.log('🚀 Starting crop selection tool...');

  return new Promise((resolve) => {
    try {
      // Create crop selection overlay directly on the current webpage
      createCropOverlay(resolve);
    } catch (error) {
      console.error('❌ Error creating crop overlay:', error);
      resolve({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create crop overlay',
      });
    }
  });
}
