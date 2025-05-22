import { Brain, Database, Code, GitBranch, Terminal, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import skillsIconDecoSrc from '../../assets/images/skills-deco.png';

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
    items: ['Python', 'C' , 'Java']
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Web Development',
    items: ['HTML', 'CSS' , 'Javascript' , 'React']
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: 'Tools',
    items: ['Docker', 'Linux', 'GCP', 'Jupyter']
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: 'Version Control',
    items: ['Git', 'GitHub']
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
    <section id="skills" className="py-20 bg-genshin-bg">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-['Press'] text-genshin-gold text-center mb-12 pixel-text flex items-center justify-center gap-x-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={skillsIconDecoSrc} alt="Deco" className="w-6 h-6" /> {/* Adjust size as needed */}
          <span>TECH SKILLS</span>
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
              className="border border-genshin-blue rounded-md bg-genshin-bg-light p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="text-genshin-aqua"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-['Press'] text-genshin-text">{skill.title}</h3>
              </div>
              <ul className="space-y-2 flex-grow">
                {skill.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="text-genshin-text-darker flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-genshin-gold rounded-full"></span>
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
