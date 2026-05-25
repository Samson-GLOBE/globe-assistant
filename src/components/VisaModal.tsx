'use client';
import { useEffect } from 'react';
import { X, CheckCircle, XCircle, ExternalLink, FileText, Info, Clock } from 'lucide-react';
import type { VisaCountryRequirement } from '@/types';

interface Props {
  countryCode: string;
  countryName: string;
  university: string;
  passportCountry: string;
  data: VisaCountryRequirement;
  onClose: () => void;
}

function FlagImg({ countryCode, size = 40 }: { countryCode: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
      alt={countryCode}
      width={size}
      height={Math.round(size * 0.67)}
      style={{ borderRadius: 4, objectFit: 'cover', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
    />
  );
}

export default function VisaModal({ countryCode, countryName, university, passportCountry, data, onClose }: Props) {
  const req = data.required;
  const eea = data.visaFreeEEA;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          width: 'min(560px, 100vw)',
          background: '#ffffff',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.2)',
          animation: 'slideInRight 0.25s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: '#E5E7EB', background: '#ffffff' }}>
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-3 mb-1">
              <FlagImg countryCode={countryCode} size={38} />
              <h2 className="text-xl font-bold truncate" style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}>
                {countryName}
              </h2>
            </div>
            <p className="text-sm" style={{ color: '#4A4A6A' }}>{university}</p>
            <p className="text-xs mt-1" style={{ color: '#7A7A9A' }}>
              Requirements for{' '}
              <strong style={{ color: '#00C9B8' }}>{passportCountry}</strong>{' '}
              passport holders
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 shrink-0"
            style={{ color: '#7A7A9A' }}
            aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Visa status banner */}
        <div
          className="px-5 py-4 border-b shrink-0"
          style={{ borderColor: '#E5E7EB', background: req ? '#FFF5F5' : '#F0FFF4' }}>
          <div className="flex items-center gap-2 mb-1">
            {req
              ? <><XCircle size={20} style={{ color: '#E8453C' }} /><span className="font-bold text-base" style={{ color: '#E8453C' }}>Visa Required</span></>
              : <><CheckCircle size={20} style={{ color: '#22C55E' }} /><span className="font-bold text-base" style={{ color: '#22C55E' }}>{eea ? 'Visa-Free (EEA/EU)' : 'No Visa Required'}</span></>
            }
          </div>
          <p className="text-sm font-medium" style={{ color: req ? '#E8453C' : '#16A34A' }}>{data.visaType}</p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: '#f8f9fa' }}>

          {/* Duration + Processing grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#7A7A9A' }}>Duration</p>
              <p className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>{data.duration}</p>
            </div>
            {data.processingTime !== 'N/A' && (
              <div className="p-3 rounded-xl" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
                <div className="flex items-center gap-1 mb-1">
                  <Clock size={10} style={{ color: '#7A7A9A' }} />
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7A9A' }}>Processing</p>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>{data.processingTime}</p>
              </div>
            )}
          </div>

          {/* Required documents */}
          {data.requiredDocuments.length > 0 && (
            <div className="p-4 rounded-xl" style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} style={{ color: '#00C9B8' }} />
                <p className="text-sm font-semibold" style={{ color: '#1A1A2E' }}>Required Documents</p>
              </div>
              <ul className="space-y-2">
                {data.requiredDocuments.map(doc => (
                  <li key={doc} className="flex gap-2 text-sm" style={{ color: '#4A4A6A' }}>
                    <span style={{ color: '#00C9B8', flexShrink: 0 }}>✓</span>{doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes */}
          {data.notes && (
            <div className="p-4 rounded-xl flex gap-2" style={{ background: '#E6FAF8', border: '1px solid #99F6E4' }}>
              <Info size={14} style={{ color: '#00C9B8', flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: '#4A4A6A' }}>{data.notes}</p>
            </div>
          )}

          {/* Official links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7A7A9A' }}>
              Official Resources
            </p>
            <a
              href={data.embassyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#00C9B8', color: '#ffffff' }}>
              <span>Official Government Site</span>
              <ExternalLink size={14} />
            </a>
            {data.officialInfoUrl !== data.embassyUrl && (
              <a
                href={data.officialInfoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: '#ffffff', border: '1px solid #E5E7EB', color: '#4A4A6A' }}>
                <span>Visa Information Page</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Disclaimer nudge */}
          <p className="text-xs" style={{ color: '#7A7A9A' }}>
            ⚠️ Always verify requirements directly with the official embassy before travelling.
          </p>
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
