'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const GREEN = '#1A6B3C';
const GOLD = '#C8972A';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleReset() {
    setError('');
    if (!email) {
      setError('Veuillez entrer votre email.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setLoading(false);
    if (error) setError('Une erreur est survenue. Reessayez.');
    else setSuccess(true);
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{ fontFamily: 'var(--font-kaushan)', fontSize: 24, textAlign: 'center', marginBottom: 6 }}
      >
        <span style={{ color: GREEN }}>Proforma</span>
        <span style={{ color: GOLD }}>Africa</span>
      </div>

      {success ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h2
            style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 20,
              margin: '0 0 8px',
            }}
          >
            Email envoye !
          </h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', color: '#6B6B6B', fontSize: 14 }}>
            Verifiez votre boite mail pour reinitialiser votre mot de passe.
          </p>
          <Link
            href="/login"
            style={{
              fontFamily: 'var(--font-montserrat)',
              color: GREEN,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ← Retour a la connexion
          </Link>
        </div>
      ) : (
        <>
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              textAlign: 'center',
              color: '#6B6B6B',
              fontSize: 14,
              marginBottom: 28,
            }}
          >
            Entrez votre email pour recevoir un lien de reinitialisation.
          </p>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="vous@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleReset()}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #E2DDD6',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-montserrat)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-montserrat)',
                color: '#DC2626',
                fontSize: 13,
                marginBottom: 12,
                padding: '8px 12px',
                background: '#FEF2F2',
                borderRadius: 6,
              }}
            >
              {error}
            </p>
          )}
          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              width: '100%',
              padding: 12,
              background: GREEN,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-montserrat)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 20,
            }}
          >
            {loading ? 'Envoi...' : 'Envoyer le lien'}
          </button>
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              textAlign: 'center',
              fontSize: 14,
              color: '#6B6B6B',
            }}
          >
            <Link href="/login" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>
              ← Retour a la connexion
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
