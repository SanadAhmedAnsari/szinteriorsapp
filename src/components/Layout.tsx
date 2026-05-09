import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-stone-900">
      <Navbar />
      <main className="flex-grow pt-40 md:pt-44">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
