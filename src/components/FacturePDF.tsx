'use client';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import { DonneesFacture, ModePaiement } from '@/types';
import { calculerTotaux, formatMontant, getInitiales } from '@/lib/utils';
import { palettes, paletteDefaut } from '@/data/palettes';

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

function formatDatePDF(dateISO: string): string {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  if (isNaN(d.getTime())) return dateISO;
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

interface FacturePDFProps {
  donneesFacture: DonneesFacture;
  qrDataUrl: string | null;
}

export function FacturePDFDocument({
  donneesFacture,
  qrDataUrl,
}: FacturePDFProps) {
  const palette =
    palettes.find(
      (p) => p.id === (donneesFacture.paletteId ?? 'emeraude')
    ) ?? paletteDefaut;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      backgroundColor: palette.fond,
      fontSize: 11,
      color: palette.texte,
      position: 'relative',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    emetteur: { flexDirection: 'column', maxWidth: '60%' },
    logo: { width: 60, height: 60, objectFit: 'contain' },
    logoInitiales: {
      width: 60,
      height: 60,
      backgroundColor: palette.primaire,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoInitialesText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'Helvetica-Bold',
    },
    nomEntreprise: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: palette.texte,
      marginTop: 8,
    },
    texteGris: { fontSize: 10, color: palette.texteClair, marginTop: 2 },
    meta: { alignItems: 'flex-end' },
    typeDocument: {
      fontSize: 26,
      fontFamily: 'Helvetica-Bold',
      color: palette.primaire,
      textAlign: 'right',
    },
    numero: {
      fontSize: 11,
      color: palette.texteClair,
      textAlign: 'right',
      marginTop: 6,
    },
    separateurPrimaire: {
      height: 2,
      backgroundColor: palette.primaire,
      opacity: 0.2,
      marginVertical: 16,
    },
    labelSection: {
      fontSize: 9,
      color: palette.secondaire,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    nomClient: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: palette.texte,
      marginTop: 6,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: palette.separateur,
      paddingBottom: 8,
      marginTop: 24,
    },
    tableHeaderText: {
      fontSize: 9,
      color: palette.secondaire,
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: palette.separateur,
    },
    tableRowPair: {
      backgroundColor: palette.fondTableau,
    },
    cellDescription: { flex: 3, fontSize: 11, color: palette.texte },
    cellRight: {
      flex: 1,
      fontSize: 10,
      color: palette.texteClair,
      textAlign: 'right',
    },
    cellTotal: {
      flex: 1.2,
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: palette.texte,
      textAlign: 'right',
    },
    totauxContainer: { alignItems: 'flex-end', marginTop: 20 },
    totauxLigne: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 200,
      marginBottom: 4,
    },
    totalLabel: { fontSize: 11, color: palette.texteClair },
    totalValeur: { fontSize: 11, color: palette.texteClair },
    totauxSep: {
      width: 200,
      height: 1,
      backgroundColor: palette.separateur,
      marginVertical: 6,
    },
    ttcLigne: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 200,
      marginTop: 4,
      alignItems: 'center',
    },
    totalTTC: {
      fontSize: 22,
      fontFamily: 'Helvetica-Bold',
      color: palette.primaire,
      marginTop: 8,
    },
    totalTTCLabel: {
      fontSize: 11,
      color: palette.primaire,
      fontFamily: 'Helvetica-Bold',
    },
    paiementBloc: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 24,
      padding: 14,
      backgroundColor: palette.fondTableau,
      borderRadius: 4,
    },
    paiementInfos: { flex: 1, paddingRight: 12 },
    paiementModalite: {
      fontSize: 12,
      fontFamily: 'Helvetica-Bold',
      color: palette.secondaire,
      marginTop: 4,
    },
    paiementInfo: { fontSize: 10, color: palette.texteClair, marginTop: 4 },
    paiementInfoStrong: {
      fontSize: 10,
      color: palette.texte,
      fontFamily: 'Helvetica-Bold',
      marginTop: 4,
    },
    qrBloc: { alignItems: 'center' },
    qrImage: { width: 70, height: 70 },
    qrLabel: { fontSize: 8, color: palette.texteClair, marginTop: 4 },
    pied: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 18,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: palette.separateur,
    },
    piedTexte: { fontSize: 10, color: palette.texteClair },
    piedTitre: { fontSize: 10, color: palette.texte, marginTop: 2 },
    note: {
      fontSize: 10,
      color: palette.texteClair,
      fontStyle: 'italic',
      maxWidth: 220,
      textAlign: 'right',
    },
    signatureBloc: {
      marginTop: 28,
      alignItems: 'flex-end',
    },
    signatureImage: {
      width: 120,
      height: 50,
      objectFit: 'contain',
      marginTop: 6,
    },
    signatureNom: {
      fontSize: 10,
      color: palette.texte,
      fontFamily: 'Helvetica-Bold',
      marginTop: 4,
    },
    barreBase: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 4,
      backgroundColor: palette.primaire,
      borderRadius: 2,
    },
    barreAccent: {
      position: 'absolute',
      bottom: 6,
      left: 0,
      width: '30%',
      height: 4,
      backgroundColor: palette.accent,
      borderRadius: 2,
    },
    filigrane: {
      position: 'absolute',
      top: '38%',
      left: '5%',
      right: '5%',
      transform: 'rotate(-35deg)',
    },
    filigraneText: {
      fontSize: 52,
      fontFamily: 'Helvetica-Bold',
      color: palette.primaire,
      opacity: 0.05,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 8,
    },
  });

  const totaux = calculerTotaux(donneesFacture.lignes);
  const initiales = getInitiales(donneesFacture.nomEntreprise || 'EN');
  const lignesValides = donneesFacture.lignes.filter(
    (l) => l.description.trim() || l.prixUnitaire > 0
  );
  const ibanClean = (donneesFacture.iban || '').replace(/\s+/g, '');
  const telClean = (donneesFacture.numeroMobileMoney || '').trim();
  const modeMobile = estMobileMoney(donneesFacture.modePaiement);
  const conditionAffichee =
    donneesFacture.conditionPaiement === 'Personnalisé'
      ? donneesFacture.conditionPersonnalisee || 'Conditions personnalisées'
      : donneesFacture.conditionPaiement;
  const aSignature =
    !!donneesFacture.signature || !!donneesFacture.nomSignataire;
  const afficherFiligrane =
    (donneesFacture.filigraneActif ?? false) &&
    !!donneesFacture.nomEntreprise;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Filigrane */}
        {afficherFiligrane && (
          <View style={styles.filigrane}>
            <Text style={styles.filigraneText}>
              {donneesFacture.nomEntreprise}
            </Text>
          </View>
        )}

        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.emetteur}>
            {donneesFacture.logoEntreprise ? (
              <Image style={styles.logo} src={donneesFacture.logoEntreprise} />
            ) : (
              <View style={styles.logoInitiales}>
                <Text style={styles.logoInitialesText}>{initiales}</Text>
              </View>
            )}
            <Text style={styles.nomEntreprise}>
              {donneesFacture.nomEntreprise || 'Votre entreprise'}
            </Text>
            {(donneesFacture.villeEntreprise ||
              donneesFacture.paysEntreprise) && (
              <Text style={styles.texteGris}>
                {[
                  donneesFacture.villeEntreprise,
                  donneesFacture.paysEntreprise,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            )}
            {!!donneesFacture.emailEntreprise && (
              <Text style={styles.texteGris}>
                {donneesFacture.emailEntreprise}
              </Text>
            )}
            {!!donneesFacture.telephoneEntreprise && (
              <Text style={styles.texteGris}>
                {donneesFacture.telephoneEntreprise}
              </Text>
            )}
          </View>

          <View style={styles.meta}>
            <Text style={styles.typeDocument}>
              {donneesFacture.typeDocument}
            </Text>
            <Text style={styles.numero}>N° {donneesFacture.numeroFacture}</Text>
            <Text style={styles.texteGris}>
              Émission : {formatDatePDF(donneesFacture.dateEmission)}
            </Text>
            <Text style={styles.texteGris}>
              Échéance : {formatDatePDF(donneesFacture.dateEcheance)}
            </Text>
          </View>
        </View>

        <View style={styles.separateurPrimaire} />

        {/* Client */}
        <View>
          <Text style={styles.labelSection}>FACTURÉ À</Text>
          <Text style={styles.nomClient}>
            {donneesFacture.nomClient || 'Nom du client'}
          </Text>
          {!!donneesFacture.entrepriseClient && (
            <Text style={styles.texteGris}>
              {donneesFacture.entrepriseClient}
            </Text>
          )}
          {(donneesFacture.villeClient || donneesFacture.paysClient) && (
            <Text style={styles.texteGris}>
              {[donneesFacture.villeClient, donneesFacture.paysClient]
                .filter(Boolean)
                .join(', ')}
            </Text>
          )}
          {!!donneesFacture.emailClient && (
            <Text style={styles.texteGris}>{donneesFacture.emailClient}</Text>
          )}
          {!!donneesFacture.telephoneClient && (
            <Text style={styles.texteGris}>
              {donneesFacture.telephoneClient}
            </Text>
          )}
        </View>

        {/* Tableau */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>
            Description
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}
          >
            Qté
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}
          >
            P.U.
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}
          >
            TVA
          </Text>
          <Text
            style={[
              styles.tableHeaderText,
              { flex: 1.2, textAlign: 'right' },
            ]}
          >
            Total
          </Text>
        </View>

        {lignesValides.length === 0 ? (
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.cellDescription,
                { flex: 1, fontStyle: 'italic', color: palette.texteClair },
              ]}
            >
              Aucun service renseigné
            </Text>
          </View>
        ) : (
          lignesValides.map((l, idx) => {
            const totalLigne =
              l.quantite * l.prixUnitaire * (1 + l.tva / 100);
            const estPair = idx % 2 === 1;
            return (
              <View
                key={l.id}
                style={[styles.tableRow, estPair ? styles.tableRowPair : {}]}
              >
                <Text style={styles.cellDescription}>
                  {l.description || 'Service sans nom'}
                </Text>
                <Text style={styles.cellRight}>{l.quantite}</Text>
                <Text style={styles.cellRight}>
                  {formatMontant(l.prixUnitaire, donneesFacture.devise)}
                </Text>
                <Text style={styles.cellRight}>{l.tva}%</Text>
                <Text style={styles.cellTotal}>
                  {formatMontant(totalLigne, donneesFacture.devise)}
                </Text>
              </View>
            );
          })
        )}

        {/* Totaux */}
        <View style={styles.totauxContainer}>
          <View style={styles.totauxLigne}>
            <Text style={styles.totalLabel}>Sous-total</Text>
            <Text style={styles.totalValeur}>
              {formatMontant(totaux.sousTotal, donneesFacture.devise)}
            </Text>
          </View>
          <View style={styles.totauxLigne}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text style={styles.totalValeur}>
              {formatMontant(totaux.totalTva, donneesFacture.devise)}
            </Text>
          </View>
          <View style={styles.totauxSep} />
          <View style={styles.ttcLigne}>
            <Text style={styles.totalTTCLabel}>TOTAL TTC</Text>
            <Text style={styles.totalTTC}>
              {formatMontant(totaux.total, donneesFacture.devise)}
            </Text>
          </View>
        </View>

        {/* Bloc paiement */}
        <View style={styles.paiementBloc}>
          <View style={styles.paiementInfos}>
            <Text style={styles.labelSection}>PAIEMENT</Text>
            <Text style={styles.paiementModalite}>
              {donneesFacture.modePaiement} · {conditionAffichee}
            </Text>

            {modeMobile && (
              <>
                {!!donneesFacture.titulaireMobileMoney && (
                  <Text style={styles.paiementInfoStrong}>
                    Titulaire : {donneesFacture.titulaireMobileMoney}
                  </Text>
                )}
                {!!telClean && (
                  <Text style={styles.paiementInfoStrong}>
                    Numéro : {donneesFacture.numeroMobileMoney}
                  </Text>
                )}
              </>
            )}

            {donneesFacture.modePaiement === 'Virement bancaire' && (
              <>
                {!!donneesFacture.nomBanque && (
                  <Text style={styles.paiementInfo}>
                    Banque : {donneesFacture.nomBanque}
                  </Text>
                )}
                {!!ibanClean && (
                  <Text style={styles.paiementInfoStrong}>
                    IBAN : {donneesFacture.iban}
                  </Text>
                )}
                {!!donneesFacture.bicSwift && (
                  <Text style={styles.paiementInfo}>
                    BIC/SWIFT : {donneesFacture.bicSwift}
                  </Text>
                )}
              </>
            )}

            {donneesFacture.modePaiement === 'Chèque' &&
              !!donneesFacture.ordreCheque && (
                <Text style={styles.paiementInfoStrong}>
                  À l&apos;ordre de : {donneesFacture.ordreCheque}
                </Text>
              )}

            {donneesFacture.modePaiement === 'Espèces' && (
              <Text style={styles.paiementInfo}>
                Règlement en espèces à la livraison ou au rendez-vous.
              </Text>
            )}
          </View>
          {qrDataUrl && (
            <View style={styles.qrBloc}>
              <Image style={styles.qrImage} src={qrDataUrl} />
              <Text style={styles.qrLabel}>Scanner pour payer</Text>
            </View>
          )}
        </View>

        {/* Pied */}
        <View style={styles.pied}>
          <View>
            <Text style={styles.piedTexte}>Mode de paiement</Text>
            <Text style={styles.piedTitre}>{donneesFacture.modePaiement}</Text>
          </View>
          {!!donneesFacture.noteClient && (
            <Text style={styles.note}>{donneesFacture.noteClient}</Text>
          )}
        </View>

        {/* Signature */}
        {aSignature && (
          <View style={styles.signatureBloc}>
            <Text style={styles.labelSection}>SIGNATURE</Text>
            {!!donneesFacture.signature && (
              <Image
                style={styles.signatureImage}
                src={donneesFacture.signature}
              />
            )}
            {!!donneesFacture.nomSignataire && (
              <Text style={styles.signatureNom}>
                {donneesFacture.nomSignataire}
              </Text>
            )}
          </View>
        )}

        {/* Barre décorative double */}
        <View style={styles.barreBase} fixed />
        <View style={styles.barreAccent} fixed />
      </Page>
    </Document>
  );
}

async function genererQrPourFacture(
  donnees: DonneesFacture
): Promise<string | null> {
  const palette =
    palettes.find((p) => p.id === (donnees.paletteId ?? 'emeraude')) ??
    paletteDefaut;
  let payload: string | null = null;

  if (donnees.modePaiement === 'Virement bancaire') {
    const ibanClean = (donnees.iban || '').replace(/\s+/g, '').toUpperCase();
    if (!ibanClean) return null;
    const totaux = calculerTotaux(donnees.lignes);
    payload = `BCD\n002\n1\nSCT\n${donnees.bicSwift || ''}\n${
      donnees.nomEntreprise || ''
    }\n${ibanClean}\n${donnees.devise}${totaux.total.toFixed(2)}\n\n${
      donnees.numeroFacture
    }\nFacture ${donnees.numeroFacture}`;
  } else if (estMobileMoney(donnees.modePaiement)) {
    const telClean = (donnees.numeroMobileMoney || '').replace(/[^\d+]/g, '');
    if (!telClean) return null;
    payload = `tel:${telClean}`;
  }

  if (!payload) return null;

  try {
    return await QRCode.toDataURL(payload, {
      margin: 1,
      width: 200,
      color: { dark: palette.secondaire, light: '#FFFFFF' },
    });
  } catch {
    return null;
  }
}

export async function generatePDF(donnees: DonneesFacture): Promise<void> {
  const qrDataUrl = await genererQrPourFacture(donnees);
  const blob = await pdf(
    <FacturePDFDocument donneesFacture={donnees} qrDataUrl={qrDataUrl} />
  ).toBlob();
  const cleanClient = (donnees.nomClient || 'client')
    .replace(/[^a-zA-Z0-9\-_ ]/g, '')
    .replace(/\s+/g, '-');
  const nomFichier = `${donnees.numeroFacture}-${cleanClient}.pdf`;
  saveAs(blob, nomFichier);
}
