import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import heroAvatarSrc from '../../assets/images/hero-avatar.png';

export function Hero() {
  return (
    <section className="bg-genshin-bg py-20 scanline">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-genshin-gold pixel-text text-5xl font-bold mb-4 flex items-center justify-center md:justify-start gap-x-4">
            <img src={heroAvatarSrc} alt="Avatar" className="w-12 h-12 rounded-sm" /> {/* Adjust size, add styling like rounded-sm if desired */}
            <span>D SIDHARTHA</span>
          </h1>
          <p className="text-lg sm:text-xl text-genshin-aqua mb-8 pixel-text">
            &gt; FINAL YEAR B.TECH STUDENT<br />
            &gt; SPECIALIZING IN AI/ML<br />
            &gt; READY TO DEBUG THE MATRIX
          </p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a href="#projects" className="inline-block bg-genshin-blue text-genshin-text py-3 px-6 pixel-text font-bold hover:bg-genshin-blue-dark border-2 border-genshin-blue-dark hover:border-genshin-blue transition-all duration-200 transform hover:scale-105 rounded-sm">
              VIEW_MY_PROJECTS
            </a>
            <a href="#contact" className="inline-block bg-genshin-blue text-genshin-text py-3 px-6 pixel-text font-bold hover:bg-genshin-blue-dark border-2 border-genshin-blue-dark hover:border-genshin-blue transition-all duration-200 transform hover:scale-105 rounded-sm">
              CONTACT_ME
            </a>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full md:w-1/2 border-4 border-genshin-blue rounded-md p-4 sm:p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="bg-genshin-bg-light rounded p-4">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-genshin-aqua" />
              <span className="text-genshin-aqua">terminal.exe</span>
            </div>
            <div>
              <p className="text-genshin-text">&gt; Loading skills...</p>
              <p className="text-genshin-text-darker">&gt; Python loaded ████████████ 100%</p>
              <p className="text-genshin-text-darker">&gt; TensorFlow loaded ████████████ 100%</p>
              <p className="text-genshin-text-darker">&gt; PyTorch loaded ████████████ 100%</p>
              <p className="text-genshin-gold">&gt; Neural networks initialized...</p>
              <p className="text-genshin-text">&gt; Ready for deployment_</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
