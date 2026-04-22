import { useRef, useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

const photos: { src: string; alt: string }[] = [
  // Добавьте сюда ссылки на ваши фото
];

const GallerySection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="gallery" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">Мои мероприятия</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Живые моменты, которые останутся в памяти навсегда
          </p>
        </div>

        {photos.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-24 border border-dashed border-white/20 rounded-3xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <ImageIcon className="w-16 h-16 text-zinc-600 mb-4" />
            <p className="text-zinc-500 text-lg">Фотографии скоро появятся здесь</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`break-inside-avoid rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:brightness-110 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
                onClick={() => setSelected(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="Фото мероприятия"
            className="max-w-full max-h-full rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
