'use client';

import { useEffect, useState } from 'react';
import Formulaire from '@/components/Formulaire';
import Apercu from '@/components/Apercu';
import BottomNav from '@/components/BottomNav';
import { DonneesFacture } from '@/types';
import { genererId, genererNumero } from '@/lib/utils';

export type OngletApp = 'facture' | 'apercu';

function aujourdhui(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const j = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${j}`;
}

function dansUnMois(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const j = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${j}`;
}

const STATIC_LIGNE_ID = 'ligne-initiale-1';

const donneesInitiales: DonneesFacture = {
  nomEntreprise: '',
  villeEntreprise: '',
  paysEntreprise: 'Bénin',
  emailEntreprise: '',
  telephoneEntreprise: '',
  logoEntreprise: null,

  nomClient: '',
  entrepriseClient: '',
  villeClient: '',
  paysClient: 'Bénin',
  emailClient: '',
  telephoneClient: '',

  numeroFacture: '',
  typeDocument: 'Facture',
  dateEmission: '',
  dateEcheance: '',
  devise: 'XOF',
  modePaiement: 'Mobile Money',
  numeroMobileMoney: '',
  titulaireMobileMoney: '',

  iban: '',
  bicSwift: '',
  nomBanque: '',

  ordreCheque: '',

  conditionPaiement: 'Paiement intégral à réception',
  conditionPersonnalisee: '',

  signature: null,
  nomSignataire: '',

  lignes: [
    {
      id: STATIC_LIGNE_ID,
      description: '',
      quantite: 1,
      prixUnitaire: 0,
      tva: 18,
    },
  ],

  noteClient: '',
};

export default function Page() {
  const [donneesFacture, setDonneesFacture] =
    useState<DonneesFacture>(donneesInitiales);
  const [ongletActif, setOngletActif] = useState<OngletApp>('facture');

  useEffect(() => {
    document.documentElement.classList.add('app-mobile-locked');
    document.body.classList.add('app-mobile-locked');

    return () => {
      document.documentElement.classList.remove('app-mobile-locked');
      document.body.classList.remove('app-mobile-locked');
    };
  }, []);

  useEffect(() => {
    setDonneesFacture((prev) => ({
      ...prev,
      numeroFacture: prev.numeroFacture || genererNumero(prev.typeDocument),
      dateEmission: prev.dateEmission || aujourdhui(),
      dateEcheance: prev.dateEcheance || dansUnMois(),
      lignes: prev.lignes.map((l) =>
        l.id === STATIC_LIGNE_ID ? { ...l, id: genererId() } : l
      ),
    }));
  }, []);

  return (
    <div className="app-shell" data-onglet={ongletActif}>
      <main id="app" className="app-layout app-pane-app">
        <section
          className="app-pane app-pane-facture"
          aria-hidden={ongletActif !== 'facture'}
        >
          <Formulaire
            donneesFacture={donneesFacture}
            setDonneesFacture={setDonneesFacture}
          />
        </section>
        <section
          className="app-pane app-pane-apercu"
          aria-hidden={ongletActif !== 'apercu'}
        >
          <Apercu donneesFacture={donneesFacture} />
        </section>
      </main>

      <BottomNav ongletActif={ongletActif} setOngletActif={setOngletActif} />
    </div>
  );
}
