import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-genshin-bg-light text-genshin-text-darker py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl text-genshin-text mb-1">Dondapati Sidhartha</h3>
            <p className="text-genshin-text-darker text-sm">Aspiring AI/ML Engineer | B.Tech Final Year</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/dsid271" className="hover:text-genshin-gold transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sidhartha-dondapati-90541827a/" className="hover:text-genshin-gold transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:dsid271@gmail.com" className="hover:text-genshin-gold transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-genshin-text-darker opacity-75">
          <p>&copy; {new Date().getFullYear()} Dondapati Sidhartha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
