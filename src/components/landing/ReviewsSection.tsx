import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const REVIEWS_URL = "https://functions.poehali.dev/78e331e8-8084-4f3d-908e-86fb4f4df52c";
const PAGE_SIZE = 3;
const INTERVAL_MS = 10000;

interface Review {
  id: number;
  author_name: string;
  event_type: string;
  text: string;
  rating: number;
  created_at: string;
}

const StarRating = ({ value, onChange }: { value: number; onChange?: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange?.(star)}
        className={`text-xl transition-transform ${onChange ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
      >
        <span className={star <= value ? "text-yellow-400" : "text-zinc-600"}>★</span>
      </button>
    ))}
  </div>
);

const EVENT_TYPES = ["Свадьба", "Корпоратив", "День рождения", "Выпускной", "Турнир / спорт", "Другое"];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [form, setForm] = useState({
    author_name: "",
    event_type: "",
    text: "",
    rating: 5,
  });

  useEffect(() => {
    fetch(REVIEWS_URL)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setReviews(parsed.reviews || []);
      })
      .catch(() => setReviews([]));
  }, []);

  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);

  const startAutoPlay = (pagesCount: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pagesCount <= 1) return;
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPage((prev) => (prev + 1) % pagesCount);
        setVisible(true);
      }, 400);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    if (totalPages <= 1) return;
    startAutoPlay(totalPages);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [totalPages]);

  const goTo = (idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setPage(idx);
      setVisible(true);
    }, 400);
    startAutoPlay(totalPages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      if (parsed.ok) {
        setSubmitted(true);
        setShowForm(false);
        setForm({ author_name: "", event_type: "", text: "", rating: 5 });
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const pageReviews = reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section id="reviews" className="py-20 bg-black relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Отзывы</h2>
          <p className="text-zinc-400 text-lg">Что говорят гости и организаторы</p>
        </div>

        {/* Форма */}
        {submitted ? (
          <div className="mb-10 bg-green-900/30 border border-green-600/30 rounded-xl p-5 text-center max-w-xl mx-auto">
            <Icon name="CheckCircle" size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-green-300 font-medium">Спасибо за отзыв!</p>
            <p className="text-green-500 text-sm">Он появится после проверки</p>
          </div>
        ) : !showForm ? (
          <div className="text-center mb-10">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-xl font-medium"
            >
              <Icon name="PenLine" size={16} />
              Оставить отзыв
            </Button>
          </div>
        ) : (
          <div className="mb-10 bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">Ваш отзыв</h3>
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Ваше имя *</label>
                <Input
                  value={form.author_name}
                  onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
                  placeholder="Имя или никнейм"
                  required
                  className="bg-white/5 border-zinc-700 text-zinc-200 placeholder-zinc-500"
                />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Тип мероприятия</label>
                <select
                  value={form.event_type}
                  onChange={(e) => setForm((f) => ({ ...f, event_type: e.target.value }))}
                  className="w-full bg-white/5 border border-zinc-700 text-zinc-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="" className="bg-zinc-900">Выберите тип</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-zinc-900">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Оценка</label>
                <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Отзыв *</label>
                <Textarea
                  value={form.text}
                  onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                  placeholder="Расскажите о своём впечатлении..."
                  required
                  className="bg-white/5 border-zinc-700 text-zinc-200 placeholder-zinc-500 min-h-[100px]"
                />
              </div>
              <p className="text-zinc-600 text-xs">Отзыв появится после проверки модератором</p>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-black hover:bg-zinc-200"
              >
                {submitting ? (
                  <><Icon name="Loader2" size={16} className="animate-spin" />Отправка...</>
                ) : "Отправить отзыв"}
              </Button>
            </form>
          </div>
        )}

        {/* Сетка отзывов */}
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Пока отзывов нет — будь первым!</p>
          </div>
        ) : (
          <div>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-400"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {pageReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
                >
                  <StarRating value={r.rating} />
                  <p className="text-zinc-200 text-sm leading-relaxed flex-1">"{r.text}"</p>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-white font-semibold text-sm">{r.author_name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      {r.event_type && <p className="text-zinc-500 text-xs">{r.event_type}</p>}
                      <span className="text-zinc-600 text-xs ml-auto">{r.created_at}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Точки навигации */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-7">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === page ? "w-6 h-2 bg-white" : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
