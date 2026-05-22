'use client';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { VisaCountryRequirement } from '@/types';

interface Props {
  countryCode: string;
  countryName: string;
  flag: string;
  data: VisaCountryRequirement;
  onViewDetails: () => void;
}

export default function VisaResultCard({ countryName, flag, data, onViewDetails }: Props) {
  const req = data.required;
  const eea = data.visaFreeEEA;

  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: '#ffffff',
        border: `2px solid ${req ? '#FEE2E2' : '#DCFCE7'}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}>

      <div className="p-4 flex-1">
        {/* Country header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{flag}</span>
            <h3 className="text-base font-bold" style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}>
              {countryName}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {req ? (
              <>
                <XCircle size={15} style={{ color: '#E8453C' }} />
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#FEE2E2', color: '#E8453C' }}>
                  Visa Required
                </span>
              </>
            ) : (
              <>
                <CheckCircle size={15} style={{ color: '#22C55E' }} />
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: eea ? '#DBEAFE' : '#DCFCE7', color: eea ? '#1D4ED8' : '#22C55E' }}>
                  {eea ? 'Visa-Free (EEA)' : 'No Visa Required'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Visa type + duration */}
        <p className="text-sm font-semibold mb-1" style={{ color: req ? '#00C9B8' : '#16A34A' }}>
          {data.visaType}
        </p>
        <p className="text-xs" style={{ color: '#7A7A9A' }}>{data.duration}</p>
        {data.processingTime !== 'N/A' && (
          <p className="text-xs mt-1" style={{ color: '#7A7A9A' }}>⏱ Processing: {data.processingTime}</p>
        )}
      </div>

      {/* View details button */}
      <button
        onClick={onViewDetails}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold border-t transition-colors hover:bg-[#E6FAF8]"
        style={{ borderColor: '#E5E7EB', color: '#00C9B8' }}>
        View full details <ArrowRight size={14} />
      </button>
    </article>
  );
}
