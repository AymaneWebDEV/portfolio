export const projects = [
  {
    id: "codepeak",
    title: "CodePeak E-Learning",
    category: "Full Stack",
    description: "A comprehensive e-learning platform featuring multi-role access, gamification elements, and course management.",
    content: `
      CodePeak is a modern e-learning platform designed to make learning interactive and engaging. 
      It features a robust role-based system (Admin, Instructor, Student) allow seamless course creation and consumption.
      
      ## Key Features
      - **Gamification**: Badges, leaderboards, and progress tracking.
      - **Role-Based Access**: Secure JWT authentication with granular permissions.
      - **Course Management**: Video hosting, quizzes, and assignments.
      
      ## Technical Architecture
      Built with a decoupled architecture using React for the frontend and Laravel (PHP) for the API. 
      Authentication is handled via JWT, ensuring stateless and secure sessions.
    `,
    tech: ["React", "Laravel", "MySQL", "JWT"],
    image: "/placeholder-project.jpg",
    demo: "#",
    repo: "#",
  },
  {
    id: "accent",
    title: "Accent Website",
    category: "Frontend",
    description: "Modern corporate showcase website with responsive UI and smooth animations for a leading agency.",
    content: "Full details coming soon...",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder-project.jpg",
    demo: "#",
    repo: "#",
  },
  {
    id: "ramzo",
    title: "RAMZO E-commerce",
    category: "Full Stack",
    description: "Feature-rich e-commerce platform with improved UX, product management, and secure checkout flow.",
    content: "Full details coming soon...",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder-project.jpg",
    demo: "#",
    repo: "#",
  },
  {
    id: "helpdesk",
    title: "Helpdesk System",
    category: "Full Stack",
    description: "Internal ticket management system for streamlining support workflows and issue tracking.",
    content: "Full details coming soon...",
    tech: ["PHP", "MySQL", "Bootstrap"],
    image: "/placeholder-project.jpg",
    demo: "#",
    repo: "#",
  },
  {
    id: "infra",
    title: "DevOps Infrastructure",
    category: "DevOps",
    description: "Virtualization setup using Proxmox and VMware for managing home-lab servers and deployments.",
    content: "Full details coming soon...",
    tech: ["Proxmox", "Docker", "Linux", "Networking"],
    image: "/placeholder-project.jpg",
    demo: "#",
    repo: "#",
  }
];
