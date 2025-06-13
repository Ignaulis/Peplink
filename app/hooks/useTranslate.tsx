import { useState, useEffect } from "react";
// sis hook vercia teksta tarp en ir lt kalbu
export function useTranslate(text: string, from: "en" | "lt", to: "en" | "lt") {
  const [translated, setTranslated] = useState<string | null>(null);
  // neverciame jei tekstas tuscias
  useEffect(() => {
    if (!text || text.trim() === "") {
      setTranslated(null);
      return;
    }
    // jei kalbos sutampa graziname orginalu teksta
    if (from === to) {
      setTranslated(text);
      return;
    }
    // kvieciame api is Api.mymemory translator
    const translate = async () => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text,
        )}&langpair=${from}|${to}&de=random@example.com`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Vertimo klaida");

        const data = await res.json();
        setTranslated(data.responseData.translatedText);
      } catch (error) {
        console.error("Vertimo klaida:", error);
        setTranslated(text);
      }
    };

    translate();
  }, [text, from, to]);

  return translated;
}
