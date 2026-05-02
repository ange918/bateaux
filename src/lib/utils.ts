export function formatMontant(montant: number, devise: string): string {
  const symboles: Record<string, { symbole: string; position: 'avant' | 'apres'; decimales: number }> = {
    XOF: { symbole: 'F CFA', position: 'apres', decimales: 0 },
    XAF: { symbole: 'F CFA', position: 'apres', decimales: 0 },
    MAD: { symbole: 'MAD', position: 'apres', decimales: 2 },
    EUR: { symbole: '€', position: 'apres', decimales: 2 },
    USD: { symbole: '$', position: 'avant', decimales: 2 },
  };

  const config = symboles[devise] || { symbole: devise, position: 'apres' as const, decimales: 0 };

  const partieEntiere = Math.floor(Math.abs(montant)).toString();
  const avecEspaces = partieEntiere.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
  let nombre = (montant < 0 ? '-' : '') + avecEspaces;

  if (config.decimales > 0) {
    const decimales = Math.abs(montant - Math.trunc(montant))
      .toFixed(config.decimales)
      .slice(2);
    nombre = `${nombre},${decimales}`;
  }

  return config.position === 'avant'
    ? `${config.symbole}${nombre}`
    : `${nombre}\u00A0${config.symbole}`;
}

export function calculerTotaux(
  lignes: { quantite: number; prixUnitaire: number; tva: number }[]
) {
  const sousTotal = lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const totalTva = lignes.reduce(
    (s, l) => s + (l.quantite * l.prixUnitaire * l.tva) / 100,
    0
  );
  return { sousTotal, totalTva, total: sousTotal + totalTva };
}

export function genererNumero(type: string): string {
  const p: Record<string, string> = {
    Facture: 'FAC',
    Devis: 'DEV',
    Proforma: 'PRO',
  };
  const prefix = p[type] || 'DOC';
  const annee = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${annee}-${rand}`;
}

export function genererId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getInitiales(nom: string): string {
  if (!nom) return 'EN';
  const mots = nom.trim().split(/\s+/);
  if (mots.length === 1) return mots[0].slice(0, 2).toUpperCase();
  return (mots[0][0] + mots[1][0]).toUpperCase();
}
