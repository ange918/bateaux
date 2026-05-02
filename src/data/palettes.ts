export interface PaletteFacture {
  id: string;
  nom: string;
  description: string;
  primaire: string;
  secondaire: string;
  accent: string;
  fond: string;
  fondTableau: string;
  texte: string;
  texteClair: string;
  separateur: string;
}

export const palettes: PaletteFacture[] = [
  {
    id: 'emeraude',
    nom: 'Émeraude',
    description: 'Professionnel & naturel',
    primaire: '#1A6B3C',
    secondaire: '#0F4526',
    accent: '#C8972A',
    fond: '#FFFFFF',
    fondTableau: '#F0FAF4',
    texte: '#0D0D0D',
    texteClair: '#6B6B6B',
    separateur: '#E2DDD6',
  },
  {
    id: 'ocean',
    nom: 'Océan',
    description: 'Confiance & modernité',
    primaire: '#1B4F8A',
    secondaire: '#0D3260',
    accent: '#F59E0B',
    fond: '#FFFFFF',
    fondTableau: '#EFF6FF',
    texte: '#0D0D0D',
    texteClair: '#6B6B6B',
    separateur: '#DBEAFE',
  },
  {
    id: 'nuit',
    nom: 'Nuit',
    description: 'Luxe & élégance',
    primaire: '#1A1A2E',
    secondaire: '#16213E',
    accent: '#C8972A',
    fond: '#FFFFFF',
    fondTableau: '#F5F5FA',
    texte: '#1A1A2E',
    texteClair: '#6B6B6B',
    separateur: '#E8E8F0',
  },
  {
    id: 'terracotta',
    nom: 'Terracotta',
    description: 'Chaleur africaine',
    primaire: '#C0572A',
    secondaire: '#8B3A1C',
    accent: '#F59E0B',
    fond: '#FFFAF7',
    fondTableau: '#FEF3EE',
    texte: '#1A0A00',
    texteClair: '#7A5C4A',
    separateur: '#F0D5C5',
  },
  {
    id: 'violet',
    nom: 'Améthyste',
    description: 'Créatif & audacieux',
    primaire: '#6B21A8',
    secondaire: '#4C1D95',
    accent: '#F59E0B',
    fond: '#FFFFFF',
    fondTableau: '#FAF5FF',
    texte: '#0D0D0D',
    texteClair: '#6B6B6B',
    separateur: '#EDE9FE',
  },
  {
    id: 'ardoise',
    nom: 'Ardoise',
    description: 'Sobre & corporate',
    primaire: '#334155',
    secondaire: '#1E293B',
    accent: '#38BDF8',
    fond: '#FFFFFF',
    fondTableau: '#F8FAFC',
    texte: '#0D0D0D',
    texteClair: '#64748B',
    separateur: '#E2E8F0',
  },
  {
    id: 'bordeaux',
    nom: 'Bordeaux',
    description: 'Prestige & autorité',
    primaire: '#7C1D2E',
    secondaire: '#5A1220',
    accent: '#C8972A',
    fond: '#FFFBFB',
    fondTableau: '#FFF0F2',
    texte: '#1A0005',
    texteClair: '#7A4A52',
    separateur: '#F0D5D8',
  },
  {
    id: 'sahara',
    nom: 'Sahara',
    description: 'Chaleureux & doré',
    primaire: '#B45309',
    secondaire: '#78350F',
    accent: '#0D9488',
    fond: '#FFFDF5',
    fondTableau: '#FFFBEB',
    texte: '#1C1100',
    texteClair: '#7A6040',
    separateur: '#FDE68A',
  },
];

export const paletteDefaut = palettes[0];
