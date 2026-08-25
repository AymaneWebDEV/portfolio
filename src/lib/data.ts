export interface ProjectItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  category: "AI & Deep Learning" | "Full Stack" | "Frontend" | "DevOps" | "Big Data & Cloud";
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
  _id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  details?: string[];
}

export const projects: ProjectItem[] = [
  {
    _id: "thyrovision-ai",
    id: "thyrovision-ai",
    title: "ThyroVision AI: Deep Learning Thyroid Nodule Classification",
    slug: "thyrovision-ai",
    category: "AI & Deep Learning",
    year: "2026",
    featured: true,
    description: "Medical computer vision system utilizing PyTorch & OpenCV to classify thyroid nodules as benign or malignant from ultrasound scans and videos.",
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
    visuals: ["/projects/thyroid-ai.jpg"],
    image: "/projects/thyroid-ai.jpg",
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
    visuals: ["/projects/bigdata-engine.jpg"],
    image: "/projects/bigdata-engine.jpg",
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
    description: "Comprehensive e-learning platform featuring multi-role access, gamification elements, and interactive course management.",
    content: `
      CodePeak is a modern e-learning platform designed to make learning interactive and engaging. 
      It features a robust role-based system (Admin, Instructor, Student) enabling seamless course creation and consumption.

      ### Key Features
      - **Gamification**: Badges, leaderboards, and progress tracking.
      - **Role-Based Access**: Secure JWT authentication with granular permissions.
      - **Course Management**: Video hosting, quizzes, and assignments.

      ### Technical Architecture
      Built with a decoupled architecture using React for the frontend and Laravel (PHP) for the API with MySQL database.
    `,
    technologies: ["React", "Laravel", "MySQL", "JWT", "Tailwind CSS"],
    tech: ["React", "Laravel", "MySQL", "JWT"],
    visuals: ["/placeholder-project.jpg"],
    image: "/placeholder-project.jpg",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "ramzo",
    id: "ramzo",
    title: "RAMZO E-commerce",
    slug: "ramzo",
    category: "Full Stack",
    year: "2025",
    featured: true,
    description: "Feature-rich e-commerce platform with improved UX, dynamic product management, and secure checkout flow.",
    content: `
      A modern e-commerce application built with Next.js and Node.js. Includes secure payment gateways, cart management, and admin order fulfillment dashboard.
    `,
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    visuals: ["/placeholder-project.jpg"],
    image: "/placeholder-project.jpg",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "accent",
    id: "accent",
    title: "Accent Agency Website",
    slug: "accent",
    category: "Frontend",
    year: "2024",
    featured: false,
    description: "Corporate showcase website with responsive UI and smooth animations built for a modern digital agency.",
    content: `
      High-performance landing page showcasing digital services with customized micro-interactions and Framer Motion animations.
    `,
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    visuals: ["/placeholder-project.jpg"],
    image: "/placeholder-project.jpg",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  },
  {
    _id: "helpdesk",
    id: "helpdesk",
    title: "Internal Helpdesk System",
    slug: "helpdesk",
    category: "Full Stack",
    year: "2024",
    featured: false,
    description: "Internal ticket management system for streamlining IT support workflows, priority resolution, and issue tracking.",
    content: `
      Ticket management web app automating support workflows, status tracking, and technician assignment.
    `,
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    tech: ["PHP", "MySQL", "Bootstrap"],
    visuals: ["/placeholder-project.jpg"],
    image: "/placeholder-project.jpg",
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
      Virtualized infrastructure setup managing home-lab services, automated backups, Docker container orchestration, and isolated network subnets.
    `,
    technologies: ["Proxmox", "Docker", "Linux", "VMware", "Networking"],
    tech: ["Proxmox", "Docker", "Linux", "Networking"],
    visuals: ["/placeholder-project.jpg"],
    image: "/placeholder-project.jpg",
    repoLink: "https://github.com/AymaneWebDEV",
    demoLink: "#"
  }
];

export const experiences: ExperienceItem[] = [
  {
    _id: "vitaltech-maroc",
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
    _id: "freelance-dev",
    type: "work",
    title: "Freelance Full-Stack Developer",
    organization: "Self-Employed",
    period: "2024 – Present",
    description: "Building responsive web applications, e-commerce platforms, and custom software systems for diverse clients. Managing end-to-end deployment, UI design, and cloud hosting.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"]
  },
  {
    _id: "education-ai-se",
    type: "education",
    title: "Software Engineering & Artificial Intelligence Student",
    organization: "University Engineering Degree",
    period: "2024 – 2026",
    description: "Advanced academic specialization focused on Artificial Intelligence, Deep Learning, Software Engineering, Big Data processing, Cloud Infrastructure, and System Administration.",
    tags: ["Artificial Intelligence", "Deep Learning", "Software Engineering", "Big Data", "Cloud Computing", "Networks"]
  }
];
