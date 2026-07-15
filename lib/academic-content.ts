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
  shortTitle: "Researcher in Integrated and Quantum Photonics",
  affiliation: "Alexandria University",
  location: "Alexandria, Egypt",
  email: socialLinks.email,
  statement:
    "Researcher in integrated, nonlinear, and quantum photonics, combining theoretical modeling, advanced computational design, and experimental characterization to develop next-generation chip-scale optical devices.",
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
  "I am a researcher in integrated, nonlinear, and quantum photonics, combining theoretical physics, advanced computational design, and experimental characterization to develop next-generation chip-scale optical systems. My academic background is in Electronics and Communications Engineering from Alexandria University.",
  "At NanoPhoto Lab, IMRE, A*STAR, I have focused on optimizing integrated quantum light sources and optical structures, bridging theoretical models with active experimental constraints. I treat computational tools and machine learning not in isolation, but as accelerators to explore and validate physical phenomena under realistic experimental conditions.",
  "My earlier research work includes fiber Bragg grating (FBG) optical sensing for biomedical monitoring and silicon photonic device optimization. Across these areas, my goal is connecting fundamental physical theories, rigorous simulations, and experimental validation in integrated optoelectronic systems.",
] as const

export const researchThemes = [
  {
    id: "integrated-nanophotonics",
    title: "Integrated Nanophotonics",
    image: "/images/integrated-nanophotonics.png",
    problem:
      "Harnessing the dynamic interaction between guided optical modes, hybrid active material layers (such as thin-film ferroelectrics, liquid crystals, and 2D materials), and external physical fields (thermal, electrostatic, or strain-induced) on silicon dioxide (SiO₂) substrates.",
    methods:
      "Full-wave electromagnetic simulation, anisotropic material tensor modeling, multiphysics finite-element coupling, topological state engineering (BIC and quasi-BIC resonances), and experimental optoelectronic characterization.",
    physicalRelevance:
      "Elucidating how external physical stimuli dynamically alter material tensors to enable non-volatile modulation, switchable topological states, and highly reconfigurable light routing on-chip.",
  },
  {
    id: "quantum-photonics",
    title: "Quantum Photonics",
    image: "/images/nonlinear-quantum-photonics.png",
    problem:
      "Scaling on-chip quantum information processing by co-integrating nonlinear photon-pair sources, coherent quantum memory interfaces, phase-shifter networks, and low-noise detectors while minimizing propagation loss and maintaining quantum state coherence.",
    methods:
      "Nonlinear optics modeling, quantum state tomography representation, coherent light-matter interface simulation, and reconfigurable quantum circuit design.",
    physicalRelevance:
      "Governing nonlinear optical coefficients and coherent interactions to execute high-fidelity quantum state preparation, routing, and memory storage in photonic integrated circuit (PIC) topologies.",
  },
  {
    id: "intelligent-photonics",
    title: "Intelligent Photonics",
    image: "/images/intelligent-photonics.png",
    problem:
      "Bridging physical wave equations with optimization and machine learning, focusing on physics-constrained deep learning for device inverse design (AI for Photonics) and analog wave-based neuromorphic processing hardware (Photonics for AI).",
    methods:
      "Physics-informed neural networks (PINNs), adjoint-based gradient optimization, evolutionary search algorithms, optical neural network (ONN) architectures, and wave-based hardware co-design.",
    physicalRelevance:
      "Establishing a bidirectional framework where physical wave propagation constrains network training, and analog multi-port interferometric circuits execute mathematical operations at the speed of light.",
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
      "Theoretical modeling, multiphysics simulation (FDTD, FEM, drift-diffusion), adjoint and evolutionary inverse design, machine learning optimization, and experimental prototyping validation.",
    ],
  },
] as const
