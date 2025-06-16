'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

type User = {
  name: string;
  email: string;
};

export default function FirestoreDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const data: User[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as User);
    });
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'users'), { name, email });
      setName('');
      setEmail('');
      await fetchUsers();
    } catch (err) {
      console.error('שגיאה בהוספה:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📋 טופס משתמשים</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="שם"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="אימייל"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'שולח...' : 'הוסף משתמש'}
        </button>
      </form>

      <div className="divider my-6">משתמשים קיימים</div>

      {users.length === 0 ? (
        <p className="text-center">אין נתונים</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={index} className="p-3 bg-base-200 rounded-box">
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
