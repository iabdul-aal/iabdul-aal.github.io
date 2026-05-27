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

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[13rem_minmax(0,1fr)] md:py-20 lg:px-8">
        <aside>
          <div className="w-40 overflow-hidden rounded-md border border-border bg-surface">
            <Image
              src="/personal-pic.png"
              alt="Portrait of Islam I. Abdulaal"
              width={320}
              height={320}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{identity.name}</p>
            <p>{identity.affiliation}</p>
            <p>{identity.location}</p>
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

          <div className="mt-10 border-y border-border py-6">
            <h2 className="text-sm font-semibold text-foreground">Academic Profiles</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {profileLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm text-foreground hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null,
              )}
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm text-foreground hover:border-accent hover:text-accent"
              >
                Email
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-sm font-semibold text-foreground">Methods and Tools</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {methodStack.map((item) => (
                <li key={item} className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  )
}
