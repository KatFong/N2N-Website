import type { LucideIcon } from 'lucide-react';
import { Globe, Mail, MapPin, Phone, Printer } from 'lucide-react';
import type { ContactOffice } from '@/lib/contactPageData';

function InfoRow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm leading-relaxed text-slate-700">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" strokeWidth={1.5} aria-hidden />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function EmailBox({ heading, email }: { heading: string; email: string }) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.03]">
      <h4 className="text-sm font-semibold text-slate-900">{heading}</h4>
      <a
        href={`mailto:${email}`}
        className="mt-1 inline-block text-sm font-medium text-brand-primary transition hover:underline"
      >
        {email}
      </a>
    </div>
  );
}

function OfficeBlock({ office }: { office: ContactOffice }) {
  return (
    <div className="border-t border-slate-200/90 pt-12 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{office.country}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 space-y-5 lg:order-1">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{office.company}</h3>
          <InfoRow icon={MapPin}>{office.address}</InfoRow>
          {office.phones?.map((p, i) => (
            <InfoRow key={`${p.tel}-${i}`} icon={Phone}>
              <a href={`tel:${p.tel.replace(/\s/g, '')}`} className="hover:text-brand-primary">
                {p.tel}
              </a>
            </InfoRow>
          ))}
          {office.fax ? (
            <InfoRow icon={Printer}>
              <span>{office.fax}</span>
            </InfoRow>
          ) : null}
          {office.website ? (
            <InfoRow icon={Globe}>
              <a
                href={office.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-primary hover:underline"
              >
                {office.website.label}
              </a>
            </InfoRow>
          ) : null}
          {office.emails?.map((e, i) => (
            <InfoRow key={`${e.email}-${i}`} icon={Mail}>
              <a href={`mailto:${e.email}`} className="font-medium text-brand-primary hover:underline">
                {e.email}
              </a>
            </InfoRow>
          ))}
          {office.emailBoxes?.length ? (
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {office.emailBoxes.map((box) => (
                <EmailBox key={box.heading} heading={box.heading} email={box.email} />
              ))}
            </div>
          ) : null}
        </div>
        <div className="min-h-[280px] overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-inner lg:order-2 lg:min-h-[360px]">
          <iframe
            title={`地图 — ${office.company}`}
            src={office.mapEmbedUrl}
            className="h-full min-h-[280px] w-full lg:min-h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function ContactOffices({
  sectionTitle,
  offices,
}: {
  sectionTitle: string;
  offices: ContactOffice[];
}) {
  return (
    <section className="bg-slate-50/80 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{sectionTitle}</h2>
        <div className="mt-12 space-y-16">
          {offices.map((office) => (
            <OfficeBlock key={office.country} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}
