import { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business Partnership',
  description: 'Partner with N2N Connect to accelerate growth.',
};

const partnerSteps = [
  { step: '01', title: 'Apply', description: 'Submit your partnership application through our online portal.' },
  { step: '02', title: 'Review', description: 'Our team will review your application within 5 business days.' },
  { step: '03', title: 'Onboard', description: 'Complete the onboarding process with dedicated support.' },
  { step: '04', title: 'Launch', description: 'Go live and start growing your business with N2N-AFE.' },
];

export default function BusinessPartnershipPage() {
  const contactEmail = 'contact@n2nconnect.com';
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Business Partnership</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            Build long-term market value with N2N Connect through technology collaboration, service
            integration, and strategic commercial partnerships.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Partner Benefits</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Revenue and growth opportunities',
              'Joint go-to-market initiatives',
              'Dedicated onboarding support',
              'Technical and operational enablement',
              'Regional market network access',
              'Long-term strategic collaboration',
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">How to Become a Partner</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              A straightforward process to start building momentum with the N2N Connect ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerSteps.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-4xl font-bold text-blue-100 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Partner With Us?</h2>
          <p className="mb-8 text-slate-200">
            Contact our team to discuss your goals and the right collaboration model.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-100"
          >
            <Mail className="w-5 h-5" />
            {contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
