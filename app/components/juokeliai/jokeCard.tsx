import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "../ui/loader";
import SandClock from "../ui/sandClock";
import { useTranslate } from "@/app/hooks/useTranslate";
import { useJoke } from "@/app/hooks/useJoke";

export default function JokeCard() {
  // gauname joke paskutini jo atnaujinimo laika ir intervala
  const { joke, lastFetched, refreshInterval = 15000 } = useJoke();
  // isverciame joke is en i lt
  const translatedJoke = useTranslate(joke ?? "", "en", "lt");
  // likes laikas iki joke atnaujinimo
  const [secondsLeft, setSecondsLeft] = useState(refreshInterval / 1000);

  useEffect(() => {
    setSecondsLeft(refreshInterval / 1000); // resetinam laika kai joke pasikeicia
  }, [joke, refreshInterval]);
  // intervalas kuris mazina kas sekunde laika
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex max-w-xl flex-col gap-6 rounded-xl bg-blue-300 p-6 shadow-xl backdrop-blur-2xl">
      <AnimatePresence mode="wait">
        {/* isverstas is anglu kalbos joke */}
        {translatedJoke ? (
          <motion.p
            key={translatedJoke} // svarbu key, kad React atpažintų pokyčius
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-blue-400 pb-2 text-lg md:pb-8"
          >
            {translatedJoke}
          </motion.p>
        ) : (
          // kol kraunasi joke rodoma littie animacija
          <div className="flex w-full justify-center">
            <Loader />
          </div>
        )}
      </AnimatePresence>
      <div className="flex flex-col">
        {/* paskutini karta kada atnaujintas gaunama info */}
        <p className="mb-2 text-sm text-gray-600">
          Paskutinį kartą atnaujinta:{" "}
          {lastFetched?.toLocaleString("lt-LT", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <div className="flex items-center justify-center text-sm text-gray-600">
          {/* laikas skaiciuojamas iki kito juokelio ir lottie smelio laikrodzio animacija */}
          <p>Kitas juokelis po: {secondsLeft} s</p> <SandClock />
        </div>
      </div>
    </div>
  );
}
