'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Home, Train, Smartphone, FileText, Heart,
  CreditCard, Mail, Info, CheckCircle, XCircle
} from 'lucide-react';
import type { MobilityPhase } from '@/types';

type Tab = 'accommodation' | 'transport' | 'sim' | 'permit' | 'insurance' | 'banking' | 'contacts';

const TABS: { key: Tab; label: string; icon: ReactNode }[] = [
  { key: 'accommodation', label: 'Housing',   icon: <Home size={15} /> },
  { key: 'transport',     label: 'Transport', icon: <Train size={15} /> },
  { key: 'sim',           label: 'SIM Cards', icon: <Smartphone size={15} /> },
  { key: 'permit',        label: 'Residence', icon: <FileText size={15} /> },
  { key: 'insurance',     label: 'Health',    icon: <Heart size={15} /> },
  { key: 'banking',       label: 'Banking',   icon: <CreditCard size={15} /> },
  { key: 'contacts',      label: 'Contacts',  icon: <Mail size={15} /> },
];

function Tip({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
      <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>💡</span>{text}
    </li>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(i => (
        <span key={i} className="px-2.5 py-1 rounded-full text-xs"
          style={{ background: '#F3F4F6', color: 'var(--text-medium)' }}>{i}</span>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{title}</p>
      {children}
    </div>
  );
}

export default function MobilityDetail({ phase }: { phase: MobilityPhase }) {
  const [tab, setTab] = useState<Tab>('accommodation');

  const content: Record<Tab, ReactNode> = {
    accommodation: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
          {phase.accommodation.description}
        </p>
        {phase.accommodation.budget && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Budget:</span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
              {phase.accommodation.budget}
            </span>
          </div>
        )}
        {phase.accommodation.platforms?.length > 0 && (
          <Section title="Platforms">
            <Pills items={phase.accommodation.platforms} />
          </Section>
        )}
        {phase.accommodation.tips?.length > 0 && (
          <Section title="Tips">
            <ul className="space-y-2">
              {phase.accommodation.tips.map(t => <Tip key={t} text={t} />)}
            </ul>
          </Section>
        )}
      </div>
    ),

    transport: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
          {phase.transport.description}
        </p>
        {phase.transport.options?.length > 0 && (
          <Section title="Options">
            <ul className="space-y-2">
              {phase.transport.options.map(o => (
                <li key={o} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                  <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>🚌</span>{o}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {phase.transport.tips?.length > 0 && (
          <Section title="Tips">
            <ul className="space-y-2">
              {phase.transport.tips.map(t => <Tip key={t} text={t} />)}
            </ul>
          </Section>
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
        {phase.simCards.providers?.length > 0 && (
          <Section title="Providers">
            <Pills items={phase.simCards.providers} />
          </Section>
        )}
        {phase.simCards.tips?.length > 0 && (
          <Section title="Tips">
            <ul className="space-y-2">
              {phase.simCards.tips.map(t => <Tip key={t} text={t} />)}
            </ul>
          </Section>
        )}
      </div>
    ),

    permit: (
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          {phase.residencePermit.required ? (
            <>
              <CheckCircle size={18} style={{ color: '#EF4444' }} />
              <span className="font-semibold text-sm" style={{ color: '#EF4444' }}>Permit required</span>
            </>
          ) : (
            <>
              <XCircle size={18} style={{ color: '#22C55E' }} />
              <span className="font-semibold text-sm" style={{ color: '#22C55E' }}>No permit required</span>
            </>
          )}
        </div>
        {phase.residencePermit.name && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--teal-light)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: 'var(--teal-primary)' }}>Document</p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
              {phase.residencePermit.name}
            </p>
          </div>
        )}
        {phase.residencePermit.timeline && (
          <p className="text-sm" style={{ color: 'var(--text-medium)' }}>
            <strong>Timeline:</strong> {phase.residencePermit.timeline}
          </p>
        )}
        {phase.residencePermit.documents?.length > 0 && (
          <Section title="Required Documents">
            <ul className="space-y-1.5">
              {phase.residencePermit.documents.map(d => (
                <li key={d} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                  <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>📄</span>{d}
                </li>
              ))}
            </ul>
          </Section>
        )}
        {phase.residencePermit.notes && (
          <div className="p-4 rounded-xl" style={{ background: '#FFF7ED', border: '1px solid #FED7AA' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#EA580C' }}>
              ⚠️ Important Note
            </p>
            <p className="text-sm" style={{ color: '#7C2D12' }}>{phase.residencePermit.notes}</p>
          </div>
        )}
      </div>
    ),

    insurance: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
          {phase.healthInsurance}
        </p>
      </div>
    ),

    banking: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
          {phase.banking}
        </p>
      </div>
    ),

    contacts: (
      <div className="space-y-3">
        {phase.keyContacts.map(c => (
          <div key={c.label}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 p-4 rounded-xl"
            style={{ background: '#F9FAFB', border: '1px solid var(--border)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>{c.label}</span>
            <a href={`mailto:${c.email}`} className="text-sm font-medium hover:underline"
              style={{ color: 'var(--teal-primary)' }}>
              {c.email}
            </a>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex overflow-x-auto gap-1.5 pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
            style={tab === t.key
              ? { background: 'var(--teal-primary)', color: 'white' }
              : { background: '#F3F4F6', color: 'var(--text-medium)' }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="p-6 rounded-2xl min-h-[220px]"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
        {content[tab]}
      </div>

      {/* Additional notes */}
      {phase.additionalNotes?.length > 0 && (
        <div className="mt-6 p-6 rounded-2xl"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} style={{ color: 'var(--teal-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
              Additional Information
            </p>
          </div>
          <ul className="space-y-2">
            {phase.additionalNotes.map(n => (
              <li key={n} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>ℹ️</span>{n}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
