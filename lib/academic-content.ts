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
  shortTitle: "Photonics researcher, B.Sc. in Electronics and Communications Engineering",
  affiliation: "Alexandria University",
  location: "Alexandria, Egypt",
  email: socialLinks.email,
  statement:
    "Researcher in integrated, nonlinear, and quantum photonics, combining theoretical modeling, computational design, and experimental validation to develop next-generation chip-scale optical devices.",
  compactStatement:
    "Integrated, nonlinear, and quantum photonics, combining theoretical, computational, and experimental methods for next-generation devices.",
} as const

export const profileLinks = [
  { label: "CV", href: "/cv", external: false },
  { label: "Google Scholar", href: socialLinks.scholar, external: true },
  { label: "GitHub", href: socialLinks.github, external: true },
  { label: "ORCID", href: socialLinks.orcid, external: true },
] as const

export const aboutParagraphs = [
  "I hold a B.Sc. in Electronics and Communications Engineering from Alexandria University. My research spans integrated, nonlinear, and quantum photonics, combining theoretical physics, computational design, and experimental workflows to develop next-generation chip-scale optical devices.",
  "At NanoPhoto Lab, IMRE, A*STAR, I have focused on optimizing integrated quantum light sources and optical structures, bridging theoretical models with active experimental constraints. I treat computational tools and machine learning not in isolation, but as accelerators to explore and validate physical phenomena under realistic experimental conditions.",
  "My earlier research work includes fiber Bragg grating (FBG) optical sensing for biomedical monitoring and silicon photonic device optimization. Across these areas, my goal is connecting fundamental physical theories, rigorous simulations, and experimental validation in integrated optoelectronic systems.",
] as const

export const researchThemes = [
  {
    id: "integrated-nanophotonics",
    title: "Integrated Nanophotonics",
    image: "/images/integrated-nanophotonics.png",
    problem:
      "Understanding the dynamic interaction between guided optical modes, material properties (such as liquid crystals, 2D layers, and ferroelectrics), and external physical stimuli (thermal shifts, electric fields, or phase transition behavior) on SiO₂ substrates.",
    methods:
      "Full-wave FDTD simulation, anisotropic material modeling, multiphysics coupling analysis, waveguide structure analysis, and experimental prototyping validation.",
    physicalRelevance:
      "Exploring how external physical phenomena tune material responses (such as electro-optic modulation and BIC/quasi-BIC transitions) to control and route light on-chip.",
  },
  {
    id: "quantum-photonics",
    title: "Quantum Photonics",
    image: "/images/nonlinear-quantum-photonics.png",
    problem:
      "Scaling optical quantum information processing on-chip requires harnessing nonlinear physical effects for photon generation, interface routing, and quantum memory storage, bridging theoretical circuit constraints with experimental implementation.",
    methods:
      "Nonlinear optics simulation, quantum state representation, optical memory interface modeling, design of quantum coherent circuits, and phase-matching optimization.",
    physicalRelevance:
      "Governing nonlinear optical phenomena and coherent light-matter interactions to execute quantum information processing, state manipulation, and memory storage in PIC architectures.",
  },
  {
    id: "intelligent-photonics",
    title: "Intelligent Photonics",
    image: "/images/intelligent-photonics.png",
    problem:
      "Optimizing complex optical responses requires bridging physical modeling with machine learning, both by using AI to design custom photonic devices and by developing photonic hardware (such as neuromorphic networks) to accelerate AI computations.",
    methods:
      "Physics-informed neural networks, adjoint & evolutionary optimization, neuromorphic optical computing architectures, photonic neural network modeling, and inverse design algorithms.",
    physicalRelevance:
      "Creates a bidirectional link where physical wave equations constrain machine learning models, and analog photonic systems perform mathematical operations at the speed of light.",
  },
] as const

export const projects = [
  {
    id: "pd-design-kit",
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
    relatedThemes: ["integrated-nanophotonics"],
  },
] as const

export const recentActivity = [
  {
    date: "Jul 2026",
    type: "milestone",
    title: "Completed B.Sc. in Electronics and Communications Engineering",
    detail: "Graduated from Alexandria University with a degree in Electronics and Communications Engineering.",
  },
  {
    date: "Jun 2026",
    type: "software",
    title: "Released PD-Design-Kit as a public photonics design workflow",
    detail:
      "Repository and citable DOI for a Ge-on-Si photodetector simulation and compact-model pipeline.",
  },
  {
    date: "Jun 2026",
    type: "preprint",
    title: "Preprint on physics-informed neural networks posted on arXiv",
    detail: "Research on using PINNs to reshape multi-physics design and discovery submitted as preprint.",
  },
  {
    date: "Jun 2026",
    type: "paper",
    title: "Paper on THz quasi-BIC metasurfaces accepted at Journal of Optics",
    detail:
      "Review outlining design frameworks and applications of terahertz bound states in the continuum accepted for publication.",
  },
  {
    date: "Sep 2025",
    type: "position",
    title: "Joined NanoPhoto Lab, IMRE, A*STAR, as a research intern",
    detail:
      "Work focused on physics-informed optimization for integrated quantum photonic source and detection structures.",
  },
] as const

export const cvSummary = [
  {
    heading: "Education",
    items: [
      "B.Sc. in Electronics and Communications Engineering, Alexandria University, 2021–2026.",
      "Bachelor thesis work in silicon photonic devices, waveguide-integrated photodetectors, and intra-data-center optical links.",
    ],
  },
  {
    heading: "Research Experience",
    items: [
      "Research Intern, NanoPhoto Lab, IMRE, A*STAR, 2025–present.",
      "Research Intern, OPST Group, Alexandria University, 2023 to 2025.",
      "Training in analog and mixed-signal modeling, CMOS analog IC design, and photonic device simulation workflows.",
    ],
  },
  {
    heading: "Methods",
    items: [
      "Integrated, nonlinear, and quantum photonics, FBG optical sensing, and chip-scale device modeling.",
      "Theoretical modeling, multiphysics simulation (FDTD, FEM, drift-diffusion), adjoint & evolutionary inverse design, machine learning optimization, and experimental prototyping validation.",
    ],
  },
] as const

export const methodStack = [
  "Theoretical Electrodynamics",
  "FDTD & Finite Element Solvers",
  "Adjoint & Evolutionary Inverse Design",
  "Drift-Diffusion Transport Modeler",
  "Photonic Circuit Simulator",
  "Scientific Computing & DSP",
  "Python / PyTorch",
  "Integrated Layout Editors",
  "Experimental Prototyping & Optical Testing",
  "Scientific Automation",
  "LaTeX Typesetting",
] as const
