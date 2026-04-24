import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import events from "../../test/events.json";

export default function EventsCarousel() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const getCardWidth = () => {
    const el = scrollRef.current;
    if (!el) return 0;

    const firstCard = el.querySelector("[data-card]");
    if (!firstCard) return 0;

    const gap = 16;
    return firstCard.offsetWidth + gap;
  };

  const scroll = (dir = "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = getCardWidth();

    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = getCardWidth();

    const isEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

    if (isEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const start = () => {
      if (intervalRef.current) return;

      intervalRef.current = setInterval(() => {
        scrollNext();
      }, 3500);
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    start();

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", stop);
    el.addEventListener("touchend", start);

    return () => {
      stop();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchend", start);
    };
  }, []);

  return (
    <section className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold tracking-tight text-[var(--color-text)]">
          Events & Drops
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="px-2 py-1 rounded-md border text-sm hover:bg-white/5 transition"
            style={{ borderColor: "var(--color-border)" }}
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-2 py-1 rounded-md border text-sm hover:bg-white/5 transition"
            style={{ borderColor: "var(--color-border)" }}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto pb-2
          snap-x snap-mandatory scroll-smooth custom-scrollbar
        "
      >
        {events.map((event) => (
          <div
            key={event.id}
            data-card
            className="
              relative flex-shrink-0 snap-start rounded-2xl overflow-hidden group
              w-full sm:w-full md:w-1/2 lg:w-1/4
            "
            style={{
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="relative h-60">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {event.tag && (
                  <span className="text-[14px] text-center italic px-2 py-1 rounded-full bg-red-500 text-white">
                    {event.tag}
                  </span>
                )}
                <span className="text-[12px] px-2 py-1 rounded-full bg-white text-black">
                  {event.date}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-20">
                <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                  {event.title}
                </p>
              </div>

              <button
                onClick={() => navigate(event.link)}
                className="
                  absolute bottom-3 right-3
                  text-xs px-3 py-1.5 rounded-full
                  bg-white text-black font-medium
                  shadow-lg shadow-black/30
                  hover:scale-105 active:scale-95
                  hover:bg-white/90
                  transition-all duration-200
                "
              >
                {"View Sale ->"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}