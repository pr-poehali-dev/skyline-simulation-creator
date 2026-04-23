import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/78e331e8-8084-4f3d-908e-86fb4f4df52c";

interface Review {
  id: number;
  author_name: string;
  event_type: string;
  text: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

const Stars = ({ value }: { value: number }) => (
  <span className="text-yellow-400">{"★".repeat(value)}<span className="text-zinc-700">{"★".repeat(5 - value)}</span></span>
);

export default function AdminReviews() {
  const [key, setKey] = useState(() => sessionStorage.getItem("admin_key") || "");
  const [keyInput, setKeyInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [actionId, setActionId] = useState<number | null>(null);

  const fetchReviews = useCallback(async (adminKey: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${REVIEWS_URL}/admin`, {
        headers: { "X-Admin-Key": adminKey },
      });
      const raw = await res.json();
      const data = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (data.ok) {
        setReviews(data.reviews);
        setAuthed(true);
        sessionStorage.setItem("admin_key", adminKey);
      } else {
        setAuthError(true);
        setAuthed(false);
      }
    } catch {
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) fetchReviews(key);
  }, [key, fetchReviews]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    setKey(keyInput.trim());
  };

  const approve = async (id: number, value: boolean) => {
    setActionId(id);
    await fetch(REVIEWS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Key": key },
      body: JSON.stringify({ id, is_approved: value }),
    });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, is_approved: value } : r));
    setActionId(null);
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    setActionId(id);
    await fetch(REVIEWS_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Key": key },
      body: JSON.stringify({ id }),
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setActionId(null);
  };

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.is_approved;
    if (filter === "approved") return r.is_approved;
    return true;
  });

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => !r.is_approved).length,
    approved: reviews.filter((r) => r.is_approved).length,
  };

  // Экран входа
  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Icon name="ShieldCheck" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Панель модерации</h1>
              <p className="text-zinc-500 text-xs">Отзывы · eventkhv.ru</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Секретный ключ</label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Введите ключ доступа"
                autoFocus
                className="w-full bg-white/5 border border-zinc-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-white/40 transition-colors placeholder-zinc-600"
              />
              {authError && (
                <p className="text-red-400 text-xs mt-1.5">Неверный ключ</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!keyInput.trim()}
              className="w-full bg-white text-black font-medium py-2.5 rounded-lg text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Шапка */}
      <div className="border-b border-white/10 bg-zinc-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={20} className="text-white" />
            <span className="font-semibold">Модерация отзывов</span>
            <a href="/" className="text-zinc-500 hover:text-white text-sm transition-colors ml-2">← на сайт</a>
          </div>
          <button
            onClick={() => fetchReviews(key)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors"
          >
            <Icon name="RefreshCw" size={14} />
            Обновить
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Фильтры */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["pending", "approved", "all"] as const).map((f) => {
            const labels = { pending: "Ожидают", approved: "Одобренные", all: "Все" };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  filter === f ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {labels[f]}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-black/20" : "bg-white/10"}`}>
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Список */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Icon name="Loader2" size={32} className="animate-spin text-zinc-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-40" />
            <p>{filter === "pending" ? "Нет отзывов, ожидающих проверки" : "Нет отзывов"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((review) => (
              <div
                key={review.id}
                className={`bg-zinc-900 border rounded-2xl p-5 transition-all ${
                  review.is_approved ? "border-green-800/40" : "border-yellow-700/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-semibold text-white">{review.author_name}</span>
                      {review.event_type && (
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-zinc-400">{review.event_type}</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${review.is_approved ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-400"}`}>
                        {review.is_approved ? "Одобрен" : "На проверке"}
                      </span>
                      <Stars value={review.rating} />
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-2">"{review.text}"</p>
                    <p className="text-zinc-600 text-xs">#{review.id} · {review.created_at}</p>
                  </div>

                  {/* Кнопки */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!review.is_approved ? (
                      <button
                        onClick={() => approve(review.id, true)}
                        disabled={actionId === review.id}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {actionId === review.id ? <Icon name="Loader2" size={14} className="animate-spin" /> : <Icon name="Check" size={14} />}
                        Одобрить
                      </button>
                    ) : (
                      <button
                        onClick={() => approve(review.id, false)}
                        disabled={actionId === review.id}
                        className="flex items-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {actionId === review.id ? <Icon name="Loader2" size={14} className="animate-spin" /> : <Icon name="EyeOff" size={14} />}
                        Скрыть
                      </button>
                    )}
                    <button
                      onClick={() => remove(review.id)}
                      disabled={actionId === review.id}
                      className="flex items-center gap-1.5 bg-red-900/40 hover:bg-red-700 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-50"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
