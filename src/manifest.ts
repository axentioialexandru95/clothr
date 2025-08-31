import { defineManifest } from '@crxjs/vite-plugin';

import packageData from '../package.json';

const isDev = process.env.NODE_ENV === 'development';

export default defineManifest({
  manifest_version: 3,
  name: `${packageData.displayName || packageData.name}${
    isDev ? ` ➡️ Dev` : ''
  }`,
  version: packageData.version,
  description: packageData.description,
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  options_page: 'src/options/index.html',
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: {
      16: 'logo.png',
      32: 'logo.png',
      48: 'logo.png',
      128: 'logo.png',
    },
  },
  icons: {
    16: 'logo.png',
    32: 'logo.png',
    48: 'logo.png',
    128: 'logo.png',
  },
  permissions: ['activeTab', 'storage', 'desktopCapture'],
  host_permissions: ['*://*/*'],
  content_scripts: [
    {
      js: isDev
        ? ['src/content/index.dev.tsx']
        : ['src/content/index.prod.tsx'],
      matches: ['<all_urls>'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', 'public/*'],
      matches: ['<all_urls>'],
    },
  ],
});
