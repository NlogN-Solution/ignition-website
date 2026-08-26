import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { careers, getCareer, salarySource } from "@/data/careers";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return careers.map((career) => ({ career: career.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const career = getCareer((await params).career);
  if (!career) return {};

  return pageMetadata({
    title: `${career.title} — career guide`,
    description: `${career.tagline} What the work involves, the skills it needs, and the UK degree subjects that lead to it.`,
    path: `/careers/${career.id}`,
  });
}

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default async function CareerPage({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const career = getCareer((await params).career);
  if (!career) notFound();

  const related = careers
    .filter((other) => other.id !== career.id)
    .filter((other) =>
      other.degreeSubjects.some((subject) =>
        career.degreeSubjects.includes(subject),
      ),
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Career guide"
          title={career.title}
          intro={career.tagline}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
            { label: career.title, href: `/careers/${career.id}` },
          ]}
        />

        <Container className="py-[clamp(2.5rem,4.5vw,4.5rem)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold tracking-[-0.015em] text-navy">
                What the work involves
              </h2>
              <p className="mt-4 max-w-[64ch] text-[17px] font-medium leading-[1.65] text-ink-soft">
                {career.description}
              </p>

              <h2 className="mt-12 text-[22px] font-bold tracking-[-0.015em] text-navy">
                Skills it relies on
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <li key={skill}>
                    <Badge tone="navy" className="px-3 py-[6px] text-[13.5px]">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-[22px] font-bold tracking-[-0.015em] text-navy">
                Degrees that lead here
              </h2>
              <p className="mt-3 max-w-[62ch] text-[15.5px] font-medium leading-[1.55] text-muted">
                These are the subjects most commonly studied for this career.
                They are general guidance &mdash; always check what a specific
                course requires with the university itself.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {career.degreeSubjects.map((subject) => (
                  <li key={subject}>
                    <Card
                      href="/courses"
                      className="flex-row items-center justify-between gap-4 px-5 py-4"
                    >
                      <span className="text-[15.5px] font-semibold text-ink">
                        {subject}
                      </span>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={2.3}
                        aria-hidden
                        className="shrink-0 text-blue-link transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </Card>
                  </li>
                ))}
              </ul>

              {related.length ? (
                <>
                  <h2 className="mt-12 text-[22px] font-bold tracking-[-0.015em] text-navy">
                    Related careers
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {related.map((other) => (
                      <li key={other.id}>
                        <Link
                          href={`/careers/${other.id}`}
                          className="inline-flex items-center gap-[7px] rounded-lg border border-hairline bg-white px-[13px] py-[8px] text-[14.5px] font-semibold text-navy transition-colors duration-200 hover:border-ring-idle hover:text-blue-link"
                        >
                          {other.title}
                          <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <aside className="min-w-0 space-y-4">
              <Card className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                    Typical salary
                  </h2>
                  <Badge tone="demo">Example data</Badge>
                </div>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-[13.5px] font-semibold text-muted">
                      Starting out
                    </dt>
                    <dd className="mt-[2px] text-[24px] font-bold tracking-[-0.02em] text-navy">
                      {currency.format(career.salary.entry)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13.5px] font-semibold text-muted">
                      With experience
                    </dt>
                    <dd className="mt-[2px] text-[24px] font-bold tracking-[-0.02em] text-navy">
                      {currency.format(career.salary.experienced)}
                    </dd>
                  </div>
                </dl>

                <p className="mt-5 border-t border-hairline pt-4 text-[13px] font-medium leading-[1.55] text-muted-light">
                  Placeholder figures for demonstration. For real UK salary
                  ranges see the{" "}
                  <a
                    href={salarySource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-link underline-offset-2 hover:underline"
                  >
                    {salarySource.label}
                  </a>
                  .
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="text-[17px] font-bold tracking-[-0.01em] text-navy">
                  Career outlook
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-[1.6] text-ink-soft">
                  {career.outlook}
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </main>

      <CtaBand
        title="Is this actually you?"
        intro="Take the career quiz and see how strongly this one matches your profile against thirteen others."
        primary={{ label: "Take Career Quiz", href: "/careers/quiz" }}
        secondary={{ label: "All careers", href: "/careers" }}
      />
      <Footer />
    </>
  );
}
