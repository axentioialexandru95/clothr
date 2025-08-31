interface TryOnButtonProps {
  isProcessing: boolean;
  onClick: () => void;
}

export default function TryOnButton({
  isProcessing,
  onClick,
}: TryOnButtonProps) {
  return (
    <div
      style={{
        padding: '24px 24px 16px 24px',
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
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          }}
        >
          ✨
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
            Try On Magic
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '2px 0 0 0',
            }}
          >
            Generate your virtual try-on
          </p>
        </div>
      </div>

      <button
        type='button'
        onClick={onClick}
        disabled={isProcessing}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          border: 'none',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: isProcessing
            ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
            : 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          boxShadow: isProcessing
            ? 'none'
            : '0 2px 8px rgba(245, 158, 11, 0.3)',
          opacity: isProcessing ? 0.8 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow =
              '0 4px 12px rgba(245, 158, 11, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isProcessing) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 2px 8px rgba(245, 158, 11, 0.3)';
          }
        }}
      >
        <span
          style={{
            fontSize: '16px',
            animation: isProcessing ? 'spin 2s linear infinite' : 'none',
          }}
        >
          {isProcessing ? '🔄' : '✨'}
        </span>
        <span>{isProcessing ? 'Creating your try-on...' : 'Try It On!'}</span>
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </button>
    </div>
  );
}
