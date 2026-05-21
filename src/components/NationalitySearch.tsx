'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface Props {
  nationalities: string[];
  selected: string | null;
  onSelect: (nat: string) => void;
}

export default function NationalitySearch({ nationalities, selected, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const selRef = useRef<HTMLButtonElement>(null);
  const filtered = query.trim() ? nationalities.filter(n => n.toLowerCase().includes(query.toLowerCase())) : nationalities;
  useEffect(() => { if (selected && selRef.current) selRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [selected]);

  return (
    <aside className="flex flex-col" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-light)' }} />
          <input type="search" placeholder="Search nationality…" value={query} onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none"
            style={{ border: '1px solid var(--border)', color: 'var(--text-dark)', background: 'var(--page-bg)' }}
            aria-label="Search nationality" autoComplete="off" />
        </div>
        <p className="text-xs mt-1.5" style={{ color: 'var(--text-light)' }}>{filtered.length} {filtered.length === 1 ? 'nationality' : 'nationalities'}</p>
      </div>
      <ul className="overflow-y-auto" style={{ maxHeight: 520 }} role="listbox">
        {filtered.length === 0 ? (
          <li className="p-4 text-sm text-center" style={{ color: 'var(--text-light)' }}>No match found.</li>
        ) : filtered.map(nat => {
          const isSel = nat === selected;
          return (
            <li key={nat} role="option" aria-selected={isSel}>
              <button ref={isSel ? selRef : undefined} onClick={() => onSelect(nat)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors"
                style={{ background: isSel ? 'var(--teal-primary)' : 'transparent', color: isSel ? '#fff' : 'var(--text-medium)', fontWeight: isSel ? 600 : 400 }}>
                <span>{nat}</span>
                {isSel && <ChevronRight size={14} />}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
