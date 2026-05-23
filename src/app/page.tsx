import Image from 'next/image';
import MobilityCards from '@/components/MobilityCards';
import mobilityData from '../../data/mobility.json';
import type { MobilityPhase } from '@/types';
import { Globe } from 'lucide-react';

const phases = mobilityData as MobilityPhase[];

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

export default function MobilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}>
          <Image
            src="/images/globe-hero-bg.jpg"
            alt="GLOBE programme biodiversity hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe size={20} style={{ color: 'var(--teal-primary)' }} />
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--teal-primary)' }}>Erasmus Mundus</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins,sans-serif' }}>
            GLOBE Mobility Guide
          </h1>
          {/* Country badges with real flag images */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {phases.map(p => (
              <a key={p.id} href={`#${p.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                <FlagImg countryCode={p.countryCode} size={22} />
                <span>{p.country}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mobility cards grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins,sans-serif', color: 'var(--text-dark)' }}>Your Mobility Phases</h2>
          <p style={{ color: 'var(--text-light)' }}>Click &quot;Explore&quot; on any card to see full details for that destination.</p>
        </div>
        <MobilityCards phases={phases} />
      </section>

      {/* Programme timeline */}
      <section className="py-10" style={{ background: 'var(--text-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold mb-6 text-white" style={{ fontFamily: 'Poppins,sans-serif' }}>Programme Timeline</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center">
            {phases.map((p, i) => (
              <div key={p.id} className="flex items-center">
                <div className="flex flex-col items-center text-center px-4 py-2">
                  {/* Flag image in circular teal container */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 overflow-hidden"
                    style={{ background: 'var(--teal-primary)', padding: 0 }}>
                    <FlagImg countryCode={p.countryCode} size={48} />
                  </div>
                  <span className="text-xs font-semibold text-white/90">{p.phase}</span>
                  <span className="text-xs text-white/60">{p.country}</span>
                  <span className="text-xs text-white/50">{p.duration}</span>
                </div>
                {i < phases.length - 1 && (
                  <div className="hidden sm:block w-12 h-0.5 shrink-0"
                    style={{ background: 'var(--teal-primary)', opacity: 0.4 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
