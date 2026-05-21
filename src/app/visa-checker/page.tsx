'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Shield } from 'lucide-react';
import NationalitySearch from '@/components/NationalitySearch';
import VisaResultCard from '@/components/VisaResultCard';
import visaData from '../../../data/visa-requirements.json';
import type { VisaRequirementsData, CountryCode } from '@/types';

const data = visaData as VisaRequirementsData;
const COUNTRIES: { code: CountryCode; name: string; flag: string; university: string }[] = [
  { code: 'ES', name: 'Spain',          flag: '🇪🇸', university: 'URJC Madrid' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', university: 'Bangor University' },
  { code: 'MX', name: 'Mexico',         flag: '🇲🇽', university: 'UATx Tlaxcala' },
  { code: 'PT', name: 'Portugal',       flag: '🇵🇹', university: 'Partner TBD' },
];
const nationalities = Object.keys(data.nationalities).sort();

export default function VisaCheckerPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const results = selected ? data.nationalities[selected] : null;

  return (
    <>
      <section className="relative min-h-[260px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)' }}>
          <Image
            src="/images/globe-hero-bg.jpg"
            alt="GLOBE programme hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 py-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={18} style={{ color: 'var(--teal-primary)' }} />
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--teal-primary)' }}>Visa Requirements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins,sans-serif' }}>Visa Requirements Checker</h1>
          <p className="text-white/80">Select your nationality to instantly see what you need for each GLOBE destination.</p>
          <p className="text-white/50 text-xs mt-3">Last updated: {data.lastUpdated} · Always verify with official sources.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:hidden mb-4">
          <button onClick={() => setMobileOpen(v => !v)}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between"
            style={{ background: selected ? 'var(--teal-primary)' : 'var(--card-bg)', color: selected ? '#fff' : 'var(--text-dark)', border: '1px solid var(--border)' }}>
            <span>{selected ? `Nationality: ${selected}` : 'Select your nationality ▾'}</span>
            <span>{mobileOpen ? '▲' : '▼'}</span>
          </button>
          {mobileOpen && (
            <div className="mt-2 rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: 'var(--border)' }}>
              <NationalitySearch nationalities={nationalities} selected={selected} onSelect={nat => { setSelected(nat); setMobileOpen(false); }} />
            </div>
          )}
        </div>

        <div className="flex gap-6 items-start">
          <div className="hidden md:flex flex-col w-72 shrink-0 sticky top-20">
            <NationalitySearch nationalities={nationalities} selected={selected} onSelect={setSelected} />
          </div>
          <div className="flex-1 min-w-0">
            {!selected ? (
              <div className="flex flex-col items-center justify-center rounded-2xl py-20 px-8 text-center"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--teal-light)' }}>
                  <Shield size={28} style={{ color: 'var(--teal-primary)' }} />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Poppins,sans-serif', color: 'var(--text-dark)' }}>Select your nationality</h2>
                <p style={{ color: 'var(--text-light)', maxWidth: 340 }}>Choose your nationality from the list to instantly see visa requirements for all four GLOBE destinations.</p>
                <p className="text-xs mt-4" style={{ color: 'var(--text-light)' }}>{nationalities.length} nationalities available</p>
              </div>
            ) : results ? (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--text-medium)' }}>
                  Showing requirements for <strong style={{ color: 'var(--teal-primary)' }}>{selected}</strong> passport holders
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COUNTRIES.map(({ code, name, flag, university }) => (
                    <VisaResultCard key={code} countryCode={code} countryName={`${name} — ${university}`} flag={flag} data={results[code]} />
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl text-xs" style={{ background: '#FFF9E6', color: '#92400E', border: '1px solid #FDE68A' }}>
                  <strong>⚠️ Disclaimer: </strong>{data.disclaimer}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Nationality not found</p>
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>Please verify requirements directly with the official embassy of each destination country.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
