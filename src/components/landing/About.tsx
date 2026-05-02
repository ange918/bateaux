import {
  FileText,
  PaintBrush,
  FilePdf,
  Stamp,
  CurrencyDollar,
  Lightning,
} from '@phosphor-icons/react/dist/ssr';

const features = [
  {
    icon: FileText,
    title: 'Devis & Proformas',
    desc: 'Créez tous types de documents commerciaux en quelques clics.',
  },
  {
    icon: PaintBrush,
    title: '8 palettes de couleurs',
    desc: "Personnalisez l'apparence de chaque facture selon votre image.",
  },
  {
    icon: FilePdf,
    title: 'Export PDF instantané',
    desc: 'Téléchargez un PDF professionnel prêt à envoyer.',
  },
  {
    icon: Stamp,
    title: 'Filigrane personnalisé',
    desc: 'Ajoutez le nom de votre entreprise en arrière-plan pour plus de professionnalisme.',
  },
  {
    icon: CurrencyDollar,
    title: 'Multi-devises',
    desc: 'XOF, XAF, MAD, EUR, USD — la devise de votre choix.',
  },
  {
    icon: Lightning,
    title: 'Zéro inscription',
    desc: "Aucun compte requis. Ouvrez l'outil et commencez immédiatement.",
  },
];

export default function About() {
  return (
    <section id="fonctionnalites" style={{
      padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      background: 'var(--card)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--green)',
          marginBottom: 12,
        }}>
          POURQUOI PROFORMAAFRICA ?
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.5vw, 52px)',
          color: 'var(--text)',
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.2,
        }}>
          L&apos;outil de facturation fait pour votre réalité.
        </h2>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 16,
          color: 'var(--text-muted)',
          maxWidth: 520,
          margin: '16px auto 0',
          lineHeight: 1.6,
        }}>
          Pas besoin de s&apos;inscrire. Remplissez, personnalisez, téléchargez.
        </p>
      </div>

      <div className="features-grid">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="feature-card">
            <div style={{
              display: 'inline-flex',
              padding: 10,
              borderRadius: 10,
              background: 'var(--green-light)',
              color: 'var(--green)',
              marginBottom: 16,
            }}>
              <Icon size={32} weight="bold" />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 20,
              color: 'var(--text)',
              marginBottom: 8,
            }}>{title}</h3>
            <p style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 14,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}>{desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
