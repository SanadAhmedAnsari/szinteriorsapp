import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-error-handler';

export function usePageContent(pageId: string, defaultContent: any) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pages', pageId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const sections = data.sections || {};
          const mergedContent = { ...defaultContent };
          
          Object.keys(sections).forEach(key => {
            mergedContent[key] = sections[key].value;
          });
          
          setContent(mergedContent);
        }
      } catch (err) {
        try {
          handleFirestoreError(err, OperationType.GET, `pages/${pageId}`);
        } catch (e) {
          setError(e as Error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [pageId]);

  return { content, loading, error };
}
