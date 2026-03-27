import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Legal',
  description: 'N2N Connect terms, legal notice, and privacy information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-4xl font-bold text-slate-900">Terms, Legal & Privacy</h1>
        <p className="text-sm text-slate-500">Last updated: March 27, 2026</p>
        <div className="mt-4 h-1 w-20 rounded-full bg-slate-900" />

        <div className="prose prose-lg mt-8 max-w-none text-slate-700">
          <h2>Terms and Conditions</h2>
          <p>
            Information on this website is provided for general reference and may be updated without
            prior notice. Users are responsible for reviewing the latest version of relevant
            materials before acting on any content.
          </p>
          <h2>Legal Notice</h2>
          <p>
            All trademarks, content, and materials are owned by N2N Connect Bhd or their respective
            owners. Reproduction, distribution, or modification without prior permission is not
            permitted except where allowed by law.
          </p>
          <h2>Privacy Statement</h2>
          <p>
            We may collect contact and usage information when you submit enquiries or interact with
            our services. Data is used to deliver support, improve service quality, and comply with
            legal obligations.
          </p>
          <h2>Contact</h2>
          <p>
            For legal or privacy enquiries, please contact:
            <br />
            legal@n2nconnect.com
          </p>
        </div>
      </div>
    </main>
  );
}
