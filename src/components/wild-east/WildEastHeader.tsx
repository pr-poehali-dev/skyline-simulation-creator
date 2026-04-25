import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Props {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  scrollToSection: (id: string) => void;
}

const WildEastHeader = ({ isScrolled, isMenuOpen, setIsMenuOpen, scrollToSection }: Props) => {
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Антон Маратканов</span>
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent flex-col md:flex-row`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li>
              <button
                onClick={() => scrollToSection("fights")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Бои
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("events")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Мероприятия
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("charity")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Благотворительность
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Контакты
              </button>
            </li>
          </ul>
        </nav>
        <Button
          className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white border-0"
          onClick={() => scrollToSection("contact")}
        >
          Связаться
        </Button>
      </div>
    </header>
  );
};

export default WildEastHeader;
