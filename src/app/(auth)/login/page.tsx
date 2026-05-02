'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const GREEN = '#1A6B3C';
const GOLD = '#C8972A';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError('Email ou mot de passe incorrect.');
    else {
      router.push('/formulaire');
      router.refresh();
    }
  }

  async function handleGoogle() {
    setLoadingGoogle(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
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
        style={{
          fontFamily: 'var(--font-kaushan)',
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 6,
        }}
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
        Connectez-vous a votre compte
      </p>

      {/* Bouton Google */}
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

      {/* Separateur */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
        <span style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF', fontSize: 13 }}>
          ou
        </span>
        <span style={{ flex: 1, height: 1, background: '#E2DDD6' }} />
      </div>

      {/* Champs */}
      {[
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
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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

      <div style={{ textAlign: 'right', marginBottom: 20 }}>
        <Link
          href="/reset-password"
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 13,
            color: GREEN,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Mot de passe oublie ?
        </Link>
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
        onClick={handleLogin}
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
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>

      <p
        style={{
          fontFamily: 'var(--font-montserrat)',
          textAlign: 'center',
          fontSize: 14,
          color: '#6B6B6B',
        }}
      >
        Pas encore de compte ?{' '}
        <Link href="/register" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>
          S&apos;inscrire gratuitement
        </Link>
      </p>
    </div>
  );
}
