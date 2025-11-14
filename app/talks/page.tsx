import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Talks & Speaking | Islam Abdulaal",
  description:
    "Conference talks, presentations, and speaking engagements on integrated photonics and hardware innovation.",
}

export default function TalksPage() {
  const talks = [
    {
      id: 1,
      title: "Silicon Photonics for Data Center Communications",
      event: "SPIE Photonics Europe 2024",
      date: "April 22, 2024",
      location: "Strasbourg, France",
      type: "Keynote",
      audience: "500+ attendees",
      description:
        "Keynote on how silicon photonics is reshaping data center interconnects and enabling next-generation network infrastructure.",
      featured: true,
    },
    {
      id: 2,
      title: "Quantum Photonics: Building the Quantum Internet",
      event: "Quantum Technology Conference 2024",
      date: "February 28, 2024",
      location: "Virtual",
      type: "Presentation",
      audience: "300+ participants",
      description:
        "Technical presentation on quantum photonic systems, integrated quantum circuits, and distributed quantum computing networks.",
      featured: true,
    },
    {
      id: 3,
      title: "Physics-Informed Machine Learning for Photonic Design",
      event: "Advanced Photonics Workshop",
      date: "March 10, 2024",
      location: "Berlin, Germany",
      type: "Workshop",
      audience: "100+ researchers",
      description:
        "Hands-on workshop on using neural networks with physics constraints to optimize photonic device designs.",
      featured: false,
    },
    {
      id: 4,
      title: "Fiber Bragg Grating Sensors for Biomedical Applications",
      event: "Optical Sensors Conference",
      date: "January 15, 2024",
      location: "San Jose, CA",
      type: "Presentation",
      audience: "150+ professionals",
      description:
        "Technical presentation on FBG-based sensing systems for continuous biomedical monitoring and early disease detection.",
      featured: false,
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Talks & Presentations</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Conference presentations and speaking engagements on integrated photonics, quantum photonics, and hardware
              innovation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Invite Me to Speak <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* All Talks */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Speaking Engagements</h2>
          <div className="space-y-8">
            {talks.map((talk) => (
              <div
                key={talk.id}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-grow">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-3">
                      {talk.type}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{talk.title}</h3>
                    <p className="text-lg text-accent font-semibold">{talk.event}</p>
                  </div>
                  {talk.featured && (
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">{talk.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm">{talk.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm">{talk.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm">{talk.audience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Speaking Opportunities</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Available for keynotes, technical presentations, workshops, and panel discussions at conferences and events.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Contact for Speaking Engagement
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
