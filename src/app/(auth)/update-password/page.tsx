'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const GREEN = '#1A6B3C';
const GOLD = '#C8972A';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpdate() {
    setError('');
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError('Une erreur est survenue.');
    else router.push('/login?message=password_updated');
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
      <p
        style={{
          fontFamily: 'var(--font-montserrat)',
          textAlign: 'center',
          color: '#6B6B6B',
          fontSize: 14,
          marginBottom: 28,
        }}
      >
        Choisissez votre nouveau mot de passe
      </p>

      {[
        { label: 'Nouveau mot de passe', value: password, set: setPassword },
        { label: 'Confirmer', value: confirm, set: setConfirm },
      ].map(({ label, value, set }) => (
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
            type="password"
            placeholder="••••••••"
            value={value}
            onChange={(e) => set(e.target.value)}
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
        onClick={handleUpdate}
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
        }}
      >
        {loading ? 'Mise a jour...' : 'Mettre a jour le mot de passe'}
      </button>
    </div>
  );
}
