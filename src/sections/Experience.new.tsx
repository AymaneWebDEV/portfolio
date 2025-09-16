import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import SITE_CONFIG from '../config/site';

const Experience = () => {
  const experiences = [
    ...SITE_CONFIG.experience.map(exp => ({
      ...exp,
      icon: <FaBriefcase className="w-5 h-5 text-blue-500" />,
      type: 'work' as const
    })),
    ...SITE_CONFIG.education.map(edu => ({
      role: edu.degree,
      company: edu.institution,
      period: edu.period,
      description: edu.description.join(' '),
      icon: <FaGraduationCap className="w-5 h-5 text-green-500" />,
      type: 'education' as const
    }))
  ].sort((a, b) => {
    // Sort by period (most recent first)
    const dateA = new Date(a.period.split(' - ')[0]);
    const dateB = new Date(b.period.split(' - ')[0]);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Expérience & Formation</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mon parcours professionnel et ma formation académique.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.type}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className={`p-6 bg-white rounded-lg shadow-md ${exp.type === 'education' ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'}`}>
                  <span className="text-sm font-medium text-blue-600">{exp.period}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{exp.role}</h3>
                  <p className="text-lg font-medium text-gray-700">{exp.company}</p>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                  {exp.type === 'work' && 'tags' in exp && exp.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Dot */}
              <div className="w-2/12 flex justify-center">
                <div className={`w-6 h-6 rounded-full ${exp.type === 'education' ? 'bg-green-500' : 'bg-blue-500'} flex items-center justify-center text-white`}>
                  {exp.icon}
                </div>
              </div>
              
              {/* Empty space for alignment */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
