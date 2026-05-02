'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    window.location.href = '/login';
  };

  return (
    <button type="button" onClick={handleLogout}>
      Se deconnecter
    </button>
  );
}
