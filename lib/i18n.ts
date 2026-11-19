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
    searchMaterials: string
    searchTools: string
    searchPubs: string
    allYears: string
    allTopics: string
    allTypes: string
    allFormats: string
    allCategories: string
    clearFilters: string
    showMorePubs: string
    showMoreMaterials: string
    showing: string
    of: string
    publications: string
    materialsLabel: string
    toolsLabel: string
    filtered: string
    exportBibtex: string
    exportRis: string
    copiedBibtex: string
    bibtex: string
    ris: string
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
    problem: string
    methods: string
    physicalRelevance: string
    topicPublications: string
    citableSoftware: string
    supportingUtilities: string
    lastUpdated: string
  }
  sections: {
    recentActivity: string
    researchOverview: string
    selectedPublications: string
    featuredTool: string
    education: string
    researchExperience: string
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
        "Reference notes, seminar slides, published technical essays, and a chronological record of public talks and student workshops in optical engineering.",
      cvTitle: "Curriculum Vitae",
      cvEyebrow: "CV",
    },
    ui: {
      searchPlaceholder: "Search...",
      searchMaterials: "Search materials by title, description, or format...",
      searchTools: "Search tools by title, objective, or methods...",
      searchPubs: "Search by title, author, or venue...",
      allYears: "All Years",
      allTopics: "All Topics",
      allTypes: "All Types",
      allFormats: "All Formats",
      allCategories: "All Categories",
      clearFilters: "Clear filters",
      showMorePubs: "Show more publications",
      showMoreMaterials: "Show more materials",
      showing: "Showing",
      of: "of",
      publications: "publications",
      materialsLabel: "materials",
      toolsLabel: "tools",
      filtered: "(filtered)",
      exportBibtex: "Export BibTeX",
      exportRis: "Export RIS",
      copiedBibtex: "Copied BibTeX",
      bibtex: "BibTeX",
      ris: "RIS",
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
      problem: "Problem",
      methods: "Methods",
      physicalRelevance: "Physical Relevance",
      topicPublications: "Topic publications",
      citableSoftware: "Citable Research Software",
      supportingUtilities: "Supporting Utilities",
      lastUpdated: "Last updated",
    },
    sections: {
      recentActivity: "Recent Activity",
      researchOverview: "Research Overview",
      selectedPublications: "Selected Publications",
      featuredTool: "Featured Tool",
      education: "Education",
      researchExperience: "Research Experience",
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
        "Referenzunterlagen, Seminarfolien, veröffentlichte Fachbeiträge sowie eine chronologische Übersicht öffentlicher Vorträge und Workshops in der optischen Technik.",
      cvTitle: "Lebenslauf",
      cvEyebrow: "Lebenslauf",
    },
    ui: {
      searchPlaceholder: "Suchen...",
      searchMaterials: "Nach Titel, Beschreibung oder Format suchen...",
      searchTools: "Nach Titel, Ziel oder Methode suchen...",
      searchPubs: "Nach Titel, Autor oder Journal suchen...",
      allYears: "Alle Jahre",
      allTopics: "Alle Themen",
      allTypes: "Alle Typen",
      allFormats: "Alle Formate",
      allCategories: "Alle Kategorien",
      clearFilters: "Filter zurücksetzen",
      showMorePubs: "Mehr Publikationen anzeigen",
      showMoreMaterials: "Mehr Materialien anzeigen",
      showing: "Zeigt",
      of: "von",
      publications: "Publikationen",
      materialsLabel: "Materialien",
      toolsLabel: "Werkzeugen",
      filtered: "(gefiltert)",
      exportBibtex: "BibTeX exportieren",
      exportRis: "RIS exportieren",
      copiedBibtex: "BibTeX kopiert",
      bibtex: "BibTeX",
      ris: "RIS",
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
      problem: "Problemstellung",
      methods: "Methoden",
      physicalRelevance: "Physikalische Relevanz",
      topicPublications: "Publikationen zum Thema",
      citableSoftware: "Zitierfähige Forschungssoftware",
      supportingUtilities: "Unterstützende Werkzeuge",
      lastUpdated: "Stand",
    },
    sections: {
      recentActivity: "Neueste Aktivitäten",
      researchOverview: "Forschungsüberblick",
      selectedPublications: "Ausgewählte Publikationen",
      featuredTool: "Ausgewähltes Werkzeug",
      education: "Ausbildung",
      researchExperience: "Forschungserfahrung",
      fullCvSection: "Vollständiger Lebenslauf",
      profiles: "Profile",
      sections: "Bereiche",
      footerCopyright: "Forschungsprofil und ausgewählte akademische Arbeiten.",
    },
  },
}
