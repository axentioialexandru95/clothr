interface DrawerHeaderProps {
  onClose: () => void;
}

export default function DrawerHeader({ onClose }: DrawerHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <img
          src={chrome.runtime.getURL('public/logo.png')}
          alt='Clothr'
          style={{
            height: '32px',
            width: 'auto',
            borderRadius: '8px',
          }}
        />
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0,
            }}
          >
            Clothr
          </h1>
        </div>
      </div>
      <button
        type='button'
        onClick={onClose}
        style={{
          width: '32px',
          height: '32px',
          background: 'none',
          border: 'none',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#6b7280',
          fontSize: '20px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.color = '#374151';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = '#6b7280';
        }}
      >
        ✕
      </button>
    </div>
  );
}
