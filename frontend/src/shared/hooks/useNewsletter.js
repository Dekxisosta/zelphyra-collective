import { useState } from "react";

export function useNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const subscribe = async () => {
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      setMessage("You're subscribed!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return { email, setEmail, status, message, subscribe };
}