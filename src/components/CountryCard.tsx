'use client';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import type { MobilityPhase } from '@/types';

export default function CountryCard({ phase, onExplore }: { phase: MobilityPhase; onExplore: () => void }) {
  return (
    <article className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

      {/* Image header — h-64 for a taller, fully visible photo */}
      <div className="relative h-64 w-full"
        style={{ background: `linear-gradient(135deg,${phase.color}33,${phase.color}66)` }}>
        <Image
          src={phase.image}
          alt={`${phase.university} — ${phase.city}`}
          fill
          className="object-cover object-center"
          sizes="(max-width:768px) 100vw, 50vw"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow"
          style={{ color: 'var(--text-medium)' }}>
          {phase.countryCode}
        </div>
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: 'rgba(0,201,184,0.85)' }}>
          {phase.phase}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="text-2xl">{phase.flag}</span>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins,sans-serif' }}>{phase.country}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-1.5" style={{ color: 'var(--teal-primary)' }}>
          <MapPin size={14} />
          <span className="text-sm font-semibold">{phase.city}</span>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
          {phase.university}
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
            {phase.universityShort}
          </span>
        </p>
        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-light)' }}>
          <Calendar size={14} />
          <span>{phase.phase} · {phase.duration}</span>
        </div>

        <button
          onClick={onExplore}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-[#E6FAF8]"
          style={{ borderColor: 'var(--teal-primary)', color: 'var(--teal-primary)' }}>
          Explore {phase.country} <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
