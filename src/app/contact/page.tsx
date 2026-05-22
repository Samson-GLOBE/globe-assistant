import Image from 'next/image';
import { GraduationCap, AlertTriangle, Mail, Users } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[240px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)' }}>
          <Image src="/images/globe-hero-bg.jpg" alt="GLOBE hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins,sans-serif' }}>Contact & Information</h1>
          <p className="text-white/80">Get in touch with the GLOBE programme coordination team.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="px-6 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--teal-light)' }}>
                <GraduationCap size={20} style={{ color: 'var(--teal-primary)' }} />
              </div>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Poppins,sans-serif', color: 'var(--text-dark)' }}>Programme Coordination</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm mb-5" style={{ color: 'var(--text-medium)', lineHeight: '1.7' }}>
                For general questions about the GLOBE Erasmus Mundus programme, applications, grants, and schedules, contact the programme coordination team.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: 'var(--teal-light)', border: '1px solid rgba(0,201,184,0.2)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--teal-primary)' }}>
                      <Users size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--teal-primary)' }}>Programme Coordinator</p>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-dark)' }}>GLOBE Coordination Office</p>
                      <a href="mailto:info@globe-master.eu" className="text-sm font-medium hover:underline" style={{ color: 'var(--teal-primary)' }}>info@globe-master.eu</a>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>General enquiries & applications</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl" style={{ background: '#F8F9FA', border: '1px solid var(--border)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--text-dark)' }}>
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-light)' }}>Student Mobility Officer</p>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-dark)' }}>International Relations Office</p>
                      <a href="mailto:mobility@globe-master.eu" className="text-sm font-medium hover:underline" style={{ color: 'var(--teal-primary)' }}>mobility@globe-master.eu</a>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>Mobility placements & grant support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid #FDE68A', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="px-6 py-5 flex items-center gap-3" style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FDE68A' }}>
                <AlertTriangle size={20} style={{ color: '#92400E' }} />
              </div>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Poppins,sans-serif', color: '#92400E' }}>Important Disclaimer</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
                This is an alumni-led resource, not an official GLOBE website. All visa information is sourced from <strong style={{ color: 'var(--text-dark)' }}>official government and embassy websites</strong> at the time of publication. However, <strong style={{ color: 'var(--text-dark)' }}>immigration rules are subject to change</strong> without prior notice.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-medium)' }}>
                It is the sole responsibility of each student to verify current requirements directly with the relevant embassy <strong style={{ color: 'var(--text-dark)' }}>before</strong> making any travel or application arrangements. The GLOBE programme <strong style={{ color: 'var(--text-dark)' }}>does not accept liability</strong> for any inaccuracies or consequences arising from reliance on this information.
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-light)' }}>Official Sources</p>
                {[
                  { label: '🇪🇸 Spain — exteriores.gob.es', href: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-de-visados.aspx' },
                  { label: '🇬🇧 UK — gov.uk/student-visa', href: 'https://www.gov.uk/student-visa' },
                  { label: '🇲🇽 Mexico — gob.mx/sre', href: 'https://www.gob.mx/sre' },
                  { label: '🇵🇹 Portugal — vistos.mne.gov.pt', href: 'https://www.vistos.mne.gov.pt/en/' },
                ].map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="block text-xs hover:underline mb-1" style={{ color: 'var(--teal-primary)' }}>{label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
