import pixelLogoSrc from '../../assets/images/pixel-logo.png';
import githubIconSrc from '../../assets/images/github-icon.png';
import linkedinIconSrc from '../../assets/images/linkedin-icon.png';
import mailIconSrc from '../../assets/images/mail-icon.png';

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
            <img src={githubIconSrc} alt="GitHub" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/sidhartha-dondapati-90541827a/" className="text-genshin-text-darker hover:text-genshin-gold transition-colors">
            <img src={linkedinIconSrc} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="mailto:dsid271@gmail.com" className="text-genshin-text-darker hover:text-genshin-gold transition-colors">
            <img src={mailIconSrc} alt="Mail" className="w-7 h-7" />
          </a>
        </div>
      </nav>
    </header>
  );
}
