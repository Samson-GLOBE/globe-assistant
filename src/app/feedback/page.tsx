'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, Send, CheckCircle, Globe } from 'lucide-react';

interface FeedbackEntry {
  id: string;
  created_at: string;
  name: string | null;
  cohort_year: string | null;
  destination: string | null;
  category: string | null;
  content: string;
}

const DESTINATIONS = ['Spain', 'United Kingdom', 'Mexico', 'Portugal', 'General'];
const CATEGORIES = [
  'Accommodation',
  'Transport',
  'Visa & Documents',
  'SIM Cards',
  'Banking',
  'General Tips',
];

const DEST_STYLE: Record<string, { bg: string; color: string }> = {
  Spain:            { bg: '#FEE2E2', color: '#C0392B' },
  'United Kingdom': { bg: '#DBEAFE', color: '#1D4ED8' },
  Mexico:           { bg: '#DCFCE7', color: '#15803D' },
  Portugal:         { bg: '#FEF9C3', color: '#A16207' },
  General:          { bg: '#E6FAF8', color: '#00C9B8' },
};

const FILTER_ALL = 'All';

export default function FeedbackPage() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

  const [form, setForm] = useState({
    name: '',
    cohort_year: '',
    destination: '',
    category: '',
    content: '',
  });

  // Load existing entries on mount
  useEffect(() => {
    fetch('/api/feedback')
      .then(r => r.json())
      .then(data => setEntries(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === FILTER_ALL
      ? entries
      : entries.filter(e => e.destination === activeFilter);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');

    if (!form.content.trim() || form.content.trim().length < 10) {
      setSubmitError('Please write at least 10 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        // Refresh feed with new entry included
        const fresh = await fetch('/api/feedback').then(r => r.json());
        setEntries(Array.isArray(fresh) ? fresh : []);
      } else {
        const data = await res.json();
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
    }
    setSubmitting(false);
  }

  function resetForm() {
    setSubmitted(false);
    setSubmitError('');
    setForm({ name: '', cohort_year: '', destination: '', category: '', content: '' });
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[260px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)' }}
        >
          <Image
            src="/images/globe-hero-bg.jpg"
            alt="GLOBE student experiences"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 py-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MessageSquare size={18} style={{ color: '#00C9B8' }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: '#00C9B8' }}
            >
              Student Experiences
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Poppins,sans-serif' }}
          >
            Cohort Feedback
          </h1>
          <p className="text-white/80">
            Read experiences from past GLOBE students — or share your own to help the next cohort.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Submit form ── */}
          <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-20">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#ffffff', border: '1px solid #E5E7EB', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              {/* Form header */}
              <div
                className="px-6 pt-6 pb-4 border-b"
                style={{ borderColor: '#E5E7EB' }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}
                >
                  Share your experience
                </h2>
                <p className="text-sm mt-1" style={{ color: '#7A7A9A' }}>
                  Your tip could help a future GLOBE student.
                </p>
              </div>

              {/* Success state */}
              {submitted ? (
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: '#E6FAF8' }}
                  >
                    <CheckCircle size={28} style={{ color: '#00C9B8' }} />
                  </div>
                  <h3
                    className="font-bold text-lg"
                    style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}
                  >
                    Thank you!
                  </h3>
                  <p className="text-sm" style={{ color: '#7A7A9A' }}>
                    Your experience has been shared with the GLOBE community.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: '#E6FAF8', color: '#00C9B8' }}
                  >
                    Share another
                  </button>
                </div>
              ) : (
                /* Form fields */
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Name + Cohort year */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1"
                        style={{ color: '#4A4A6A' }}
                      >
                        Name{' '}
                        <span style={{ color: '#7A7A9A', fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        maxLength={60}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2"
                        style={{
                          border: '1px solid #E5E7EB',
                          color: '#1A1A2E',
                          background: '#fff',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold mb-1"
                        style={{ color: '#4A4A6A' }}
                      >
                        Cohort year
                      </label>
                      <input
                        type="text"
                        value={form.cohort_year}
                        onChange={e => setForm(f => ({ ...f, cohort_year: e.target.value }))}
                        placeholder="e.g. 2024–25"
                        maxLength={20}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                        style={{
                          border: '1px solid #E5E7EB',
                          color: '#1A1A2E',
                          background: '#fff',
                        }}
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1"
                      style={{ color: '#4A4A6A' }}
                    >
                      Destination
                    </label>
                    <select
                      value={form.destination}
                      onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none"
                      style={{
                        border: '1px solid #E5E7EB',
                        color: form.destination ? '#1A1A2E' : '#9CA3AF',
                        background: '#fff',
                      }}
                    >
                      <option value="">Select destination…</option>
                      {DESTINATIONS.map(d => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1"
                      style={{ color: '#4A4A6A' }}
                    >
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none"
                      style={{
                        border: '1px solid #E5E7EB',
                        color: form.category ? '#1A1A2E' : '#9CA3AF',
                        background: '#fff',
                      }}
                    >
                      <option value="">Select category…</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience text */}
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1"
                      style={{ color: '#4A4A6A' }}
                    >
                      Your experience or tip{' '}
                      <span style={{ color: '#E8453C' }}>*</span>
                    </label>
                    <textarea
                      value={form.content}
                      onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      rows={4}
                      maxLength={1000}
                      placeholder="Share what you wish you had known before arriving…"
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                      style={{
                        border: '1px solid #E5E7EB',
                        color: '#1A1A2E',
                        background: '#fff',
                      }}
                      required
                    />
                    <p className="text-xs mt-1 text-right" style={{ color: '#9CA3AF' }}>
                      {form.content.length}/1000
                    </p>
                  </div>

                  {submitError && (
                    <p className="text-xs px-3 py-2 rounded-lg" style={{ color: '#C0392B', background: '#FEE2E2' }}>
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: '#00C9B8', color: '#fff' }}
                  >
                    <Send size={14} />
                    {submitting ? 'Submitting…' : 'Submit experience'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Comments feed ── */}
          <div className="flex-1 min-w-0">
            {/* Destination filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[FILTER_ALL, 'Spain', 'United Kingdom', 'Mexico', 'Portugal'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={
                    activeFilter === f
                      ? { background: '#00C9B8', color: '#fff' }
                      : { background: '#F3F4F6', color: '#4A4A6A' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Loading spinner */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin"
                  style={{ borderColor: '#E5E7EB', borderTopColor: '#00C9B8' }}
                />
              </div>
            )}

            {/* Empty state */}
            {!loading && filtered.length === 0 && (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-20 px-8 text-center"
                style={{ background: '#ffffff', border: '1px solid #E5E7EB' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#E6FAF8' }}
                >
                  <Globe size={26} style={{ color: '#00C9B8' }} />
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: 'Poppins,sans-serif', color: '#1A1A2E' }}
                >
                  No experiences yet
                  {activeFilter !== FILTER_ALL ? ` for ${activeFilter}` : ''}
                </h3>
                <p className="text-sm" style={{ color: '#7A7A9A' }}>
                  Be the first to share your GLOBE experience!
                </p>
              </div>
            )}

            {/* Comment cards grid */}
            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(entry => {
                  const dest = entry.destination || 'General';
                  const ds = DEST_STYLE[dest] ?? DEST_STYLE['General'];
                  const dateStr = new Date(entry.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <article
                      key={entry.id}
                      className="rounded-2xl p-5 flex flex-col gap-3"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      }}
                    >
                      {/* Badges row */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: ds.bg, color: ds.color }}
                          >
                            {dest}
                          </span>
                          {entry.category && (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ background: '#F3F4F6', color: '#4A4A6A' }}
                            >
                              {entry.category}
                            </span>
                          )}
                        </div>
                        {entry.cohort_year && (
                          <span className="text-xs" style={{ color: '#9CA3AF' }}>
                            Cohort {entry.cohort_year}
                          </span>
                        )}
                      </div>

                      {/* Quote */}
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: '#4A4A6A' }}
                      >
                        &ldquo;{entry.content}&rdquo;
                      </p>

                      {/* Author + date */}
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className="text-xs font-semibold"
                          style={{ color: '#1A1A2E' }}
                        >
                          — {entry.name || 'Anonymous'}
                        </p>
                        <p className="text-xs" style={{ color: '#9CA3AF' }}>
                          {dateStr}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
