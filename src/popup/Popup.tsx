import { JSX, useEffect, useState } from 'react';

export default function Popup(): JSX.Element {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['geminiApiKey']).then((result) => {
      if (result.geminiApiKey) {
        setApiKey(result.geminiApiKey);
      }
    });
  }, []);

  const handleSave = async () => {
    await chrome.storage.sync.set({ geminiApiKey: apiKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      style={{
        width: '320px',
        padding: '16px',
        background: '#ffffff',
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#3b82f6',
              margin: '0 0 4px 0',
            }}
          >
            ⚙️ Clothr Settings
          </h1>
          <p
            style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: 0,
            }}
          >
            Configure your AI settings
          </p>
        </div>

        {/* API Key Input */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}
          >
            🔑 Google Gemini API Key
          </label>
          <input
            type='password'
            placeholder='Enter your Gemini API key'
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          />
          <p
            style={{
              fontSize: '11px',
              color: '#6b7280',
              margin: '4px 0 0 0',
            }}
          >
            Get your API key from{' '}
            <a
              href='https://makersuite.google.com/app/apikey'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Save Button */}
        <button
          type='button'
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: saved ? '#10b981' : '#3b82f6',
            color: 'white',
          }}
          onClick={handleSave}
          onMouseEnter={(e) => {
            if (!saved) {
              e.currentTarget.style.background = '#2563eb';
            }
          }}
          onMouseLeave={(e) => {
            if (!saved) {
              e.currentTarget.style.background = '#3b82f6';
            }
          }}
        >
          {saved ? '✅ Saved!' : '💾 Save API Key'}
        </button>

        {/* Instructions */}
        <div
          style={{
            background: '#e0f2fe',
            border: '1px solid #b3e5fc',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <div style={{ fontSize: '12px' }}>
            <h3
              style={{
                fontSize: '13px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#0f172a',
              }}
            >
              How to use Clothr:
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                color: '#475569',
              }}
            >
              <div>1. Save your API key above</div>
              <div>2. Visit any website</div>
              <div>3. Look for the 👔 floating button</div>
              <div>4. Upload your photo & select clothing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
