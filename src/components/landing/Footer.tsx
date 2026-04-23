import { Instagram, Phone, Download } from "lucide-react";
import { useRef, useState } from "react";

const Footer = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = cardRef.current!;
      el.style.display = "block";
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(el, { scale: 3, backgroundColor: "#18181b", useCORS: true });
      el.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [100, 60] });
      pdf.addImage(imgData, "PNG", 0, 0, 100, 60);
      pdf.save("maratkanow-vizitka.pdf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black py-8 border-t border-white/10">
      {/* Скрытая визитка для рендера в PDF */}
      <div
        ref={cardRef}
        style={{
          display: "none",
          width: "800px",
          height: "480px",
          background: "#18181b",
          borderRadius: "24px",
          padding: "40px 48px",
          fontFamily: "Arial, sans-serif",
          color: "#fff",
          boxSizing: "border-box",
          position: "fixed",
          left: "-9999px",
          top: "0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px", marginBottom: "28px" }}>
          <img
            src="https://cdn.poehali.dev/projects/fae007b7-7e60-4256-9806-87e49c645681/bucket/15925843-fd60-4a2c-a48e-0d9212831e0c.jpg"
            alt=""
            crossOrigin="anonymous"
            style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid rgba(255,255,255,0.2)" }}
          />
          <div>
            <div style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>Антон Маратканов</div>
            <div style={{ fontSize: "15px", color: "#a1a1aa", marginTop: "4px" }}>Ведущий мероприятий · DJ Puzyr'koff</div>
            <div style={{ fontSize: "13px", color: "#71717a", marginTop: "4px" }}>Хабаровск / Дальний Восток</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", marginBottom: "24px" }}>
          <div style={{ fontSize: "15px", color: "#d4d4d8" }}>📞 +7 (914) 198-36-29</div>
          <div style={{ fontSize: "15px", color: "#d4d4d8" }}>🌐 eventkhv.ru</div>
          <div style={{ fontSize: "15px", color: "#d4d4d8" }}>📸 @maratkanovevent</div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["✅ Свадьбы", "✅ Корпоративы", "✅ Дни рождения", "✅ Выпускные", "✅ ММА / Дикий Восток", "✅ DJ на мероприятие"].map((t) => (
              <span key={t} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", color: "#a1a1aa" }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: "18px", fontSize: "13px", color: "#52525b" }}>10+ лет опыта · 300+ мероприятий · 15 000+ гостей</div>
        </div>
      </div>

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
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-4 py-1.5 rounded-full text-sm"
            >
              <Download size={15} />
              {loading ? "Генерация..." : "Визитка"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;