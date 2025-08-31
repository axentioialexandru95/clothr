interface TryOnResultProps {
  generatedImage: string;
  onTryAgain?: () => void;
}

export default function TryOnResult({
  generatedImage,
  onTryAgain,
}: TryOnResultProps) {
  const handleDownload = () => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `clothr-try-on-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image:', error);
      // Fallback: open image in new tab
      window.open(generatedImage, '_blank');
    }
  };

  const handleLoveIt = () => {
    // Open Buy Me a Coffee page
    window.open(
      'https://www.buymeacoffee.com/thejsdude',
      '_blank',
      'noopener,noreferrer'
    );
  };
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        marginTop: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
          }}
        >
          🎉
        </div>
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0,
            }}
          >
            Your Try-On Result
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '2px 0 0 0',
            }}
          >
            AI-generated virtual try-on
          </p>
        </div>
      </div>

      <div
        style={{
          marginBottom: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={generatedImage}
          alt='Try-on result'
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '12px',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        <button
          type='button'
          onClick={handleDownload}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 16px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          <span>📥</span>
          <span>Download</span>
        </button>
        <button
          type='button'
          onClick={handleLoveIt}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 16px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}
        >
          <span>❤️</span>
          <span>Love It</span>
        </button>
        {onTryAgain && (
          <button
            type='button'
            onClick={onTryAgain}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '14px',
              border: '2px solid #d1d5db',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              color: '#6b7280',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.color = '#374151';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>🔄</span>
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}
