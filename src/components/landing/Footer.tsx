import { Instagram, Phone, Download } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");

      // Стандартный размер визитки 90x50 мм, альбомная
      const W = 90;
      const H = 50;
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [H, W] });

      // Фон тёмный
      pdf.setFillColor(24, 24, 27);
      pdf.rect(0, 0, W, H, "F");

      // Акцентная полоса слева
      pdf.setFillColor(234, 88, 12); // orange-600
      pdf.rect(0, 0, 2.5, H, "F");

      // Имя
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Антон Маратканов", 7, 11);

      // Должность
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(161, 161, 170);
      pdf.text("Ведущий мероприятий · DJ Puzyr'koff", 7, 17);

      // Разделитель
      pdf.setDrawColor(63, 63, 70);
      pdf.setLineWidth(0.3);
      pdf.line(7, 21, W - 7, 21);

      // Контакты
      pdf.setFontSize(8);
      pdf.setTextColor(212, 212, 216);

      const contacts = [
        { icon: "T:", value: "+7 (914) 198-36-29" },
        { icon: "W:", value: "eventkhv.ru" },
        { icon: "I:", value: "@maratkanovevent" },
      ];

      contacts.forEach((c, i) => {
        const y = 27 + i * 5.5;
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(234, 88, 12);
        pdf.text(c.icon, 7, y);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(212, 212, 216);
        pdf.text(c.value, 12, y);
      });

      // Специализация (снизу)
      pdf.setFontSize(6.5);
      pdf.setTextColor(113, 113, 122);
      pdf.text("Свадьбы · Корпоративы · Дни рождения · Выпускные · Турниры ММА", 7, H - 5);

      // Город и опыт (справа внизу)
      pdf.setFontSize(6.5);
      pdf.setTextColor(113, 113, 122);
      pdf.text("Хабаровск / Дальний Восток", W - 7, 27, { align: "right" });
      pdf.text("10+ лет · 300+ мероприятий", W - 7, 32, { align: "right" });

      pdf.save("maratkanow-vizitka.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400">
            &copy; {new Date().getFullYear()} Антон Маратканов — ведущий мероприятий
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="tel:+79141983629" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <Phone size={18} />
              <span>+7 (914) 198-36-29</span>
            </a>
            <a href="https://instagram.com/maratkanovevent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span>maratkanovevent</span>
            </a>
            <button
              onClick={downloadPdf}
              disabled={loading}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-4 py-1.5 rounded-full text-sm disabled:opacity-50"
            >
              <Download size={15} />
              {loading ? "Генерация..." : "Визитка PDF"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
