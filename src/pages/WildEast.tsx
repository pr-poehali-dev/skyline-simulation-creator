import { useEffect, useState } from "react";
import WildEastHeader from "@/components/wild-east/WildEastHeader";
import WildEastHeroFights from "@/components/wild-east/WildEastHeroFights";
import WildEastEventsCharity from "@/components/wild-east/WildEastEventsCharity";
import WildEastApplyForm from "@/components/wild-east/WildEastApplyForm";

const WildEast = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [form, setForm] = useState({ name: "", height: "", weight: "", base: "", exp: "", gym: "", age: "", contact: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const prevKw = document.querySelector('meta[name="keywords"]')?.getAttribute("content");

    document.title = "Дикий Восток — турниры ММА, бокс и кик-боксинг в Хабаровске | Антон Маратканов";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Бойцовская лига «Дикий Восток» — профессиональные и любительские турниры по ММА, боксу и кик-боксингу в Хабаровске. Организатор Антон Маратканов. Благотворительность, городские мероприятия, поддержка спортсменов Дальнего Востока.");
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", "Дикий Восток Хабаровск, ММА Хабаровск, бокс Хабаровск, кик-боксинг Хабаровск, бойцовская лига Дальний Восток, турнир единоборств Хабаровск, смешанные единоборства Хабаровск, MMA Khabarovsk, спортивные бои Хабаровск, благотворительность Хабаровск, Маратканов организатор, спорт Дальний Восток");

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute("content", "Дикий Восток — турниры ММА, бокс и кик-боксинг в Хабаровске");
    if (ogDesc) ogDesc.setAttribute("content", "Бойцовская лига «Дикий Восток» — профессиональные и любительские турниры по ММА, боксу и кик-боксингу в Хабаровске. Благотворительность, городские мероприятия.");
    if (ogUrl) ogUrl.setAttribute("content", "https://eventkhv.ru/wild-east");

    return () => {
      document.title = prevTitle;
      if (prevDesc) document.querySelector('meta[name="description"]')?.setAttribute("content", prevDesc);
      if (prevKw) document.querySelector('meta[name="keywords"]')?.setAttribute("content", prevKw);
      if (ogTitle) ogTitle.setAttribute("content", "Антон Маратканов — ведущий, организатор ММА и бокс турниров, DJ Хабаровск");
      if (ogDesc) ogDesc.setAttribute("content", "Профессиональный ведущий мероприятий, организатор бойцовских турниров ММА и бокса, благотворительных акций. DJ Puzyr'koff — музыка для событий.");
      if (ogUrl) ogUrl.setAttribute("content", "https://eventkhv.ru");
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <WildEastHeader
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      <WildEastHeroFights scrollToSection={scrollToSection} />
      <WildEastEventsCharity />
      <WildEastApplyForm
        form={form}
        setForm={setForm}
        submitting={submitting}
        setSubmitting={setSubmitting}
        submitted={submitted}
        setSubmitted={setSubmitted}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default WildEast;
