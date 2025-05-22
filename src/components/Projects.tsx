import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import projectsIconDecoSrc from '../../assets/images/projects-deco.png';
import pxArt1 from '/assets/images/pxArt.png';
import pxArt2 from '/assets/images/pxArt (1).png';
import pxArt3 from '/assets/images/pxArt (2).png';
import pxArt4 from '/assets/images/pxArt (3).png';
import pxArt5 from '/assets/images/pxArt (4).png';
import pxArt6 from '/assets/images/pxArt (6).png';

const projects = [
  {
    title: 'Deep Learning for Medical Imaging',
    description: 'Developed a CNN-based model for early detection of diseases in medical images, achieving 94% accuracy.',
    tech: ['PyTorch', 'OpenCV', 'Docker'],
    image: pxArt2
  },
  {
    title: 'Natural Language Processing Pipeline',
    description: 'Built an end-to-end NLP pipeline for sentiment analysis on social media data using BERT.',
    tech: ['TensorFlow', 'BERT', 'NLTK'],
    image: pxArt3
  },
  {
    title: 'Time Series Forecasting',
    description: 'Implemented LSTM networks for predicting stock market trends with feature engineering.',
    tech: ['Keras', 'Pandas', 'Scikit-learn'],
    image: pxArt4
  },
  {
    title: 'Finding Similar Questions on Quora',
    description: 'Developed a system to detect duplicate questions using techniques like Bag of Words (BOW), TF-IDF, and XGBoost.',
    tech: ['XGBoost', 'TF-IDF', 'NLP'],
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'Payment Fraud Detection',
    description: 'Trained ML models on the PaySim1 dataset to identify fraud in online payments, achieving high precision, recall, and AUC.',
    tech: ['Logistic Regression', 'Random Forest', 'EDA'],
    image: pxArt1
  },
  {
    title: 'Car Price Prediction',
    description: 'Built a regression model using scikit-learn to predict car prices, handling preprocessing, feature engineering, and evaluation.',
    tech: ['Scikit-learn', 'RandomForestRegressor', 'Python'],
    image: pxArt5
  },
  {
    title: 'Language Translation Model',
    description: 'Developed a transformer-based model for translating English to Hindi and Telugu, using a custom WordPiece tokenizer and Opus100 dataset.',
    tech: ['PyTorch', 'Transformers', 'WordPiece'],
    image: pxArt6
  }
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export function Projects() {
  const [ref, controls] = useScrollAnimation();

  return (
    <section id="projects" className="py-20 bg-genshin-bg">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-['Press'] text-genshin-gold text-center mb-12 pixel-text flex items-center justify-center gap-x-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={projectsIconDecoSrc} alt="Deco" className="w-6 h-6" /> {/* Adjust size as needed */}
          <span>PROJECTS</span>
        </motion.h2>
        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="border border-genshin-blue rounded-md bg-genshin-bg-light overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="relative">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover scanline"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-genshin-bg-light"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-['Press'] text-genshin-text mb-3">{project.title}</h3>
                <p className="text-genshin-text-darker mb-4 min-h-[120px]">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className="bg-genshin-blue text-genshin-text px-3 py-1 text-sm rounded-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
