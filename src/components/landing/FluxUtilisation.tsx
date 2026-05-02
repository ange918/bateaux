const barData = [
  { mois: 'Jan', val: 38 },
  { mois: 'Fév', val: 52 },
  { mois: 'Mar', val: 61 },
  { mois: 'Avr', val: 47 },
  { mois: 'Mai', val: 74 },
  { mois: 'Juin', val: 89 },
  { mois: 'Juil', val: 95 },
  { mois: 'Août', val: 82 },
  { mois: 'Sep', val: 100 },
  { mois: 'Oct', val: 91 },
  { mois: 'Nov', val: 87 },
  { mois: 'Déc', val: 76 },
];

const cercles = [
  { label: 'Mobile Money', pct: 68, couleur: 'var(--green)' },
  { label: 'XOF / XAF', pct: 54, couleur: 'var(--gold)' },
  { label: 'Export PDF', pct: 92, couleur: '#1B4F72' },
];

function Cercle({
  pct,
  couleur,
  label,
}: {
  pct: number;
  couleur: string;
  label: string;
}) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke={couleur}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={circ / 4}
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 700,
          fontSize: 15,
          color: couleur,
        }}>
          {pct}%
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-montserrat)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-muted)',
        textAlign: 'center',
      }}>{label}</span>
    </div>
  );
}

const statCards = [
  { chiffre: '12 400+', label: 'Factures générées', soustitre: 'Depuis le lancement' },
  { chiffre: '3 min', label: 'Temps moyen', soustitre: 'Pour créer une facture' },
  { chiffre: '18', label: 'Pays actifs', soustitre: 'Afrique francophone' },
  { chiffre: '100%', label: 'Satisfaction', soustitre: 'Sans inscription requise' },
];

export default function FluxUtilisation() {
  const maxVal = Math.max(...barData.map((d) => d.val));

  return (
    <section style={{
      padding: 'clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px)',
      background: 'var(--card)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--green)',
          marginBottom: 12,
        }}>
          EN CHIFFRES
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(32px, 4.5vw, 50px)',
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          ProformaAfrica, ça marche.
        </h2>
      </div>

      {/* Stat cards */}
      <div className="stats-cards-grid">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 'clamp(26px, 3vw, 38px)',
              color: 'var(--green)',
              lineHeight: 1,
              marginBottom: 6,
            }}>{s.chiffre}</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--text)',
              marginBottom: 2,
            }}>{s.label}</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 12,
              color: 'var(--text-muted)',
            }}>{s.soustitre}</div>
          </div>
        ))}
      </div>

      {/* Bottom row: bar chart + circles */}
      <div className="stats-bottom-row">

        {/* Bar chart */}
        <div className="stats-chart-card">
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 20,
              color: 'var(--text)',
              marginBottom: 4,
            }}>Factures par mois</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 12,
              color: 'var(--text-muted)',
            }}>Volume de documents générés sur l&apos;année</div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 'clamp(4px, 1.2vw, 10px)',
            height: 140,
          }}>
            {barData.map((d) => (
              <div key={d.mois} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                gap: 6,
              }}>
                <div style={{
                  width: '100%',
                  height: `${(d.val / maxVal) * 110}px`,
                  background: d.val === maxVal
                    ? 'var(--green)'
                    : `linear-gradient(to top, var(--green-light), rgba(26,107,60,0.3))`,
                  borderRadius: '4px 4px 0 0',
                  border: d.val === maxVal ? 'none' : '1px solid rgba(26,107,60,0.15)',
                  transition: 'height 0.6s ease',
                }} />
                <span style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}>{d.mois}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 16,
            paddingTop: 12,
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--green)' }} />
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--text-muted)' }}>Mois record</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--green-light)', border: '1px solid rgba(26,107,60,0.2)' }} />
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--text-muted)' }}>Autres mois</span>
            </div>
          </div>
        </div>

        {/* Donut circles */}
        <div className="stats-circles-card">
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 20,
              color: 'var(--text)',
              marginBottom: 4,
            }}>Usages populaires</div>
            <div style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 12,
              color: 'var(--text-muted)',
            }}>Fonctionnalités les plus utilisées</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
            flexWrap: 'wrap',
            gap: 24,
          }}>
            {cercles.map((c) => (
              <Cercle key={c.label} pct={c.pct} couleur={c.couleur} label={c.label} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
