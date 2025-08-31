import React, { useCallback, useRef } from 'react';

interface ImageUploadProps {
  userImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
}

export default function ImageUpload({
  userImage,
  onImageUpload,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick();
      }
    },
    [handleClick]
  );

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
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          }}
        >
          📸
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
            Your Photo
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '2px 0 0 0',
            }}
          >
            Upload a clear photo of yourself
          </p>
        </div>
      </div>

      <div
        role='button'
        tabIndex={0}
        style={{
          border: '2px dashed #d1d5db',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />

        {userImage ? (
          <img
            src={userImage}
            alt='User'
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              objectFit: 'cover',
              border: '3px solid #3b82f6',
              boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)',
            }}
          />
        ) : (
          <>
            <div
              style={{
                fontSize: '32px',
                color: '#9ca3af',
                marginBottom: '8px',
              }}
            >
              📷
            </div>
            <p
              style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0,
              }}
            >
              <span
                style={{
                  color: '#1f2937',
                  fontWeight: '600',
                }}
              >
                Click to upload
              </span>{' '}
              or drag & drop
            </p>
          </>
        )}
      </div>
    </div>
  );
}
