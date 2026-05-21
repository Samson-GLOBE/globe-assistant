'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, CheckCircle, XCircle, Info } from 'lucide-react';
import type { VisaCountryRequirement } from '@/types';

interface Props {
  countryCode: string; countryName: string; flag: string; data: VisaCountryRequirement;
}

export default function VisaResultCard({ countryCode, countryName, flag, data }: Props) {
  const [open, setOpen] = useState(false);
  const req = data.required;
  const eea = data.visaFreeEEA;
  return (
    <article className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'var(--card-bg)', border: `2px solid ${req ? '#FEE2E2' : '#DCFCE7'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{flag}</span>
            <h3 className="text-base font-bold" style={{ fontFamily: 'Poppins,sans-serif', color: 'var(--text-dark)' }}>{countryName}</h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {req ? (
              <><XCircle size={16} style={{ color: 'var(--badge-red)' }} />
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#FEE2E2', color: 'var(--badge-red)' }}>Visa Required</span></>
            ) : (
              <><CheckCircle size={16} style={{ color: 'var(--badge-green)' }} />
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: eea ? '#DBEAFE' : '#DCFCE7', color: eea ? '#1D4ED8' : 'var(--badge-green)' }}>
                {eea ? 'Visa-Free (EEA)' : 'No Visa Required'}</span></>
            )}
          </div>
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: req ? 'var(--teal-primary)' : 'var(--badge-green)' }}>{data.visaType}</p>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>{data.duration}</p>
        {data.processingTime !== 'N/A' && <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>⏱ Processing: {data.processingTime}</p>}
      </div>
      <button onClick={() => setOpen(v => !v)} aria-expanded={open}
        className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold border-t hover:bg-[#E6FAF8] transition-colors"
        style={{ borderColor: 'var(--border)', color: 'var(--teal-primary)' }}>
        <span>Full details</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="px-4 pb-4 pt-3 space-y-4">
          {data.requiredDocuments.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Required Documents</p>
              <ul className="space-y-1.5">
                {data.requiredDocuments.map(doc => (
                  <li key={doc} className="flex gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                    <span style={{ color: 'var(--teal-primary)', flexShrink: 0 }}>✓</span>{doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.notes && (
            <div className="p-3 rounded-xl flex gap-2 text-xs" style={{ background: 'var(--teal-light)', color: 'var(--text-medium)' }}>
              <Info size={13} style={{ color: 'var(--teal-primary)', flexShrink: 0, marginTop: 1 }} />
              <span>{data.notes}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <a href={data.embassyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:underline"
              style={{ background: 'var(--teal-light)', color: 'var(--teal-primary)' }}>
              Official Gov Site <ExternalLink size={12} />
            </a>
            {data.officialInfoUrl !== data.embassyUrl && (
              <a href={data.officialInfoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:underline"
                style={{ background: '#F3F4F6', color: 'var(--text-medium)' }}>
                Visa Info Page <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
