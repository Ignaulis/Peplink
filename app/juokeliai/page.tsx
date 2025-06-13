"use client";

import { useJoke } from "../hooks/useJoke";
import Animacija from "../components/ui/animacija";
import Loader from "../components/ui/loader";
import Image from "next/image";
import JokeCard from "../components/juokeliai/jokeCard";

const JokesPage = () => {
  const { joke } = useJoke();

  return (
    <Animacija>
      <main className="mt-0 flex min-h-full flex-col items-center p-4 text-center select-none md:mt-10">
        <Image
          src="/images/chuck.png"
          height={300}
          width={300}
          alt="chuck norris"
        />
        {joke ? (
          <JokeCard />
        ) : (
          <div className="flex w-full justify-center">
            <Loader />
          </div>
        )}
      </main>
    </Animacija>
  );
};

export default JokesPage;
