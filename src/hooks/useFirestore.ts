import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-error-handler';

export function useFirestore<T>(collectionName: string, constraints: QueryConstraint[] = []) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, collectionName);
        } catch (e) {
          setError(e as Error);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
}
