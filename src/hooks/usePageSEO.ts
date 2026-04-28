import { useEffect } from 'react';

interface PageSEO {
  title: string;
  description?: string;
  jsonLd?: object | object[];
}

const SITE = 'VAG Leicester';
const BASE_URL = 'https://vagleicester.co.uk';

function setMeta(selector: string, content: string) {
  const tag = document.querySelector<HTMLMetaElement>(selector);
  if (tag) tag.content = content;
}

export function usePageSEO({ title, description, jsonLd }: PageSEO) {
  const fullTitle = `${title} | ${SITE}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[property="og:url"]', BASE_URL + window.location.pathname);

    // Per-page JSON-LD injection
    const existing = document.getElementById('page-jsonld');
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById('page-jsonld')?.remove();
    };
  }, [fullTitle, description]);
}
