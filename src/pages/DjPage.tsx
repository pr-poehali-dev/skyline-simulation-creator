import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const photos = [
  "https://cdn.poehali.dev/files/b4362d46-5f0f-4009-a6a3-fab6e73bca14.jpg",
  "https://cdn.poehali.dev/files/d118f53a-084c-4a50-b627-feb1aa81f521.jpg",
  "https://cdn.poehali.dev/files/ee795c93-8cb0-4871-8485-01a2dc8a7aa1.jpg",
  "https://cdn.poehali.dev/files/932fc7f7-dd85-4977-93e6-66d72f1f2c20.jpg",
];

const cities = ["Хабаровск", "Владивосток", "Находка", "Благовещенск", "и многие другие"];

const DjPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((p) => (p + 1) % photos.length);
    }, 3500);
    return () => clearInterval(timer);
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
          <Link to="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium">Антон Маратканов</span>
          </Link>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
          <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent flex-col md:flex-row`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
              <li><button onClick={() => scrollToSection("about")} className="text-white hover:text-purple-400 transition-colors">Обо мне</button></li>
              <li><button onClick={() => scrollToSection("sets")} className="text-white hover:text-purple-400 transition-colors">Сеты</button></li>
              <li><button onClick={() => scrollToSection("education")} className="text-white hover:text-purple-400 transition-colors">Обучение</button></li>
              <li><button onClick={() => scrollToSection("gallery")} className="text-white hover:text-purple-400 transition-colors">Фото</button></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-white hover:text-purple-400 transition-colors">Контакты</button></li>
            </ul>
          </nav>
          <Button
            className="hidden md:block bg-purple-700 hover:bg-purple-800 text-white border-0"
            onClick={() => scrollToSection("contact")}
          >
            Заказать DJ
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фото-слайдер на фоне */}
        {photos.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activePhoto ? 0.25 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-purple-400 font-light mb-4 tracking-[6px] uppercase text-sm md:text-base">
            Дальний Восток · Россия
          </p>
          <h1 className="text-5xl md:text-8xl font-black mb-4 leading-none tracking-tighter">
            DJ <span className="text-purple-500">Puzyr'koff</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8">
            Клубный диджей с опытом выступлений от Находки до Благовещенска
          </p>

          {/* Жанры */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {["Поп", "Реп", "Коммерческие ремиксы", "Техно", "Afro"].map((genre) => (
              <span key={genre} className="text-xs px-3 py-1.5 bg-purple-500/15 border border-purple-500/40 text-purple-300 rounded-full font-medium">
                {genre}
              </span>
            ))}
          </div>

          {/* Города */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {cities.map((city) => (
              <span key={city} className="text-xs px-3 py-1 border border-white/15 text-gray-400 rounded-full">
                {city}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-700 hover:bg-purple-800 text-white text-lg px-8 py-6 border-0"
              onClick={() => scrollToSection("sets")}
            >
              <Icon name="Music" size={20} className="mr-2" />
              Слушать сеты
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-lg px-8 py-6"
              onClick={() => scrollToSection("education")}
            >
              Обучение
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-purple-500" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-12 bg-purple-500 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-black">Обо мне</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Диджею под псевдонимом <span className="text-white font-semibold">DJ Puzyr'koff</span> я отыграл
                  сотни вечеринок в клубах Дальнего Востока — от Находки и Владивостока
                  до Хабаровска и Благовещенска.
                </p>
                <p>
                  За эти годы я обучил десятки диджеев, которые сегодня работают
                  по всей России. Моя задача — дать тебе не просто технику,
                  а уверенность за пультом.
                </p>
                <p>
                  Играю мультиформатно — от коммерческой попсы, репа и ремиксов
                  до качественного техно и афро. Читаю зал и даю людям именно то,
                  что им нужно в этот момент.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { value: "10+", label: "лет за пультом" },
                  { value: "4", label: "города Дальнего Востока" },
                  { value: "100+", label: "вечеринок" },
                  { value: "Много", label: "обученных диджеев" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-purple-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-purple-400">{item.value}</div>
                    <div className="text-gray-500 text-sm mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={photos[1]}
                alt="DJ Puzyr'koff"
                className="rounded-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Sets */}
      <section id="sets" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-purple-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Мои сеты</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 ml-5">Скоро здесь появятся записи выступлений</p>

          {/* Заглушки под сеты */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/5 border border-purple-500/20 rounded-2xl p-5"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Music2" size={22} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded w-48 mb-2" />
                  <div className="h-3 bg-white/5 rounded w-24" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Icon name="Play" size={16} className="text-gray-600 ml-0.5" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Сеты появятся после загрузки на SoundCloud или YouTube
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Education */}
      <section id="education" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-purple-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Обучение</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 ml-5">
            Учу диджеингу — от нуля до уверенной игры в клубах
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "GraduationCap",
                title: "С нуля",
                desc: "Не важно, держал ли ты пульт раньше. Начнём с основ и выстроим правильную базу",
              },
              {
                icon: "Zap",
                title: "До результата",
                desc: "Цель — уверенная игра в клубе. Не просто теория, а реальная практика за оборудованием",
              },
              {
                icon: "Globe",
                title: "Выпускники по всей России",
                desc: "Мои ученики работают диджеями по всей стране — это лучшее подтверждение качества",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Хочешь научиться диджеингу?</h3>
            <p className="text-gray-400 mb-6">Напиши — расскажу про программу и запишу на первое занятие</p>
            <Button
              size="lg"
              className="bg-purple-700 hover:bg-purple-800 text-white border-0 px-8"
              onClick={() => scrollToSection("contact")}
            >
              Записаться на обучение
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1 h-12 bg-purple-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Фото</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((src, i) => (
              <div key={src} className="relative overflow-hidden rounded-2xl aspect-square group">
                <img
                  src={src}
                  alt={`DJ Puzyr'koff фото ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Заказать <span className="text-purple-500">DJ</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Выступление на вечеринке, корпоративе или обучение — пиши напрямую
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/79141983629" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 border-0 w-full sm:w-auto">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp
              </Button>
            </a>
            <a href="tel:+79141983629">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 text-lg px-8 py-6 w-full sm:w-auto">
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
          <span className="font-black text-xl tracking-tighter">
            DJ <span className="text-purple-500">Puzyr'koff</span>
          </span>
          <p className="text-gray-600 text-sm">Хабаровск · Дальний Восток</p>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            ← Антон Маратканов
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default DjPage;