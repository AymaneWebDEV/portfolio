export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: "AI & Deep Learning" | "Full Stack" | "Frontend" | "DevOps" | "Big Data & Cloud" | "Software Engineering";
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
