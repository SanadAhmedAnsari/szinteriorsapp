
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateBranding() {
  console.log('🚀 Starting branding update in Firestore...');
  try {
    console.log('Connecting to collection: settings, document: seo');
    const seoRef = doc(db, 'settings', 'seo');
    console.log('Updating document with new title: Apka Interior Wala | Best Interiors & Construction Bhopal');
    await setDoc(seoRef, {
      metaTitle: 'Apka Interior Wala | Best Interiors & Construction Bhopal',
      metaDescription: 'Apka Interior Wala is the best company/firm for interior design and construction in Bhopal, India, offering affordable luxury residential and commercial solutions.',
      keywords: 'best interior, interior design bhopal, construction agency india, luxury home interiors, commercial interior design, best company for interior',
      ogImage: ''
    }, { merge: true });
    console.log('✅ Firestore Branding Updated Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to update Firestore:', error);
    process.exit(1);
  }
}

updateBranding();
