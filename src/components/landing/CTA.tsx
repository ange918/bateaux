import Link from 'next/link';

export default function CTA() {
  return (
    <section style={{
      padding: 'clamp(80px, 14vh, 140px) clamp(24px, 6vw, 80px)',
      background: 'var(--green)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 300,
        height: 300,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -100,
        left: -60,
        width: 250,
        height: 250,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 16,
        }}>
          PRÊT À COMMENCER ?
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 5.5vw, 60px)',
          color: '#fff',
          lineHeight: 1.2,
          margin: 0,
        }}>
          Créez votre première facture maintenant.
        </h2>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 16,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 480,
          margin: '20px auto 0',
          lineHeight: 1.6,
        }}>
          Gratuit, sans compte, en 3 minutes.
        </p>
        <Link href="/formulaire" className="btn-cta-white">
          Commencer gratuitement →
        </Link>
      </div>

    </section>
  );
}
