import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import events from "../../test/events.json";
import EventCard from "../components/ui/EventCard";

export default function EventsCarousel() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const getCardWidth = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const firstCard = el.querySelector("[data-card]");
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 16;
  };

  const scroll = (dir = "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -getCardWidth() : getCardWidth(), behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    if (isEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: getCardWidth(), behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const start = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(scrollNext, 3500);
    };
    const stop = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
        <h2 className="text-base font-semibold tracking-tight" style={{ color: "var(--color-text)" }}>
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
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} onNavigate={navigate} />
        ))}
      </div>
    </section>
  );
}