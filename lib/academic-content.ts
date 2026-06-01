import { socialLinks } from "@/lib/social-links"

export const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/materials", label: "Materials" },
  { href: "/cv", label: "CV" },
] as const

export const identity = {
  name: "Islam I. Abdulaal",
  shortTitle: "Photonics researcher and B.Sc. (Hons.) candidate",
  affiliation: "Alexandria University",
  location: "Alexandria, Egypt",
  email: socialLinks.email,
  statement:
    "Researcher in computational and integrated photonics focused on nonlinear and quantum photonic systems, inverse design, and physics-informed computational methods.",
  compactStatement:
    "Computational and integrated photonics, with emphasis on nonlinear and quantum photonic systems, inverse design, and physics-informed modeling.",
} as const

export const profileLinks = [
  { label: "CV", href: "/cv", external: false },
  { label: "Google Scholar", href: socialLinks.scholar, external: true },
  { label: "GitHub", href: socialLinks.github, external: true },
  { label: "ORCID", href: socialLinks.orcid, external: true },
] as const

export const aboutParagraphs = [
  "I am pursuing a B.Sc. (Hons.) in Electronics and Communications Engineering at Alexandria University. My current work sits in computational and integrated photonics, with an emphasis on device modeling, inverse design, and physics-informed computational methods for nonlinear and quantum-compatible photonic systems.",
  "At NanoPhoto Lab, A*STAR, I have worked on physics-informed neural network methods for optimizing integrated quantum light source and detection structures. I treat machine learning as a modeling and optimization tool, useful when it remains constrained by the underlying physics and by reproducible simulation evidence.",
  "My earlier research work includes fiber Bragg grating sensing for biomedical monitoring and silicon photonic device modeling for intra-data-center optical links. Across these projects, the common thread is the connection between electromagnetic simulation, device physics, and system-level constraints.",
] as const

export const researchThemes = [
  {
    title: "Integrated Nanophotonics",
    problem:
      "Chip-scale photonic systems require waveguides, couplers, detectors, and multiplexing structures that preserve bandwidth and modal control while remaining compatible with realistic fabrication constraints.",
    methods:
      "Waveguide and mode analysis, FDTD simulation, drift-diffusion modeling, compact-model extraction, and layout-aware validation.",
    physicalRelevance:
      "The theme connects modal confinement, dispersion, absorption, carrier transport, and parasitics into one design loop rather than treating device metrics in isolation.",
  },
  {
    title: "Nonlinear Quantum Photonics",
    problem:
      "Integrated quantum photonic systems need efficient light generation, manipulation, and detection under loss, phase-matching, and coupling constraints.",
    methods:
      "Nonlinear optics analysis, source and detector structure optimization, phase-matching reasoning, and simulation-guided design of integrated quantum photonic components.",
    physicalRelevance:
      "The central physical question is how geometry and material response shape photon-pair generation, bandwidth, collection efficiency, and integration density.",
  },
  {
    title: "Physics-Informed Design",
    problem:
      "Target photonic responses can be hard to derive manually from geometry, while purely data-driven models become unreliable without physical constraints.",
    methods:
      "Physics-informed neural networks, residual-based loss terms, gradient-based adjoint optimization, parametric sweeps, and electromagnetic validation solvers.",
    physicalRelevance:
      "This framework ensures optimized device structures satisfy Maxwell equations and boundary conditions, rather than treating optimization as black-box fitting.",
  },

] as const

export const projects = [
  {
    title: "Ge-on-Si PIN Photodetector Design Kit",
    status: "Public software and citable design artifact",
    objective:
      "Build a cascaded multiphysics workflow for a waveguide-integrated Ge-on-Si vertical n-i-p photodiode for O-band intra-data-center optical links.",
    methods:
      "Finite-Difference Time-Domain (FDTD) optical absorption modeling, drift-diffusion electrical transport modeling, transit-time and RC bandwidth analysis, compact-model parameter extraction, system-level simulation, and layout validation.",
    tools: ["FDTD Solvers", "Drift-Diffusion Simulators", "Circuit Simulators", "Scientific Computing", "Layout Editors", "Automation Scripts", "Typesetting"],
    results:
      "Public repository with solver-derived data flow, generated figures, compact model library (CML) artifacts, automation scripts, and a Zenodo DOI for citation.",
    links: [
      { label: "Repository", href: "https://github.com/iabdul-aal/PD-design-kit" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.19652934" },
    ],
  },
] as const

export const recentActivity = [
  {
    date: "2026",
    title: "Released PD-Design-Kit as a public photonics design workflow",
    detail:
      "Repository and citable DOI for a Ge-on-Si photodetector simulation and compact-model pipeline.",
  },
  {
    date: "2025",
    title: "Submitted arXiv preprint on THz quasi-BIC metasurfaces",
    detail:
      "Review work on high-Q terahertz metasurfaces for biosensing and high-speed wireless communication contexts.",
  },
  {
    date: "2025",
    title: "Joined NanoPhoto Lab, A*STAR, as a research intern",
    detail:
      "Work focused on physics-informed optimization for integrated quantum photonic source and detection structures.",
  },
] as const

export const cvSummary = [
  {
    heading: "Education",
    items: [
      "B.Sc. (Hons.) in Electronics and Communications Engineering, Alexandria University, 2021 to 2026.",
      "Bachelor thesis work in silicon photonic devices, waveguide-integrated photodetectors, and intra-data-center optical links.",
    ],
  },
  {
    heading: "Research Experience",
    items: [
      "Research Intern, NanoPhoto Lab, IMRE, A*STAR, 2025 to present.",
      "Research Intern, OPST Group, Alexandria University, 2023 to 2025.",
      "Training in analog and mixed-signal modeling, CMOS analog IC design, and photonic device simulation workflows.",
    ],
  },
  {
    heading: "Methods",
    items: [
      "Integrated photonics, nanophotonics, nonlinear and quantum photonics, FBG sensing, and photonic system modeling.",
      "FDTD, drift-diffusion simulation, compact modeling, Python/MATLAB scientific analysis, PyTorch, and physics-informed optimization.",
    ],
  },
] as const

export const methodStack = [
  "FDTD Electromagnetic Solver",
  "Drift-Diffusion Transport Modeler",
  "Finite Element Method (FEM) Solvers",
  "Photonic Circuit Simulator",
  "Scientific Computing & DSP",
  "Python / PyTorch",
  "Integrated Layout Editors",
  "Scientific Automation",
  "LaTeX Typesetting",
] as const
