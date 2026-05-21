import Image from 'next/image';
import CountryCard from '@/components/CountryCard';
import mobilityData from '../../data/mobility.json';
import type { MobilityPhase } from '@/types';
import { Globe } from 'lucide-react';

const phases = mobilityData as MobilityPhase[];

export default function MobilityPage() {
  return (
    <>
      <section className="relative min-h-[380px] flex items-center justify-center overflow-hidden">
        {/* Parent div carries the fallback gradient — image renders on top */}
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins,sans-serif' }}>GLOBE Mobility Guide</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Everything you need for your four-country journey — housing, transport, SIM cards, residence permits, and more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {phases.map(p => (
              <a key={p.id} href={`#${p.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span>{p.flag}</span><span>{p.country}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins,sans-serif', color: 'var(--text-dark)' }}>Your Mobility Phases</h2>
          <p style={{ color: 'var(--text-light)' }}>Click &quot;Learn more&quot; on any card to see full details for that destination.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {phases.map(phase => (
            <div key={phase.id} id={phase.id}><CountryCard phase={phase} /></div>
          ))}
        </div>
      </section>

      <section className="py-10" style={{ background: 'var(--text-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold mb-6 text-white" style={{ fontFamily: 'Poppins,sans-serif' }}>Programme Timeline</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center">
            {phases.map((p, i) => (
              <div key={p.id} className="flex items-center">
                <div className="flex flex-col items-center text-center px-4 py-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2" style={{ background: 'var(--teal-primary)' }}>{p.flag}</div>
                  <span className="text-xs font-semibold text-white/90">{p.phase}</span>
                  <span className="text-xs text-white/60">{p.country}</span>
                  <span className="text-xs text-white/50">{p.duration}</span>
                </div>
                {i < phases.length - 1 && <div className="hidden sm:block w-12 h-0.5 shrink-0" style={{ background: 'var(--teal-primary)', opacity: 0.4 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
