import cvData from "@/data/cv_data.json"
import { socialLinks } from "@/lib/social-links"

// ── Navigation ─────────────────────────────────────────────────────────────

export const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Tools" },
  { href: "/materials", label: "Materials" },
  { href: "/cv", label: "CV" },
] as const

// ── Identity ───────────────────────────────────────────────────────────────
// Single source of truth: cv_data.json → personalInfo and researchInterests.
// The website is the detailed view; the PDF CV is the condensed form.

export const identity = {
  name: cvData.personalInfo.name,
  // Specialization used as the short running title across the site
  shortTitle: cvData.personalInfo.specialization,
  affiliation: "",
  location: "",
  email: socialLinks.email,
  // Primary research statement — same text on homepage, about, and CV PDF header
  statement: cvData.researchInterests,
  // Compact form used where space is limited
  compactStatement:
    "Integrated nanophotonics, quantum photonic sources, nonlinear on-chip devices, and physics-informed inverse design.",
} as const

export const homepageResearchStatement =
  "Research concentrates on integrated nanophotonic devices: quantum entangled-photon sources, nonlinear material platforms, and physics-informed computational methods for device inverse design."

export const activityTypeLabel: Record<string, string> = {
  paper: "Paper",
  preprint: "Preprint",
  software: "Software",
  position: "Position",
  milestone: "Education",
  talk: "Talk",
  article: "Article",
}

// ── Current position ───────────────────────────────────────────────────────
export const currentPosition = cvData.personalInfo.specialization


// ── Profile links ─────────────────────────────────────────────────────────

export const profileLinks = [
  { label: "CV", href: "/cv", external: false },
  { label: "Google Scholar", href: socialLinks.scholar, external: true },
  { label: "GitHub", href: socialLinks.github, external: true },
  { label: "ORCID", href: socialLinks.orcid, external: true },
  { label: "ResearchGate", href: socialLinks.researchGate, external: true },
] as const

// ── About page ─────────────────────────────────────────────────────────────
// Narrative paragraphs for the About page. These are the full, discursive
// version of the CV experience entries — same facts, more context.
// Keep coherent with cv_data.json researchExperience bullets.

export const aboutParagraphs = [
  "Research activities center on wave-equation-constrained computational modeling and device-level simulation within integrated nanophotonics. The overarching objective is to develop reproducible computational workflows connecting fundamental electromagnetic theory to fabricable device geometries through FDTD simulation, coupled-mode analysis, and physics-informed inverse design.",
  "Published peer-reviewed work includes a contribution to the Journal of Optics on terahertz bound-state-in-the-continuum metasurfaces. Submitted work includes a preprint on physics-informed inverse-design pipelines for spontaneous parametric down-conversion sources.",
] as const

export const aboutEpigraph =
  "The ones who are crazy enough to think they can change the world are the ones who do."

export const aboutEpigraphAuthor = "Steve Jobs"

// ── Research themes ────────────────────────────────────────────────────────
// Rich website-specific content. Narratively coherent with cv_data.json
// researchInterests and experience bullets.

export const researchThemes = [
  {
    id: "integrated-nanophotonics",
    title: "Integrated Nanophotonics",
    image: "/images/integrated-nanophotonics.png",
    problem:
      "Harnessing the interaction between guided optical modes, hybrid active materials (ferroelectrics, liquid crystals, 2D layers), and surrounding acoustic, thermal, or electrostatic fields in cavity, photonic crystal, plasmonic, and bound-state-in-the-continuum (BIC) structures.",


    methods:
      "Full-wave electromagnetic simulation, anisotropic permittivity tensor modeling, multi-physical finite-element coupling, waveguide dispersion engineering, and resonant cavity analysis.",
    physicalRelevance:
      "External stimuli and material responses dynamically modify the local permittivity tensor, shifting resonances and tuning propagation constants. Modeling these optoacoustic or electro-optic couplings enables active tunability, reconfigurability, and switchable light routing on-chip.",
  },
  {
    id: "quantum-photonics",
    title: "Quantum Photonics",
    image: "/images/nonlinear-quantum-photonics.png",
    problem:
      "Scaling on-chip quantum technologies by co-integrating waveguide-based nonlinear photon-pair sources, coherent interfaces, and phase-shifter networks within the low-loss routing topologies established on the nanophotonic platform.",
    methods:
      "Nonlinear optics modeling, quantum state tomography representation, coherent waveguide interface simulation, and reconfigurable circuit design.",
    physicalRelevance:
      "Governing waveguide nonlinear coefficients and coherent interactions to execute high-fidelity quantum state preparation, routing, and manipulation in photonic circuit topologies.",
  },
  {
    id: "intelligent-photonics",
    title: "Intelligent Photonics",
    image: "/images/intelligent-photonics.png",
    problem:
      "Accelerating device design and discovery by bridging wave equations with deep learning and optimization methods, while developing all-optical neuromorphic processing hardware.",
    methods:
      "Physics-informed neural networks (PINNs), adjoint and gradient-free optimization, evolutionary search algorithms, optical neural network (ONN) architectures, and wave-based co-design.",
    physicalRelevance:
      "Establishing a bidirectional framework where physical wave propagation constrains network training, and multi-port interferometric circuits execute mathematical operations at the speed of light.",
  },
] as const


// ── Projects ───────────────────────────────────────────────────────────────
// Source of truth for the Tools page and homepage featured tool.
// Tier "minor": not featured on homepage, not listed under research themes.
// Tier "major" (default): featured on homepage, ranked by project_metrics.json score.
// Keep the tools array in cv_data.json in sync with this list.

export type Project = {
  readonly id: string
  readonly title: string
  readonly status: string
  readonly objective: string
  readonly methods: string
  readonly tools: readonly string[]
  readonly results: string
  readonly links: readonly { readonly label: string; readonly href: string }[]
  readonly relatedThemes: readonly string[]
  readonly tier: "major" | "minor"
  readonly year: string
}

export const projects: readonly Project[] = [
  {
    id: "nanophotonet-mpm",
    title: "NanoPhotoNet-MPM: Physics-Informed Neural Surrogate for Inverse SPDC Design",
    status: "Under Review",
    objective:
      "A physics-informed neural surrogate framework combining an EigenmodeDeepONet transverse eigensolver, a deterministic physics conversion layer, and a CWE-PINN longitudinal propagator for inverse design of modal phase-matched biphoton quantum light sources in anisotropic monoclinic NbOCl2 waveguides.",
    methods:
      "Physics-informed neural networks (PINNs), DeepOperator Networks (DeepONet), coupled-wave equations, finite-difference eigenmode (FDE) solvers, genetic algorithm optimization, and joint spectral amplitude (JSA) analysis.",
    tools: [
      "Physics-Informed Neural Networks",
      "DeepONet",
      "PyTorch",
      "Eigenmode Solvers",
      "Genetic Algorithm",
      "Quantum Photonics",
      "Python",
    ],
    results:
      "Predicts phase-matching zeros with 1.43e-3 effective-index MAE, identifies Type-II SPDC designs reaching P = 0.350 purity ceiling, and provides public code, model checkpoints, and FDE field dataset.",
    links: [
      { label: "Repository", href: "https://github.com/iabdul-aal/NanoPhotoNet-MPM" },
      { label: "Dataset DOI", href: "https://doi.org/10.57967/hf/9066" },
      { label: "Model DOI", href: "https://doi.org/10.57967/hf/9068" },
      { label: "Code DOI", href: "https://doi.org/10.5281/zenodo.18653064" },
    ],
    relatedThemes: ["intelligent-photonics", "integrated-nanophotonics", "nonlinear-quantum-photonics"],
    tier: "major",
    year: "2026",
  },
  {
    id: "pd-design-kit",
    title: "Ge-on-Si PIN Photodetector Design Kit",
    status: "",

    objective:
      "A cascaded multiphysics simulation workflow for a waveguide-integrated Ge-on-Si vertical n-i-p photodiode targeting O-band intra-data-center optical links.",
    methods:
      "Finite-Difference Time-Domain (FDTD) optical absorption modeling, drift-diffusion electrical transport simulation, transit-time and RC bandwidth analysis, compact-model parameter extraction, system-level link simulation, and layout validation.",
    tools: [
      "FDTD Solvers",
      "Drift-Diffusion Simulators",
      "Circuit Simulators",
      "Scientific Computing",
      "Layout Editors",
      "Automation Scripts",
      "Typesetting",
    ],
    results:
      "Public repository containing solver-derived data flows, generated figures, compact model library (CML) artifacts, automation scripts, and a Zenodo DOI record for citation.",
    links: [
      { label: "Repository", href: "https://github.com/iabdul-aal/PD-design-kit" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.19652934" },
    ],
    relatedThemes: [],
    tier: "minor",
    year: "2026",
  },
]

// ── Recent activity ────────────────────────────────────────────────────────
// Activity items are auto-generated by the daily cron pipeline into
// activity.json. The homepage reads from loadActivity(). No manual
// array is maintained here.

// ── CV summary ────────────────────────────────────────────────────────────
// Derived from cv_data.json so the website summary and PDF CV are coherent.

export const cvSummary = [
  {
    heading: "Education",
    items: cvData.education.map(
      (ed) => `${ed.degree}, ${ed.institution.split(",")[0]}, ${ed.period}.`,
    ),
  },
  {
    heading: "Research Experience",
    items: cvData.researchExperience.map(
      (exp) => `${exp.role}, ${exp.org}, ${exp.period}.`,
    ),
  },
  {
    heading: "Computational Methods",
    items: cvData.technicalSkills.map((sk) => `${sk.category}: ${sk.items}.`),
  },
] as const

// ── Method stack ───────────────────────────────────────────────────────────
// Derived from the first entry in cv_data.json technicalSkills.
// Used for the tag cloud on the CV page and research pages.

export const methodStack = [
  "FDTD Simulation",
  "Drift-Diffusion Transport",
  "Finite Element Method (FEM)",
  "Physics-Informed Neural Networks",
  "Transfer-Matrix Method",
  "Python and PyTorch",
] as const

