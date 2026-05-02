'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

const questions = [
  {
    q: 'Est-ce vraiment gratuit ?',
    r: "Oui, ProformaAfrica est 100% gratuit. Aucun abonnement, aucune carte bancaire requise.",
  },
  {
    q: 'Dois-je créer un compte ?',
    r: "Non. Aucune inscription nécessaire. Ouvrez l'outil, remplissez le formulaire et téléchargez.",
  },
  {
    q: 'Mes données sont-elles sauvegardées ?',
    r: "Les données restent dans votre navigateur le temps de la session. Rien n'est envoyé sur un serveur.",
  },
  {
    q: 'Puis-je ajouter mon logo ?',
    r: "Oui, vous pouvez uploader votre logo (PNG, JPG) et il apparaîtra sur votre PDF.",
  },
  {
    q: 'Quelles devises sont supportées ?',
    r: "XOF, XAF, MAD (Dirham), EUR et USD. D'autres devises seront ajoutées prochainement.",
  },
  {
    q: "Puis-je modifier une facture après l'avoir téléchargée ?",
    r: "Oui, tant que vous n'avez pas rechargé la page. Modifiez le formulaire et retéléchargez le PDF.",
  },
  {
    q: 'Le PDF est-il professionnel ?',
    r: "Oui. Le PDF généré est de qualité professionnelle avec votre branding, vos couleurs et vos informations.",
  },
  {
    q: 'Fonctionne-t-il sur mobile ?',
    r: "Oui, ProformaAfrica est responsive et fonctionne sur tous les appareils.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{
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
          FAQ
        </p>
        <h2 style={{
          fontFamily: 'var(--font-kaushan)',
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.5vw, 52px)',
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          Questions fréquentes.
        </h2>
      </div>

      <div style={{ maxWidth: 680, margin: '48px auto 0' }}>
        {questions.map((item, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--text)',
              }}>{item.q}</span>
              <CaretDown
                size={18}
                color="var(--text-muted)"
                style={{
                  flexShrink: 0,
                  marginLeft: 16,
                  transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
            {openIndex === idx && (
              <p style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 14,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                paddingTop: 12,
                margin: 0,
                animation: 'fadeInFaq 0.2s ease',
              }}>{item.r}</p>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
