import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const paletteColors = [
  '#1A6B3C',
  '#1B4F72',
  '#6E2F1A',
  '#4A235A',
  '#1A5276',
  '#784212',
  '#1E8449',
  '#C8972A',
];

export default function Demo() {
  return (
    <section id="demo" style={{
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
          APERÇU DE L&apos;OUTIL
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.5vw, 52px)',
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          Voyez ProformaAfrica en action.
        </h2>
      </div>

      <div style={{
        maxWidth: 900,
        margin: '48px auto 0',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <div style={{
          background: '#1E1E1E',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1,
            background: '#2D2D2D',
            borderRadius: 6,
            padding: '6px 16px',
          }}>
            <span style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 12,
              color: '#888',
            }}>proformaafrica.vercel.app</span>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '0 0 12px 12px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }} className="demo-body">
          <div style={{
            background: 'var(--bg)',
            padding: 24,
            borderRight: '1px solid var(--border)',
          }}>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--text)',
              marginBottom: 12,
            }}>Votre entreprise</div>
            {['Digital Innovation', 'Cotonou, Bénin', 'contact@digital.bj'].map((val) => (
              <div key={val} style={{
                height: 36,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 12,
                color: 'var(--text-muted)',
              }}>{val}</div>
            ))}

            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--text)',
              marginTop: 16,
              marginBottom: 8,
            }}>Services</div>
            {[
              { desc: 'Création site web', qte: '1', prix: '150 000' },
              { desc: 'Pack réseaux sociaux', qte: '2', prix: '75 000' },
            ].map((ligne) => (
              <div key={ligne.desc} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <div style={{
                  flex: 3,
                  height: 36,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}>{ligne.desc}</div>
                <div style={{
                  width: 40,
                  height: 36,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}>{ligne.qte}</div>
                <div style={{
                  width: 80,
                  height: 36,
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 8px',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                }}>{ligne.prix}</div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {paletteColors.map((c) => (
                <div key={c} style={{ width: 20, height: 20, borderRadius: '50%', background: c, flexShrink: 0 }} />
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  background: 'var(--green)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 700,
                  fontSize: 11,
                  color: '#fff',
                }}>DI</div>
                <span style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 600,
                  fontSize: 13,
                  color: 'var(--text)',
                }}>Digital Innovation</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--green)',
              }}>FACTURE</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 9,
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>FACTURÉ À</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--text)',
              marginTop: 4,
            }}>Koné &amp; Associés</div>

            <div style={{ marginTop: 12 }}>
              {[
                { desc: 'Création site web', total: '150 000' },
                { desc: 'Pack réseaux sociaux', total: '150 000' },
              ].map((row) => (
                <div key={row.desc} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid #f0ede6',
                }}>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--text-muted)' }}>{row.desc}</span>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--text-muted)' }}>{row.total}</span>
                </div>
              ))}
            </div>

            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--green)',
              textAlign: 'right',
              marginTop: 12,
            }}>177 000 XOF</div>
            <div style={{
              height: 3,
              background: 'var(--green)',
              borderRadius: 2,
              marginTop: 16,
            }} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/formulaire" className="btn-demo-primary">
          Accéder à l&apos;outil
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

    </section>
  );
}
