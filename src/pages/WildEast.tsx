import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const WildEast = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              "url(https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img
            src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
            alt="Дикий Восток"
            className="w-64 h-64 md:w-80 md:h-80 mx-auto object-contain mb-8 drop-shadow-2xl"
          />
          <p className="text-xl md:text-2xl text-orange-300 font-light mb-4 tracking-widest uppercase">
            Хабаровск
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Сила. Дух.{" "}
            <span className="text-orange-500">Восток.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Организация бойцовских турниров и общественно значимых городских мероприятий в Хабаровске
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 border-0"
              onClick={() => scrollToSection("fights")}
            >
              Бои
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 text-lg px-8 py-6"
              onClick={() => scrollToSection("events")}
            >
              Мероприятия
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-orange-500" />
        </div>
      </section>

      {/* Fights Section */}
      <section id="fights" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Бойцовские турниры</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 ml-5">
            Организуем профессиональные и любительские бои — от подготовки до шоу
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "Trophy",
                title: "Турниры",
                desc: "Организация бойцовских турниров разных уровней — от любительских до профессиональных",
              },
              {
                icon: "Users",
                title: "Участники",
                desc: "Работаем со спортсменами, клубами и командами по всему Дальнему Востоку",
              },
              {
                icon: "Video",
                title: "Съёмка",
                desc: "Профессиональные видеоотчёты с каждого турнира — сохраняем каждый момент",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={24} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Video placeholder */}
          <div className="bg-white/5 border border-orange-500/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-orange-500/20">
              <h3 className="text-xl font-bold text-orange-400">Видеоотчёты с турниров</h3>
              <p className="text-gray-500 text-sm mt-1">Скоро здесь появятся видео</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-black/50 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={28} className="text-orange-400 ml-1" />
                  </div>
                  <span className="text-gray-500 text-sm">Видео появится скоро</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>

      {/* Events Section */}
      <section id="events" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Городские мероприятия</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 ml-5">
            Общественно значимые события, которые объединяют Хабаровск
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: "MapPin",
                title: "Городские события",
                desc: "Организуем и освещаем общественно важные мероприятия города — от фестивалей до форумов",
              },
              {
                icon: "Mic2",
                title: "Подкасты",
                desc: "Записываем подкасты о жизни города, спорте и людях, которые делают Хабаровск лучше",
              },
              {
                icon: "Camera",
                title: "Видеоотчёты",
                desc: "Документируем важные события — чтобы ничего не было забыто",
              },
              {
                icon: "Heart",
                title: "Сообщество",
                desc: "Создаём пространство для людей, которым не всё равно, что происходит на Дальнем Востоке",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={24} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Video placeholder */}
          <div className="bg-white/5 border border-orange-500/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-orange-500/20">
              <h3 className="text-xl font-bold text-orange-400">Видеоотчёты с мероприятий</h3>
              <p className="text-gray-500 text-sm mt-1">Скоро здесь появятся видео</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 p-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-black/50 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-orange-400 ml-1" />
                  </div>
                  <span className="text-gray-500 text-xs">Скоро</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-2xl text-center">
          <img
            src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
            alt="Дикий Восток"
            className="w-32 h-32 mx-auto object-contain mb-8 opacity-80"
          />
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Хочешь участвовать?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Участие в турнирах, партнёрство, сотрудничество — пиши напрямую
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/79141983629"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 border-0 w-full sm:w-auto"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp
              </Button>
            </a>
            <a href="tel:+79141983629">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10 text-lg px-8 py-6 w-full sm:w-auto"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (914) 198-36-29
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
              alt="Дикий Восток"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-orange-400">Дикий Восток</span>
          </div>
          <p className="text-gray-600 text-sm">Хабаровск · Дальний Восток</p>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            ← Антон Маратканов
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default WildEast;