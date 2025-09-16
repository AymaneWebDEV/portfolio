import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/global.css';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <ScrollLink 
          to="home" 
          smooth={true} 
          duration={500} 
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          onClick={closeMobileMenu}
        >
          Ahmed Aymane
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wider cursor-pointer transition-colors"
                  activeClass="text-blue-500"
                  spy={true}
                  offset={-80}
                >
                  {link.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center md:hidden"
            >
              <ul className="text-center space-y-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="text-2xl font-medium text-gray-800 hover:text-blue-500 transition-colors cursor-pointer"
                      onClick={closeMobileMenu}
                      activeClass="text-blue-500"
                      spy={true}
                      offset={-80}
                    >
                      {link.name}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 flex space-x-4">
                <a 
                  href="#" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
