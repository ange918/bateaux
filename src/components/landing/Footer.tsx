export default function Footer() {
  return (
    <footer style={{
      background: 'var(--text)',
      padding: '32px clamp(24px, 6vw, 80px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{
            fontFamily: 'var(--font-kaushan)',
            fontWeight: 400,
            fontSize: 22,
            color: '#fff',
            lineHeight: 1,
          }}>Proforma</span>
          <span style={{
            fontFamily: 'var(--font-kaushan)',
            fontWeight: 400,
            fontSize: 22,
            color: 'var(--gold)',
            lineHeight: 1,
          }}>Africa</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
          marginTop: 6,
        }}>
          L&apos;outil de facturation de l&apos;Afrique francophone.
        </p>
      </div>

      <p style={{
        fontFamily: 'var(--font-montserrat)',
        fontSize: 13,
        color: 'rgba(255,255,255,0.4)',
        margin: 0,
      }}>
        © 2024 ProformaAfrica — Fait par{' '}
        <a
          href="https://angeakonde-dev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Ange Akonde
        </a>
      </p>

    </footer>
  );
}
