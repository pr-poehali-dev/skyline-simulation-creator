import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Props {
  scrollToSection: (id: string) => void;
}

const WildEastHeroFights = ({ scrollToSection }: Props) => {
  return (
    <>
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
          <Icon name="ChevronDown" size={32} className="text-orange-400/60" />
        </div>
      </section>

      {/* Fights Section */}
      <section id="fights" className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(https://cdn.poehali.dev/files/c0d9c9bc-d544-4827-8202-ba8abfd47ca7.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <div className="container mx-auto max-w-5xl relative z-10">
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

          {/* Фотогалерея с боёв */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              "https://cdn.poehali.dev/files/c0d9c9bc-d544-4827-8202-ba8abfd47ca7.jpg",
              "https://cdn.poehali.dev/files/be418a6b-0a39-4cee-8ebc-11c59b627a8f.jpg",
              "https://cdn.poehali.dev/files/7ac2796c-08bf-4162-8aa0-bb8982adb618.jpg",
              "https://cdn.poehali.dev/files/f3a3b2d3-d2a6-494b-a4a4-9da5827b81d3.jpg",
            ].map((src, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={src}
                  alt="Бой"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
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
    </>
  );
};

export default WildEastHeroFights;