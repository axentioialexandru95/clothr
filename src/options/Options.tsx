import { JSX, useEffect, useState } from 'react';

export default function Options(): JSX.Element {
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
    <div id='my-ext' className='container p-8' data-theme='light'>
      <div className='mx-auto max-w-md'>
        <h1 className='mb-6 text-2xl font-bold'>Clothr Settings</h1>

        <div className='space-y-4'>
          <div>
            <div className='label'>
              <span className='label-text'>Google Gemini API Key</span>
            </div>
            <input
              id='api-key'
              type='password'
              placeholder='Enter your Gemini API key'
              className='input-bordered input w-full'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className='label'>
              <span className='label-text-alt'>
                Get your API key from{' '}
                <a
                  href='https://makersuite.google.com/app/apikey'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link link-primary'
                >
                  Google AI Studio
                </a>
              </span>
            </div>
          </div>

          <button
            type='button'
            className={`btn w-full ${saved ? 'btn-success' : 'btn-primary'}`}
            onClick={handleSave}
          >
            {saved ? 'Saved! ✓' : 'Save API Key'}
          </button>

          <div className='alert alert-info'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='h-6 w-6 shrink-0 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <div>
              <h3 className='font-bold'>How to use Clothr:</h3>
              <div className='text-sm'>
                1. Visit any shopping website
                <br />
                2. Click the 👔 button
                <br />
                3. Upload your photo
                <br />
                4. Click on clothing items to try them on
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
