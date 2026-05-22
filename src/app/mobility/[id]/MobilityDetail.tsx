import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import mobilityData from '../../../../data/mobility.json';
import type { MobilityPhase } from '@/types';
import MobilityDetail from './MobilityDetail';

export function generateStaticParams() {
  return (mobilityData as MobilityPhase[]).map(p => ({ id: p.id }));
}

export default function MobilityPhasePage({ params }: { params: { id: string } }) {
  const phase = (mobilityData as MobilityPhase[]).find(p => p.id === params.id);
  if (!phase) notFound();

  return (
    <main style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>

      {/* Full-width hero image */}
      <div className="relative h-72 md:h-96 w-full"
        style={{ background: `linear-gradient(135deg,${phase.color}33,${phase.color}66)` }}>
        <Image
          src={phase.image}
          alt={`${phase.university} — ${phase.city}`}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="max-w-5xl mx-auto w-full">
            <Link href="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
              <ArrowLeft size={16} /> Back to Destinations
            </Link>
          </div>
          <div className="max-w-5xl mx-auto w-full">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(0,201,184,0.85)' }}>
              {phase.phase}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{phase.flag}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: 'Poppins,sans-serif' }}>
                {phase.country}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Info strip */}
        <div className="flex flex-wrap gap-6 mb-8 p-5 rounded-2xl"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: 'var(--text-light)' }}>University</p>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-dark)' }}>
              {phase.university}
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
                {phase.universityShort}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: 'var(--text-light)' }}>City</p>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--teal-primary)' }}>
              <MapPin size={14} />
              <span className="font-semibold text-sm">{phase.city}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: 'var(--text-light)' }}>Duration</p>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-dark)' }}>
              <Calendar size={14} />
              <span className="font-semibold text-sm">{phase.duration}</span>
            </div>
          </div>
        </div>

        {/* Tabs + content (client component) */}
        <MobilityDetail phase={phase} />
      </div>
    </main>
  );
}
