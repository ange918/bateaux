'use client';

import { CheckCircle } from '@phosphor-icons/react';
import { palettes } from '@/data/palettes';

interface Props {
  paletteActive: string;
  onChange: (id: string) => void;
}

export default function SelecteurPalette({ paletteActive, onChange }: Props) {
  return (
    <div className="selecteur-palette">
      <div className="selecteur-palette-titre">Apparence de la facture</div>
      <div className="selecteur-palette-grid">
        {palettes.map((palette) => {
          const actif = paletteActive === palette.id;
          return (
            <button
              key={palette.id}
              type="button"
              className="palette-card"
              onClick={() => onChange(palette.id)}
              style={{
                borderColor: actif ? palette.primaire : 'transparent',
                boxShadow: actif
                  ? `0 0 0 3px ${palette.primaire}22`
                  : undefined,
              }}
              title={palette.nom}
              data-testid={`palette-${palette.id}`}
            >
              {actif && (
                <span
                  className="palette-check"
                  style={{ color: palette.primaire }}
                >
                  <CheckCircle size={16} weight="fill" />
                </span>
              )}
              <div
                className="palette-bande"
                style={{
                  background: `linear-gradient(135deg, ${palette.primaire}, ${palette.secondaire})`,
                }}
              >
                <span
                  className="palette-accent-dot"
                  style={{ background: palette.accent }}
                />
              </div>
              <div className="palette-info">
                <div className="palette-nom">{palette.nom}</div>
                <div className="palette-desc">{palette.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
