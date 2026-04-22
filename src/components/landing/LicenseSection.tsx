import { useState, useRef, useEffect } from "react";
import { Check, Crown, Zap, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceOption {
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const serviceOptions: ServiceOption[] = [
  {
    name: "День рождения",
    price: "от 30 000 ₽",
    icon: <Star className="w-6 h-6" />,
    features: [
      "Сценарий под ваш запрос",
      "Конкурсы и игры для гостей",
      "Тосты и поздравления",
      "Музыкальное сопровождение",
      "Работа диджея включена",
    ],
    badge: "ОСТАВЬ ЗАЯВКУ — ПОЛУЧИ СКИДКУ 10%!",
  },
  {
    name: "Корпоратив",
    price: "от 50 000 ₽",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Ведение от 3 часов",
      "Командные игры и активности",
      "Награждение сотрудников",
      "Тематические конкурсы",
      "Профессиональное оборудование",
      "Работа диджея включена",
    ],
    popular: true,
  },
  {
    name: "Свадьба",
    price: "от 60 000 ₽",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Ведение от 4 часов",
      "Индивидуальный сценарий",
      "Свадебные конкурсы",
      "Координация тостов",
      "Помощь в организации",
      "При заказе 6 часов — регистрация в подарок",
      "Оборудование и диджей включены",
    ],
  },
  {
    name: "Выпускной",
    price: "от 50 000 ₽",
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      "Ведение от 3 часов",
      "Авторский сценарий",
      "Живые артисты по запросу",
      "Организация шоу-программы",
      "Проф. оборудование и диджей включены",
    ],
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="licenses" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Пакеты услуг</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Выберите формат мероприятия — я подберу программу и сделаю ваш праздник незабываемым
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярный
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{option.name}</h3>
                    <div className="text-3xl font-bold text-white">{option.price}</div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-white mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.badge && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white bg-white/5 py-2 px-3 rounded-lg border border-white/10 animate-pulse">
                        {option.badge}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                    onClick={scrollToContact}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;