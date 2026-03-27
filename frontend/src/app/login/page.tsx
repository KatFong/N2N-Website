import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with N2N Connect.',
};

export default function LoginPage() {
  return (
    <main className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
            <p className="mt-4 leading-8 text-slate-600">
              Reach out to N2N Connect for business enquiries, partnership opportunities, and
              product consultations.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                <Mail className="mt-0.5 h-5 w-5 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="text-sm text-slate-600">contact@n2nconnect.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                <Phone className="mt-0.5 h-5 w-5 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Phone</p>
                  <p className="text-sm text-slate-600">+603-2770 9888</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Office</p>
                  <p className="text-sm text-slate-600">
                    Wisma N2N, No. 3, Jalan PJU 1A/20A, Ara Damansara, 47301 Petaling Jaya,
                    Selangor, Malaysia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Send an Enquiry</h2>
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
              <input
                type="email"
                placeholder="Work Email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
              <textarea
                rows={5}
                placeholder="Tell us about your enquiry"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              />
              <button
                type="button"
                className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
