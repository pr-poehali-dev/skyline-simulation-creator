import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const bgPhotos = [
  "https://cdn.poehali.dev/files/82313164-24c5-400c-b951-8680a083fde1.jpg",
  "https://cdn.poehali.dev/files/c2013472-d561-45eb-ba55-c5f3d4b4ea20.jpg",
  "https://cdn.poehali.dev/files/196ed2f4-c47a-4ee6-b5c8-c36a979f5f7b.jpg",
  "https://cdn.poehali.dev/files/69ae92a3-5016-458d-a803-1b7b532328f1.jpg",
  "https://cdn.poehali.dev/files/ca3efbcb-b4a9-44e3-b0ad-08d5ce418878.jpg",
  "https://cdn.poehali.dev/files/652e6b99-4490-44f9-952c-fb7464a804e7.jpg",
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [nextPhoto, setNextPhoto] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrolled / (windowHeight * 0.5));
      setScrollOpacity(opacity);
      setScrollY(scrolled * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentPhoto + 1) % bgPhotos.length;
      setNextPhoto(next);
      setTransitioning(true);
      setTimeout(() => {
        setCurrentPhoto(next);
        setTransitioning(false);
      }, 1000);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPhoto]);

  const stats = [
    { icon: "PartyPopper", label: "Мероприятий проведено", value: "300+" },
    { icon: "Users", label: "Довольных гостей", value: "15 000+" },
    { icon: "CalendarCheck", label: "Лет с микрофоном", value: "10+" },
    { icon: "Trophy", label: "Форматов событий", value: "10+" },
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Фоновые фото */}
      <div className="absolute inset-0">
        <img
          src={bgPhotos[currentPhoto]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src={bgPhotos[nextPhoto]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: transitioning ? 1 : 0 }}
        />
        {/* Затемнение для читаемости */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      <div
        style={{ transform: `translateY(${scrollY}px)`, opacity: scrollOpacity }}
        className="relative pt-40 pb-16 px-4 transition-opacity duration-100 flex items-center min-h-screen"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight relative">
              <span className="text-white drop-shadow-lg">
                Ваше событие — моя работа
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-200 max-w-3xl mx-auto drop-shadow">
              Более 10 лет с микрофоном: свадьбы, корпоративы, дни рождения и выпускные.
              Создаю атмосферу, которую помнят долгие годы.
            </p>
            <div className="relative inline-block">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={scrollToContact}
              >
                <span className="relative z-10">Обсудить мероприятие</span>
                <span
                  className={`ml-2 relative z-10 transition-transform duration-200 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                >
                  &rarr;
                </span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-black/50 rounded-xl p-6 backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
                  <div className="mb-2 text-white/70 flex justify-center">
                    <Icon name={stat.icon} size={24} />
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {bgPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPhoto(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentPhoto ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
