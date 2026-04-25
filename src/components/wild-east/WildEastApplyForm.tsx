import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const FIGHTER_URL = "https://functions.poehali.dev/8239bcc3-4c1a-491a-beff-b3feae235dcd";

interface FormState {
  name: string;
  height: string;
  weight: string;
  base: string;
  exp: string;
  gym: string;
  age: string;
  contact: string;
}

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  setSubmitting: (v: boolean) => void;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
}

const WildEastApplyForm = ({
  form,
  setForm,
  submitting,
  setSubmitting,
  submitted,
  setSubmitted,
  error,
  setError,
}: Props) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact.trim()) { setError("Укажите контакт для связи"); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch(FIGHTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) setSubmitted(true);
      else setError("Ошибка отправки, попробуйте ещё раз");
    } catch {
      setError("Ошибка соединения");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Fighter Apply */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-black to-orange-950/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
            alt=""
            className="w-[600px] h-[600px] object-contain opacity-[0.04]"
          />
        </div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <div className="text-center mb-10">
            <img
              src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
              alt="Дикий Восток"
              className="w-32 h-32 mx-auto object-contain mb-6 drop-shadow-[0_0_30px_rgba(234,88,12,0.4)]"
            />
            <h2 className="text-4xl md:text-5xl font-black mb-3">Хочешь участвовать?</h2>
            <p className="text-gray-400 text-lg">Заполни заявку — мы свяжемся и обсудим условия</p>
          </div>

          {submitted ? (
            <div className="bg-orange-950/30 border border-orange-500/30 rounded-2xl p-10 text-center">
              <Icon name="CheckCircle" size={48} className="text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
              <p className="text-gray-400">Свяжемся с тобой в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-orange-500/20 rounded-2xl p-6 md:p-8 space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Имя и фамилия *</label>
                <Input
                  placeholder="Иван Петров"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Рост (см)</label>
                  <Input
                    placeholder="180"
                    value={form.height}
                    onChange={(e) => setForm((f) => ({ ...f, height: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Вес (кг)</label>
                  <Input
                    placeholder="77"
                    value={form.weight}
                    onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">База</label>
                  <Input
                    placeholder="ММА, бокс, борьба..."
                    value={form.base}
                    onChange={(e) => setForm((f) => ({ ...f, base: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Возраст (лет)</label>
                  <Input
                    placeholder="24"
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Опыт / регалии</label>
                <Input
                  placeholder="КМС, МС, количество боёв, победы..."
                  value={form.exp}
                  onChange={(e) => setForm((f) => ({ ...f, exp: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Зал / тренер</label>
                <Input
                  placeholder="Название зала и имя тренера"
                  value={form.gym}
                  onChange={(e) => setForm((f) => ({ ...f, gym: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Обратная связь — номер / соцсети *</label>
                <Input
                  placeholder="+7 (914) ... или @nickname"
                  value={form.contact}
                  onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-orange-500/50"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0 text-base font-bold py-6"
              >
                {submitting ? (
                  <><Icon name="Loader2" size={18} className="mr-2 animate-spin" />Отправка...</>
                ) : (
                  <><Icon name="Send" size={18} className="mr-2" />Отправить заявку</>
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/files/652bcd60-84e4-4270-a4ad-eb53f2fef27d.png"
              alt="Дикий Восток"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-orange-400">Дикий Восток</span>
          </div>
          <p className="text-gray-600 text-sm">Хабаровск · Дальний Восток</p>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            ← Антон Маратканов
          </Link>
        </div>
      </footer>
    </>
  );
};

export default WildEastApplyForm;