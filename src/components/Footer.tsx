import Link from 'next/link';
const links = [
  { href: '/', label: 'Mobility' },
  { href: '/visa-checker', label: 'Visa Checker' },
  { href: '/contact', label: 'Contact' },
];
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#1A1A2E', color: '#A0A0C0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, var(--teal-primary), #667eea)' }}>G</div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>GLOBE <span style={{ color: 'var(--teal-primary)' }}>Assistant</span></span>
            </div>
            <p className="text-sm" style={{ color: '#7A7A9A' }}>Your complete guide to GLOBE Erasmus Mundus student mobility across Spain, UK, Mexico, and Portugal.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {links.map(l => <li key={l.href}><Link href={l.href} className="text-sm hover:text-white transition-colors" style={{ color: '#7A7A9A' }}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h3>
            <p className="text-sm" style={{ color: '#7A7A9A' }}>Powered by GLOBE Erasmus Mundus students.<br />Built to make mobility easier for every cohort.</p>
            <p className="text-sm mt-2" style={{ color: '#7A7A9A' }}>© {year} GLOBE Assistant</p>
          </div>
        </div>
        <div className="border-t pt-6 text-xs text-center" style={{ borderColor: '#2A2A4E', color: '#5A5A7A' }}>
          <strong className="text-white">Disclaimer:</strong> All visa information is provided for guidance only. Always verify current requirements directly with the relevant embassy or official immigration authority before making travel arrangements.
        </div>
      </div>
    </footer>
  );
}
