'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import SITE_CONFIG from '../config/site';
import type { Project } from '../types/portfolio';

// Import project images
import chatbotAiImage from '../assets/Projects-Pics/chatbot-ai.png';
import gestionEmploiImage from '../assets/Projects-Pics/gestion-emploi.png';
import eLearningImage from '../assets/Projects-Pics/e-learning.png';
import eComImage from '../assets/Projects-Pics/e-com-interface.png';
import projectPlaceholderImage from '../assets/project-placeholder.svg';

// Map project IDs to their respective images
const projectImages: Record<string, string> = {
  'chatbot-ai': chatbotAiImage,
  'gestion-emploi': gestionEmploiImage,
  'e-learning': eLearningImage,
  'e-commerce': eComImage
};

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Tous');
  const [projects] = useState<readonly Project[]>(() => [...SITE_CONFIG.projects]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const swiperRef = useRef<any>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = ['Tous', ...new Set(projects.flatMap((project: Project) => project.tags as readonly string[]))] as string[];
  const filteredProjects = activeFilter === 'Tous' 
    ? [...projects] 
    : projects.filter((project: Project) => (project.tags as readonly string[]).includes(activeFilter));

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
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
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Mes Projets
          </motion.h2>
          <motion.p
            variants={item}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Découvrez une sélection de mes projets récents et de mes contributions
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          variants={container}
          className="flex flex-wrap justify-center gap-3 mb-12 px-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={item}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid - shown on mobile */}
        <div className="lg:hidden">
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={item}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                onClick={() => openModal(project)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={projectImages[project.id] || projectPlaceholderImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-white text-xl font-semibold">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                      Voir plus
                      <FaArrowRight className="ml-1" size={12} />
                    </button>
                    <div className="flex space-x-3">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <FaGithub size={18} />
                      </a>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Carousel - shown on desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className="py-10"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.id || index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer h-full"
                    onClick={() => openModal(project)}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={projectImages[project.id] || projectPlaceholderImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-1">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                          Voir plus
                          <FaArrowRight className="ml-1" size={12} />
                        </button>
                        <div className="flex space-x-3">
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Voir le code source"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <FaGithub size={18} />
                          </a>
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Voir en ligne"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <FaExternalLinkAlt size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <button
              className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300 shadow-lg"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <FaArrowLeft />
            </button>
            <button
              className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors duration-300 shadow-lg"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>

                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={projectImages[selectedProject.id] || projectPlaceholderImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {selectedProject.description}
                    </p>
                    {selectedProject.longDescription && (
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {selectedProject.longDescription.map((item, index) => (
                          <li key={index} className="text-gray-300">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      aria-label={`View ${selectedProject.title} on GitHub`}
                    >
                      <CodeBracketIcon className="w-5 h-5 mr-2" />
                      Voir le code
                    </a>
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      aria-label={`View ${selectedProject.title} live demo`}
                    >
                      <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
                      Voir en ligne
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
