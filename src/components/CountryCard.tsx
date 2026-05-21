'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, MapPin, Calendar, Home, Train, Smartphone, FileText, Heart, CreditCard, Mail, Info } from 'lucide-react';
import type { MobilityPhase } from '@/types';

type Tab = 'accommodation' | 'transport' | 'sim' | 'permit' | 'insurance' | 'banking' | 'contacts';
const TABS: { key: Tab; label: string; icon: ReactNode }[] = [
  { key: 'accommodation', label: 'Housing',    icon: <Home size={14} /> },
  { key: 'transport',     label: 'Transport',  icon: <Train size={14} /> },
  { key: 'sim',           label: 'SIM Cards',  icon: <Smartphone size={14} /> },
  { key: 'permit',        label: 'Residence',  icon: <FileText size={14} /> },
  { key: 'insurance',     label: 'Health',     icon: <Heart size={14} /> },
  { key: 'banking',       label: 'Banking',    icon: <CreditCard size={14} /> },
  { key: 'contacts',      label: 'Contacts',   icon: <Mail size={14} /> },
];

function Tips({ tips }: { tips: string[] }) {
  if (!tips.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Tips</p>
      <ul className="space-y-1.5">
        {tips.map(t => (
          <li key={t} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
            <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>💡</span>{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(i => (
        <span key={i} className="px-2.5 py-1 rounded-full text-xs" style={{ background: '#F3F4F6', color: 'var(--text-medium)' }}>{i}</span>
      ))}
    </div>
  );
}

export default function CountryCard({ phase }: { phase: MobilityPhase }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<Tab>('accommodation');

  return (
    <article className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

      {/* Image header */}
      <div className="relative h-48 w-full">
        <Image src={phase.image} alt={`${phase.university} — ${phase.city}`} fill className="object-cover"
          sizes="(max-width:768px) 100vw,50vw"
          onError={e => { const p = (e.target as HTMLImageElement).parentElement; if(p) p.style.background=`linear-gradient(135deg,${phase.color}33,${phase.color}66)`; (e.target as HTMLImageElement).style.display='none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow" style={{ color: 'var(--text-medium)' }}>{phase.countryCode}</div>
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,201,184,0.85)' }}>{phase.phase}</div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="text-2xl">{phase.flag}</span>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins,sans-serif' }}>{phase.country}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-1.5" style={{ color: 'var(--teal-primary)' }}>
          <MapPin size={14} /><span className="text-sm font-semibold">{phase.city}</span>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
          {phase.university}
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>{phase.universityShort}</span>
        </p>
        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-light)' }}>
          <Calendar size={14} /><span>{phase.phase} · {phase.duration}</span>
        </div>
        <button onClick={() => setExpanded(v => !v)} aria-expanded={expanded}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-[#E6FAF8]"
          style={{ borderColor: 'var(--teal-primary)', color: 'var(--teal-primary)' }}>
          {expanded ? <>Show less <ChevronUp size={16} /></> : <>Learn more <ChevronDown size={16} /></>}
        </button>
      </div>

      {/* Accordion */}
      <div className={`accordion-content ${expanded ? 'open' : ''}`}>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Tab bar */}
          <div className="flex overflow-x-auto gap-1 px-4 pt-4 pb-2" style={{ scrollbarWidth: 'none' }} role="tablist">
            {TABS.map(t => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{ background: tab === t.key ? 'var(--teal-primary)' : 'var(--teal-light)', color: tab === t.key ? '#fff' : 'var(--teal-primary)' }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className="px-5 pb-6 pt-2">

            {tab === 'accommodation' && (
              <div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-medium)' }}>{phase.accommodation.description}</p>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>Budget: {phase.accommodation.budget}</div>
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--text-light)' }}>Platforms</p>
                  <Pills items={phase.accommodation.platforms} />
                </div>
                <Tips tips={phase.accommodation.tips} />
              </div>
            )}

            {tab === 'transport' && (
              <div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-medium)' }}>{phase.transport.description}</p>
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Options</p>
                  <ul className="space-y-1.5">
                    {phase.transport.options.map(o => <li key={o} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}><span style={{ color: 'var(--teal-primary)' }}>→</span>{o}</li>)}
                  </ul>
                </div>
                <Tips tips={phase.transport.tips} />
              </div>
            )}

            {tab === 'sim' && (
              <div>
                <div className="p-3 rounded-xl mb-3 text-sm font-medium" style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>⭐ {phase.simCards.recommended}</div>
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Providers</p>
                  <Pills items={phase.simCards.providers} />
                </div>
                <Tips tips={phase.simCards.tips} />
              </div>
            )}

            {tab === 'permit' && (
              <div>
                <div className="flex items-start gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                    style={{ background: phase.residencePermit.required ? '#FEE2E2' : '#DCFCE7', color: phase.residencePermit.required ? 'var(--badge-red)' : 'var(--badge-green)' }}>
                    {phase.residencePermit.required ? 'Required' : 'Not required'}
                  </span>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{phase.residencePermit.name}</h3>
                </div>
                <p className="text-xs mb-3 p-2.5 rounded-lg" style={{ background: '#FFF9E6', color: '#92400E' }}>⏱ {phase.residencePermit.timeline}</p>
                {phase.residencePermit.documents.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Documents</p>
                    <ul className="space-y-1.5">
                      {phase.residencePermit.documents.map(d => <li key={d} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}><span style={{ color: 'var(--teal-primary)' }}>✓</span>{d}</li>)}
                    </ul>
                  </div>
                )}
                {phase.residencePermit.notes && (
                  <div className="p-3 rounded-xl text-xs" style={{ background: 'var(--teal-light)', color: 'var(--text-medium)' }}>
                    <Info size={13} className="inline mr-1" style={{ color: 'var(--teal-primary)' }} />{phase.residencePermit.notes}
                  </div>
                )}
              </div>
            )}

            {tab === 'insurance' && <p className="text-sm" style={{ color: 'var(--text-medium)' }}>{phase.healthInsurance}</p>}
            {tab === 'banking' && <p className="text-sm" style={{ color: 'var(--text-medium)' }}>{phase.banking}</p>}

            {tab === 'contacts' && (
              <div className="space-y-3">
                {phase.keyContacts.map(c => (
                  <div key={c.email} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--teal-light)' }}>
                    <Mail size={16} style={{ color: 'var(--teal-primary)', marginTop: 2 }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>{c.label}</p>
                      <a href={`mailto:${c.email}`} className="text-sm font-medium hover:underline" style={{ color: 'var(--teal-primary)' }}>{c.email}</a>
                    </div>
                  </div>
                ))}
                {phase.additionalNotes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Additional notes</p>
                    <ul className="space-y-1.5">
                      {phase.additionalNotes.map(n => <li key={n} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}><span style={{ color: 'var(--teal-primary)' }}>•</span>{n}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
