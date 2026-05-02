'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const GREEN = '#1A6B3C';
const GOLD = '#C8972A';

export default function RegisterPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleRegister() {
    setError('');
    if (!fullName || !email || !password || !confirm) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setError(
        error.message.includes('already')
          ? 'Un compte existe deja avec cet email.'
          : 'Une erreur est survenue.'
      );
    } else setSuccess(true);
  }

  async function handleGoogle() {
    setLoadingGoogle(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  const cardStyle: CSSProperties = {
    background: '#fff',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
  };

  if (success)
    return (
      <div style={cardStyle}>
        <div
          style={{
            fontFamily: 'var(--font-kaushan)',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          <span style={{ color: GREEN }}>Proforma</span>
          <span style={{ color: GOLD }}>Africa</span>
        </div>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
          <h2
            style={{
              fontFamily: 'var(--font-kaushan)',
              fontWeight: 400,
              fontSize: 22,
              color: '#0D0D0D',
              margin: '0 0 8px',
            }}
          >
            Verifiez votre email
          </h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', color: '#6B6B6B', fontSize: 14 }}>
            Un lien de confirmation a ete envoye a <strong>{email}</strong>.
          </p>
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-montserrat)', fontSize: 14 }}>
          <Link href="/login" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>
            ← Retour a la connexion
          </Link>
        </p>
      </div>
    );

  return (
    <div style={cardStyle}>
      <div
        style={{ fontFamily: 'var(--font-kaushan)', fontSize: 24, textAlign: 'center', marginBottom: 6 }}
      >
        <span style={{ color: GREEN }}>Proforma</span>
        <span style={{ color: GOLD }}>Africa</span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-montserrat)',
          textAlign: 'center',
          color: '#6B6B6B',
          fontSize: 14,
          marginBottom: 28,
        }}
      >
        Creez votre compte gratuitement
      </p>

      <button
        onClick={handleGoogle}
        disabled={loadingGoogle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '11px 16px',
          border: '1.5px solid #E2DDD6',
          borderRadius: 8,
          background: '#fff',
          fontSize: 14,
          fontFamily: 'var(--font-montserrat)',
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 10 }}>
          <path
            fill="#4285F4"
            d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
          />
          <path
            fill="#34A853"
            d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"
          />
          <path
            fill="#FBBC05"
            d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"
          />
          <path
            fill="#EA4335"
            d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"
          />
        </svg>
        {loadingGoogle ? 'Redirection...' : 'Continuer avec Google'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
        <span style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF', fontSize: 13 }}>
          ou
        </span>
        <span style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
      </div>

      {[
        {
          label: 'Prenom et nom',
          type: 'text',
          value: fullName,
          set: setFullName,
          placeholder: 'Jean Dupont',
        },
        {
          label: 'Email',
          type: 'email',
          value: email,
          set: setEmail,
          placeholder: 'vous@example.com',
        },
        {
          label: 'Mot de passe',
          type: 'password',
          value: password,
          set: setPassword,
          placeholder: 'Min. 6 caracteres',
        },
        {
          label: 'Confirmer le mot de passe',
          type: 'password',
          value: confirm,
          set: setConfirm,
          placeholder: '••••••••',
        },
      ].map(({ label, type, value, set, placeholder }) => (
        <div key={label} style={{ marginBottom: 16 }}>
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
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => set(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
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
      ))}

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
        onClick={handleRegister}
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
        {loading ? 'Creation...' : 'Creer mon compte'}
      </button>

      <p
        style={{
          fontFamily: 'var(--font-montserrat)',
          textAlign: 'center',
          fontSize: 14,
          color: '#6B6B6B',
        }}
      >
        Deja un compte ?{' '}
        <Link href="/login" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>
          Se connecter
        </Link>
      </p>
    </div>
  );
}
