import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const achievements = [
  { icon: "CalendarCheck", label: "Лет с микрофоном", value: "10+" },
  { icon: "PartyPopper", label: "Мероприятий проведено", value: "300+" },
  { icon: "Users", label: "Довольных гостей", value: "15 000+" },
  { icon: "Trophy", label: "Форматов событий", value: "10+" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <div className="w-full aspect-square rounded-3xl relative z-10 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/fae007b7-7e60-4256-9806-87e49c645681/bucket/15925843-fd60-4a2c-a48e-0d9212831e0c.jpg"
                alt="Антон Маратканов — ведущий мероприятий"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">Антон Маратканов</h2>
            <p className="text-zinc-400 text-lg mb-6">Ведущий мероприятий</p>
            <p className="text-lg mb-6 text-zinc-300">
              Я — профессиональный ведущий мероприятий с опытом более 10 лет. Провожу свадьбы,
              корпоративы, дни рождения и выпускные. Каждое мероприятие — уникальная история,
              которую мы создаём вместе с вами.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Работаю в живом контакте с аудиторией: умею зажечь зал, разрядить обстановку и создать
              тёплую атмосферу. Никаких шаблонных сценариев — только индивидуальный подход и искренние
              эмоции.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`bg-zinc-900/50 rounded-lg p-4 border border-white/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">
                      <Icon name={achievement.icon} size={24} />
                    </div>
                    <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;