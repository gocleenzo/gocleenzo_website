import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Cleenzo — Trusted Home Cleaning in Nashik',
  description: 'Book professional home cleaning services in Nashik. Bathrooms, kitchens, full home. Vetted cleaners. Instant booking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}