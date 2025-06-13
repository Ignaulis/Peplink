import { useState, useEffect, useRef } from "react";
import { fetchJoke } from "../api/jokesAPI";

export function useJoke() {
  const [joke, setJoke] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // kas kiek laiko naujas joke gaunamas
  const refreshInterval = 15000;

  useEffect(() => {
    // gaunam joke ir state atnaujinimas
    const getJoke = async () => {
      try {
        const data = await fetchJoke();
        setJoke(data.value);
        setLastFetched(new Date());
      } catch (error) {
        console.error("Nepavyko gauti joke:", error);
      }
    };

    // pradedam intervala
    const startInterval = () => {
      getJoke();
      intervalRef.current = setInterval(getJoke, refreshInterval);
    };
    // stabdom intervala
    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // reakcija i puslapio matomuma jei matomas intervalas paleidziamas jei nematomas tada intervalas stabdomas
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startInterval();
      } else {
        stopInterval();
      }
    };
    // tab matomumas
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.visibilityState === "visible") {
      startInterval();
    }

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { joke, lastFetched, refreshInterval };
}
