import { identity as academicIdentity } from "@/lib/academic-content"

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
    affiliation: string
    statement: string
    compactStatement: string
    homepageStatement: string
  }
  headers: {
    aboutTitle: string
    aboutEyebrow: string
    aboutDesc: string
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
    allCategories: string
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
    showBibtex: string
    hideBibtex: string
    ris: string
    downloadPdf: string
    downloadPdfEn: string
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
    citableSoftware: string
    supportingUtilities: string
    academicProgression: string
    institutionalAck: string
    lastUpdated: string
  }
  sections: {
    recentActivity: string
    researchOverview: string
    selectedPublications: string
    featuredPublications: string
    featuredSoftware: string
    featuredTool: string
    citableSoftware: string
    academicProfiles: string
    education: string
    researchExperience: string
    teaching: string
    leadership: string
    awards: string
    memberships: string
    technicalCapabilities: string
    languages: string
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
      role: "Ph.D. Candidate (Study Phase, Max Planck School of Photonics) and M.Sc. Student (MAOT, FAU)",
      affiliation: academicIdentity.affiliation,
      statement:
        "Computational modeling and inverse design of integrated nanophotonic devices, combining full-wave electrodynamics and physics-informed neural surrogates for active waveguides and nonlinear quantum photon-pair sources.",
      compactStatement:
        "Integrated nanophotonics, quantum photon-pair sources, and physics-informed inverse design.",
      homepageStatement:
        "Research investigates guided-mode integrated electrodynamics, nonlinear chip-scale biphoton quantum sources, and wave-equation-constrained neural surrogate models for active photonic and nanophotonic device synthesis.",
    },
    headers: {
      aboutTitle: "Research profile",
      aboutEyebrow: "About",
      aboutDesc:
        "Academic profile, educational background across Erlangen and Alexandria, and overview of research in integrated nanophotonics, quantum sources, and computational inverse design.",
      researchTitle: "Research themes in integrated photonics",
      researchEyebrow: "Research",
      researchDesc:
        "Research is organized by physical and numerical domain, applying full-wave electromagnetic solvers and device physics to connect optical geometry with waveguide and resonator behavior.",
      pubTitle: "Papers, preprints, and citable outputs",
      pubEyebrow: "Publications",
      pubDesc:
        "Peer-reviewed journal articles and preprints covering integrated nanophotonics, terahertz metasurfaces, and computational device modeling, complete with bibliographic metadata and repository links.",
      toolsTitle: "Software tools and codebases",
      toolsEyebrow: "Tools",
      toolsDesc:
        "Open-source simulation workflows, neural surrogate solvers, and verified device packages published to support reproducible photonic engineering and citable software artifacts.",
      materialsTitle: "Technical materials, notes, and public sessions",
      materialsEyebrow: "Materials",
      materialsDesc:
        "Reference notes, seminar slides, archived technical essays, and a chronological archive of public talks and student workshops in optical engineering.",
      cvTitle: "Curriculum Vitae",
      cvEyebrow: "CV",
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
      allCategories: "All Categories",
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
      showBibtex: "View BibTeX",
      hideBibtex: "Hide BibTeX",
      ris: "RIS",
      downloadPdf: "Download PDF",
      downloadPdfEn: "Download PDF (EN)",
      openPdf: "Open PDF",
      downloadPdfDe: "Download PDF (DE)",
      fullCvDoc: "Curriculum Vitae PDF",
      fullCvPreview: "Open PDF in new tab",
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
      citableSoftware: "Citable Research Software",
      supportingUtilities: "Supporting Utilities",
      academicProgression: "Academic Progression",
      institutionalAck: "Institutional Acknowledgement",
      lastUpdated: "Last updated",
    },
    sections: {
      recentActivity: "Recent Activity",
      researchOverview: "Research Overview",
      selectedPublications: "Selected Publications",
      featuredPublications: "Featured Publications",
      featuredSoftware: "Featured Software",
      featuredTool: "Featured Tool",
      citableSoftware: "Citable Research Software",
      academicProfiles: "Academic Profiles",
      education: "Education",
      researchExperience: "Research Experience",
      teaching: "Teaching and Academic Supervision",
      leadership: "Leadership and Service",
      awards: "Awards and Honors",
      memberships: "Professional Memberships",
      technicalCapabilities: "Technical Capabilities",
      languages: "Languages",
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
      role: "Doktorand (Studienphase, Max Planck School of Photonics) und M.Sc.-Studierender (MAOT, FAU)",
      affiliation: "FAU Erlangen-Nürnberg und Max Planck School of Photonics",
      statement:
        "Numerische Modellierung und Inversdesign integrierter nanophotonischer Bauelemente durch Verknüpfung von Vollwellen-Elektrodynamik und physikinformierten neuronalen Surrogaten für aktive Wellenleiter sowie Quanten-Photonenpaar-Quellen.",
      compactStatement:
        "Integrierte Nanophotonik, Quanten-Photonenpaar-Quellen und physikinformiertes Inversdesign.",
      homepageStatement:
        "Die Forschung untersucht geführte Wellenleiter-Elektrodynamik, nichtlineare Quanten-Photonenpaar-Quellen auf dem Chip und wellengleichungsbeschränkte neuronale Surrogatmodelle für aktive photonische und nanophotonische Bauelemente.",
    },
    headers: {
      aboutTitle: "Forschungsprofil",
      aboutEyebrow: "Über mich",
      aboutDesc:
        "Akademisches Profil, Ausbildung in Erlangen und Alexandria sowie Überblick über die Forschung zu integrierter Nanophotonik, Quantenquellen und physikinformiertem Design.",
      researchTitle: "Forschungsschwerpunkte in der integrierten Photonik",
      researchEyebrow: "Forschung",
      researchDesc:
        "Die Forschung gliedert sich nach physikalischen und numerischen Themenfeldern, wobei Vollwellen-Elektromagnetik und Bauelementphysik die Geometrie mit dem optischen Verhalten verknüpfen.",
      pubTitle: "Publikationen, Preprints und zitierfähige Arbeiten",
      pubEyebrow: "Publikationen",
      pubDesc:
        "Peer-Review-Journalartikel und Preprints zu integrierter Nanophotonik, Terahertz-Metastrukturen und rechnergestütztem Bauelementdesign mit bibliografischen Metadaten und Repositoriumsverknüpfungen.",
      toolsTitle: "Softwarewerkzeuge und Codebasen",
      toolsEyebrow: "Werkzeuge",
      toolsDesc:
        "Quelloffene Simulationsabläufe, neuronale Surrogat-Löser und verifizierte Bauelementpakete zur Unterstützung reproduzierbarer Photonik-Berechnungen sowie zitierfähiger Softwareartefakte.",
      materialsTitle: "Technische Materialien, Notizen und Vorträge",
      materialsEyebrow: "Materialien",
      materialsDesc:
        "Referenzunterlagen, Seminarfolien, archivierte technische Beiträge sowie eine chronologische Übersicht öffentlicher Vorträge und Workshops in der optischen Technik.",
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
      allCategories: "Alle Kategorien",
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
      showBibtex: "BibTeX anzeigen",
      hideBibtex: "BibTeX verbergen",
      ris: "RIS",
      downloadPdf: "PDF herunterladen",
      downloadPdfEn: "PDF herunterladen (EN)",
      openPdf: "PDF öffnen",
      downloadPdfDe: "PDF herunterladen (DE)",
      fullCvDoc: "Lebenslauf als PDF",
      fullCvPreview: "PDF in neuem Tab öffnen",
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
      citableSoftware: "Zitierfähige Forschungssoftware",
      supportingUtilities: "Unterstützende Werkzeuge",
      academicProgression: "Akademischer Werdegang",
      institutionalAck: "Förderhinweis",
      lastUpdated: "Stand",
    },
    sections: {
      recentActivity: "Neueste Aktivitäten",
      researchOverview: "Forschungsüberblick",
      selectedPublications: "Ausgewählte Publikationen",
      featuredPublications: "Ausgewählte Publikationen",
      featuredSoftware: "Ausgewählte Software",
      featuredTool: "Ausgewähltes Werkzeug",
      citableSoftware: "Zitierfähige Forschungssoftware",
      academicProfiles: "Akademische Profile",
      education: "Ausbildung",
      researchExperience: "Forschungserfahrung",
      teaching: "Lehre und akademische Betreuung",
      leadership: "Leitung und akademischer Dienst",
      awards: "Preise und Auszeichnungen",
      memberships: "Mitgliedschaften",
      technicalCapabilities: "Fachliche Kompetenzen",
      languages: "Sprachen",
      references: "Referenzen",
      fullCvSection: "Vollständiger Lebenslauf",
      profiles: "Profile",
      sections: "Bereiche",
      footerCopyright: "Forschungsprofil und ausgewählte akademische Arbeiten.",
    },
  },
}
