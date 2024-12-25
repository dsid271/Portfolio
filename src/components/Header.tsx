import { Github, Linkedin, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-6">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-[Extrude]">Dondapati Sidhartha</h1>
        <div className="flex gap-4">
          <a href="https://github.com/dsid271" className="hover:text-blue-300 transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sidhartha-dondapati-90541827a/" className="hover:text-blue-300 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:dsid271@gmail.com" className="hover:text-blue-300 transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </nav>
    </header>
  );
}
