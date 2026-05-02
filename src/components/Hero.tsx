'use client';

import {
  ArrowRight,
  Check,
  FilePdf,
  QrCode,
  DeviceMobile,
} from '@phosphor-icons/react';

interface HeroProps {
  onCommencer?: () => void;
  onVoirExemple?: () => void;
}

export default function Hero({ onCommencer, onVoirExemple }: HeroProps) {
  const allerAuFormulaire = () => {
    if (onCommencer) {
      onCommencer();
      return;
    }
    const el = document.getElementById('app');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const voirExemple = () => {
    if (onVoirExemple) {
      onVoirExemple();
      return;
    }
    allerAuFormulaire();
  };

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-image" />
        <div className="hero-bg-overlay" />
        <div className="hero-bg-blob hero-bg-blob-1" />
        <div className="hero-bg-blob hero-bg-blob-2" />
        <div className="hero-bg-grid" />
      </div>

      <header className="hero-nav">
        <div className="hero-logo">
          PROFORMA<span className="hero-logo-gold">AFRICA</span>
        </div>
      </header>

      <div className="hero-content">
        <h1 className="hero-titre">
          Créez votre facture
          <br />
          <span className="hero-titre-accent">en 2 minutes.</span>
        </h1>

        <p className="hero-sous-titre">
          Factures, devis et proformas téléchargeables en PDF. Conçu pour les
          entrepreneurs africains. Mobile Money, virement bancaire,
          chèque, tout est intégré.
        </p>

        <div className="hero-actions">
          <button className="hero-cta-principal" onClick={allerAuFormulaire}>
            Créer ma facture
            <ArrowRight size={18} weight="bold" />
          </button>
          <button className="hero-cta-secondaire" onClick={voirExemple}>
            Voir un exemple
          </button>
        </div>

        <ul className="hero-features">
          <li>
            <span className="hero-feature-icone">
              <FilePdf size={18} weight="duotone" />
            </span>
            <div>
              <div className="hero-feature-titre">PDF professionnel</div>
              <div className="hero-feature-desc">
                Téléchargement instantané, design soigné
              </div>
            </div>
          </li>
          <li>
            <span className="hero-feature-icone">
              <DeviceMobile size={18} weight="duotone" />
            </span>
            <div>
              <div className="hero-feature-titre">Tous les paiements</div>
              <div className="hero-feature-desc">
                Wave, Orange Money, MTN, virement, chèque
              </div>
            </div>
          </li>
          <li>
            <span className="hero-feature-icone">
              <QrCode size={18} weight="duotone" />
            </span>
            <div>
              <div className="hero-feature-titre">QR code intégré</div>
              <div className="hero-feature-desc">
                Vos clients scannent et paient
              </div>
            </div>
          </li>
          <li>
            <span className="hero-feature-icone">
              <Check size={18} weight="bold" />
            </span>
            <div>
              <div className="hero-feature-titre">Aperçu en direct</div>
              <div className="hero-feature-desc">
                Voyez votre facture en temps réel
              </div>
            </div>
          </li>
        </ul>
      </div>

    </section>
  );
}
