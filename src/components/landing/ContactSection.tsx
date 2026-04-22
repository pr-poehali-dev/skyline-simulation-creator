import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle, Phone, Instagram } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Форма отправлена:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-zinc-900 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ backgroundPosition: "0 0, 0 0" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-5xl font-bold mb-4 text-center text-zinc-200">Обсудим ваш праздник?</h2>
        <p className="text-center text-zinc-400 mb-6 text-lg">
          Оставьте заявку — я свяжусь с вами в течение часа
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href="tel:+79141983629"
            className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-full transition-colors"
          >
            <Phone size={18} />
            <span>+7 (914) 198-36-29</span>
          </a>
          <a
            href="https://instagram.com/maratkanovevent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-full transition-colors"
          >
            <Instagram size={18} />
            <span>@maratkanovevent</span>
          </a>
        </div>
        <div
          className={`max-w-md mx-auto bg-black/50 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-white/10 transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/5 border-zinc-700 text-zinc-200 placeholder-zinc-500"
              />
            </div>
            <div className="mb-4">
              <Input
                type="tel"
                name="email"
                placeholder="Ваш телефон или email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/5 border-zinc-700 text-zinc-200 placeholder-zinc-500"
              />
            </div>
            <div className="mb-4">
              <Textarea
                name="message"
                placeholder="Расскажите о вашем мероприятии: тип события, дата, количество гостей"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-white/5 border-zinc-700 text-zinc-200 placeholder-zinc-500 min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-200 transition-colors relative overflow-hidden group"
              disabled={isSubmitting || isSubmitted}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Отправка...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2" size={18} />
                    Заявка отправлена!
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Оставить заявку
                  </>
                )}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;