'use client';

import { useEffect, useState } from 'react';
import {
  DeviceMobile,
  Bank,
  Money,
  Receipt,
  QrCode,
  Wallet,
} from '@phosphor-icons/react';
import QRCode from 'qrcode';
import { DonneesFacture, ModePaiement } from '@/types';
import { calculerTotaux, formatMontant, getInitiales } from '@/lib/utils';
import { palettes, paletteDefaut } from '@/data/palettes';

interface Props {
  donneesFacture: DonneesFacture;
}

const MODES_MOBILE_MONEY: ModePaiement[] = [
  'Mobile Money',
  'Wave',
  'Orange Money',
  'MTN Mobile Money',
  'Moov Money',
];

function estMobileMoney(mode: ModePaiement): boolean {
  return MODES_MOBILE_MONEY.includes(mode);
}

function formatDate(dateISO: string): string {
  if (!dateISO) return '—';
  const d = new Date(dateISO);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function nettoyerIban(iban: string): string {
  return (iban || '').replace(/\s+/g, '').toUpperCase();
}

function nettoyerTel(tel: string): string {
  return (tel || '').replace(/[^\d+]/g, '');
}

export default function Apercu({ donneesFacture }: Props) {
  const palette =
    palettes.find((p) => p.id === (donneesFacture.paletteId ?? 'emeraude')) ??
    paletteDefaut;
  const filigraneActif = donneesFacture.filigraneActif ?? false;

  const totaux = calculerTotaux(donneesFacture.lignes);
  const initiales = getInitiales(donneesFacture.nomEntreprise || 'Entreprise');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const ibanClean = nettoyerIban(donneesFacture.iban);
  const telClean = nettoyerTel(donneesFacture.numeroMobileMoney);
  const modeMobile = estMobileMoney(donneesFacture.modePaiement);

  useEffect(() => {
    let cancelled = false;
    let payload: string | null = null;

    if (donneesFacture.modePaiement === 'Virement bancaire' && ibanClean) {
      payload = `BCD\n002\n1\nSCT\n${donneesFacture.bicSwift || ''}\n${
        donneesFacture.nomEntreprise || ''
      }\n${ibanClean}\n${donneesFacture.devise}${totaux.total.toFixed(2)}\n\n${
        donneesFacture.numeroFacture
      }\nFacture ${donneesFacture.numeroFacture}`;
    } else if (modeMobile && telClean) {
      payload = `tel:${telClean}`;
    }

    if (!payload) {
      setQrDataUrl(null);
      return;
    }

    QRCode.toDataURL(payload, {
      margin: 1,
      width: 200,
      color: { dark: palette.secondaire, light: '#FFFFFF' },
    })
      .then((url: string) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [
    donneesFacture.modePaiement,
    modeMobile,
    ibanClean,
    telClean,
    donneesFacture.bicSwift,
    donneesFacture.nomEntreprise,
    donneesFacture.devise,
    donneesFacture.numeroFacture,
    totaux.total,
    palette.secondaire,
  ]);

  const iconePaiement = () => {
    if (estMobileMoney(donneesFacture.modePaiement)) {
      return <DeviceMobile size={14} />;
    }
    switch (donneesFacture.modePaiement) {
      case 'Virement bancaire':
        return <Bank size={14} />;
      case 'Espèces':
        return <Money size={14} />;
      case 'Chèque':
        return <Receipt size={14} />;
      default:
        return <Wallet size={14} />;
    }
  };

  const lignesValides = donneesFacture.lignes.filter(
    (l) => l.description.trim() || l.prixUnitaire > 0
  );

  const conditionAffichee =
    donneesFacture.conditionPaiement === 'Personnalisé'
      ? donneesFacture.conditionPersonnalisee || 'Conditions personnalisées'
      : donneesFacture.conditionPaiement;

  const renderCoordonnees = () => {
    if (modeMobile) {
      if (!telClean && !donneesFacture.titulaireMobileMoney) return null;
      return (
        <>
          {donneesFacture.titulaireMobileMoney && (
            <div className="info">
              Titulaire :{' '}
              <strong>{donneesFacture.titulaireMobileMoney}</strong>
            </div>
          )}
          {donneesFacture.numeroMobileMoney && (
            <div className="info">
              Numéro : <strong>{donneesFacture.numeroMobileMoney}</strong>
            </div>
          )}
        </>
      );
    }
    if (donneesFacture.modePaiement === 'Virement bancaire') {
      if (!donneesFacture.nomBanque && !ibanClean && !donneesFacture.bicSwift)
        return null;
      return (
        <>
          {donneesFacture.nomBanque && (
            <div className="info">Banque : {donneesFacture.nomBanque}</div>
          )}
          {ibanClean && (
            <div className="info">
              IBAN : <strong>{donneesFacture.iban}</strong>
            </div>
          )}
          {donneesFacture.bicSwift && (
            <div className="info">
              BIC/SWIFT : {donneesFacture.bicSwift}
            </div>
          )}
        </>
      );
    }
    if (donneesFacture.modePaiement === 'Chèque') {
      if (!donneesFacture.ordreCheque) return null;
      return (
        <div className="info">
          À l&apos;ordre de : <strong>{donneesFacture.ordreCheque}</strong>
        </div>
      );
    }
    if (donneesFacture.modePaiement === 'Espèces') {
      return (
        <div className="info">
          Règlement en espèces à la livraison ou au rendez-vous.
        </div>
      );
    }
    return null;
  };

  return (
    <aside className="apercu">
      <div className="apercu-label">Aperçu en temps réel</div>

      <article
        className="document"
        style={
          {
            '--green': palette.primaire,
            '--green-dark': palette.secondaire,
            '--gold': palette.accent,
            '--text': palette.texte,
            '--text-muted': palette.texteClair,
            '--border': palette.separateur,
            '--card': palette.fond,
            backgroundColor: palette.fond,
            position: 'relative',
            overflow: 'hidden',
          } as React.CSSProperties
        }
      >
        {/* Filigrane */}
        {filigraneActif && donneesFacture.nomEntreprise && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-35deg)',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontWeight: 700,
              color: palette.primaire,
              opacity: 0.06,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {donneesFacture.nomEntreprise}
          </div>
        )}

        {/* Contenu du document — au-dessus du filigrane */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* En-tête */}
          <div className="doc-header">
            <div className="doc-emetteur">
              {donneesFacture.logoEntreprise ? (
                <img src={donneesFacture.logoEntreprise} alt="Logo" />
              ) : (
                <div
                  className="doc-initiales"
                  style={{ background: palette.primaire }}
                >
                  {initiales}
                </div>
              )}
              <div className="nom">
                {donneesFacture.nomEntreprise || 'Votre entreprise'}
              </div>
              {(donneesFacture.villeEntreprise ||
                donneesFacture.paysEntreprise) && (
                <div className="info">
                  {[
                    donneesFacture.villeEntreprise,
                    donneesFacture.paysEntreprise,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              )}
              {donneesFacture.emailEntreprise && (
                <div className="info">{donneesFacture.emailEntreprise}</div>
              )}
              {donneesFacture.telephoneEntreprise && (
                <div className="info">{donneesFacture.telephoneEntreprise}</div>
              )}
            </div>

            <div className="doc-meta">
              <div className="doc-type" style={{ color: palette.primaire }}>
                {donneesFacture.typeDocument}
              </div>
              <div className="doc-numero">N° {donneesFacture.numeroFacture}</div>
              <div className="info">
                Émission : {formatDate(donneesFacture.dateEmission)}
              </div>
              <div className="info">
                Échéance : {formatDate(donneesFacture.dateEcheance)}
              </div>
            </div>
          </div>

          <div
            className="doc-separateur"
            style={{ background: palette.primaire }}
          />

          {/* Client */}
          <div className="doc-client">
            <div
              className="doc-section-label"
              style={{ color: palette.secondaire }}
            >
              FACTURÉ À
            </div>
            <div className="nom">
              {donneesFacture.nomClient || 'Nom du client'}
            </div>
            {donneesFacture.entrepriseClient && (
              <div className="entreprise">
                {donneesFacture.entrepriseClient}
              </div>
            )}
            {(donneesFacture.villeClient || donneesFacture.paysClient) && (
              <div className="info">
                {[donneesFacture.villeClient, donneesFacture.paysClient]
                  .filter(Boolean)
                  .join(', ')}
              </div>
            )}
            {donneesFacture.emailClient && (
              <div className="info">{donneesFacture.emailClient}</div>
            )}
            {donneesFacture.telephoneClient && (
              <div className="info">{donneesFacture.telephoneClient}</div>
            )}
          </div>

          {/* Tableau */}
          <div className="doc-tableau">
            <div
              className="doc-tableau-header"
              style={{
                borderBottomColor: palette.separateur,
                color: palette.secondaire,
              }}
            >
              <span>Description</span>
              <span>Qté</span>
              <span>P.U.</span>
              <span>TVA</span>
              <span>Total</span>
            </div>

            {lignesValides.length === 0 ? (
              <div className="doc-vide">Vos services apparaîtront ici...</div>
            ) : (
              lignesValides.map((l, idx) => {
                const totalLigne =
                  l.quantite * l.prixUnitaire * (1 + l.tva / 100);
                const estPair = idx % 2 === 1;
                return (
                  <div
                    key={l.id}
                    className="doc-tableau-row"
                    style={{
                      borderBottomColor: palette.separateur,
                      backgroundColor: estPair
                        ? palette.fondTableau
                        : 'transparent',
                    }}
                  >
                    <span className="description">
                      {l.description || 'Service sans nom'}
                    </span>
                    <span className="col">{l.quantite}</span>
                    <span className="col">
                      {formatMontant(l.prixUnitaire, donneesFacture.devise)}
                    </span>
                    <span className="col">{l.tva}%</span>
                    <span className="total">
                      {formatMontant(totalLigne, donneesFacture.devise)}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Totaux */}
          <div className="doc-totaux">
            <div className="ligne">
              Sous-total :{' '}
              <span>
                {formatMontant(totaux.sousTotal, donneesFacture.devise)}
              </span>
            </div>
            <div className="ligne">
              TVA :{' '}
              <span>
                {formatMontant(totaux.totalTva, donneesFacture.devise)}
              </span>
            </div>
            <div
              className="separateur"
              style={{ background: palette.separateur }}
            />
            <div className="ttc" style={{ color: palette.primaire }}>
              {formatMontant(totaux.total, donneesFacture.devise)}
              <span className="devise">TTC</span>
            </div>
          </div>

          {/* Bloc paiement */}
          <div className="doc-paiement-bloc">
            <div className="doc-paiement-infos">
              <div
                className="doc-section-label"
                style={{ color: palette.secondaire }}
              >
                PAIEMENT
              </div>
              <div
                className="paiement-modalite"
                style={{ color: palette.secondaire }}
              >
                {donneesFacture.modePaiement} · {conditionAffichee}
              </div>
              {renderCoordonnees()}
            </div>
            {qrDataUrl && (
              <div className="doc-qr">
                <img src={qrDataUrl} alt="QR Code paiement" />
                <div className="qr-label">
                  <QrCode size={10} /> Scanner pour payer
                </div>
              </div>
            )}
          </div>

          {/* Pied */}
          <div className="doc-pied">
            <div className="doc-paiement">
              {iconePaiement()}
              <div>{donneesFacture.modePaiement}</div>
            </div>
            {donneesFacture.noteClient && (
              <div className="doc-note">{donneesFacture.noteClient}</div>
            )}
          </div>

          {/* Signature */}
          {(donneesFacture.signature || donneesFacture.nomSignataire) && (
            <div className="doc-signature">
              <div
                className="doc-section-label"
                style={{ color: palette.secondaire }}
              >
                SIGNATURE
              </div>
              {donneesFacture.signature && (
                <img
                  src={donneesFacture.signature}
                  alt="Signature"
                  className="signature-img"
                />
              )}
              {donneesFacture.nomSignataire && (
                <div className="signature-nom">
                  {donneesFacture.nomSignataire}
                </div>
              )}
            </div>
          )}

          {/* Barre décorative double */}
          <div style={{ marginTop: 32 }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: palette.primaire,
              }}
            />
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: palette.accent,
                marginTop: 2,
                width: '30%',
              }}
            />
          </div>
        </div>
      </article>
    </aside>
  );
}
