export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: "AI & Deep Learning" | "Full Stack" | "Frontend" | "DevOps" | "Big Data & Cloud" | "Software Engineering" | "B2B AI Automation" | "Autonomous Systems" | "Multi-Agent Systems" | "Developer Tools";
  description: string;
  content: string;
  technologies: string[];
  tech?: string[];
  visuals: string[];
  image?: string;
  repoLink?: string;
  demoLink?: string;
  featured?: boolean;
  year?: string;
}

export interface ExperienceItem {
  _id?: string;
  id?: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  details?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export const certifications: CertificationItem[] = [
  { title: "Advanced React", issuer: "Meta (Coursera)" },
  { title: "jQuery Web Development and Programming", issuer: "Alison" },
  { title: "Cisco Python Essentials 1", issuer: "Cisco Networking Academy" },
  { title: "Linux Essentials", issuer: "TCM Security" },
];

export const projects: ProjectItem[] = [
  {
    _id: "thyrovision-ai",
    id: "thyrovision-ai",
    title: "ThyroVision AI: Deep Learning Thyroid Nodule Classification",
    slug: "thyrovision-ai",
    category: "AI & Deep Learning",
    year: "2026",
    featured: true,
    description: "Medical computer vision system utilizing PyTorch & OpenCV to classify thyroid nodules as benign or malignant from ultrasound scans and dynamic video feeds.",
    content: `
      Developed during my engineering internship at **VitalTech Maroc**, ThyroVision AI is an end-to-end deep learning solution designed to assist healthcare professionals in diagnosing thyroid nodule malignancy from ultrasound imaging.

      ### Key Features & Contributions
      - **Ultrasound Image & Video Analysis**: Supports static DICOM/ultrasound images as well as temporal ultrasound video sequences.
      - **Video Frame Processing & Downsampling**: Engineered an automated frame sampling pipeline using **OpenCV** to eliminate redundant frames and significantly reduce computation latency.
      - **Accelerated Deep Learning Pipeline**: Built with **PyTorch** and accelerated via **CUDA / GPU** compute with Mixed Precision Training (AMP) for optimal memory utilization.
      - **Meta-Learner Architecture**: Implemented a **Logistic Regression** meta-learner to stack feature representations and improve classification robustness.
      - **Streamlit Clinical Interface**: Developed an interactive web interface in **Streamlit** allowing clinicians to seamlessly upload video scans and analyze visual prediction confidence.
      - **Rigorous Evaluation Metrics**: Conducted exhaustive evaluation using **scikit-learn** to generate ROC curves, confusion matrices, **ROC-AUC scores**, and **Youden Index** threshold selection for clinical calibration.
    `,
    technologies: [
      "Python",
      "PyTorch",
      "CUDA",
      "OpenCV",
      "scikit-learn",
      "Logistic Regression",
      "Streamlit",
      "ROC-AUC"
    ],
    tech: ["Python", "PyTorch", "CUDA", "OpenCV", "Streamlit"],
    visuals: ["/projects/thyroid-ai.png"],
    image: "/projects/thyroid-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "accent-ai-assistant",
    id: "accent-ai-assistant",
    title: "Accent Product AI Assistant & Admin Platform",
    slug: "accent-ai-assistant",
    category: "AI & Deep Learning",
    year: "2025",
    featured: true,
    description: "Virtual AI product presentation assistant built with React.js, Spring Boot, and Rasa NLP, featuring a secure JWT admin dashboard and virtualized infrastructure.",
    content: `
      Engineered during my internship at **Accent - DBM Maroc Mohammedia**, this system streamlines corporate product presentation through an intelligent virtual assistant and administrative portal.

      ### Key Features
      - **Virtual Product Assistant**: Interactive conversational chatbot powered by Rasa NLP for natural language product inquiry and presentation.
      - **Full-Stack Architecture**: Responsive React.js frontend connected to a robust Spring Boot microservice API.
      - **Secure Admin Dashboard**: JWT-authenticated administrative panel for managing products, chatbot intent training, and user queries.
      - **Virtualized Infrastructure**: Server configuration and deployment managed across virtualized environments via **Proxmox** and **VMware**.
    `,
    technologies: ["React.js", "Spring Boot", "Rasa NLP", "JWT", "Proxmox", "VMware", "Java"],
    tech: ["React.js", "Spring Boot", "Rasa NLP", "Proxmox"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "codepeak",
    id: "codepeak",
    title: "CodePeak E-Learning Platform",
    slug: "codepeak",
    category: "Full Stack",
    year: "2025",
    featured: true,
    description: "Projet de Fin d'Études (ISTA Bouznika): Comprehensive e-learning platform featuring multi-role access, gamification elements, and RESTful Laravel API.",
    content: `
      Developed as my **Projet de Fin d'Études** at **ISTA Bouznika**, CodePeak is a modern e-learning platform designed to make digital education interactive and engaging. 

      ### Key Features
      - **Gamification Engine**: Badges, leaderboards, quiz challenges, and student progress tracking.
      - **Role-Based Access Control**: Multi-role system (Admin, Instructor, Student) with granular permissions powered by JWT authentication.
      - **Course Management & Media**: Video lesson hosting, quizzes, and assignment submissions.
      - **Architecture**: Decoupled architecture with a React.js frontend communicating with a RESTful Laravel API and MySQL database.
    `,
    technologies: ["React.js", "Laravel", "PHP", "MySQL", "JWT", "Tailwind CSS"],
    tech: ["React.js", "Laravel", "MySQL", "JWT"],
    visuals: ["/projects/codepeak.png"],
    image: "/projects/codepeak.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "bigdata-telemetry-engine",
    id: "bigdata-telemetry-engine",
    title: "Big Data Telemetry & Analytics Engine",
    slug: "bigdata-telemetry-engine",
    category: "Big Data & Cloud",
    year: "2026",
    featured: true,
    description: "Distributed analytics system for real-time telemetry ingestion, processing, and aggregation using Apache Spark, Kafka, and MongoDB.",
    content: `
      Engineered a high-performance distributed data stream processing architecture designed to handle high-frequency network and system telemetry metrics.

      ### Key Features
      - **Stream & Batch Processing**: Leveraged Apache Spark and PySpark to process incoming sensor streams and batch log aggregates.
      - **Message Ingestion**: Integrated Apache Kafka pipelines for fault-tolerant data streaming.
      - **Storage & APIs**: MongoDB index optimization for time-series queries exposed via Flask REST services.
    `,
    technologies: ["Python", "Apache Spark", "Kafka", "MongoDB", "Docker", "Flask"],
    tech: ["Python", "Spark", "Kafka", "MongoDB"],
    visuals: ["/projects/bigdata-engine.png"],
    image: "/projects/bigdata-engine.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "timetable-management",
    id: "timetable-management",
    title: "Timetable Management Desktop App",
    slug: "timetable-management",
    category: "Software Engineering",
    year: "2024",
    featured: false,
    description: "Desktop application developed in Python (Tkinter & SQLite) for automating training center timetable scheduling and schedule conflict resolution.",
    content: `
      Developed at **ISTA Bouznika** to automate timetable generation for training center schedules.

      ### Key Features
      - **Schedule Automation**: Algorithmic scheduling reducing conflict overlaps for instructors and rooms.
      - **Graphical Interface**: Custom Tkinter UI optimized for intuitive administrative navigation.
      - **Local Storage**: Embedded SQLite database for rapid local data retrieval and schedule exports.
    `,
    technologies: ["Python", "Tkinter", "SQLite", "Software Engineering"],
    tech: ["Python", "Tkinter", "SQLite"],
    visuals: ["/projects/timetable.png"],
    image: "/projects/timetable.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "ramzo",
    id: "ramzo",
    title: "RAMZO E-Commerce Responsive UI",
    slug: "ramzo",
    category: "Frontend",
    year: "2024",
    featured: false,
    description: "Responsive e-commerce showcase application developed with HTML5, CSS3, and Bootstrap for optimal user experience across all devices.",
    content: `
      Created at **ISTA Bouznika** focusing on frontend UI/UX engineering, interactive product filtering, and mobile-first responsiveness.
    `,
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    tech: ["HTML5", "CSS3", "Bootstrap"],
    visuals: ["/projects/ramzo.png"],
    image: "/projects/ramzo.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "infra",
    id: "infra",
    title: "DevOps & Virtualization Home-Lab",
    slug: "infra",
    category: "DevOps",
    year: "2024",
    featured: false,
    description: "Virtualization and infrastructure setup using Proxmox and VMware for managing isolated environments and Docker containers.",
    content: `
      Engineered a personal virtualization lab for deploying microservices, practicing continuous integration, and managing virtual machines with automated configuration tools.
    `,
    technologies: ["Proxmox", "VMware", "Linux", "Docker", "Bash"],
    tech: ["Proxmox", "VMware", "Linux", "Docker"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "accent-helpdesk-system",
    id: "accent-helpdesk-system",
    title: "Accent Helpdesk & Ticket Management Platform",
    slug: "accent-helpdesk-system",
    category: "Full Stack",
    year: "2025",
    featured: true,
    description: "Internal IT support and ticketing application built during internship at Accent - DBM Maroc for managing user incident requests, ticket lifecycle, and resolution workflows.",
    content: `
      Developed during my web development internship at **Accent - DBM Maroc Mohammedia**, this Helpdesk system centralizes internal support inquiries and standardizes issue resolution tracking.

      ### Key Features
      - **Ticket Lifecycle & Routing**: Automated ticket generation, priority grading (Critical, High, Normal), and department assignment.
      - **Interactive User Portal**: Clean dashboard for employees to submit incident tickets, track resolution status in real time, and reply to agent notes.
      - **Agent & Admin Dashboard**: Multi-role interface powered by JWT authentication, allowing support teams to filter, assign, and resolve user requests.
      - **Responsive UI**: Built with React.js and modern styling, ensuring seamless access across desktop workstations and mobile devices.
    `,
    technologies: ["React.js", "Node.js", "MySQL", "JWT", "Tailwind CSS", "REST API"],
    tech: ["React.js", "Node.js", "MySQL", "JWT"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "accent-showcase-website",
    id: "accent-showcase-website",
    title: "Accent Corporate Showcase Website",
    slug: "accent-showcase-website",
    category: "Frontend",
    year: "2025",
    featured: true,
    description: "Modern and responsive corporate showcase platform built for Accent - DBM Maroc Mohammedia to present brand hardware lineups, products, and technical specifications.",
    content: `
      Engineered at **Accent - DBM Maroc Mohammedia**, this corporate showcase website delivers a modern, high-performance brand presence for Accent's technology and hardware lineup.

      ### Key Features
      - **Modern Brand Presentation**: Elegant showcase interface highlighting computers, tablets, and consumer electronics with high visual fidelity.
      - **Interactive Product Catalog**: Dynamic category filtering, detailed specification sheets, and optimized media galleries.
      - **Mobile-First Responsiveness**: Tailored layouts and touch-friendly controls across smartphones, tablets, and desktop displays.
      - **Performance & SEO Optimization**: Lightweight architecture ensuring fast initial page loads, semantic HTML structure, and clean user experience.
    `,
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
    tech: ["React.js", "JavaScript", "Bootstrap", "HTML5"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "nexusbuilds-proposal-ai",
    id: "nexusbuilds-proposal-ai",
    title: "ProposalAI Pro — RFP Analysis & Proposal Generation Engine",
    slug: "nexusbuilds-proposal-ai",
    category: "B2B AI Automation",
    year: "2025",
    featured: true,
    description: "Context-aware RFP analysis and technical proposal generation engine for tech agencies and freelance developers — powered by RAG, Claude API, and multi-document vector search.",
    content: `
      **ProposalAI Pro** is a production-grade B2B AI automation system built under the **NexusBuilds** brand, designed to eliminate the manual bottleneck of writing technical proposals in response to Requests for Proposals (RFPs).

      ### Key Features
      - **RAG-Powered Extraction**: Multi-document retrieval-augmented generation pipeline for automated project scope analysis, budget estimation, and requirement decomposition from unstructured RFP documents.
      - **Dynamic Milestone Decomposition**: Automatically generates phase-by-phase execution milestones, recommended tech stacks, resource allocation, and risk assessment matrices tailored to each client context.
      - **Structured Deliverable Export**: Automated export to structured Markdown reports and presentation-ready client deliverables — reducing proposal turnaround from hours to minutes.
      - **Pydantic Schema Validation**: Strict output schema enforcement ensures deterministic, hallucination-free structured responses suitable for direct client delivery.

      ### NexusBuilds Brand
      ProposalAI Pro is part of the **NexusBuilds** production suite — a collection of autonomous AI systems and developer tools built for professional deployment.
    `,
    technologies: ["Python", "FastAPI", "RAG", "Vector Search", "Claude API", "Pydantic"],
    tech: ["Python", "FastAPI", "Claude API", "RAG"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "https://whop.com/nexusbuilds/proposalai-pro-fd/"
  },
  {
    _id: "nexusbuilds-autostack-os",
    id: "nexusbuilds-autostack-os",
    title: "AutoStack OS — Micro-SaaS Scaffolding & Deployment Orchestrator",
    slug: "nexusbuilds-autostack-os",
    category: "Autonomous Systems",
    year: "2025",
    featured: true,
    description: "Modular orchestration engine for automated micro-SaaS scaffolding and containerized deployment pipelines — one-command infrastructure generation with production-hardened Docker and CI/CD setup.",
    content: `
      **AutoStack OS** is an autonomous DevOps automation engine under the **NexusBuilds** brand, built to eliminate the repetitive scaffolding overhead of launching new micro-SaaS products.

      ### Key Features
      - **One-Command Infrastructure Generation**: Generates production-hardened multi-stage Dockerfiles, Nginx reverse-proxy configurations, and Docker Compose stacks from a single command — fully parameterized per project type.
      - **Automated CI/CD Scaffolding**: Generates GitHub Actions workflow files for test, build, and deploy pipelines with environment-specific deployment gates.
      - **Secrets Sanitation & Environment Isolation**: Automated environment variable scoping, secret detection, and \`.env\` template generation with zero-secret leakage guarantees.
      - **Container Health Probes & Recovery**: Built-in health-check endpoint probing with automated restart and alerting routines for production stability.

      ### NexusBuilds Brand
      AutoStack OS is part of the **NexusBuilds** production suite — autonomous infrastructure tooling for independent developers and small product teams.
    `,
    technologies: ["Python", "Docker", "GitHub Actions", "Shell/Bash", "Linux", "Nginx"],
    tech: ["Python", "Docker", "GitHub Actions", "Linux"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "https://whop.com/nexusbuilds/autostack-os/"
  },
  {
    _id: "nexusbuilds-agentstack",
    id: "nexusbuilds-agentstack",
    title: "AgentStack — Multi-Agent Code Review & Refactoring Framework",
    slug: "nexusbuilds-agentstack",
    category: "Multi-Agent Systems",
    year: "2025",
    featured: true,
    description: "Deterministic multi-agent coordination framework for autonomous code review and refactoring loops — with role-separated agent topologies, strict JSON schema validation, and self-correcting linting cycles.",
    content: `
      **AgentStack** is a deterministic multi-agent software engineering framework under the **NexusBuilds** brand, designed to autonomously review, refactor, and validate codebases without human intervention in the loop.

      ### Key Features
      - **Role-Separated Agent Topologies**: Distinct specialized agents — System Architect, Code Reviewer, Security Auditor, and Test Generator — each operating within clearly defined responsibility boundaries.
      - **Strict JSON Schema Communication**: All inter-agent message passing is validated against enforced Pydantic/JSON schemas, eliminating hallucinated context propagation between agent nodes.
      - **Automated Git Diff Inspection**: Parses Git diffs programmatically to scope reviews to changed code surfaces only, improving precision and reducing token overhead.
      - **Self-Correcting Linting & Test Loops**: Integrated PyTest execution with automated failure triage, self-correction cycles, and structured remediation proposals from the Code Reviewer agent.

      ### NexusBuilds Brand
      AgentStack is part of the **NexusBuilds** production suite — autonomous software engineering infrastructure for advanced developer workflows.
    `,
    technologies: ["Python", "AsyncIO", "LangGraph", "State Machines", "PyTest", "Git"],
    tech: ["Python", "AsyncIO", "LangGraph", "PyTest"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "https://whop.com/nexusbuilds/agentcraft-os/"
  },
  {
    _id: "nexusbuilds-prompt-vault",
    id: "nexusbuilds-prompt-vault",
    title: "Developer & AI System Prompt Vault — NexusBuilds",
    slug: "nexusbuilds-prompt-vault",
    category: "Developer Tools",
    year: "2025",
    featured: true,
    description: "150+ deterministic system prompts, clean architecture blueprints, and production .cursorrules for Claude 3.5 Sonnet, GPT-4o, and Cursor IDE — available in Global English and French editions.",
    content: `
      The **Developer & AI System Prompt Vault** is a production-grade developer toolkit published under the **NexusBuilds** brand, delivering deterministic AI instruction sets for professional software engineering workflows.

      ### Key Features
      - **150+ Categorized Instruction Sets**: Enforcing Domain-Driven Design (DDD), Clean Architecture boundaries, and strict SOLID refactoring rules across all major AI coding assistants.
      - **Hermetic Unit Test Generation**: Automated PyTest and Jest harness generation using AAA (Arrange-Act-Assert) patterns with full boundary-condition assertions and edge-case coverage.
      - **OWASP Top 10 Security Audits**: Systematic security review prompts covering injection, broken auth, XSS, CSRF, insecure deserialization, and more.
      - **Production Container Generators**: Multi-stage Dockerfile and Docker Compose generators optimized for minimal image sizes and hardened production environments.
      - **Bilingual Release**: Available in Global English and French editions — built for international developer communities.

      ### Live Release
      Published and actively maintained on Gumroad and under the NexusBuilds storefront with two production editions.
    `,
    technologies: ["Claude 3.5 Sonnet", "GPT-4o", "Cursor IDE", "Python", "Clean Architecture", ".cursorrules"],
    tech: ["Claude 3.5 Sonnet", "Cursor IDE", "Python", ".cursorrules"],
    visuals: ["/projects/accent-ai.png"],
    image: "/projects/accent-ai.png",
    repoLink: "https://github.com/AymaneWebDEV/developer-prompt-vault",
    demoLink: "https://nexusbuilds.gumroad.com/l/developer-prompt-vault"
  }
];

export const experiences: ExperienceItem[] = [
  {
    _id: "vitaltech-maroc",
    id: "vitaltech-maroc",
    type: "work",
    title: "Deep Learning & Computer Vision Intern",
    organization: "VitalTech Maroc",
    period: "2026",
    description: "Designed and developed an AI-assisted diagnostic system for binary thyroid nodule classification (Benign vs. Malignant) using ultrasound images and dynamic ultrasound video sequences.",
    tags: [
      "Deep Learning",
      "PyTorch",
      "CUDA",
      "OpenCV",
      "Streamlit",
      "scikit-learn",
      "ROC-AUC",
      "Meta-Learner"
    ],
    details: [
      "Engineered an automated video processing pipeline in OpenCV with frame downsampling to eliminate temporal redundancy.",
      "Implemented PyTorch models with CUDA acceleration and Mixed Precision Training (AMP) for high computational efficiency.",
      "Trained a Logistic Regression meta-learner ensemble to aggregate model predictions.",
      "Evaluated diagnostic accuracy using ROC-AUC, confusion matrices, and Youden Index for clinical threshold tuning.",
      "Created an intuitive Streamlit web application enabling clinicians to upload scans and view prediction confidence."
    ]
  },
  {
    _id: "accent-dbm",
    id: "accent-dbm",
    type: "work",
    title: "Stage en Développement Web et Infrastructure IT",
    organization: "Accent - DBM Maroc (Mohammedia, Morocco)",
    period: "Avril 2025 – Mai 2025",
    description: "Developed a virtual AI presentation assistant with React.js, Spring Boot, and Rasa NLP, built a secure JWT admin portal, and configured virtualized server infrastructure.",
    tags: ["React.js", "Spring Boot", "Rasa NLP", "JWT", "Proxmox", "VMware"],
    details: [
      "Développement d'un assistant virtuel intelligent pour la présentation de produits (React.js, Spring Boot, Rasa NLP).",
      "Création d'une interface d'administration sécurisée avec JWT pour la gestion des produits et du chatbot.",
      "Configuration et administration de serveurs virtualisés via Proxmox et VMware."
    ]
  },
  {
    _id: "codepeak-pfe",
    id: "codepeak-pfe",
    type: "work",
    title: "Projet de Fin d'Études — Plateforme E-Learning CodePeak",
    organization: "ISTA Bouznika (Morocco)",
    period: "Octobre 2024 – Juin 2025",
    description: "Conception et développement d'une plateforme e-learning complète avec système multi-rôles, gamification intégrée et architecture API RESTful (React.js, Laravel, JWT).",
    tags: ["React.js", "Laravel", "REST API", "JWT", "Gamification", "MySQL"]
  },
  {
    _id: "freelance-dev",
    id: "freelance-dev",
    type: "work",
    title: "Freelance Full-Stack Developer",
    organization: "Self-Employed",
    period: "2024 – Present",
    description: "Building responsive web applications, e-commerce platforms, and custom software systems for diverse clients. Managing end-to-end deployment, UI design, and cloud hosting.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"]
  },
  {
    _id: "education-ofppt",
    id: "education-ofppt",
    type: "education",
    title: "Deuxième année en Développement Digital (Option Web Full-Stack)",
    organization: "ISTA Bouznika (Morocco)",
    period: "Depuis Septembre 2023",
    description: "Formation approfondie en développement web (front-end et back-end), projets académiques (Python, PHP, JavaScript), design d'interfaces et optimisation d'applications.",
    tags: ["Full-Stack", "React.js", "Laravel", "Python", "PHP", "JavaScript"]
  },
  {
    _id: "education-bac",
    id: "education-bac",
    type: "education",
    title: "Baccalauréat Science Physique en Français",
    organization: "Lycée Charif El Idrissi (Benslimane, Morocco)",
    period: "Septembre 2020 – Juin 2023",
    description: "Spécialisation en sciences expérimentales (mathématiques, physique, chimie) et développement des capacités analytiques et de communication.",
    tags: ["Physics", "Mathematics", "Science"]
  }
];
