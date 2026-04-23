import { useState } from "react";
import Icon from "@/components/ui/icon";

const BusinessCard = () => {
  const [copied, setCopied] = useState(false);

  const cardText = `🎤 Антон Маратканов — ведущий мероприятий

📍 Хабаровск / Дальний Восток
📞 +7 (914) 198-36-29
🌐 eventkhv.ru

✅ Свадьбы, корпоративы, дни рождения, выпускные
✅ Бойцовские турниры ММА / «Дикий Восток»
✅ DJ Puzyr'koff — музыка на любой вкус
✅ 10+ лет опыта, 300+ мероприятий

Пишите — разберём даты и форматы 🤝`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cardText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Визитка для коллег</h2>
        <p className="text-zinc-400 text-center mb-8">Скопируй и отправь в мессенджере при обмене заказами</p>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 relative">
          <div className="flex items-start gap-4 mb-5">
            <img
              src="https://cdn.poehali.dev/projects/fae007b7-7e60-4256-9806-87e49c645681/bucket/15925843-fd60-4a2c-a48e-0d9212831e0c.jpg"
              alt="Антон Маратканов"
              className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-white/20"
            />
            <div>
              <h3 className="text-white font-bold text-xl">Антон Маратканов</h3>
              <p className="text-zinc-400 text-sm">Ведущий мероприятий · DJ Puzyr'koff</p>
              <p className="text-zinc-500 text-sm mt-1">Хабаровск / Дальний Восток</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2 mb-5">
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <Icon name="Phone" size={15} />
              <span>+7 (914) 198-36-29</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <Icon name="Globe" size={15} />
              <span>eventkhv.ru</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mb-5">
            <div className="grid grid-cols-2 gap-2">
              {["Свадьбы", "Корпоративы", "ММА / Дикий Восток", "DJ Puzyr'koff"].map((tag) => (
                <div key={tag} className="bg-white/5 rounded-lg px-3 py-1.5 text-zinc-300 text-xs flex items-center gap-1.5">
                  <Icon name="Check" size={12} />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex items-center gap-2 text-zinc-500 text-xs mb-5">
            <Icon name="Award" size={14} />
            <span>10+ лет опыта · 300+ мероприятий · 15 000+ гостей</span>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied
                ? "bg-green-600 text-white"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            <Icon name={copied ? "CheckCircle" : "Copy"} size={16} />
            {copied ? "Скопировано!" : "Скопировать текст для отправки"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessCard;
