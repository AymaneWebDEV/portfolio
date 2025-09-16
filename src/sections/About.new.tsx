import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools, FaLanguage } from 'react-icons/fa';
import SITE_CONFIG from '../config/site';

const About = () => {
  const skills = [
    { 
      name: 'Développement Frontend', 
      icon: <FaCode className="w-6 h-6 text-blue-500" />, 
      items: SITE_CONFIG.skills.frontend 
    },
    { 
      name: 'Développement Backend', 
      icon: <FaServer className="w-6 h-6 text-green-500" />, 
      items: SITE_CONFIG.skills.backend 
    },
    { 
      name: 'Outils & Infrastructure', 
      icon: <FaTools className="w-6 h-6 text-purple-500" />, 
      items: [...SITE_CONFIG.skills.tools, ...SITE_CONFIG.skills.infrastructure] 
    },
    { 
      name: 'Langues', 
      icon: <FaLanguage className="w-6 h-6 text-yellow-500" />, 
      items: SITE_CONFIG.skills.languages.map(lang => `${lang.name} (${lang.level})`) 
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">À Propos de Moi</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {SITE_CONFIG.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-opacity-10 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Compétences Transversales</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SITE_CONFIG.skills.softSkills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 bg-white text-gray-800 text-sm font-medium rounded-full shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
