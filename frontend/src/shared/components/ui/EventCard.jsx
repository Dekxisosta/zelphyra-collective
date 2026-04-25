export default function EventCard({ event, onNavigate }) {
  return (
    <div
      data-card
      className="relative flex-shrink-0 snap-start rounded-2xl overflow-hidden group w-full sm:w-full md:w-1/2 lg:w-1/4"
      style={{ border: "1px solid var(--color-border)" }}
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
          onClick={() => onNavigate(event.link)}
          className="absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-full bg-white text-black font-medium shadow-lg shadow-black/30 hover:scale-105 active:scale-95 hover:bg-white/90 transition-all duration-200"
        >
          View Sale →
        </button>
      </div>
    </div>
  )
}