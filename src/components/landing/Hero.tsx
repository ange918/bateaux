import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function Hero() {
  return (
    <section style={{
      background: 'var(--bg)',
      textAlign: 'center',
      padding: 'clamp(100px, 16vh, 160px) clamp(24px, 6vw, 80px) clamp(60px, 10vh, 100px)',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-kaushan)',
        fontWeight: 400,
        fontSize: 'clamp(42px, 7vw, 82px)',
        color: 'var(--text)',
        lineHeight: 1.1,
        margin: 0,
      }}>
        Créez vos factures<br />
        <span style={{ color: 'var(--green)' }}>en 3 minutes.</span>
      </h1>

      <p style={{
        fontFamily: 'var(--font-montserrat)',
        fontSize: 18,
        color: 'var(--text-muted)',
        maxWidth: 580,
        margin: '20px auto 0',
        lineHeight: 1.6,
      }}>
        Devis, factures et proformas professionnels pour les freelances et PME d&apos;Afrique. Sans compte, sans abonnement.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        marginTop: 44,
      }}>
        <Link href="/formulaire" className="btn-hero-primary">
          Créer ma première facture
          <ArrowRight size={16} weight="bold" />
        </Link>
        <a href="#demo" className="btn-hero-secondary">
          Voir la démo ↓
        </a>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 'clamp(24px, 6vw, 48px)',
        flexWrap: 'wrap',
        marginTop: 64,
      }}>
        {[
          { chiffre: '3 min', label: 'Pour créer une facture' },
          { chiffre: '8 palettes', label: 'De design disponibles' },
          { chiffre: '100% gratuit', label: 'Sans compte requis' },
        ].map((stat) => (
          <div key={stat.chiffre} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              color: 'var(--green)',
              lineHeight: 1,
            }}>{stat.chiffre}</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 13,
              color: 'var(--text-muted)',
              marginTop: 4,
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
        marginTop: 'clamp(60px, 10vh, 100px)',
      }} />

    </section>
  );
}
