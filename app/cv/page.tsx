import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cvSummary, identity } from "@/lib/academic-content"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "CV",
  description:
    "Curriculum vitae of Islam I. Abdulaal, including education, research experience, publications, projects, and technical methods.",
  path: "/cv",
})

export default function CvPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">CV</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Curriculum vitae
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              A concise academic CV covering education, research experience, publications, projects, and technical
              methods. The PDF version is provided for formal review and download.
            </p>
          </div>

          <aside className="rounded-md border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-foreground">{identity.name}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{identity.shortTitle}</p>
            <div className="mt-5 grid gap-2">
              <Button asChild>
                <a href="/cv.pdf" download>
                  Download PDF
                  <Download aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/cv.pdf" target="_blank" rel="noreferrer">
                  Open PDF
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {cvSummary.map((section) => (
            <section key={section.heading}>
              <h2 className="text-sm font-semibold text-foreground">{section.heading}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <iframe src="/cv.pdf" title="CV PDF preview" className="h-[72vh] min-h-[520px] w-full" />
        </div>
      </section>
    </main>
  )
}
