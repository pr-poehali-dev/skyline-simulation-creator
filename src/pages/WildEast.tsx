import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const FIGHTER_URL = "https://functions.poehali.dev/8239bcc3-4c1a-491a-beff-b3feae235dcd";

const WildEast = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [form, setForm] = useState({ height: "", weight: "", base: "", exp: "", gym: "", age: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact.trim()) { setError("Укажите контакт для связи"); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch(FIGHTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) setSubmitted(true);
      else setError("Ошибка отправки, попробуйте ещё раз");
    } catch {
      setError("Ошибка соединения");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const prevKw = document.querySelector('meta[name="keywords"]')?.getAttribute("content");

    document.title = "Дикий Восток — турниры ММА, бокс и кик-боксинг в Хабаровске | Антон Маратканов";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Бойцовская лига «Дикий Восток» — профессиональные и любительские турниры по ММА, боксу и кик-боксингу в Хабаровске. Организатор Антон Маратканов. Благотворительность, городские мероприятия, поддержка спортсменов Дальнего Востока.");
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", "Дикий Восток Хабаровск, ММА Хабаровск, бокс Хабаровск, кик-боксинг Хабаровск, бойцовская лига Дальний Восток, турнир единоборств Хабаровск, смешанные единоборства Хабаровск, MMA Khabarovsk, спортивные бои Хабаровск, благотворительность Хабаровск, Маратканов организатор, спорт Дальний Восток");

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute("content", "Дикий Восток — турниры ММА, бокс и кик-боксинг в Хабаровске");
    if (ogDesc) ogDesc.setAttribute("content", "Бойцовская лига «Дикий Восток» — профессиональные и любительские турниры по ММА, боксу и кик-боксингу в Хабаровске. Благотворительность, городские мероприятия.");
    if (ogUrl) ogUrl.setAttribute("content", "https://eventkhv.ru/wild-east");

    return () => {
      document.title = prevTitle;
      if (prevDesc) document.querySelector('meta[name="description"]')?.setAttribute("content", prevDesc);
      if (prevKw) document.querySelector('meta[name="keywords"]')?.setAttribute("content", prevKw);
      if (ogTitle) ogTitle.setAttribute("content", "Антон Маратканов — ведущий, организатор ММА и бокс турниров, DJ Хабаровск");
      if (ogDesc) ogDesc.setAttribute("content", "Профессиональный ведущий мероприятий, организатор бойцовских турниров ММА и бокса, благотворительных акций. DJ Puzyr'koff — музыка для событий.");
      if (ogUrl) ogUrl.setAttribute("content", "https://eventkhv.ru");
    };
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
            Бойцовская лига, дающая дорогу в{" "}
            <span className="text-orange-500">большой спорт.</span>
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

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "https://vk.ru/video/playlist/-230198930_1", icon: "Users", label: "Конференции", desc: "Первые конференции перед боями" },
              { href: "https://vk.ru/video/playlist/-230198930_2", icon: "Swords", label: "Первые бои", desc: "Видеозаписи первых турниров" },
              { href: "https://vk.ru/video/playlist/-230198930_4", icon: "Play", label: "Все бои", desc: "Полный архив видео с боёв" },
              { href: "https://vk.com/albums-230198930", icon: "Camera", label: "Фотоотчёты", desc: "Фотографии с турниров" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 bg-white/5 border border-orange-500/20 hover:border-orange-500/60 rounded-2xl p-6 transition-all group text-center"
              >
                <div className="w-14 h-14 bg-[#0077FF]/15 rounded-2xl flex items-center justify-center">
                  <Icon name={item.icon} size={26} className="text-[#0077FF]" />
                </div>
                <div>
                  <p className="font-bold group-hover:text-orange-400 transition-colors">{item.label}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
                <Icon name="ExternalLink" size={14} className="text-gray-600 group-hover:text-orange-400 transition-colors" />
              </a>
            ))}
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Городские события */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="MapPin" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Городские события</h3>
              <p className="text-gray-400">Организуем и освещаем общественно важные мероприятия города — от фестивалей до форумов</p>
            </div>

            {/* Видеоотчёты */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Camera" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Видеоотчёты</h3>
              <p className="text-gray-400">Документируем важные события — чтобы ничего не было забыто</p>
            </div>

            {/* Сообщество */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Heart" size={24} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Сообщество</h3>
                <p className="text-gray-400">Создаём пространство для людей, которым не всё равно, что происходит на Дальнем Востоке</p>
              </div>
              <a
                href="https://vk.com/wild_east_khv"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#0077FF] hover:bg-[#0066DD] text-white font-medium px-4 py-2 rounded-xl transition-colors text-sm w-fit"
              >
                <Icon name="ExternalLink" size={15} />
                Подписаться в ВК
              </a>
            </div>

            {/* Подкасты */}
            <a
              href="https://vk.ru/video/playlist/-230198930_3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between bg-white/5 border border-orange-500/20 hover:border-orange-500/60 rounded-2xl p-6 transition-all group"
            >
              <div>
                <div className="w-12 h-12 bg-[#0077FF]/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Mic2" size={24} className="text-[#0077FF]" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">Подкасты</h3>
                <p className="text-gray-400">Разговоры о городе, спорте и людях Дальнего Востока</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[#0077FF] text-sm font-medium">
                Смотреть в ВК <Icon name="ExternalLink" size={14} />
              </div>
            </a>
          </div>

          {/* Видео с мероприятий */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              {
                href: "https://vkvideo.ru/clip-230198930_456239121",
                title: "Сила духа",
                desc: "Мероприятие по интеграции ветеранов в мирную жизнь",
                icon: "Shield",
              },
              {
                href: "https://vkvideo.ru/video-230198930_456239119",
                title: "Богатырская весна",
                desc: "Проводы зимы и встреча весны с русскими традициями",
                icon: "Sun",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/5 border border-orange-500/20 hover:border-orange-500/60 rounded-2xl p-5 transition-all group"
              >
                <div className="w-14 h-14 bg-orange-500/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={26} className="text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold group-hover:text-orange-400 transition-colors">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-orange-500/60 group-hover:text-orange-400 transition-colors flex-shrink-0">
                  <Icon name="Play" size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>

      {/* Charity Section */}
      <section id="charity" className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-orange-500 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">Благотворительность</h2>
          </div>
          <p className="text-gray-400 text-lg mb-12 ml-5 max-w-3xl">
            Сила — это не только победы на ринге. Настоящая сила в том, чтобы не проходить мимо, когда рядом кто-то нуждается в помощи. Наша лига помнит об этом и делает конкретные дела.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Независимость */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Shield" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Центр «Независимость»</h3>
              <p className="text-gray-400">Поддерживаем людей, которые борются со своими зависимостями и выбирают новый путь. Потому что каждый заслуживает второго шанса.</p>
            </div>

            {/* Росточек */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Sprout" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Фонд «Росточек»</h3>
              <p className="text-gray-400">Помогаем фонду, который заботится о детях-сиротах, детях с ограниченными возможностями и семьях в трудной ситуации. Продвигаем идеи семейного устройства и толерантности в обществе.</p>
            </div>

            {/* Чужих детей не бывает */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Heart" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">«Чужих детей не бывает!»</h3>
              <p className="text-gray-400">Сотрудничаем с фондом помощи детям, потому что верим: равнодушие — не наш выбор. Каждый ребёнок важен.</p>
            </div>

            {/* Праздники двора */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="PartyPopper" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Праздники двора</h3>
              <p className="text-gray-400">Организуем бесплатные праздники для жителей разных районов Хабаровска — потому что радость должна быть доступна каждому.</p>
            </div>
          </div>

          {/* Кнопка для партнёров */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/wild-east/partners"
              target="_blank"
              className="inline-flex items-center gap-3 bg-white/5 border border-orange-500/30 hover:border-orange-500/70 hover:bg-white/10 text-white rounded-2xl px-6 py-4 transition-all group"
            >
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-orange-400" />
              </div>
              <div className="text-left">
                <div className="font-bold group-hover:text-orange-400 transition-colors">Информация для партнёров</div>
                <div className="text-gray-500 text-sm">Открыть и сохранить как PDF</div>
              </div>
              <Icon name="ExternalLink" size={16} className="text-gray-600 group-hover:text-orange-400 transition-colors ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fighter Apply */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <img
              src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
              alt="Дикий Восток"
              className="w-24 h-24 mx-auto object-contain mb-6 opacity-80"
            />
            <h2 className="text-4xl md:text-5xl font-black mb-3">Хочешь участвовать?</h2>
            <p className="text-gray-400 text-lg">Заполни заявку — мы свяжемся и обсудим условия</p>
          </div>

          {submitted ? (
            <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-10 text-center">
              <Icon name="CheckCircle" size={48} className="text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
              <p className="text-gray-400">Свяжемся с тобой в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Рост (см)</label>
                  <Input
                    placeholder="180"
                    value={form.height}
                    onChange={(e) => setForm((f) => ({ ...f, height: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Вес (кг)</label>
                  <Input
                    placeholder="77"
                    value={form.weight}
                    onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">База</label>
                  <Input
                    placeholder="ММА, бокс, борьба..."
                    value={form.base}
                    onChange={(e) => setForm((f) => ({ ...f, base: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Возраст (лет)</label>
                  <Input
                    placeholder="24"
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Опыт / регалии</label>
                <Input
                  placeholder="КМС, МС, количество боёв, победы..."
                  value={form.exp}
                  onChange={(e) => setForm((f) => ({ ...f, exp: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Зал / тренер</label>
                <Input
                  placeholder="Название зала и имя тренера"
                  value={form.gym}
                  onChange={(e) => setForm((f) => ({ ...f, gym: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Обратная связь — номер / соцсети *</label>
                <Input
                  placeholder="+7 (914) ... или @nickname"
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0 text-base font-bold py-6"
              >
                {submitting ? (
                  <><Icon name="Loader2" size={18} className="mr-2 animate-spin" />Отправка...</>
                ) : (
                  <><Icon name="Send" size={18} className="mr-2" />Отправить заявку</>
                )}
              </Button>
            </form>
          )}
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