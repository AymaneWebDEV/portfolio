'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaTools, 
  FaLanguage, 
  FaUserTie, 
  FaProjectDiagram, 
  FaDatabase 
} from 'react-icons/fa';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiBootstrap, 
  SiTailwindcss, 
  SiJquery, 
  SiReact, 
  SiMysql, 
  SiPhp, 
  SiLaravel, 
  SiPython, 
  SiMongodb, 
  SiNodedotjs, 
  SiGit, 
  SiGithub, 
  SiGitlab, 
  SiJirasoftware, 
  SiPostman, 
  SiLinux, 
  SiProxmox, 
  SiVmware 
} from 'react-icons/si';
import SITE_CONFIG from '../config/site';

// Technology icons mapping
const techIcons: Record<string, React.ReactNode> = {
  // Frontend
  'HTML': <SiHtml5 className="w-6 h-6 text-orange-500" />,
  'CSS': <SiCss3 className="w-6 h-6 text-blue-500" />,
  'JavaScript': <SiJavascript className="w-6 h-6 text-yellow-400" />,
  'Bootstrap': <SiBootstrap className="w-6 h-6 text-purple-500" />,
  'Tailwind CSS': <SiTailwindcss className="w-6 h-6 text-cyan-400" />,
  'jQuery': <SiJquery className="w-6 h-6 text-blue-600" />,
  'React.js': <SiReact className="w-6 h-6 text-blue-400" />,
  
  // Backend
  'MySQL': <SiMysql className="w-6 h-6 text-blue-600" />,
  'PHP': <SiPhp className="w-6 h-6 text-indigo-600" />,
  'Laravel': <SiLaravel className="w-6 h-6 text-red-500" />,
  'Python': <SiPython className="w-6 h-6 text-yellow-500" />,
  'PL/SQL': <FaDatabase className="w-6 h-6 text-blue-400" />,
  'MongoDB': <SiMongodb className="w-6 h-6 text-green-500" />,
  'SQLite': <FaDatabase className="w-6 h-6 text-blue-300" />,
  'Node.js': <SiNodedotjs className="w-6 h-6 text-green-600" />,
  
  // Infrastructure
  'Proxmox': <SiProxmox className="w-6 h-6" />,
  'VMware': <SiVmware className="w-6 h-6 text-blue-700" />,
  'Linux (administration système)': <SiLinux className="w-6 h-6 text-yellow-600" />,
  
  // Tools
  'Git': <SiGit className="w-6 h-6 text-orange-600" />,
  'GitLab': <SiGitlab className="w-6 h-6 text-red-500" />,
  'GitHub': <SiGithub className="w-6 h-6" />,
  'Jira': <SiJirasoftware className="w-6 h-6 text-blue-500" />,
  'SonarQube': <FaCode className="w-6 h-6 text-pink-500" />,
  'UML': <FaCode className="w-6 h-6 text-purple-500" />,
  'PERT': <FaProjectDiagram className="w-6 h-6 text-green-500" />,
  'GanttProject': <FaProjectDiagram className="w-6 h-6 text-blue-400" />,
  'Postman': <SiPostman className="w-6 h-6 text-orange-500" />
};

// Fallback icon for technologies without specific icons
const FallbackIcon = ({ name }: { name: string }) => (
  <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
    {name.charAt(0).toUpperCase()}
  </div>
);


const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('frontend');
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Handle tab change with smooth scroll
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (sliderRef.current) {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };
  
  // Only enable scroll effects on client-side after mount
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
    layoutEffect: false // Disable layout effect to prevent hydration issues
  });
  
  const yBg = useTransform(scrollYProgress || 0, [0, 1], ['-30%', '10%']);
  
  const isInView = useInView(inViewRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Only render on client-side
  if (!isMounted) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };


  const skillCategories = [
    { 
      id: 'frontend',
      name: 'Frontend', 
      icon: <FaCode className="w-5 h-5" />, 
      items: SITE_CONFIG.skills.frontend,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      hoverColor: 'hover:bg-purple-500/20',
      activeColor: 'bg-purple-500/20'
    },
    { 
      id: 'backend',
      name: 'Backend', 
      icon: <FaServer className="w-5 h-5" />, 
      items: SITE_CONFIG.skills.backend,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      hoverColor: 'hover:bg-blue-500/20',
      activeColor: 'bg-blue-500/20'
    },
    { 
      id: 'tools',
      name: 'Outils & Infra', 
      icon: <FaTools className="w-5 h-5" />, 
      items: [...SITE_CONFIG.skills.tools, ...SITE_CONFIG.skills.infrastructure],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      hoverColor: 'hover:bg-green-500/20',
      activeColor: 'bg-green-500/20'
    },
    { 
      id: 'languages',
      name: 'Langues', 
      icon: <FaLanguage className="w-5 h-5" />, 
      items: SITE_CONFIG.skills.languages.map(lang => `${lang.name} (${lang.level})`),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      hoverColor: 'hover:bg-yellow-500/20',
      activeColor: 'bg-yellow-500/20'
    },
  ];

  return (
    <>
      <section 
        ref={containerRef}
        id="about" 
        className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
      >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden opacity-10"
        style={{ y: yBg }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={inViewRef}
          className="text-center mb-20"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="mb-4">
            <span className="inline-block px-4 py-2 text-sm font-medium text-purple-300 bg-purple-900/30 rounded-full border border-purple-500/30">
              À Propos de Moi
            </span>
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Qui suis-je ?
          </motion.h2>
          
          <motion.div 
            variants={item}
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"
          />
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            {SITE_CONFIG.description}
          </motion.p>
        </motion.div>


        {/* Skills Tabs */}
        <motion.div 
          variants={item}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${tab.borderColor} ${tab.hoverColor} ${
                  activeTab === tab.id ? `${tab.activeColor} text-white` : 'text-gray-300 bg-gray-800/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
          
          {/* Skills Slider */}
          <div 
            ref={sliderRef}
            className="relative w-full overflow-hidden"
          >
            <div className="flex snap-x snap-mandatory overflow-x-auto pb-6 -mx-4 px-4 hide-scrollbar">
              {skillCategories.map((category) => (
                <div 
                  key={category.id}
                  id={category.id}
                  className="flex-shrink-0 w-full px-4 snap-start"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: activeTab === category.id ? 1 : 0.5,
                      x: activeTab === category.id ? 0 : 20,
                      scale: activeTab === category.id ? 1 : 0.98
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`bg-gradient-to-br ${category.color}/10 p-6 rounded-2xl border ${category.borderColor} backdrop-blur-sm h-full`}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-xl ${category.bgColor} mr-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        {category.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {category.items.map((skill, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl ${category.bgColor} ${category.hoverColor} transition-all duration-300 cursor-default h-32`}
                        >
                          <div className="w-12 h-12 flex items-center justify-center mb-3 text-2xl">
                            {techIcons[skill] || <FallbackIcon name={skill} />}
                          </div>
                          <span className="text-sm font-medium text-center text-gray-200 mt-1">
                            {skill.split(' (')[0]}
                            {skill.includes('(') && (
                              <span className="block text-xs text-gray-400 mt-1.5">
                                {skill.match(/\(([^)]+)\)/)?.[1]}
                              </span>
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Custom scroll indicator */}
          <div className="relative w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <motion.div 
              className={`h-full ${skillCategories.find(tab => tab.id === activeTab)?.color.replace('from-', 'bg-gradient-to-r from-').replace(' to-', ' ')}`}
              initial={false}
              animate={{
                width: `${100 / skillCategories.length}%`,
                x: `${skillCategories.findIndex(tab => tab.id === activeTab) * 100}%`
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div 
          variants={container}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
        >
          <motion.div 
            variants={item}
            className="flex items-center mb-6"
          >
            <div className="p-3 rounded-lg bg-purple-500/20 mr-4">
              <FaUserTie className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Compétences Personnelles</h3>
          </motion.div>
          
          <motion.div 
            variants={container}
            className="flex flex-wrap gap-3"
          >
            {SITE_CONFIG.skills.softSkills.map((skill, index) => (
              <motion.span
                key={index}
                variants={item}
                className="px-4 py-2 bg-gray-700/50 text-gray-200 rounded-full text-sm font-medium hover:bg-purple-500/20 hover:text-white transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent pointer-events-none" />
      </section>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default About;
