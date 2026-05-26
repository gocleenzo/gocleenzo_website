import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import './globals.css';

export const metadata = {
  title: 'Cleenzo — Trusted Home Cleaning in Maharashtra',
  description: 'Book professional home cleaning services across Maharashtra. Bathrooms, kitchens, full home. Vetted cleaners. Instant booking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LoginModal />
        <Toaster position="top-right" />
      </body>
    </html>
  );
} 