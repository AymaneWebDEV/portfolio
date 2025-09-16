'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import config from '../config/site';

// Create a local constant to avoid potential issues with default exports
const SITE_CONFIG = config;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
}

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const contactInfo: ContactInfoItem[] = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-green-400" />,
      title: 'Localisation',
      value: SITE_CONFIG.location,
      link: `https://www.google.com/maps/place/${encodeURIComponent(SITE_CONFIG.location)}`
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-blue-400" />,
      title: 'Email',
      value: SITE_CONFIG.email,
      link: `mailto:${SITE_CONFIG.email}`
    },
    {
      icon: <FaPhone className="w-6 h-6 text-purple-400" />,
      title: 'Téléphone',
      value: SITE_CONFIG.phone,
      link: `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, url: SITE_CONFIG.social.github, label: 'GitHub' },
    { icon: <FaLinkedin />, url: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
    { icon: <FaTwitter />, url: SITE_CONFIG.social.twitter, label: 'Twitter' },
    { icon: <FaInstagram />, url: SITE_CONFIG.social.instagram, label: 'Instagram' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';
      
      await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );
      
      setSubmitStatus({
        success: true,
        message: 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  // Only render on client-side
  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      id="contact" 
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
            className="absolute rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20"
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
            <span className="inline-block px-4 py-2 text-sm font-medium text-green-300 bg-green-900/30 rounded-full border border-green-500/30">
              Contactez-moi
            </span>
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Travaillons ensemble
          </motion.h2>
          
          <motion.div 
            variants={item}
            className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"
          />
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div 
            variants={container}
            className="space-y-8"
          >
            <motion.div variants={item} className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400 mr-6 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div variants={item} className="pt-6 border-t border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Suivez-moi</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-green-500/20 hover:border-green-500/50 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={container}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-red-500/30'}`}
                >
                  <p className={submitStatus.success ? 'text-green-300' : 'text-red-300'}>
                    {submitStatus.message}
                  </p>
                </motion.div>
              )}
              
              <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Votre email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={item}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Sujet de votre message"
                />
              </motion.div>
              
              <motion.div variants={item}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Dites-moi en plus sur votre projet..."
                ></textarea>
              </motion.div>
              
              <motion.div variants={item} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <FaPaperPlane className="mr-2" />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent pointer-events-none" />
    </section>
  );
};

export default Contact;
