import { useEffect, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setProfile(null);
          return;
        }

        const parsed = JSON.parse(storedUser);

        await new Promise((res) => setTimeout(res, 200));

        setProfile(parsed);
      } catch (err) {
        console.error(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}