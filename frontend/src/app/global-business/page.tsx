import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Business',
  description: 'N2N Connect regional and global market presence.',
};

export default function GlobalBusinessPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Global Business</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            We support financial institutions and market participants through regional reach and
            robust cross-border technology infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Our Regional Presence</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Greater China',
              'Southeast Asia',
              'Northeast Asia',
              'South Asia',
              'Middle East',
              'Global Cross-Market Connectivity',
            ].map((region) => (
              <article key={region} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold">{region}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Strategic market coverage with scalable infrastructure and service capabilities.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Built for Expansion</h2>
          <p className="mt-4 leading-8 text-slate-600">
            N2N Connect combines local market knowledge with enterprise technology architecture so
            clients can scale confidently across jurisdictions.
          </p>
        </div>
      </section>
    </main>
  );
}
