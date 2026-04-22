import { useRef, useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

const photos: { src: string; alt: string }[] = [
  { src: "https://cdn.poehali.dev/files/652e6b99-4490-44f9-952c-fb7464a804e7.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/e921b973-5969-4f94-a527-c1068dc57993.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/92e61055-9078-409f-9d82-b670e295a34f.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/655a22f3-aed3-4bd3-a70b-7183586a84fa.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/198004c2-8366-4691-8dba-994db1a6542c.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/08dd8483-dd13-444f-83db-63f1e469ce32.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/bdf52998-098d-4ea2-858e-06990ec0bcbc.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/eb70eb0a-4f2e-43ce-9c82-00b5c32c6197.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/ca3efbcb-b4a9-44e3-b0ad-08d5ce418878.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/196ed2f4-c47a-4ee6-b5c8-c36a979f5f7b.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/41574164-77bd-41d0-89ab-b18f5a9b9c4e.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/854d5be4-4451-4f5f-86e6-2fafff95646c.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/629c5fe5-63cd-46ad-a94f-fec5b6a4b575.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/d0985fda-6f5c-4117-aa80-1e04b32951f6.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/c2013472-d561-45eb-ba55-c5f3d4b4ea20.jpg", alt: "Мероприятие" },
  { src: "https://cdn.poehali.dev/files/82313164-24c5-400c-b951-8680a083fde1.jpg", alt: "Мероприятие" },
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