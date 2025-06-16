import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function saveUserData() {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'משה כהן',
      email: 'moshe@example.com',
      createdAt: new Date(),
    });
    console.log('נשמר במסמך:', docRef.id);
  } catch (e) {
    console.error('שגיאה:', e);
  }
}

export async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
}
