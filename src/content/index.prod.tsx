import { createRoot } from 'react-dom/client';

import Content from './Content';

(function () {
  try {
    // Prevent duplicate injections
    if (document.querySelector('[data-clothr-root]')) {
      return;
    }

    // Create shadow DOM container
    const container = document.createElement('div');
    container.setAttribute('data-clothr-root', 'true');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483640;
    `;

    const shadow = container.attachShadow({ mode: 'open' });
    document.body.appendChild(container);

    const root = createRoot(shadow);
    root.render(<Content />);

    // Mark as injected
    document.body.setAttribute('data-clothr-injected', 'true');
  } catch (error) {
    // Fallback: Create simple HTML button
    const button = document.createElement('button');
    button.innerHTML = '👔';
    button.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #3b82f6;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 999999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.2s;
  `;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', () => {
      // eslint-disable-next-line no-alert
      alert(
        'Clothr extension loaded! Please reload the extension to use full functionality.'
      );
    });

    document.body.appendChild(button);
    console.log('🔄 Clothr: Fallback button created');
  }
})();
