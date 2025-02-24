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
    <section id="skills" className="py-20 bg-[var(--pixel-bg)]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-['Press'] text-[var(--pixel-primary)] text-center mb-12 pixel-text"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          TECH SKILLS
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
              className="pixel-border bg-[var(--pixel-bg)] p-6 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--pixel-primary)]"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-['Press'] text-[var(--pixel-primary)]">{skill.title}</h3>
              </div>
              <ul className="space-y-2 flex-grow">
                {skill.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex} 
                    className="text-[var(--pixel-accent)] flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-[var(--pixel-secondary)]"></span>
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
