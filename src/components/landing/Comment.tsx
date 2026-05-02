import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const etapes = [
  {
    num: 1,
    titre: 'Renseignez vos informations',
    desc: 'Nom de votre entreprise, logo, coordonnées client, services rendus et montants.',
    tag: '2 minutes',
  },
  {
    num: 2,
    titre: 'Personnalisez votre facture',
    desc: 'Choisissez une palette de couleurs, activez le filigrane, sélectionnez la devise.',
    tag: '30 secondes',
  },
  {
    num: 3,
    titre: 'Téléchargez votre PDF',
    desc: 'Cliquez sur le bouton de génération et recevez un PDF professionnel instantanément.',
    tag: 'Instantané',
  },
];

export default function Comment() {
  return (
    <section id="comment" style={{
      padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 80px)',
      background: 'var(--bg)',
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
          SIMPLE COMME BONJOUR
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.5vw, 52px)',
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          3 étapes, c&apos;est tout.
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        maxWidth: 700,
        margin: '56px auto 0',
      }}>
        {etapes.map((etape, idx) => (
          <div key={etape.num} style={{
            display: 'flex',
            gap: 32,
            alignItems: 'flex-start',
            paddingBottom: idx < etapes.length - 1 ? 48 : 0,
            position: 'relative',
          }}>
            {idx < etapes.length - 1 && (
              <div style={{
                position: 'absolute',
                left: 23,
                top: 48,
                width: 2,
                height: 'calc(100% - 24px)',
                background: 'linear-gradient(var(--green), var(--border))',
              }} />
            )}
            <div style={{
              width: 48,
              height: 48,
              background: 'var(--green)',
              color: '#fff',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}>
              {etape.num}
            </div>
            <div style={{ paddingTop: 8 }}>
              <h3 style={{
                fontFamily: 'var(--font-kaushan)',
                fontWeight: 400,
                fontSize: 24,
                color: 'var(--text)',
                marginBottom: 8,
              }}>{etape.titre}</h3>
              <p style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 15,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: '0 0 12px 0',
              }}>{etape.desc}</p>
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 12,
                fontWeight: 600,
                background: 'var(--green-light)',
                color: 'var(--green)',
                padding: '4px 12px',
                borderRadius: 100,
              }}>{etape.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link href="/formulaire" className="btn-comment-primary">
          Essayer maintenant
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

    </section>
  );
}
