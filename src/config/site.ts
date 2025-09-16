// Site Configuration
export const SITE_CONFIG = {
  // Personal Information
  name: 'Ahmed Aymane Harty',
  title: 'Développeur web Full-Stack Junior',
  description: 'Développeur Web Full-Stack Junior passionné par la création de solutions web innovantes et performantes, aussi bien en front-end qu\'en back-end. Je maîtrise les technologies modernes pour répondre aux besoins des entreprises avec efficacité.',
  email: 'aymaneharty@gmail.com',
  phone: '0648-307515',
  location: 'Benslimane, Maroc',
  age: '19 ans',
  
  // Social Media Links
  social: {
    github: 'https://github.com/AymaneWebDev',
    linkedin: 'https://linkedin.com/in/ahmed-aymane',
    twitter: 'https://twitter.com/AymaneWebDev',
    instagram: 'https://instagram.com/aymane_harty',
  },
  
  // Navigation Links
  navLinks: [
    { name: 'Accueil', href: 'home' },
    { name: 'À propos', href: 'about' },
    { name: 'Expérience', href: 'experience' },
    { name: 'Compétences', href: 'skills' },
    { name: 'Formation', href: 'education' },
    { name: 'Contact', href: 'contact' },
  ],
  
  // Skills
  skills: {
    frontend: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'React.js'],
    backend: ['MySQL', 'PHP', 'Laravel', 'Python', 'PL/SQL', 'MongoDB', 'SQLite', 'Node.js'],
    infrastructure: ['Proxmox', 'VMware', 'Linux (administration système)'],
    tools: ['Git', 'GitLab', 'GitHub', 'Jira', 'SonarQube', 'UML', 'PERT', 'GanttProject', 'Postman'],
    languages: [
      { name: 'Arabe', level: 'Natif' },
      { name: 'Français', level: 'Courant' },
      { name: 'Anglais', level: 'Intermédiaire' }
    ],
    softSkills: ['Gestion du temps', 'Travail en équipe', 'Résolution de problèmes']
  },
  
  // Experience
  experience: [
    {
      role: 'Stagiaire en Développement et Infrastructure IT',
      company: 'Accent - DBM Maroc',
      location: 'Mohammedia, Maroc',
      period: 'Avril 2025 - Mai 2025',
      description: [
        'Développement d\'un assistant virtuel intelligent pour la présentation de produits utilisant React.js, Spring Boot et Rasa NLP',
        'Création d\'une interface d\'administration sécurisée avec JWT pour la gestion des produits et du chatbot',
        'Configuration et administration de serveurs virtualisés via Proxmox et VMware'
      ],
      tags: ['React.js', 'Spring Boot', 'Rasa NLP', 'JWT', 'Proxmox', 'VMware']
    },
    {
      role: 'Développeur - Application de Gestion des Emplois du Temps',
      company: 'ISTA Bouznika',
      period: 'Mars 2024 - Avril 2024',
      description: [
        'Développement d\'une application complète en Python (Tkinter, SQLite) pour automatiser la gestion des emplois du temps',
        'Optimisation de l\'interface utilisateur pour une navigation intuitive et fluide'
      ],
      tags: ['Python', 'Tkinter', 'SQLite', 'UI/UX']
    },
    {
      role: 'Développeur Frontend - Site e-commerce',
      company: 'ISTA Bouznika',
      period: 'Janvier 2024 - Février 2024',
      description: [
        'Création d\'une interface utilisateur responsive en HTML, CSS et Bootstrap',
        'Collaboration avec l\'équipe pour définir les besoins utilisateurs',
        'Mise en œuvre de fonctionnalités interactives pour améliorer l\'expérience utilisateur'
      ],
      tags: ['HTML', 'CSS', 'Bootstrap', 'Responsive Design']
    }
  ],
  
  // Education
  education: [
    {
      degree: 'Deuxième année en Développement Digital',
      institution: 'OFPPT - ISTA Bouznika, Maroc',
      period: 'Depuis septembre 2023',
      description: [
        'Formation approfondie en développement web (front-end et backend)',
        'Participation à des projets académiques innovants utilisant des technologies modernes (Python, PHP, JavaScript, etc.)',
        'Renforcement des compétences en design d\'interfaces et en optimisation des applications'
      ]
    },
    {
      degree: 'Baccalauréat Science Physique en Français',
      institution: 'Lycée Charif El Idrissi, Benslimane',
      period: '2020 - 2023',
      description: [
        'Spécialisation en sciences expérimentales (mathématiques, physique, chimie)',
        'Développement des compétences analytiques et de communication en arabe, français et anglais'
      ]
    }
  ],
  
  // Projects
  projects: [
    {
      id: 'chatbot-ai',
      title: 'Assistant Virtuel Intelligent',
      description: 'Assistant virtuel alimenté par IA pour la présentation interactive de produits avec interface d\'administration complète',
      longDescription: [
        'Développement d\'un chatbot intelligent utilisant Rasa NLP pour des conversations naturelles',
        'Interface d\'administration sécurisée avec authentification JWT',
        'Tableau de bord analytique pour suivre les interactions utilisateurs',
        'Déploiement sur serveur Proxmox avec configuration Docker'
      ],
      tags: ['React.js', 'Spring Boot', 'Rasa NLP', 'JWT', 'Docker', 'Proxmox'],
      image: '/src/assets/Projects-Pics/chatbot-ai.png',
      links: {
        github: 'https://github.com/yourusername/assistant-virtuel',
        live: '#'
      }
    },
    {
      id: 'gestion-emploi',
      title: 'Gestion des Emplois du Temps',
      description: 'Application bureau complète pour la gestion automatisée des emplois du temps académiques',
      longDescription: [
        'Interface intuitive avec glisser-déposer pour la création d\'emplois du temps',
        'Gestion des salles, des formateurs et des groupes d\'étudiants',
        'Export des plannings aux formats PDF et Excel',
        'Base de données SQLite pour un stockage local sécurisé'
      ],
      tags: ['Python', 'Tkinter', 'SQLite', 'UI/UX Design'],
      image: '/src/assets/Projects-Pics/gestion-emploi.png',
      links: {
        github: 'https://github.com/yourusername/gestion-emploi',
        live: '#'
      }
    },
    {
      id: 'e-learning',
      title: 'Plateforme E-learning',
      description: 'Solution complète d\'apprentissage en ligne avec suivi des progrès',
      longDescription: [
        'Catalogue de cours avec vidéos, quiz et exercices interactifs',
        'Tableau de bord étudiant avec suivi des progrès',
        'Système de certification automatique',
        'Espace formateur avec outils de création de contenu'
      ],
      tags: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      image: '/src/assets/Projects-Pics/e-learning.png',
      links: {
        github: 'https://github.com/yourusername/e-learning-platform',
        live: '#'
      }
    },
    {
      id: 'e-commerce',
      title: 'Boutique E-commerce',
      description: 'Plateforme de commerce électronique moderne avec panier et paiement',
      longDescription: [
        'Catalogue de produits avec filtres avancés',
        'Panier d\'achat persistant',
        'Processus de paiement sécurisé',
        'Espace client avec historique des commandes'
      ],
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      image: '/src/assets/Projects-Pics/e-com-interface.png',
      links: {
        github: 'https://github.com/yourusername/ecommerce-shop',
        live: '#'
      }
    }
  ],
  
  // Certifications
  certifications: [
    {
      name: 'Advanced React',
      issuer: 'Meta (Coursera)',
      date: '2024'
    },
    {
      name: 'jQuery Web Development and Programming',
      issuer: 'Alison',
      date: '2024'
    },
    {
      name: 'Cisco Python Essentials 1',
      issuer: 'Cisco Networking Academy',
      date: '2023'
    },
    {
      name: 'Linux Essentials',
      issuer: 'TCM Security',
      date: '2023'
    }
  ],
  
  // Hobbies
  hobbies: [
    'Lecture',
    'Voyage',
    'Sport'
  ],
  
  // Contact Information
  contact: {
    email: 'aymaneharty@gmail.com',
    phone: '+212 648-307515',
    address: 'Benslimane, Maroc',
    availability: 'Disponible pour des opportunités',
    freelanceStatus: 'Disponible'
  },
  
  // SEO
  seo: {
    title: 'Ahmed Aymane Harty | Développeur Full-Stack Junior',
    description: 'Portfolio de Ahmed Aymane Harty, Développeur Full-Stack Junior spécialisé dans la création de solutions web modernes et performantes.',
    keywords: ['portfolio', 'développeur web', 'full stack', 'react', 'node.js', 'maroc', 'développeur marocain'],
    author: 'Ahmed Aymane Harty',
    image: '/images/profile.svg',
    url: 'https://aymane-web-dev.vercel.app',
    twitter: '@AymaneWebDev'
  }
} as const;

// Export default for easier imports
export default SITE_CONFIG;
