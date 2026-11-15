import cvData from "@/data/cv_data.json"
import { socialLinks } from "@/lib/social-links"

// Navigation

export const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/tools", label: "Tools" },
  { href: "/materials", label: "Materials" },
  { href: "/cv", label: "CV" },
] as const

// Identity
// Single source of truth: cv_data.json -> personalInfo and researchInterests.
// The website is the detailed view; the PDF CV is the condensed form.

export const identity = {
  name: cvData.personalInfo.name,
  specialization: cvData.personalInfo.specialization,
  shortTitle: cvData.personalInfo.specialization,
  affiliation: "FAU Erlangen-Nürnberg and Max Planck School of Photonics",
  location: `${cvData.personalInfo.city}, ${cvData.personalInfo.country}`,
  email: socialLinks.email,
  orcid: cvData.personalInfo.orcid,
  statement: cvData.researchInterests,
  compactStatement:
    "Integrated nanophotonics, quantum photon-pair sources, and physics-informed inverse design.",
} as const

export const homepageResearchStatement =
  "Research investigates guided-mode integrated electrodynamics, nonlinear chip-scale biphoton quantum sources, and wave-equation-constrained neural surrogate models for active photonic and nanophotonic device synthesis."

export const activityTypeLabel: Record<string, string> = {
  paper: "Paper",
  preprint: "Preprint",
  software: "Software",
  position: "Position",
  milestone: "Education",
  award: "Award",
  talk: "Talk",
  article: "Article",
}

// Current position
export const currentPosition =
  "Ph.D. Candidate (Study Phase, MPSP) and M.Sc. Student (MAOT, FAU)"

export const mpspFundingAcknowledgement: string =
  cvData.personalInfo.fundingAcknowledgement

// Profile links

export const profileLinks = [
  { label: "CV", href: "/cv", external: false },
  { label: "Google Scholar", href: socialLinks.scholar, external: true },
  { label: "GitHub", href: socialLinks.github, external: true },
  { label: "ORCID", href: socialLinks.orcid, external: true },
  { label: "ResearchGate", href: socialLinks.researchGate, external: true },
] as const

// About page
// Concise academic biography aligned with cv_data.json and free of curriculum bloat.

export const aboutParagraphs = [
  "Islam I. Abdulaal is a Ph.D. candidate in the Study Phase at the Max Planck School of Photonics and is pursuing an M.Sc. in Advanced Optical Technologies (MAOT) at Friedrich-Alexander-Universität Erlangen-Nürnberg. He holds a B.Sc. in Electronics and Communications Engineering from Alexandria University and conducted prior integrated photonics research at the NanoPhoto Lab, IMRE, A*STAR, and the OPST Group at Alexandria University.",
  "His research centers on integrated nanophotonics, quantum photonics, and intelligent photonics, connecting full-wave electromagnetic theory with physics-informed neural surrogates for waveguide modeling and inverse device design.",
  "He is a student member of the Elite Network of Bavaria, serves on the founding board of the Optica Egypt Local Section, and previously chaired the IEEE Solid-State Circuits Society Student Branch Chapter at Alexandria University.",
] as const

export const aboutEpigraph: string | null = null

export const aboutEpigraphAuthor: string | null = null

// Research themes
// Website-specific thematic descriptions coherent with cv_data.json.

export const researchThemes = [
  {
    id: "integrated-nanophotonics",
    title: "Integrated Nanophotonics",
    image: "/images/integrated-nanophotonics.png",
    problem:
      "Harnessing the interaction between guided optical modes, hybrid active materials (ferroelectrics, liquid crystals, 2D layers), and surrounding acoustic, thermal, or electrostatic fields across cavity, photonic crystal, plasmonic, and bound-state-in-the-continuum (BIC) nanophotonic structures.",
    methods:
      "Three-dimensional full-wave FDTD and finite-element electromagnetic modeling, anisotropic permittivity tensor formulation, coupled semiconductor drift-diffusion transport, waveguide dispersion engineering, transfer-matrix calculation, and high-quality-factor resonant cavity eigenmode extraction across integrated dielectric platforms.",
    physicalRelevance:
      "External stimuli and material responses dynamically modify the local permittivity tensor, shifting optical resonances and tuning propagation constants. Quantifying these optoacoustic or electro-optic couplings enables active tunability, reconfigurability, and switchable light routing on-chip.",
  },
  {
    id: "quantum-photonics",
    title: "Quantum Photonics",
    image: "/images/nonlinear-quantum-photonics.png",
    problem:
      "Scaling integrated quantum photonic technologies requires co-designing waveguide-based nonlinear photon-pair sources, low-loss modal splitters, and phase-shifter networks while maintaining spectral purity and modal phase-matching across compact anisotropic nanophotonic platforms.",
    methods:
      "Second-order nonlinear coupled-wave modeling, spontaneous parametric down-conversion (SPDC) joint spectral amplitude analysis, finite-difference eigenmode overlap integration, quantum state purity evaluation, and coherent photonic circuit co-simulation across waveguides.",
    physicalRelevance:
      "Controlling nonlinear susceptibility tensors, group-velocity dispersion, and coherent waveguide interactions enables high-purity entangled biphoton generation, deterministic state preparation, and low-decoherence routing within scalable integrated quantum optical circuits.",
  },
  {
    id: "intelligent-photonics",
    title: "Intelligent Photonics",
    image: "/images/intelligent-photonics.png",
    problem:
      "Accelerating photonic device discovery requires overcoming the high computational cost of iterative full-wave electromagnetic sweeps by embedding physical wave equations into differentiable neural surrogates and developing optical neuromorphic processing architectures.",
    methods:
      "Physics-informed neural networks (PINNs), deep operator surrogates (DeepONet), coupled-wave equation residuals, adjoint gradient and evolutionary genetic optimization, interferometric optical computing models, and automated multi-physics nanophotonic inverse-design workflows.",
    physicalRelevance:
      "Establishing a bidirectional framework where Maxwell and coupled-wave conservation laws constrain neural surrogate training enables fast, physically consistent inverse design while multi-port interferometric circuits execute linear transformations optically.",
  },
] as const

// Projects
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
  readonly github?: string
  readonly zenodo?: string
  readonly huggingface?: string
  readonly huggingfaceDataset?: string
  readonly paperDoi?: string
  readonly links: readonly { readonly label: string; readonly href: string }[]
  readonly relatedThemes: readonly string[]
  readonly tier: "major" | "minor"
  readonly year: string
}

export const projects: readonly Project[] = [
  {
    id: "nanophotonet-mpm",
    title: "NanoPhotoNet-MPM: Physics-Informed Neural Surrogate for Inverse SPDC Design",
    status: "Prerelease",
    objective:
      "A physics-informed neural surrogate framework combining an EigenmodeDeepONet transverse eigensolver, a deterministic physics conversion layer, and a CWE-PINN longitudinal propagator for inverse design of modal phase-matched biphoton quantum light sources in anisotropic monoclinic NbOCl₂ waveguides.",
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
    zenodo: "https://doi.org/10.5281/zenodo.18653064",
    huggingface: "https://huggingface.co/iabdul-aal/NanoPhotoNet-MPM",
    huggingfaceDataset: "https://huggingface.co/datasets/iabdul-aal/NanoPhotoNet-MPM",
    paperDoi: "10.20944/preprints202609.1239.v1",
    links: [
      { label: "Code DOI", href: "https://doi.org/10.5281/zenodo.18653064" },
      { label: "HuggingFace", href: "https://huggingface.co/iabdul-aal/NanoPhotoNet-MPM" },
      { label: "Dataset", href: "https://huggingface.co/datasets/iabdul-aal/NanoPhotoNet-MPM" },
      { label: "Paper", href: "https://doi.org/10.20944/preprints202609.1239.v1" },
    ],
    relatedThemes: ["intelligent-photonics", "integrated-nanophotonics", "quantum-photonics"],
    tier: "major",
    year: "2026",
  },
  {
    id: "pd-design-kit",
    title: "Ge-on-Si PIN Photodetector Design Kit",
    status: "",
    objective:
      "A cascaded multiphysics simulation workflow for a waveguide-integrated Ge-on-Si vertical n-i-p photodiode targeting O-band intra-data-center optical interconnects.",
    methods:
      "3D Finite-Difference Time-Domain (FDTD) optical absorption modeling, 3D semiconductor drift-diffusion transport simulation, transit-time and RC bandwidth analysis, compact-model parameter extraction, circuit co-simulation, and GDSII layout validation.",
    tools: [
      "3D FDTD Solvers",
      "Drift-Diffusion Transport",
      "Circuit Co-Simulation",
      "GDSII Layout",
      "Scientific Python",
      "Automation Scripts",
      "Typesetting",
    ],
    results:
      "Public repository containing solver-derived data flows, generated figures, compact model library artifacts, automation scripts, and a Zenodo archive record (DOI 10.5281/zenodo.21089184).",
    github: "https://github.com/iabdul-aal/PD-design-kit",
    zenodo: "https://doi.org/10.5281/zenodo.21089184",
    links: [
      { label: "Repository", href: "https://github.com/iabdul-aal/PD-design-kit" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.21089184" },
    ],
    relatedThemes: [],
    tier: "minor",
    year: "2026",
  },
]

// CV summary
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

// Method stack

export const methodStack = [
  "3D FDTD Simulation",
  "Drift-Diffusion Transport",
  "Finite Element Method (FEM)",
  "Physics-Informed Neural Networks",
  "Transfer-Matrix Method",
  "Python and PyTorch",
] as const
