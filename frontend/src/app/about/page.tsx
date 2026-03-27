import { Metadata } from 'next';
import Image from 'next/image';
import HighlightsParallax from '@/components/about/HighlightsParallax';

export const metadata: Metadata = {
  title: 'N2N Connect - About',
  description: 'Learn more about N2N Connect, our purpose, and our culture.',
};

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="border-y border-slate-300 bg-[#2027a8] py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-wide text-white">ABOUT US</h1>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="md:pr-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">WHO WE ARE</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>Innovators Making a Difference.</strong>
              <br />
              At our core, we are a managed services provider for integrated capital market, and
              network and infrastructure solutions. Incorporated in 2000, today we are one of the
              largest providers in Asia-Pacific, powering capital market players with opportunity
              for innovation and growth.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/about/wisma-n2n.png"
              alt="N2N building illustration"
              width={520}
              height={320}
              className="h-auto w-full max-w-[460px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white pb-24 sm:pb-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/about/rocket.gif"
              alt="Rocket illustration"
              width={360}
              height={280}
              className="h-auto w-full max-w-[300px]"
            />
          </div>
          <div className="md:pl-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">OUR PURPOSE</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>Empowering The Capital Market with Technology.</strong>
              <br />
              To use innovative technologies and the smartest architecture to enhance value chains,
              and innovate Capital Markets to continuously break barriers and set new records.
            </p>
            <p className="mt-8 text-3xl font-semibold italic leading-tight text-slate-900">
              &ldquo;It&apos;s about being different.&rdquo;
            </p>
            <p className="mt-3 text-lg text-slate-800">Andrew Tiang, Managing Director</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">CORPORATE HIGHLIGHTS</h2>
        <div className="mt-8">
          <HighlightsParallax />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="md:pr-6">
            <h2 className="text-4xl font-extrabold tracking-wide text-slate-900">OUR CULTURE</h2>
            <p className="mt-5 text-lg leading-9 text-slate-800">
              <strong>A Group Of Great People.</strong>
              <br />
              N2N provides a dynamic and collaborative environment where creativity flourishes. We
              share the same relentless pursuit of excellence, innovation and enhancement for our
              products to shape Capital Markets across geographical areas. We test new ideas. We
              push boundaries. We strive for greatness.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/about/our-culture.gif"
              alt="Our culture illustration"
              width={460}
              height={320}
              className="h-auto w-full max-w-[360px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
