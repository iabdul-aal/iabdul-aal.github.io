export type Language = "en" | "de"

export interface TranslationSchema {
  nav: {
    about: string
    research: string
    publications: string
    tools: string
    materials: string
    cv: string
  }
  identity: {
    role: string
    statement: string
    compactStatement: string
    homepageStatement: string
    aboutEpigraph: string
  }
  headers: {
    aboutTitle: string
    aboutEyebrow: string
    researchTitle: string
    researchEyebrow: string
    researchDesc: string
    pubTitle: string
    pubEyebrow: string
    pubDesc: string
    toolsTitle: string
    toolsEyebrow: string
    toolsDesc: string
    materialsTitle: string
    materialsEyebrow: string
    materialsDesc: string
    cvTitle: string
    cvEyebrow: string
  }
  ui: {
    searchPlaceholder: string
    searchTalks: string
    searchMaterials: string
    searchTools: string
    searchPubs: string
    allYears: string
    allTopics: string
    allTypes: string
    allFormats: string
    clearFilters: string
    showMore: string
    showMorePubs: string
    showMoreTools: string
    showMoreSessions: string
    showMoreMaterials: string
    showing: string
    of: string
    publications: string
    sessions: string
    materialsLabel: string
    toolsLabel: string
    filtered: string
    exportBibtex: string
    exportRis: string
    copiedBibtex: string
    copied: string
    bibtex: string
    ris: string
    downloadPdf: string
    openPdf: string
    downloadPdfDe: string
    fullCvDoc: string
    fullCvPreview: string
    allPublications: string
    allTools: string
    abstract: string
    hideAbstract: string
    doi: string
    arxiv: string
    pdf: string
    source: string
    featured: string
    problem: string
    methods: string
    physicalRelevance: string
    featuredTools: string
    topicPublications: string
    modeProfile: string
  }
  sections: {
    recentActivity: string
    researchOverview: string
    featuredPublications: string
    featuredSoftware: string
    academicProfiles: string
    education: string
    researchExperience: string
    teaching: string
    leadership: string
    awards: string
    memberships: string
    references: string
    fullCvSection: string
    profiles: string
    sections: string
    footerCopyright: string
  }
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      about: "About",
      research: "Research",
      publications: "Publications",
      tools: "Tools",
      materials: "Materials",
      cv: "CV",
    },
    identity: {
      role: "Integrated Photonics Researcher",
      statement:
        "Integrated nanophotonics, quantum photonic sources, nonlinear on-chip devices, physics-informed inverse design, and wave-equation-constrained neural networks for photonic device optimization.",
      compactStatement:
        "Integrated nanophotonics, quantum photonic sources, nonlinear on-chip devices, and physics-informed inverse design.",
      homepageStatement:
        "Research concentrates on integrated nanophotonic devices: quantum entangled-photon sources, nonlinear material platforms, and physics-informed computational methods for device inverse design.",
      aboutEpigraph:
        "The ones who are crazy enough to think they can change the world are the ones who do.",
    },
    headers: {
      aboutTitle: "Research profile",
      aboutEyebrow: "About",
      researchTitle: "Research themes in integrated photonics",
      researchEyebrow: "Research",
      researchDesc:
        "Research is organized by physical and computational theme rather than by individual output. The underlying methodology is full-wave electromagnetic simulation and device physics, connecting structural geometry to optical and electrical behavior.",
      pubTitle: "Papers, preprints, and citable outputs",
      pubEyebrow: "Publications",
      pubDesc:
        "Peer-reviewed journal articles, preprints, and citable technical reports in integrated photonics and computational device design.",
      toolsTitle: "Software tools and codebases",
      toolsEyebrow: "Tools",
      toolsDesc:
        "Software tools and codebases are documented when they support reproducible simulations, public code availability, or citable engineering artifacts for photonics research.",
      materialsTitle: "Technical materials, articles, and public sessions",
      materialsEyebrow: "Materials",
      materialsDesc:
        "Downloadable teaching and reference materials, technical articles, and a chronological record of talks, workshops, and poster presentations.",
      cvTitle: "Curriculum Vitae",
      cvEyebrow: "Curriculum Vitae",
    },
    ui: {
      searchPlaceholder: "Search...",
      searchTalks: "Search talks by title, event, format, or organizer...",
      searchMaterials: "Search materials by title, description, format...",
      searchTools: "Search tools by title, objective, methods...",
      searchPubs: "Search publications by title, author, venue...",
      allYears: "All Years",
      allTopics: "All Topics",
      allTypes: "All Types",
      allFormats: "All Formats",
      clearFilters: "Clear filters",
      showMore: "Show more",
      showMorePubs: "Show more publications",
      showMoreTools: "Show more tools",
      showMoreSessions: "Show more sessions",
      showMoreMaterials: "Show more materials",
      showing: "Showing",
      of: "of",
      publications: "publications",
      sessions: "sessions",
      materialsLabel: "materials",
      toolsLabel: "tools",
      filtered: "(filtered)",
      exportBibtex: "Export BibTeX",
      exportRis: "Export RIS",
      copiedBibtex: "Copied BibTeX",
      copied: "Copied",
      bibtex: "BibTeX",
      ris: "RIS",
      downloadPdf: "Download PDF",
      openPdf: "Open PDF",
      downloadPdfDe: "Download PDF",
      fullCvDoc: "Full CV Documents",
      fullCvPreview: "Open Full PDF CV in browser",
      allPublications: "All publications",
      allTools: "All tools",
      abstract: "Abstract",
      hideAbstract: "Hide Abstract",
      doi: "DOI",
      arxiv: "arXiv",
      pdf: "PDF",
      source: "Source",
      featured: "Featured",
      problem: "Problem",
      methods: "Methods",
      physicalRelevance: "Physical Relevance",
      featuredTools: "Featured Tools",
      topicPublications: "Topic publications",
      modeProfile: "Mode profile / structure",
    },
    sections: {
      recentActivity: "Recent Activity",
      researchOverview: "Research Overview",
      featuredPublications: "Featured Publications",
      featuredSoftware: "Featured Software",
      academicProfiles: "Academic Profiles",
      education: "Education",
      researchExperience: "Research Experience",
      teaching: "Teaching and Mentoring Experience",
      leadership: "Leadership Experience and Academic Service",
      awards: "Honors, Awards, and Research Funding",
      memberships: "Professional Memberships",
      references: "References",
      fullCvSection: "Full CV Document",
      profiles: "Profiles",
      sections: "Sections",
      footerCopyright: "Research profile and selected academic work.",
    },
  },

  de: {
    nav: {
      about: "Über mich",
      research: "Forschung",
      publications: "Publikationen",
      tools: "Werkzeuge",
      materials: "Materialien",
      cv: "Lebenslauf",
    },
    identity: {
      role: "Forscher für Integrierte Photonik",
      statement:
        "Integrierte Nanophotonik, quantenphotonische Quellen, nichtlineare On-Chip-Bauelemente, physikinformiertes Inversdesign und wellengleichungsbeschränkte neuronale Netze zur Optimierung photonischer Bauelemente.",
      compactStatement:
        "Integrierte Nanophotonik, quantenphotonische Quellen, nichtlineare On-Chip-Bauelemente und physikinformiertes Inversdesign.",
      homepageStatement:
        "Die Forschung konzentriert sich auf integrierte nanophotonische Bauelemente: Quellen verschränkter Photonen, nichtlineare Materialplattformen und physikinformierte Berechnungsmethoden für das Inversdesign von Bauelementen.",
      aboutEpigraph:
        "Diejenigen, die verrückt genug sind zu denken, sie könnten die Welt verändern, sind diejenigen, die es tun.",
    },
    headers: {
      aboutTitle: "Forschungsprofil",
      aboutEyebrow: "Über mich",
      researchTitle: "Forschungsschwerpunkte in der integrierten Photonik",
      researchEyebrow: "Forschung",
      researchDesc:
        "Die Forschung ist nach physikalischen und numerischen Themen strukturiert. Die zugrunde liegende Methodik basiert auf Vollwellen-Elektromagnetik und Bauelementphysik.",
      pubTitle: "Publikationen, Preprints und wissenschaftliche Arbeiten",
      pubEyebrow: "Publikationen",
      pubDesc:
        "Peer-Review-Journalartikel, Preprints und zitierfähige technische Berichte in der integrierten Photonik und dem rechnergestützten Bauelementdesign.",
      toolsTitle: "Softwarewerkzeuge und Codebasen",
      toolsEyebrow: "Werkzeuge",
      toolsDesc:
        "Softwarewerkzeuge und Codebasen zur Unterstützung reproduzierbarer Simulationen und wissenschaftlicher Berechnungen.",
      materialsTitle: "Technische Materialien, Artikel und Vorträge",
      materialsEyebrow: "Materialien",
      materialsDesc:
        "Herunterladbare Lehr- und Referenzmaterialien, technische Artikel sowie eine chronologische Übersicht von Vorträgen und Workshops.",
      cvTitle: "Lebenslauf",
      cvEyebrow: "Lebenslauf",
    },
    ui: {
      searchPlaceholder: "Suchen...",
      searchTalks: "Vorträge nach Titel, Veranstaltung oder Format suchen...",
      searchMaterials: "Materialien nach Titel, Beschreibung oder Format suchen...",
      searchTools: "Werkzeuge nach Titel, Ziel oder Methode suchen...",
      searchPubs: "Publikationen nach Titel, Autor oder Journal suchen...",
      allYears: "Alle Jahre",
      allTopics: "Alle Themen",
      allTypes: "Alle Typen",
      allFormats: "Alle Formate",
      clearFilters: "Filter zurücksetzen",
      showMore: "Mehr anzeigen",
      showMorePubs: "Mehr Publikationen anzeigen",
      showMoreTools: "Mehr Werkzeuge anzeigen",
      showMoreSessions: "Mehr Vorträge anzeigen",
      showMoreMaterials: "Mehr Materialien anzeigen",
      showing: "Zeigt",
      of: "von",
      publications: "Publikationen",
      sessions: "Vorträgen",
      materialsLabel: "Materialien",
      toolsLabel: "Werkzeugen",
      filtered: "(gefiltert)",
      exportBibtex: "BibTeX exportieren",
      exportRis: "RIS exportieren",
      copiedBibtex: "BibTeX kopiert",
      copied: "Kopiert",
      bibtex: "BibTeX",
      ris: "RIS",
      downloadPdf: "PDF herunterladen",
      openPdf: "PDF öffnen",
      downloadPdfDe: "PDF herunterladen",
      fullCvDoc: "Vollständige CV-Dokumente",
      fullCvPreview: "Vollständigen PDF-Lebenslauf im Browser öffnen",
      allPublications: "Alle Publikationen",
      allTools: "Alle Werkzeuge",
      abstract: "Zusammenfassung",
      hideAbstract: "Verbergen",
      doi: "DOI",
      arxiv: "arXiv",
      pdf: "PDF",
      source: "Quelle",
      featured: "Ausgewählt",
      problem: "Problemstellung",
      methods: "Methoden",
      physicalRelevance: "Physikalische Relevanz",
      featuredTools: "Ausgewählte Werkzeuge",
      topicPublications: "Publikationen zum Thema",
      modeProfile: "Modenprofil / Struktur",
    },
    sections: {
      recentActivity: "Neueste Aktivitäten",
      researchOverview: "Forschungsüberblick",
      featuredPublications: "Ausgewählte Publikationen",
      featuredSoftware: "Ausgewählte Software",
      academicProfiles: "Akademische Profile",
      education: "Ausbildung",
      researchExperience: "Forschungserfahrung",
      teaching: "Lehre und Mentoring",
      leadership: "Führungs- und Gremienerfahrung",
      awards: "Preise und Auszeichnungen",
      memberships: "Mitgliedschaften",
      references: "Referenzen",
      fullCvSection: "Vollständiger Lebenslauf",
      profiles: "Profile",
      sections: "Bereiche",
      footerCopyright: "Forschungsprofil und ausgewählte akademische Arbeiten.",
    },
  },
}
