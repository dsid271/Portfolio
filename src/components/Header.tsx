import { Github, Linkedin, Mail } from 'lucide-react';
import pixelLogoSrc from '../../assets/images/pixel-logo.png';

export function Header() {
  return (
    <header className="bg-genshin-bg-light text-genshin-text py-6">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl text-genshin-text flex items-center gap-x-3"> {/* Adjusted text size slightly and gap */}
          <img src={pixelLogoSrc} alt="Logo" className="w-7 h-7" /> {/* Placeholder path, adjust size as needed */}
          <span>Dondapati Sidhartha</span>
        </h1>
        <div className="flex gap-4">
          <a href="https://github.com/dsid271" className="text-genshin-text-darker hover:text-genshin-gold transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sidhartha-dondapati-90541827a/" className="text-genshin-text-darker hover:text-genshin-gold transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:dsid271@gmail.com" className="text-genshin-text-darker hover:text-genshin-gold transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </nav>
    </header>
  );
}
