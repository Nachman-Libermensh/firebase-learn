// app/login/page.tsx
'use client';

import { useState } from 'react';
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const router = useRouter(); // אם אתה משתמש ב-next/navigation
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // קבל את ה־ID Token
    const token = await getIdToken(user);

    // שמור אותו כ-cookie
    document.cookie = `token=${token}; path=/; max-age=3600`; // שעת תוקף

    alert('התחברת בהצלחה!');
    // הפנייה (אם אתה משתמש ב-next/navigation)
    router.push('/');

  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>התחברות</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="סיסמה"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button
              className="btn"
        
        type="submit">התחבר</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
