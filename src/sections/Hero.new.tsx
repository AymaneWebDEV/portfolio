import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link as ScrollLink } from 'react-scroll';
import SITE_CONFIG from '../config/site';

const Hero = () => {
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
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
              Bonjour, je suis {SITE_CONFIG.name}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Je suis <span className="text-blue-600">{SITE_CONFIG.title}</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            {SITE_CONFIG.description}
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center cursor-pointer"
            >
              Contactez-moi
            </ScrollLink>
            <a
              href="#projects"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Voir mon travail
            </a>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="flex justify-center space-x-6"
          >
            <a 
              href={SITE_CONFIG.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a 
              href={SITE_CONFIG.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a 
              href={SITE_CONFIG.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${SITE_CONFIG.email}`} 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Email"
            >
              <HiOutlineMail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="text-sm mb-2">Défiler vers le bas</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </ScrollLink>
      </div>
    </section>
  );
};

export default Hero;
