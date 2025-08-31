export default function BuyMeCoffeeButton() {
  return (
    <a
      href='https://www.buymeacoffee.com/thejsdude'
      target='_blank'
      rel='noopener noreferrer'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '14px',
        border: '2px solid #8b5cf6',
        background: 'transparent',
        color: '#8b5cf6',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        marginTop: '16px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#8b5cf6';
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#8b5cf6';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ fontSize: '16px' }}>❤️</span>
      <span>Love it</span>
    </a>
  );
}
