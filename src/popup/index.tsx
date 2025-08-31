import { createRoot } from 'react-dom/client';

import Popup from './Popup';

const container = document.getElementById('my-ext-popup-page');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}
