'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SITE_CONFIG from '../config/site';

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string | string[];
  icon: React.ReactNode;
  type: 'work' | 'education';
  location?: string;
  tags?: string[];
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const experiences: ExperienceItem[] = [
    ...SITE_CONFIG.experience.map(exp => ({
      ...exp,
      icon: <FaBriefcase className="w-5 h-5 text-purple-400" />,
      type: 'work' as const,
      description: Array.isArray(exp.description) ? [...exp.description] : [exp.description],
      tags: exp.tags ? [...exp.tags] : []
    })),
    ...SITE_CONFIG.education.map(edu => ({
      role: edu.degree,
      company: edu.institution,
      period: edu.period,
      description: [...edu.description],
      icon: <FaGraduationCap className="w-5 h-5 text-blue-400" />,
      type: 'education' as const,
      location: 'location' in edu ? (edu.location as string) : 'Non spécifié'
    }))
  ].sort((a, b) => {
    // Sort by period (most recent first)
    const dateA = new Date(a.period.split(' - ')[0]);
    const dateB = new Date(b.period.split(' - ')[0]);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredExperiences = experiences.filter(exp => {
    if (activeTab === 'all') return true;
    return exp.type === activeTab;
  });


  return (
    <section 
      ref={containerRef}
      id="experience" 
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
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
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
          ref={ref}
          className="text-center mb-16"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="mb-4">
            <span className="inline-block px-4 py-2 text-sm font-medium text-blue-300 bg-blue-900/30 rounded-full border border-blue-500/30">
              Mon Parcours
            </span>
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Expérience & Formation
          </motion.h2>
          
          <motion.div 
            variants={item}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8"
          />
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Mon parcours professionnel et ma formation académique
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          variants={container}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-800/50 backdrop-blur-sm p-1 rounded-xl border border-gray-700/50">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'work', label: 'Expérience', icon: <FaBriefcase className="mr-2" /> },
              { id: 'education', label: 'Formation', icon: <FaGraduationCap className="mr-2" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={container}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-blue-500/30 to-cyan-500/30 transform -translate-x-1/2"></div>
          
          {filteredExperiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={`${exp.type}-${index}`}
                variants={item}
                className={`relative mb-12 flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center`}
              >
                {/* Content */}
                <div 
                  className={`w-5/12 ${isEven ? 'pr-12 text-right' : 'pl-12'}`}
                >
                  <div className="mb-2 text-sm font-medium text-blue-300">{exp.period}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="flex items-center text-gray-400 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-sm" />
                    <span className="text-sm">{'location' in exp ? exp.location : 'Non spécifié'}</span>
                  </div>
                  <div className="text-blue-100 mb-4">{exp.company}</div>
                  
                  {Array.isArray(exp.description) ? (
                    <ul className="space-y-2 text-gray-300">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2"></span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  )}
                </div>
                
                {/* Timeline dot */}
                <div className="w-2/12 flex justify-center">
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      exp.type === 'work' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
                        : 'bg-gradient-to-br from-cyan-500 to-cyan-700'
                    } shadow-lg`}>
                      {exp.icon}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                {/* Empty div for spacing */}
                <div className="w-5/12"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent pointer-events-none" />
    </section>
  );
};

export default Experience;
