import { Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400">
            &copy; {new Date().getFullYear()} Антон Маратканов — ведущий мероприятий
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="tel:+79141983629"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Phone size={18} />
              <span>+7 (914) 198-36-29</span>
            </a>
            <a
              href="https://instagram.com/maratkanovevent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
              <span>maratkanovevent</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
