import { useEffect } from 'react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// 1. Go to https://calendly.com and create a free account
// 2. Set up your event type (e.g. "VAG Coding Consultation")
// 3. Replace the URL below with your Calendly link:
const CALENDLY_URL = 'https://calendly.com/vagcodingleicester';
// ─────────────────────────────────────────────────────────────────────────────

export default function BookingWidget() {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src*="calendly"]');
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Book a <span className="text-brand">Session</span>
          </h2>
          <p className="text-[var(--text)]/50 max-w-xl mx-auto">
            Pick a time that suits you. We'll confirm your vehicle compatibility before the appointment.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=${encodeURIComponent('var(--card-bg)')}`}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
}
