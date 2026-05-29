'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import MapBackground from '../../components/MapBackground';

export default function Home() {
  const t = useTranslations('Search');
  const locale = useLocale();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    window.location.href = '/' + nextLocale;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('http://localhost:5001/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });

      if (!res.ok) {
        throw new Error('API Error');
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  // Determine font class based on locale
  const fontClass = locale === 'ar' ? 'font-arabic' : 'font-sans';

  return (
    <div className={`flex flex-col min-h-screen ${fontClass}`}>
      <MapBackground />
      {/* Top right language toggle */}
      <header className="w-full flex justify-end p-6">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 text-sm font-medium border border-border-color rounded-full hover:bg-black/5 transition-colors"
        >
          {t('toggle')}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-20 px-4 w-full max-w-3xl mx-auto">
        <div className="text-center mb-10 w-full">
          <h1 
            className="text-5xl md:text-6xl font-thin tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #0071E3 0%, #00C2FF 50%, #0071E3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70">
            {t('subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <form dir="ltr" onSubmit={handleSearch} className={`w-full relative shadow-sm rounded-full bg-card flex ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center border border-border-color focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all duration-300`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-grow bg-transparent outline-none px-6 py-4 text-lg text-foreground placeholder-foreground/50 rounded-full"
            dir="auto"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="mr-2 ml-2 px-6 py-2.5 bg-accent text-white rounded-full font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors shrink-0"
          >
            {t('button')}
          </button>
        </form>

        {/* Results Area */}
        <div className="w-full mt-12 mb-20 flex flex-col gap-8 transition-opacity duration-500">
          {loading && (
            <div className="w-full flex justify-center py-10">
              <div className="animate-pulse flex items-center gap-3 text-foreground/60">
                <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
                {t('loading')}
              </div>
            </div>
          )}

          {error && (
            <div className="w-full p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-center">
              {error}
            </div>
          )}

          {results && !loading && (
            <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Answer Card */}
              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border-color shadow-sm">
                <div className="prose prose-neutral max-w-none text-foreground leading-relaxed text-lg">
                  {results.answer}
                </div>
              </div>

              {/* Sources */}
              {results.sources && results.sources.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                    {t('sources')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.sources.map((src: any, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/5 border border-border-color text-sm text-foreground"
                      >
                        {src.source} (Page {src.page})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Images Grid */}
              {results.images && results.images.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
                    {t('images')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {results.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="aspect-video bg-black/5 rounded-2xl border border-border-color flex items-center justify-center p-4 text-center break-all text-sm text-foreground/80 hover:bg-black/10 transition-colors"
                      >
                        {img}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
