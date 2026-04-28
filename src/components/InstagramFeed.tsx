import { useEffect } from 'react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// 1. Go to https://elfsight.com/instagram-feed-widget/
// 2. Create a free account and connect your Instagram
// 3. Copy the app ID from the embed code — it looks like:
//    "elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
// 4. Paste just the ID portion below:
const ELFSIGHT_APP_ID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

// Also update your Instagram handle for the follow link:
const INSTAGRAM_HANDLE = 'vag-leicester';
// ─────────────────────────────────────────────────────────────────────────────

export default function InstagramFeed() {
  useEffect(() => {
    // Only inject the script once
    if (document.querySelector('script[src*="elfsight"]')) return;
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-24 px-6 bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
              Latest from <span className="text-brand">Instagram</span>
            </h2>
            <p className="mt-4 text-[var(--text)]/50">
              Real results, real vehicles — follow us for the latest work.
            </p>
          </div>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 shrink-0"
          >
            {/* Instagram icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @{INSTAGRAM_HANDLE}
          </a>
        </div>

        {/* Elfsight Instagram feed widget */}
        <div
          className={`elfsight-app-${ELFSIGHT_APP_ID}`}
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}
