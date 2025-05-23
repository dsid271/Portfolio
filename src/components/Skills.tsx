import { Brain, Database, Code, GitBranch, Terminal, BarChart } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion'; // Modified import
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
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Define listAnimationVariants outside SkillCard if SkillCard is defined within Skills,
// or pass it as a prop if SkillCard is a separate component.
const listAnimationVariants = {
  initial: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  active: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delayChildren: 0.1, staggerChildren: 0.05 }
  }
};

// New SkillCard component
const SkillCard = ({ skillData, itemVariant }: { skillData: any, itemVariant: any }) => {
  const listControls = useAnimation();

  return (
    <motion.div
      variants={itemVariant} // Use the passed item variant
      onHoverStart={() => listControls.start("active")}
      onHoverEnd={() => listControls.start("initial")}
      className="border border-genshin-blue rounded-md bg-genshin-bg-light p-6 transition-all duration-300 ease-out hover:scale-105 hover:border-genshin-gold hover:shadow-pixel-lift pixel-card-pattern"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
          className="text-genshin-aqua"
        >
          {skillData.icon}
        </motion.div>
        <h3 className="text-xl font-['Press'] text-genshin-text">{skillData.title}</h3>
      </div>
      <motion.ul
        variants={listAnimationVariants}
        initial="initial"
        animate={listControls}
        style={{ overflow: 'hidden' }}
        className="space-y-2 flex-grow"
      >
        {skillData.items.map((skillItem: string, itemIndex: number) => (
          <motion.li
            key={itemIndex}
            className="text-genshin-text-darker flex items-center gap-2"
            // variants={{ initial: { opacity: 0, x: -10 }, active: { opacity: 1, x: 0 } }} // Optional item-level
          >
            <span className="w-1.5 h-1.5 bg-genshin-gold rounded-full"></span>
            {skillItem}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
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
            <SkillCard key={index} skillData={skill} itemVariant={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
