'use client';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  X, MapPin, Calendar, Home, Train, Smartphone,
  FileText, Heart, CreditCard, Mail, Info, CheckCircle, XCircle, ExternalLink
} from 'lucide-react';
import type { MobilityPhase, MobilityTab, PlatformLink } from '@/types';

const ALL_TABS: { key: MobilityTab; label: string; icon: ReactNode }[] = [
  { key: 'accommodation', label: 'Housing',   icon: <Home size={14} /> },
  { key: 'transport',     label: 'Transport', icon: <Train size={14} /> },
  { key: 'sim',           label: 'SIM Cards', icon: <Smartphone size={14} /> },
  { key: 'permit',        label: 'Residence', icon: <FileText size={14} /> },
  { key: 'insurance',     label: 'Health',    icon: <Heart size={14} /> },
  { key: 'banking',       label: 'Banking',   icon: <CreditCard size={14} /> },
  { key: 'contacts',      label: 'Contacts',  icon: <Mail size={14} /> },
];

function Tip({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
      <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>💡</span>{text}
    </li>
  );
}

function Platforms({ items }: { items: PlatformLink[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item =>
        item.url ? (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}
          >
            {item.name} <ExternalLink size={10} />
          </a>
        ) : (
          <span
            key={item.name}
            className="px-2.5 py-1 rounded-full text-xs"
            style={{ background: '#F3F4F6', color: 'var(--text-medium)' }}
          >
            {item.name}
          </span>
        )
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{title}</p>
      {children}
    </div>
  );
}

export default function MobilityModal({ phase, onClose }: { phase: MobilityPhase; onClose: () => void }) {
  // Determine which tabs to show for this country
  const TABS = phase.tabs
    ? ALL_TABS.filter(t => phase.tabs!.includes(t.key))
    : ALL_TABS;

  const [tab, setTab] = useState<MobilityTab>(TABS[0]?.key ?? 'accommodation');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const tabContent: Partial<Record<MobilityTab, ReactNode>> = {
    accommodation: (
      <div className="space-y-5">
        {phase.accommodation.description && (
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-dark)' }}>
            {phase.accommodation.description}
          </p>
        )}
        {phase.accommodation.budget && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
              {phase.accommodation.budget}
            </span>
          </div>
        )}
        {phase.accommodation.platforms.length > 0 && (
          <Block title="Where to look">
            <Platforms items={phase.accommodation.platforms} />
          </Block>
        )}
        {phase.accommodation.tips.length > 0 && (
          <Block title="Tips">
            <ul className="space-y-2">
              {phase.accommodation.tips.map(t => <Tip key={t} text={t} />)}
            </ul>
          </Block>
        )}
      </div>
    ),

    transport: (
      <div className="space-y-5">
        {phase.transport.description && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
            {phase.transport.description}
          </p>
        )}
        {phase.transport.options.length > 0 && (
          <Block title="Options">
            <ul className="space-y-2">
              {phase.transport.options.map(o => (
                <li key={o} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                  <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>🚌</span>{o}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {phase.transport.platforms && phase.transport.platforms.length > 0 && (
          <Block title="Booking Platforms">
            <Platforms items={phase.transport.platforms} />
          </Block>
        )}
        {phase.transport.tips.length > 0 && (
          <Block title="Tips">
            <ul className="space-y-2">{phase.transport.tips.map(t => <Tip key={t} text={t} />)}</ul>
          </Block>
        )}
      </div>
    ),

    sim: (
      <div className="space-y-5">
        {phase.simCards.recommended && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--teal-light)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: 'var(--teal-primary)' }}>⭐ Recommended</p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
              {phase.simCards.recommended}
            </p>
          </div>
        )}
        {phase.simCards.providers.length > 0 && (
          <Block title="Providers">
            <div className="flex flex-wrap gap-2">
              {phase.simCards.providers.map(p => (
                <span key={p} className="px-2.5 py-1 rounded-full text-xs"
                  style={{ background: '#F3F4F6', color: 'var(--text-medium)' }}>{p}</span>
              ))}
            </div>
          </Block>
        )}
        {phase.simCards.tips.length > 0 && (
          <Block title="Tips">
            <ul className="space-y-2">{phase.simCards.tips.map(t => <Tip key={t} text={t} />)}</ul>
          </Block>
        )}
      </div>
    ),

    permit: (
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          {phase.residencePermit.required
            ? <><CheckCircle size={18} style={{ color: '#EF4444' }} /><span className="font-semibold text-sm" style={{ color: '#EF4444' }}>Permit required</span></>
            : <><XCircle size={18} style={{ color: '#22C55E' }} /><span className="font-semibold text-sm" style={{ color: '#22C55E' }}>No permit required</span></>
          }
        </div>
        {phase.residencePermit.name && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--teal-light)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--teal-primary)' }}>Document</p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>{phase.residencePermit.name}</p>
          </div>
        )}
        {phase.residencePermit.timeline && (
          <p className="text-sm" style={{ color: 'var(--text-medium)' }}>
            <strong>Timeline:</strong> {phase.residencePermit.timeline}
          </p>
        )}
        {phase.residencePermit.documents.length > 0 && (
          <Block title="Required Documents">
            <ul className="space-y-1.5">
              {phase.residencePermit.documents.map(d => (
                <li key={d} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                  <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>📄</span>{d}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {phase.residencePermit.notes && (
          <div className="p-4 rounded-xl" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#EA580C' }}>⚠️ Important</p>
            <p className="text-sm" style={{ color: '#7C2D12' }}>{phase.residencePermit.notes}</p>
          </div>
        )}
      </div>
    ),

    insurance: phase.healthInsurance ? (
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
        {phase.healthInsurance}
      </p>
    ) : null,

    banking: phase.banking ? (
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}
        dangerouslySetInnerHTML={{ __html: phase.banking }} />
    ) : null,

    contacts: (
      <div className="space-y-3">
        {phase.keyContacts.map(c => (
          <div key={c.label}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 p-4 rounded-xl"
            style={{ background: '#F9FAFB', border: '1px solid var(--border)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{c.label}</span>
            <a href={`mailto:${c.email}`} className="text-sm hover:underline" style={{ color: 'var(--teal-primary)' }}>
              {c.email}
            </a>
          </div>
        ))}
        {phase.additionalNotes.length > 0 && (
          <div className="mt-4 p-4 rounded-xl" style={{ background: '#F0FDFA', border: '1px solid #99F6E4' }}>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} style={{ color: 'var(--teal-primary)' }} />
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--teal-primary)' }}>
                Additional Notes
              </p>
            </div>
            <ul className="space-y-2">
              {phase.additionalNotes.map(n => (
                <li key={n} className="flex gap-2 text-xs" style={{ color: 'var(--text-medium)' }}>
                  <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>ℹ️</span>{n}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          width: 'min(620px, 100vw)',
          background: '#ffffff',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.2)',
          animation: 'slideInRight 0.25s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 shrink-0"
          style={{ background: `linear-gradient(135deg,${phase.color}33,${phase.color}88)` }}>
          <Image
            src={phase.image}
            alt={phase.country}
            fill
            className="object-cover object-center"
            sizes="620px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/30"
            style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}
            aria-label="Close">
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-4">
            <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ background: 'rgba(0,201,184,0.85)' }}>{phase.phase}</span>
            <div className="flex items-center gap-3">
              {/* Real flag image — renders correctly on all platforms */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w80/${phase.countryCode.toLowerCase()}.png`}
                alt={phase.country}
                width={44}
                height={30}
                style={{ borderRadius: 4, objectFit: 'cover', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
              />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins,sans-serif' }}>
                {phase.country}
              </h2>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="flex flex-wrap gap-4 px-5 py-4 shrink-0 border-b"
          style={{ borderColor: 'var(--border)', background: '#ffffff' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-light)' }}>University</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
              {phase.university}
              <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
                {phase.universityShort}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--teal-primary)' }}>
            <MapPin size={13} />
            <span className="text-sm font-semibold">{phase.city}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-medium)' }}>
            <Calendar size={13} />
            <span className="text-sm">{phase.duration}</span>
          </div>
        </div>

        {/* Tab bar — only shows tabs configured for this country */}
        {TABS.length > 1 && (
          <div className="flex overflow-x-auto gap-1.5 px-5 py-3 shrink-0 border-b"
            style={{ borderColor: 'var(--border)', scrollbarWidth: 'none', background: '#ffffff' }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                style={tab === t.key
                  ? { background: 'var(--teal-primary)', color: 'white' }
                  : { background: '#F3F4F6', color: 'var(--text-medium)' }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5" style={{ background: '#f8f9fa' }}>
          {tabContent[tab] ?? null}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
