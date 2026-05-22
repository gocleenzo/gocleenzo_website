'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-cyan-500 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Cleenzo
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/services">Services</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/cities/nashik">Nashik</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cyan-600 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/how-it-works" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}