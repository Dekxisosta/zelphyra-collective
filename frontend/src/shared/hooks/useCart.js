import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = localStorage.getItem("cart");

        if (!storedCart) {
          setCart([]);
          return;
        }

        const parsed = JSON.parse(storedCart);

        await new Promise((res) => setTimeout(res, 200));

        setCart(parsed);
      } catch (err) {
        console.error(err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return { cart, loading, updateCart };
}