import { Calendar, Award } from "lucide-react"

export const metadata = {
  title: "Achievements | Islam Abdulaal",
  description: "Awards, recognitions, funding, publications, and notable achievements in photonics research.",
}

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "Alexandria University Technology Park Research Grant",
      date: "Aug 2025",
      category: "Research Funding",
      amount: "USD 15,000",
      description:
        "Awarded for multi-parameter vital monitoring sensor project for respiratory disease detection using FBG technology.",
      featured: true,
    },
    {
      id: 2,
      title: "NanoPhoto Lab Research Intern",
      date: "Sep 2025 - Present",
      category: "Research Position",
      description:
        "Extended collaboration from Egypt Scholars Advanced Labs Program working on Physics-Informed Neural Networks for photonic optimization.",
      featured: true,
    },
    {
      id: 3,
      title: "Egypt Scholars Advanced Labs Program",
      date: "Jul - Sep 2025",
      category: "Fellowship",
      description:
        "Completed 10-week intensive training program developing independent research capabilities in quantum photonics at A*STAR, Singapore.",
      featured: true,
    },
    {
      id: 4,
      title: "IEEE SSCS Chapter Chair",
      date: "Feb - Oct 2025",
      category: "Leadership",
      description:
        "Led restructuring of IEEE Solid-State Circuits Society student chapter, managed 200+ volunteers, organized 80+ technical events.",
      featured: false,
    },
    {
      id: 5,
      title: "Siemens EDA Advanced Training Certification",
      date: "Sep 2025",
      category: "Professional Training",
      description:
        "Completed 90+ hours comprehensive training in analog-mixed signal design with 92% overall score across all modules.",
      featured: false,
    },
    {
      id: 6,
      title: "Huawei ICT Skills Competition - National Finalist",
      date: "2023",
      category: "Competition Award",
      description:
        "Qualified among top national individuals representing Egypt in artificial intelligence track with HCIA certification.",
      featured: false,
    },
    {
      id: 7,
      title: "ICMTC Artificial Intelligence Contest - 4th Place",
      date: "2024",
      category: "Competition Award",
      description:
        "Achieved 4th place among 500 competing teams. Developed SphinxSpeech Egyptian dialect ASR system using NVIDIA NeMo.",
      featured: false,
    },
    {
      id: 8,
      title: "NASA Space Apps Challenge - Global Nominee",
      date: "2021",
      category: "Competition Award",
      description:
        "Selected as global nominee for project submission. Developed Unity-based educational game for space exploration awareness.",
      featured: false,
    },
    {
      id: 9,
      title: "Dean's Honors for Academic Excellence",
      date: "2021 - 2025",
      category: "Academic Honor",
      description:
        "Maintained distinction grade status throughout undergraduate studies at Alexandria University Faculty of Engineering.",
      featured: false,
    },
    {
      id: 10,
      title: "Preprint Published: Terahertz Quasi-BIC Metasurfaces",
      date: "2025",
      category: "Publication",
      description:
        "Published preprint on terahertz quasi-BIC metasurfaces for biosensing and wireless communications on arXiv.",
      featured: false,
    },
  ]

  const featured = achievements.filter((a) => a.featured)
  const recent = achievements.filter((a) => !a.featured)

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Achievements</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Awards, recognitions, research funding, publications, and notable accomplishments.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Achievements */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Recent Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((achievement) => (
              <div
                key={achievement.id}
                className="p-8 rounded-lg border border-border bg-card hover:border-accent transition-colors flex flex-col"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold mb-4 w-fit">
                  {achievement.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3 flex-grow">{achievement.title}</h3>
                {achievement.amount && <p className="text-accent text-lg font-bold mb-3">{achievement.amount}</p>}
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{achievement.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground border-t border-border pt-4">
                  <Calendar className="w-3 h-3" />
                  {achievement.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Achievements */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">All Achievements</h2>
          <div className="space-y-6">
            {recent.map((achievement) => (
              <div
                key={achievement.id}
                className="p-6 rounded-lg border border-border bg-background hover:border-accent transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold text-accent bg-accent/20">
                        {achievement.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {achievement.date}
                    </div>
                  </div>
                  <Award className="w-5 h-5 text-accent flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Let's Collaborate</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Interested in working together on research projects or discussing opportunities? Reach out anytime.
          </p>
        </div>
      </section>
    </main>
  )
}
