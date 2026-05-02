import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function NavBar() {
  return (
    <nav style={{
      background: 'rgba(247, 245, 240, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: 64,
      padding: '0 clamp(24px, 6vw, 80px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: 0, textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 24,
          color: 'var(--green)',
          lineHeight: 1,
        }}>Proforma</span>
        <span style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 24,
          color: 'var(--gold)',
          lineHeight: 1,
        }}>Africa</span>
      </Link>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
      }} className="nav-links">
        <a href="#fonctionnalites" className="nav-link">Fonctionnalités</a>
        <a href="#comment" className="nav-link">Comment ça marche</a>
        <a href="#faq" className="nav-link">FAQ</a>
      </div>

      <Link href="/formulaire" style={{
        background: 'var(--green)',
        color: '#fff',
        fontFamily: 'var(--font-montserrat)',
        fontSize: 13,
        fontWeight: 700,
        padding: '10px 22px',
        borderRadius: 8,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 0.2s ease, transform 0.2s ease',
      }} className="nav-cta">
        Commencer gratuitement
        <ArrowRight size={14} weight="bold" />
      </Link>

    </nav>
  );
}
