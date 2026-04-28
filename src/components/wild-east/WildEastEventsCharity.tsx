import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const WildEastEventsCharity = () => {
  return (
    <>
      {/* Events Section */}
      <section id="events" className="py-24 px-4 relative overflow-hidden">
        {/* Фоновый коллаж из 4 фото */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {[
            "https://cdn.poehali.dev/files/4c75bd73-db4c-4d90-b759-3b4bb886c6ab.jpg",
            "https://cdn.poehali.dev/files/c3cd22ee-cff6-4f50-8343-7b08a356b221.jpg",
            "https://cdn.poehali.dev/files/99ce7f59-5257-41ee-bf19-4675fa9d20c0.jpg",
            "https://cdn.poehali.dev/files/19eaa30d-28c0-4b11-bea6-e1e32ffa8ff3.jpg",
          ].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover opacity-15" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="container mx-auto max-w-5xl relative z-10">
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
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
                <Icon name="Play" size={18} className="text-gray-600 group-hover:text-orange-400 transition-colors flex-shrink-0" />
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
            <a
              href="https://khabdety.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Heart" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">«Чужих детей не бывает!»</h3>
              <p className="text-gray-400">Сотрудничаем с фондом помощи детям, потому что верим: равнодушие — не наш выбор. Каждый ребёнок важен.</p>
              <div className="mt-3 inline-flex items-center gap-1 text-orange-400 text-sm font-medium">
                Перейти на сайт <Icon name="ExternalLink" size={13} />
              </div>
            </a>

            {/* Праздники двора */}
            <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon name="PartyPopper" size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Праздники двора</h3>
              <p className="text-gray-400">Организуем бесплатные праздники для жителей разных районов Хабаровска — потому что радость должна быть доступна каждому.</p>
            </div>
          </div>

          {/* Наши партнёры */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-10 bg-orange-500 rounded-full" />
              <h3 className="text-2xl md:text-3xl font-black">Наши партнёры</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Чужих детей не бывает */}
              <a
                href="https://khabdety.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                <img
                  src="https://cdn.poehali.dev/files/439fca13-87bd-4eca-8e9a-56af5a23488c.jpg"
                  alt="Чужих детей не бывает"
                  className="w-full h-32 object-contain rounded-xl"
                />
                <span className="text-xs text-gray-400 text-center group-hover:text-orange-400 transition-colors">Чужих детей не бывает</span>
              </a>
              {/* БФ Росточек */}
              <a
                href="https://vk.com/club62882008"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-orange-500/20 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all group"
              >
                <div className="w-full h-32 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Sprout" size={36} className="text-orange-400 mx-auto mb-2" />
                    <span className="text-white font-bold text-sm">БФ Росточек</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 text-center group-hover:text-orange-400 transition-colors">Фонд Росточек</span>
              </a>
              {/* Талан */}
              <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
                <img
                  src="https://cdn.poehali.dev/files/f0ec2568-4c8f-4a41-923f-995852696a94.jpeg"
                  alt="Талан"
                  className="w-full h-32 object-contain rounded-xl"
                />
                <span className="text-xs text-gray-400 text-center">Талан</span>
              </div>
              {/* Авторадио */}
              <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
                <img
                  src="https://cdn.poehali.dev/files/36480336-8616-431c-bb3e-899c65bda382.jpg"
                  alt="Авторадио"
                  className="w-full h-32 object-contain rounded-xl"
                />
                <span className="text-xs text-gray-400 text-center">Авторадио</span>
              </div>
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
    </>
  );
};

export default WildEastEventsCharity;