'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/',             label: 'Mobility'     },
  { href: '/visa-checker', label: 'Visa Checker' },
  { href: '/feedback',     label: 'Experiences'  },
  { href: '/contact',      label: 'Contact'      },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ borderBottom: '2px solid var(--teal-primary)', boxShadow: scrolled ? '0 2px 16px rgba(0,201,184,0.10)' : 'none' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3" aria-label="GLOBE Assistant Home">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, var(--teal-primary), #667eea)' }}>G</div>
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-dark)' }}>
            GLOBE <span style={{ color: 'var(--teal-primary)' }}>Assistant</span>
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} className="px-4 py-2 rounded-full text-sm font-medium transition-all" aria-current={active ? 'page' : undefined}
                  style={{ background: active ? 'var(--teal-primary)' : 'transparent', color: active ? '#fff' : 'var(--text-dark)' }}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`} style={{ background: '#fff', borderTop: open ? '1px solid var(--border)' : 'none' }}>
        <ul className="flex flex-col px-4 py-3 gap-1">
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link href={l.href} className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{ background: active ? 'var(--teal-light)' : 'transparent', color: active ? 'var(--teal-primary)' : 'var(--text-dark)' }}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
