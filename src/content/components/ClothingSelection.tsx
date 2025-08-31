interface ClothingSelectionProps {
  isSelectionMode: boolean;
  selectedClothingImage: string | null;
  onEnableSelectionMode: () => void;
}

export default function ClothingSelection({
  isSelectionMode,
  selectedClothingImage,
  onEnableSelectionMode,
}: ClothingSelectionProps) {
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
            background: 'linear-gradient(135deg, #ec4899, #be185d)',
          }}
        >
          👕
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
            Select Clothing
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '2px 0 0 0',
            }}
          >
            Select clothing from this page
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* DOM Image Selection Button */}
        <button
          type='button'
          onClick={onEnableSelectionMode}
          disabled={isSelectionMode}
          style={{
            width: '100%',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: isSelectionMode ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: isSelectionMode
              ? '#9ca3af'
              : 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            boxShadow: isSelectionMode
              ? 'none'
              : '0 4px 12px rgba(16, 185, 129, 0.4)',
            opacity: isSelectionMode ? 0.7 : 1,
          }}
        >
          {isSelectionMode
            ? '🎯 Click on an image...'
            : '🎯 Select Image from Page'}
        </button>
      </div>

      {selectedClothingImage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <img
            src={selectedClothingImage}
            alt='Selected clothing'
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              objectFit: 'cover',
              border: '3px solid #3b82f6',
              boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
}
