export interface LigneService {
  id: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  tva: number;
}

export type TypeDocument = 'Facture' | 'Devis' | 'Proforma';
export type Devise = 'XOF' | 'XAF' | 'MAD' | 'EUR' | 'USD';

export type ModePaiement =
  | 'Mobile Money'
  | 'Wave'
  | 'Orange Money'
  | 'MTN Mobile Money'
  | 'Moov Money'
  | 'Virement bancaire'
  | 'Espèces'
  | 'Chèque';

export type ConditionPaiement =
  | 'Paiement intégral à réception'
  | '50% à la commande, 50% à la livraison'
  | '30% à la commande, 70% à la livraison'
  | 'Paiement mensuel'
  | 'Paiement à 30 jours'
  | 'Paiement à 60 jours'
  | 'Personnalisé';

export interface DonneesFacture {
  nomEntreprise: string;
  villeEntreprise: string;
  paysEntreprise: string;
  emailEntreprise: string;
  telephoneEntreprise: string;
  logoEntreprise: string | null;

  nomClient: string;
  entrepriseClient: string;
  villeClient: string;
  paysClient: string;
  emailClient: string;
  telephoneClient: string;

  numeroFacture: string;
  typeDocument: TypeDocument;
  dateEmission: string;
  dateEcheance: string;
  devise: Devise;

  // Mode de paiement et coordonnées dynamiques
  modePaiement: ModePaiement;
  // Pour Mobile Money / Wave / Orange / MTN / Moov
  numeroMobileMoney: string;
  titulaireMobileMoney: string;
  // Pour Virement bancaire
  iban: string;
  bicSwift: string;
  nomBanque: string;
  // Pour Chèque
  ordreCheque: string;

  conditionPaiement: ConditionPaiement;
  conditionPersonnalisee: string;

  lignes: LigneService[];

  noteClient: string;

  signature: string | null;
  nomSignataire: string;

  paletteId?: string;
  filigraneActif?: boolean;
}
