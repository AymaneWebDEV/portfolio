import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import SITE_CONFIG from '@/config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { name, title, social, contact } = SITE_CONFIG;
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: social.github, 
      icon: <FaGithub className="w-5 h-5" />,
      color: 'hover:text-gray-300'
    },
    { 
      name: 'LinkedIn', 
      url: social.linkedin, 
      icon: <FaLinkedin className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Twitter', 
      url: social.twitter, 
      icon: <FaTwitter className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      url: `mailto:${contact.email}`, 
      icon: <FaEnvelope className="w-5 h-5" />,
      color: 'hover:text-red-400'
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-900/20 rounded-full opacity-50 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* About Column */}
          <motion.div 
            className="md:col-span-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-4"
              variants={item}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-6"
              variants={item}
            >
              {title}
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm leading-relaxed"
              variants={item}
            >
              Passionate about creating beautiful, functional, and user-centered digital experiences.
              Let's build something amazing together!
            </motion.p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            className="md:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-white mb-4"
              variants={item}
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              className="space-y-3"
              variants={container}
            >
              {SITE_CONFIG.navLinks.map((link) => (
                <motion.li 
                  key={link.href}
                  variants={item}
                >
                  <ScrollLink
                    to={link.href}
                    smooth={true}
                    duration={500}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                    activeClass="text-blue-400"
                    spy={true}
                    offset={-80}
                  >
                    {link.name}
                  </ScrollLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="md:col-span-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-white mb-4"
              variants={item}
            >
              Get In Touch
            </motion.h4>
            <motion.ul 
              className="space-y-3 text-sm"
              variants={container}
            >
              <motion.li className="flex items-start" variants={item}>
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {contact.email}
                </a>
              </motion.li>
              <motion.li className="flex items-start" variants={item}>
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </motion.li>
              <motion.li className="flex items-start" variants={item}>
                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  {contact.address}
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            className="md:col-span-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-white mb-4"
              variants={item}
            >
              Follow Me
            </motion.h4>
            <motion.p 
              className="text-gray-400 text-sm mb-6"
              variants={item}
            >
              Feel free to connect with me on social media platforms.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px 0px" }}
            >
              {socialLinks.map((socialItem) => (
                <motion.a
                  key={socialItem.name}
                  href={socialItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 ${socialItem.color} transition-colors`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={socialItem.name}
                >
                  {socialItem.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
            <div>
              &copy; {currentYear} {name}. All rights reserved.
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center">
              Made with <FaHeart className="mx-1 text-red-500" /> by {name}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
