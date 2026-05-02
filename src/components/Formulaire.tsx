'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  UploadSimple,
  Trash,
  Plus,
  FilePdf,
  X,
  Signature,
  Stamp,
} from '@phosphor-icons/react';
import SelecteurPalette from '@/components/SelecteurPalette';
import { palettes, paletteDefaut } from '@/data/palettes';
import {
  DonneesFacture,
  LigneService,
  TypeDocument,
  Devise,
  ModePaiement,
  ConditionPaiement,
} from '@/types';
import {
  calculerTotaux,
  formatMontant,
  genererId,
  genererNumero,
} from '@/lib/utils';

const PAYS = [
  'Bénin',
  "Côte d'Ivoire",
  'Sénégal',
  'Mali',
  'Togo',
  'Cameroun',
  'Autre',
];

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

const CONDITIONS: ConditionPaiement[] = [
  'Paiement intégral à réception',
  '50% à la commande, 50% à la livraison',
  '30% à la commande, 70% à la livraison',
  'Paiement mensuel',
  'Paiement à 30 jours',
  'Paiement à 60 jours',
  'Personnalisé',
];

interface Props {
  donneesFacture: DonneesFacture;
  setDonneesFacture: Dispatch<SetStateAction<DonneesFacture>>;
}

export default function Formulaire({ donneesFacture, setDonneesFacture }: Props) {
  const fileLogoRef = useRef<HTMLInputElement | null>(null);
  const fileSignatureRef = useRef<HTMLInputElement | null>(null);
  const [generationEnCours, setGenerationEnCours] = useState(false);

  const update = <K extends keyof DonneesFacture>(
    key: K,
    value: DonneesFacture[K]
  ) => {
    setDonneesFacture((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeType = (type: TypeDocument) => {
    setDonneesFacture((prev) => ({
      ...prev,
      typeDocument: type,
      numeroFacture: genererNumero(type),
    }));
  };

  const lireFichierEnBase64 = (
    file: File | undefined,
    callback: (data: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') callback(result);
    };
    reader.readAsDataURL(file);
  };

  const updateLigne = <K extends keyof LigneService>(
    id: string,
    key: K,
    value: LigneService[K]
  ) => {
    setDonneesFacture((prev) => ({
      ...prev,
      lignes: prev.lignes.map((l) => (l.id === id ? { ...l, [key]: value } : l)),
    }));
  };

  const ajouterLigne = () => {
    setDonneesFacture((prev) => ({
      ...prev,
      lignes: [
        ...prev.lignes,
        { id: genererId(), description: '', quantite: 1, prixUnitaire: 0, tva: 18 },
      ],
    }));
  };

  const supprimerLigne = (id: string) => {
    setDonneesFacture((prev) => ({
      ...prev,
      lignes: prev.lignes.filter((l) => l.id !== id),
    }));
  };

  const totaux = calculerTotaux(donneesFacture.lignes);
  const peutGenerer =
    !!donneesFacture.nomEntreprise.trim() && !!donneesFacture.nomClient.trim();

  const onTelecharger = async () => {
    if (!peutGenerer || generationEnCours) return;
    try {
      setGenerationEnCours(true);
      const { generatePDF } = await import('./FacturePDF');
      await generatePDF(donneesFacture);
    } catch (err) {
      console.error('Erreur lors de la génération du PDF', err);
    } finally {
      setGenerationEnCours(false);
    }
  };

  return (
    <section className="formulaire">
      <header className="form-header">
        <div className="logo-titre">
          Proforma<span className="gold">Africa</span>
        </div>
        <p className="sous-titre">Générez votre facture en 2 minutes</p>
      </header>

      {/* Section 1 : Entreprise */}
      <div className="section">
        <h2 className="section-title">Votre entreprise</h2>

        <div className="field">
          <label>Logo (optionnel)</label>
          {donneesFacture.logoEntreprise ? (
            <div className="logo-preview">
              <img src={donneesFacture.logoEntreprise} alt="Logo" />
              <button
                type="button"
                className="btn-supprimer-logo"
                onClick={() => update('logoEntreprise', null)}
              >
                <X size={14} weight="bold" />
                Supprimer
              </button>
            </div>
          ) : (
            <label className="logo-upload">
              <div className="icone-upload">
                <UploadSimple size={24} />
              </div>
              <div className="logo-upload-texte">
                Cliquer pour ajouter votre logo
              </div>
              <input
                ref={fileLogoRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  lireFichierEnBase64(e.target.files?.[0], (d) =>
                    update('logoEntreprise', d)
                  )
                }
              />
            </label>
          )}
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Nom de l&apos;entreprise *</label>
            <input
              type="text"
              value={donneesFacture.nomEntreprise}
              onChange={(e) => update('nomEntreprise', e.target.value)}
              placeholder="Ex: Mon Entreprise SARL"
            />
          </div>
          <div className="field">
            <label>Email professionnel</label>
            <input
              type="email"
              value={donneesFacture.emailEntreprise}
              onChange={(e) => update('emailEntreprise', e.target.value)}
              placeholder="contact@entreprise.com"
            />
          </div>
          <div className="field">
            <label>Téléphone</label>
            <input
              type="tel"
              value={donneesFacture.telephoneEntreprise}
              onChange={(e) => update('telephoneEntreprise', e.target.value)}
              placeholder="+229 97 00 00 00"
            />
          </div>
          <div className="field">
            <label>Ville</label>
            <input
              type="text"
              value={donneesFacture.villeEntreprise}
              onChange={(e) => update('villeEntreprise', e.target.value)}
              placeholder="Cotonou"
            />
          </div>
          <div className="field">
            <label>Pays</label>
            <select
              value={donneesFacture.paysEntreprise}
              onChange={(e) => update('paysEntreprise', e.target.value)}
            >
              {PAYS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section Apparence */}
      {(() => {
        const paletteActive =
          palettes.find(
            (p) => p.id === (donneesFacture.paletteId ?? 'emeraude')
          ) ?? paletteDefaut;
        return (
          <div className="section">
            <h2 className="section-title">Apparence</h2>
            <SelecteurPalette
              paletteActive={donneesFacture.paletteId ?? 'emeraude'}
              onChange={(id) =>
                setDonneesFacture((prev) => ({ ...prev, paletteId: id }))
              }
            />
            <div className="toggle-filigrane">
              <div className="toggle-filigrane-gauche">
                <span className="toggle-filigrane-icone">
                  <Stamp size={18} />
                </span>
                <div className="toggle-filigrane-textes">
                  <div className="toggle-filigrane-label">
                    Filigrane entreprise
                  </div>
                  <div className="toggle-filigrane-sous-label">
                    Nom de votre entreprise en arrière-plan
                  </div>
                </div>
              </div>
              <div className="toggle-switch">
                <input
                  id="toggle-filigrane-input"
                  type="checkbox"
                  checked={donneesFacture.filigraneActif ?? false}
                  onChange={() =>
                    setDonneesFacture((prev) => ({
                      ...prev,
                      filigraneActif: !(prev.filigraneActif ?? false),
                    }))
                  }
                  data-testid="toggle-filigrane"
                />
                <label
                  htmlFor="toggle-filigrane-input"
                  className="toggle-switch-label"
                  style={
                    (donneesFacture.filigraneActif ?? false)
                      ? { background: paletteActive.primaire }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Section 2 : Document */}
      <div className="section">
        <h2 className="section-title">Document</h2>
        <div className="grid-2">
          <div className="field">
            <label>Type de document</label>
            <select
              value={donneesFacture.typeDocument}
              onChange={(e) => onChangeType(e.target.value as TypeDocument)}
            >
              <option value="Facture">Facture</option>
              <option value="Devis">Devis</option>
              <option value="Proforma">Proforma</option>
            </select>
          </div>
          <div className="field">
            <label>Numéro</label>
            <input
              type="text"
              value={donneesFacture.numeroFacture}
              onChange={(e) => update('numeroFacture', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Date d&apos;émission</label>
            <input
              type="date"
              value={donneesFacture.dateEmission}
              onChange={(e) => update('dateEmission', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Date d&apos;échéance</label>
            <input
              type="date"
              value={donneesFacture.dateEcheance}
              onChange={(e) => update('dateEcheance', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Devise</label>
            <select
              value={donneesFacture.devise}
              onChange={(e) => update('devise', e.target.value as Devise)}
            >
              <option value="XOF">XOF (Franc CFA Ouest)</option>
              <option value="XAF">XAF (Franc CFA Centre)</option>
              <option value="MAD">MAD (Dirham marocain)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="USD">USD (Dollar US)</option>
            </select>
          </div>
          <div className="field">
            <label>Mode de paiement</label>
            <select
              value={donneesFacture.modePaiement}
              onChange={(e) =>
                update('modePaiement', e.target.value as ModePaiement)
              }
            >
              <optgroup label="Mobile Money">
                <option value="Mobile Money">Mobile Money (générique)</option>
                <option value="Wave">Wave</option>
                <option value="Orange Money">Orange Money</option>
                <option value="MTN Mobile Money">MTN Mobile Money</option>
                <option value="Moov Money">Moov Money</option>
              </optgroup>
              <optgroup label="Autres">
                <option value="Virement bancaire">Virement bancaire</option>
                <option value="Espèces">Espèces</option>
                <option value="Chèque">Chèque</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3 : Client */}
      <div className="section">
        <h2 className="section-title">Client</h2>
        <div className="grid-2">
          <div className="field">
            <label>Nom du client *</label>
            <input
              type="text"
              value={donneesFacture.nomClient}
              onChange={(e) => update('nomClient', e.target.value)}
              placeholder="Nom du client"
            />
          </div>
          <div className="field">
            <label>Entreprise du client</label>
            <input
              type="text"
              value={donneesFacture.entrepriseClient}
              onChange={(e) => update('entrepriseClient', e.target.value)}
              placeholder="Optionnel"
            />
          </div>
          <div className="field">
            <label>Email du client</label>
            <input
              type="email"
              value={donneesFacture.emailClient}
              onChange={(e) => update('emailClient', e.target.value)}
              placeholder="client@email.com"
            />
          </div>
          <div className="field">
            <label>Téléphone du client</label>
            <input
              type="tel"
              value={donneesFacture.telephoneClient}
              onChange={(e) => update('telephoneClient', e.target.value)}
              placeholder="+229 97 00 00 00"
            />
          </div>
          <div className="field">
            <label>Ville</label>
            <input
              type="text"
              value={donneesFacture.villeClient}
              onChange={(e) => update('villeClient', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Pays</label>
            <select
              value={donneesFacture.paysClient}
              onChange={(e) => update('paysClient', e.target.value)}
            >
              {PAYS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 4 : Services */}
      <div className="section">
        <h2 className="section-title">Services</h2>

        {donneesFacture.lignes.map((ligne) => {
          const total = ligne.quantite * ligne.prixUnitaire * (1 + ligne.tva / 100);
          return (
            <div key={ligne.id} className="ligne-service">
              {donneesFacture.lignes.length > 1 && (
                <button
                  type="button"
                  className="btn-supprimer-ligne"
                  aria-label="Supprimer la ligne"
                  onClick={() => supprimerLigne(ligne.id)}
                >
                  <Trash size={16} />
                </button>
              )}
              <div className="ligne-1 field" style={{ marginBottom: 12 }}>
                <label>Description</label>
                <input
                  type="text"
                  value={ligne.description}
                  onChange={(e) =>
                    updateLigne(ligne.id, 'description', e.target.value)
                  }
                  placeholder="Ex: Création site web, Prestation graphique..."
                />
              </div>
              <div className="ligne-2">
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Qté</label>
                  <input
                    type="number"
                    min={1}
                    value={ligne.quantite}
                    onChange={(e) =>
                      updateLigne(
                        ligne.id,
                        'quantite',
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Prix unitaire</label>
                  <input
                    type="number"
                    min={0}
                    value={ligne.prixUnitaire}
                    onChange={(e) =>
                      updateLigne(
                        ligne.id,
                        'prixUnitaire',
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                  />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>TVA %</label>
                  <select
                    value={ligne.tva}
                    onChange={(e) =>
                      updateLigne(ligne.id, 'tva', Number(e.target.value))
                    }
                  >
                    <option value={0}>0</option>
                    <option value={10}>10</option>
                    <option value={18}>18</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label>Total</label>
                  <div className="ligne-montant">
                    {formatMontant(total, donneesFacture.devise)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button type="button" className="btn-ajouter" onClick={ajouterLigne}>
          <Plus size={16} weight="bold" />
          Ajouter un service
        </button>

        <div className="recap">
          <div className="recap-ligne">
            <span>Sous-total</span>
            <span>{formatMontant(totaux.sousTotal, donneesFacture.devise)}</span>
          </div>
          <div className="recap-ligne">
            <span>TVA</span>
            <span>{formatMontant(totaux.totalTva, donneesFacture.devise)}</span>
          </div>
          <div className="recap-separateur" />
          <div className="recap-total">
            <span>TOTAL TTC</span>
            <span>{formatMontant(totaux.total, donneesFacture.devise)}</span>
          </div>
        </div>
      </div>

      {/* Section 5 : Coordonnées de paiement (dynamique selon le mode) */}
      <div className="section">
        <h2 className="section-title">
          Coordonnées de paiement — {donneesFacture.modePaiement}
        </h2>

        {estMobileMoney(donneesFacture.modePaiement) && (
          <>
            <p className="section-aide">
              Indiquez le numéro et le titulaire du compte{' '}
              {donneesFacture.modePaiement} sur lequel le client doit envoyer
              le paiement.
            </p>
            <div className="grid-2">
              <div className="field">
                <label>Numéro {donneesFacture.modePaiement}</label>
                <input
                  type="tel"
                  value={donneesFacture.numeroMobileMoney}
                  onChange={(e) => update('numeroMobileMoney', e.target.value)}
                  placeholder="+229 97 00 00 00"
                />
              </div>
              <div className="field">
                <label>Nom du titulaire</label>
                <input
                  type="text"
                  value={donneesFacture.titulaireMobileMoney}
                  onChange={(e) =>
                    update('titulaireMobileMoney', e.target.value)
                  }
                  placeholder="Nom complet sur le compte"
                />
              </div>
            </div>
          </>
        )}

        {donneesFacture.modePaiement === 'Virement bancaire' && (
          <>
            <p className="section-aide">
              L&apos;IBAN sera automatiquement converti en QR code dans le
              document pour faciliter le virement.
            </p>
            <div className="field">
              <label>IBAN</label>
              <input
                type="text"
                value={donneesFacture.iban}
                onChange={(e) => update('iban', e.target.value.toUpperCase())}
                placeholder="BJ66 BJ06 1010 0100 1442 0000 1234"
              />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>BIC / SWIFT</label>
                <input
                  type="text"
                  value={donneesFacture.bicSwift}
                  onChange={(e) =>
                    update('bicSwift', e.target.value.toUpperCase())
                  }
                  placeholder="ECOCBJBJ"
                />
              </div>
              <div className="field">
                <label>Nom de la banque</label>
                <input
                  type="text"
                  value={donneesFacture.nomBanque}
                  onChange={(e) => update('nomBanque', e.target.value)}
                  placeholder="Ecobank Bénin"
                />
              </div>
            </div>
          </>
        )}

        {donneesFacture.modePaiement === 'Chèque' && (
          <>
            <p className="section-aide">
              Précisez à l&apos;ordre de qui le chèque doit être libellé.
            </p>
            <div className="field">
              <label>Chèque à l&apos;ordre de</label>
              <input
                type="text"
                value={donneesFacture.ordreCheque}
                onChange={(e) => update('ordreCheque', e.target.value)}
                placeholder="Ex: Mon Entreprise SARL"
              />
            </div>
          </>
        )}

        {donneesFacture.modePaiement === 'Espèces' && (
          <p className="section-aide">
            Aucune coordonnée nécessaire. Le client réglera en espèces lors de
            la livraison ou du rendez-vous.
          </p>
        )}
      </div>

      {/* Section 6 : Conditions de paiement */}
      <div className="section">
        <h2 className="section-title">Conditions de paiement</h2>
        <div className="field">
          <label>Modalités d&apos;encaissement</label>
          <select
            value={donneesFacture.conditionPaiement}
            onChange={(e) =>
              update('conditionPaiement', e.target.value as ConditionPaiement)
            }
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {donneesFacture.conditionPaiement === 'Personnalisé' && (
          <div className="field">
            <label>Conditions personnalisées</label>
            <textarea
              rows={2}
              value={donneesFacture.conditionPersonnalisee}
              onChange={(e) =>
                update('conditionPersonnalisee', e.target.value)
              }
              placeholder="Ex: 25% à la signature, 25% à mi-parcours, 50% à la livraison"
            />
          </div>
        )}
      </div>

      {/* Section 7 : Note */}
      <div className="section">
        <h2 className="section-title">Note (optionnel)</h2>
        <div className="field">
          <textarea
            rows={3}
            value={donneesFacture.noteClient}
            onChange={(e) => update('noteClient', e.target.value)}
            placeholder="Conditions de paiement, remerciements, informations complémentaires..."
          />
        </div>
      </div>

      {/* Section 8 : Signature */}
      <div className="section">
        <h2 className="section-title">Signature</h2>
        <div className="field">
          <label>Nom du signataire</label>
          <input
            type="text"
            value={donneesFacture.nomSignataire}
            onChange={(e) => update('nomSignataire', e.target.value)}
            placeholder="Ex: Jean Dupont, Directeur"
          />
        </div>
        <div className="field">
          <label>Signature (image PNG/JPG)</label>
          {donneesFacture.signature ? (
            <div className="signature-preview">
              <img src={donneesFacture.signature} alt="Signature" />
              <button
                type="button"
                className="btn-supprimer-logo"
                onClick={() => update('signature', null)}
              >
                <X size={14} weight="bold" />
                Supprimer
              </button>
            </div>
          ) : (
            <label className="logo-upload">
              <div className="icone-upload">
                <Signature size={24} />
              </div>
              <div className="logo-upload-texte">
                Téléversez votre signature (fond transparent recommandé)
              </div>
              <input
                ref={fileSignatureRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  lireFichierEnBase64(e.target.files?.[0], (d) =>
                    update('signature', d)
                  )
                }
              />
            </label>
          )}
        </div>
      </div>

      <div className="btn-pdf-wrapper">
        <button
          type="button"
          className="btn-pdf"
          onClick={onTelecharger}
          disabled={!peutGenerer || generationEnCours}
        >
          <FilePdf size={20} weight="bold" />
          {generationEnCours
            ? 'Génération en cours...'
            : 'Télécharger la facture PDF'}
        </button>
      </div>
    </section>
  );
}
