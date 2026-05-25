'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Shield } from 'lucide-react';
import NationalitySearch from '@/components/NationalitySearch';
import VisaResultCard from '@/components/VisaResultCard';
import VisaModal from '@/components/VisaModal';
import visaData from '../../../data/visa-requirements.json';
import type { VisaRequirementsData, CountryCode } from '@/types';

const data = visaData as VisaRequirementsData;

const COUNTRIES: { code: CountryCode; name: string; university: string }[] = [
  { code: 'ES', name: 'Spain',          university: 'URJC Madrid' },
  { code: 'GB', name: 'United Kingdom', university: 'Bangor University' },
  { code: 'MX', name: 'Mexico',         university: 'UATx Tlaxcala' },
  { code: 'PT', name: 'Portugal',       university: 'Universidad de Lisboa' },
];

const countries = Object.keys(data.nationalities).sort();

// Real flag image — renders correctly on all platforms including Windows
function FlagImg({ countryCode, size = 28 }: { countryCode: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
      alt={countryCode}
      width={size}
      height={Math.round(size * 0.67)}
      style={{ borderRadius: 3, objectFit: 'cover', display: 'inline-block' }}
    />
  );
}

interface ModalInfo {
  code: CountryCode;
  name: string;
  university: string;
}

export default function VisaCheckerPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<ModalInfo | null>(null);

  const results = selected ? data.nationalities[selected] : null;

  return (
    <>
      {/* Hero */}
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
            <Shield size={18} style={{ color: '#00C9B8' }} />
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#00C9B8' }}>
              Visa Requirements
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins,sans-serif' }}>
            Visa Requirements Checker
          </h1>
          <p className="text-white/80">
            Select your country to instantly see what you need for each GLOBE destination.
          </p>
          {/* Destination country badges with real flag images */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {COUNTRIES.map(c => (
              <div key={c.code}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                <FlagImg countryCode={c.code} size={18} />
                <span>{c.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-3">
            Last updated: {data.lastUpdated} · Always verify with official sources.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Mobile country picker toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between"
            style={{
              background: selected ? '#00C9B8' : '#ffffff',
              color: selected ? '#fff' : '#1A1A2E',
              border: '1px solid #E5E7EB',
            }}>
            <span>{selected ? `Country: ${selected}` : 'Select your country ▾'}</span>
            <span>{mobileOpen ? '▲' : '▼'}</span>
          </button>
          {mobileOpen && (
            <div className="mt-2 rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: '#E5E7EB' }}>
              <NationalitySearch
                nationalities={countries}
                selected={selected}
                onSelect={nat => { setSelected(nat); setMobileOpen(false); }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-72 shrink-0 sticky top-20">
            <NationalitySearch
              nationalities={countries}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          {/* Results area */}
          <div className="flex-1 min-w-0">
            {!selected ? (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-20 px-8 text-center"
                style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#E6FAF8' }}>
                  <Shield size={28} style={{ color: '#00C9B8' }} />
                </div>
                <h2 className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}>
                  Select your country
                </h2>
                <p style={{ color: '#7A7A9A', maxWidth: 340 }}>
                  Choose your country from the list to instantly see visa requirements for all four GLOBE destinations.
                </p>
                <p className="text-xs mt-4" style={{ color: '#7A7A9A' }}>
                  {countries.length} countries available
                </p>
              </div>
            ) : results ? (
              <div>
                <p className="text-sm mb-6" style={{ color: '#4A4A6A' }}>
                  Showing requirements for{' '}
                  <strong style={{ color: '#00C9B8' }}>{selected}</strong>{' '}
                  passport holders
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COUNTRIES.map(({ code, name, university }) => (
                    <VisaResultCard
                      key={code}
                      countryCode={code}
                      countryName={`${name} — ${university}`}
                      data={results[code]}
                      onViewDetails={() => setModal({ code, name, university })}
                    />
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl text-xs"
                  style={{ background: '#FFF9E6', color: '#92400E', border: '1px solid #FDE68A' }}>
                  <strong>⚠️ Disclaimer: </strong>{data.disclaimer}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-8 text-center"
                style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                <p className="text-lg font-semibold mb-2" style={{ color: '#1A1A2E' }}>Country not found</p>
                <p className="text-sm" style={{ color: '#7A7A9A' }}>
                  Please verify requirements directly with the official embassy of each destination country.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visa details modal */}
      {modal && results && (
        <VisaModal
          countryCode={modal.code}
          countryName={`${modal.name} — ${modal.university}`}
          university={modal.university}
          passportCountry={selected!}
          data={results[modal.code]}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
