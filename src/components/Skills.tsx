import React from 'react';
import { Brain, Database, Code, GitBranch, Terminal, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skills = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks']
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Data Processing',
    items: ['Pandas', 'NumPy', 'SQL', 'Data Visualization']
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Programming',
    items: ['Python', 'R', 'Java', 'C++']
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: 'Tools',
    items: ['Docker', 'Linux', 'AWS', 'Jupyter']
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'Version Control',
    items: ['Git', 'GitHub', 'MLflow', 'DVC']
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: 'Analytics',
    items: ['Statistical Analysis', 'A/B Testing', 'Hypothesis Testing']
  }
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function Skills() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>
        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-blue-600"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800">{skill.title}</h3>
              </div>
              <ul className="space-y-2 flex-grow">
                {skill.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="text-gray-600 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}