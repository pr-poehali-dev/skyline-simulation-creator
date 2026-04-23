import { Instagram, Phone, Download } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const PHOTO_URL = "https://cdn.poehali.dev/projects/fae007b7-7e60-4256-9806-87e49c645681/bucket/15925843-fd60-4a2c-a48e-0d9212831e0c.jpg";

const Footer = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");

  // Предзагружаем QR и фото как base64 чтобы html2canvas мог их захватить
  useEffect(() => {
    // Генерируем QR
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL("https://eventkhv.ru", { width: 200, margin: 1, color: { dark: "#ffffff", light: "#18181b" } })
        .then(setQrDataUrl);
    });

    // Конвертируем фото в base64 через canvas
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d")!.drawImage(img, 0, 0);
      setPhotoDataUrl(c.toDataURL("image/jpeg"));
    };
    img.src = PHOTO_URL;
  }, []);

  const downloadPdf = async () => {
    if (!qrDataUrl || !photoDataUrl) return;
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = cardRef.current!;
      el.style.display = "flex";
      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(el, { scale: 3, backgroundColor: "#18181b", useCORS: true, logging: false });
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
          borderRadius: "0px",
          padding: "36px 40px",
          fontFamily: "Arial, sans-serif",
          color: "#fff",
          boxSizing: "border-box",
          position: "fixed",
          left: "-9999px",
          top: "0",
          alignItems: "stretch",
          gap: "32px",
        }}
      >
        {/* Левая колонка — контент */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Шапка с фото */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            {photoDataUrl && (
              <img
                src={photoDataUrl}
                alt=""
                style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid rgba(255,255,255,0.2)", flexShrink: 0 }}
              />
            )}
            <div>
              <div style={{ fontSize: "26px", fontWeight: "bold", letterSpacing: "-0.5px" }}>Антон Маратканов</div>
              <div style={{ fontSize: "14px", color: "#a1a1aa", marginTop: "3px" }}>Ведущий мероприятий · DJ Puzyr'koff</div>
              <div style={{ fontSize: "12px", color: "#71717a", marginTop: "3px" }}>Хабаровск / Дальний Восток · 10+ лет · 300+ мероприятий</div>
            </div>
          </div>

          {/* Контакты */}
          <div style={{ display: "flex", gap: "28px", marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", color: "#d4d4d8" }}>📞 +7 (914) 198-36-29</div>
            <div style={{ fontSize: "14px", color: "#d4d4d8" }}>🌐 eventkhv.ru</div>
            <div style={{ fontSize: "14px", color: "#d4d4d8" }}>📸 @maratkanovevent</div>
          </div>

          {/* Теги */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["✅ Свадьбы", "✅ Корпоративы", "✅ Дни рождения", "✅ Выпускные", "✅ ММА / Дикий Восток", "✅ DJ на мероприятие"].map((t) => (
                <span key={t} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", color: "#a1a1aa" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка — QR */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", flexShrink: 0 }}>
          {qrDataUrl && (
            <img src={qrDataUrl} alt="QR" style={{ width: "130px", height: "130px" }} />
          )}
          <div style={{ fontSize: "11px", color: "#71717a", textAlign: "center" }}>Сканируй — перейди на сайт</div>
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