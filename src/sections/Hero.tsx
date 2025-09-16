'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowDown } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useRef, useState, useEffect } from 'react';
import SITE_CONFIG from '../config/site';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Only enable scroll effects on client-side after mount
  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ['start start', 'end start'],
    layoutEffect: false // Disable layout effect to prevent hydration issues
  });
  
  const yBg = useTransform(scrollYProgress || 0, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0]);
  
  // Use a separate ref for the inView detection
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const socialLinks = [
    { icon: <FaGithub />, url: SITE_CONFIG.social.github },
    { icon: <FaLinkedin />, url: SITE_CONFIG.social.linkedin },
    { icon: <FaTwitter />, url: SITE_CONFIG.social.twitter },
    { icon: <FaInstagram />, url: SITE_CONFIG.social.instagram },
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg, opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-900/80 to-transparent">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={inViewRef}
          className="text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-medium text-purple-300 bg-purple-900/30 rounded-full border border-purple-500/30 mb-4">
              Bienvenue sur mon portfolio
            </span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {SITE_CONFIG.name}
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {SITE_CONFIG.title}
          </motion.p>
          
          <motion.p 
            variants={item}
            className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
          >
            {SITE_CONFIG.description}
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <HiOutlineMail className="mr-2" size={20} />
              Me contacter
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Voir mon travail
            </a>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="flex justify-center space-x-6 mb-12"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
                aria-label={`${social.url.split('/')[2]}`}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
          
          <motion.div 
            variants={item}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <a 
              href="#about"
              className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 group"
              aria-label="Défiler vers le bas"
            >
              <span className="text-sm mb-2 group-hover:text-purple-400 transition-colors">Défiler</span>
              <FaArrowDown className="animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient overlay - extended to accommodate fixed scroll indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent pointer-events-none z-10" />
      
      {/* Main gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
