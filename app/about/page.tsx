import Image from "next/image"
import { ArrowUpRight, Mail } from "lucide-react"
import { aboutParagraphs, identity, methodStack, profileLinks } from "@/lib/academic-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Research-oriented profile of Islam I. Abdulaal, focused on computational and integrated photonics.",
  path: "/about",
})

const affiliations = [
  {
    role: "Research Intern",
    org: "NanoPhoto Lab",
    period: "2025 – present",
    detail: "Physics-informed optimization for integrated quantum photonic source and detection structures.",
  },
  {
    role: "Research Intern",
    org: "OPST Group, Alexandria University",
    period: "2023 – 2025",
    detail: "Photonic device simulation, analog modeling, and integrated photonics design workflows.",
  },
  {
    role: "B.Sc. Electronics and Communications Engineering",
    org: "Alexandria University",
    period: "2021 – 2026",
    detail: "Thesis work in silicon photonic devices, waveguide-integrated photodetectors, and optical links.",
  },
] as const

export default function AboutPage() {
  return (
    <main>
      {/* Identity block */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] md:py-20 lg:px-8">
        <aside>
          <div className="w-44 overflow-hidden rounded-md border border-border bg-surface ring-4 ring-border">
            <Image
              src="/personal-pic.png"
              alt="Portrait of Islam I. Abdulaal"
              width={320}
              height={320}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="mt-6 space-y-1.5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{identity.name}</p>
            <p>{identity.affiliation}</p>
            <p>{identity.location}</p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-2 inline-flex items-center gap-1.5 text-accent hover:text-accent-strong"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </a>
          </div>
        </aside>

        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">About</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Research profile
          </h1>
          <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Academic profiles */}
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-sm font-semibold text-foreground">Academic Profiles</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations timeline */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-foreground">Education and Experience</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {affiliations.map((aff) => (
              <div key={aff.org} className="grid gap-2 py-5 sm:grid-cols-[14rem_minmax(0,1fr)]">
                <div>
                  <p className="text-sm font-medium text-foreground">{aff.role}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{aff.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{aff.org}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{aff.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods and tools */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-foreground">Methods and Tools</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {methodStack.map((item) => (
            <li key={item} className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
