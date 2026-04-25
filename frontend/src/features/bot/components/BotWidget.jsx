import { useState } from "react";
import Mascot from "../../../assets/images/mascot.png";

export default function BotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <img
            src={Mascot}
            alt="bot"
            className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110 animate-[floatBot_3s_ease-in-out_infinite]"
          />
        </div>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50">
          <p style={{ color: "var(--color-text)" }}>
            Hello 👋
          </p>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.85rem",
            }}
          >
            Need help finding something?
          </p>
        </div>
      )}
    </>
  );
}