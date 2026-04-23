import { useEffect } from "react";

const WildEastPartners = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');

        .partners-page {
          font-family: 'Montserrat', sans-serif;
          background: #fff;
          color: #1a1a1a;
          min-height: 100vh;
        }

        @media print {
          .no-print { display: none !important; }
          .partners-page { background: #fff !important; }
          body { background: #fff !important; }
          @page { margin: 15mm; size: A4; }
        }
      `}</style>

      <div className="partners-page">

        {/* Кнопка печати — только на экране */}
        <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            ← Назад
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Сохранить PDF
          </button>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 40px" }}>

          {/* Шапка */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40, borderBottom: "3px solid #c2410c", paddingBottom: 32 }}>
            <img
              src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
              alt="Дикий Восток"
              style={{ width: 120, height: 120, objectFit: "contain", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: 12, color: "#c2410c", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                Хабаровск · Дальний Восток
              </div>
              <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>ДИКИЙ ВОСТОК</h1>
              <p style={{ fontSize: 15, color: "#555", marginTop: 8, margin: "8px 0 0" }}>
                Бойцовская лига, дающая дорогу в большой спорт
              </p>
            </div>
          </div>

          {/* О проекте */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#c2410c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              О проекте
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333" }}>
              «Дикий Восток» — хабаровский проект, объединяющий спорт, общество и добрые дела.
              Мы организуем бойцовские турниры, снимаем подкасты, освещаем городские события
              и занимаемся благотворительностью. Наша миссия — дать дорогу в большой спорт
              талантливым бойцам Дальнего Востока и сделать Хабаровск лучше.
            </p>
          </section>

          {/* Бойцовские турниры */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#c2410c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              Бойцовские турниры
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333", marginBottom: 12 }}>
              Мы организуем профессиональные и любительские турниры по единоборствам —
              от подготовки участников до полноценного шоу с видеосъёмкой.
              Работаем со спортсменами, клубами и командами по всему Дальнему Востоку.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { title: "Конференции перед боями", desc: "Официальные пресс-конференции участников турниров" },
                { title: "Видео первых боёв", desc: "Архив видеозаписей первых турниров лиги" },
                { title: "Все бои", desc: "Полный архив видео с бойцовских соревнований" },
              ].map((item) => (
                <div key={item.title} style={{ background: "#fff8f5", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: "#555" }}>
              Видеоархив: <span style={{ color: "#c2410c" }}>vk.com/wild_east_khv</span>
              &nbsp;·&nbsp;
              Фотоотчёты: <span style={{ color: "#c2410c" }}>vk.com/albums-230198930</span>
            </div>
          </section>

          {/* Городские мероприятия */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#c2410c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              Городские мероприятия
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333", marginBottom: 12 }}>
              Мы освещаем и организуем общественно значимые события города — форумы,
              конференции, городские праздники. Записываем подкасты о жизни Хабаровска,
              спорте и людях, которые делают Дальний Восток лучше.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { title: "Подкасты", desc: "Разговоры о городе, спорте и людях Дальнего Востока" },
                { title: "Видеоотчёты", desc: "Документируем важные городские события" },
                { title: "Городские события", desc: "Организация и освещение общественных мероприятий" },
                { title: "Сообщество ВК", desc: "Онлайн-площадка для всех, кому важен Дальний Восток" },
              ].map((item) => (
                <div key={item.title} style={{ background: "#fff8f5", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Благотворительность */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#c2410c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              Благотворительность
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333", marginBottom: 12 }}>
              Сила — это не только победы на ринге. Наша лига помнит о людях, которые
              оказались в сложной ситуации, и делает конкретные дела.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { title: "Центр «Независимость»", desc: "Поддерживаем людей в борьбе с зависимостями — потому что каждый заслуживает второго шанса" },
                { title: "Фонд «Росточек»", desc: "Помощь детям-сиротам, детям с ОВЗ и семьям в трудной ситуации. Продвижение семейных ценностей и толерантности" },
                { title: "«Чужих детей не бывает!»", desc: "Сотрудничество с фондом помощи детям — потому что равнодушие не наш выбор" },
                { title: "Праздники двора", desc: "Бесплатные праздники для жителей разных районов Хабаровска" },
              ].map((item) => (
                <div key={item.title} style={{ background: "#fff8f5", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Контакты */}
          <section style={{ background: "#1a1a1a", borderRadius: 14, padding: "28px 32px", color: "#fff" }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fb923c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
              Контакты
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
              <div>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>Телефон</div>
                <div style={{ fontWeight: 700 }}>+7 (914) 198-36-29</div>
              </div>
              <div>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>Сайт</div>
                <div style={{ fontWeight: 700 }}>eventkhv.ru/wild-east</div>
              </div>
              <div>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>ВКонтакте</div>
                <div style={{ fontWeight: 700 }}>vk.com/wild_east_khv</div>
              </div>
              <div>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>Город</div>
                <div style={{ fontWeight: 700 }}>Хабаровск, Дальний Восток</div>
              </div>
            </div>
          </section>

          {/* Футер */}
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "#aaa" }}>
            Документ подготовлен проектом «Дикий Восток» · {new Date().getFullYear()}
          </div>

        </div>
      </div>
    </>
  );
};

export default WildEastPartners;
