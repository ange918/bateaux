'use client';

import Link from 'next/link';
import { House, FileText, Eye } from '@phosphor-icons/react';

export type OngletApp = 'facture' | 'apercu';

interface BottomNavProps {
  ongletActif: OngletApp;
  setOngletActif: (onglet: OngletApp) => void;
}

export default function BottomNav({ ongletActif, setOngletActif }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      <Link
        href="/"
        className="bottom-nav-item"
        data-testid="button-tab-home"
      >
        <House size={22} weight="regular" />
        <span>Accueil</span>
      </Link>

      <button
        type="button"
        className={`bottom-nav-item ${ongletActif === 'facture' ? 'bottom-nav-item-actif' : ''}`}
        onClick={() => setOngletActif('facture')}
        aria-current={ongletActif === 'facture' ? 'page' : undefined}
        data-testid="button-tab-facture"
      >
        <FileText size={22} weight={ongletActif === 'facture' ? 'fill' : 'regular'} />
        <span>Facture</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${ongletActif === 'apercu' ? 'bottom-nav-item-actif' : ''}`}
        onClick={() => setOngletActif('apercu')}
        aria-current={ongletActif === 'apercu' ? 'page' : undefined}
        data-testid="button-tab-apercu"
      >
        <Eye size={22} weight={ongletActif === 'apercu' ? 'fill' : 'regular'} />
        <span>Aperçu</span>
      </button>
    </nav>
  );
}
