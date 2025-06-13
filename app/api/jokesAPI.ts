import { Joke } from "../types/joke";

// gauname juokelius is api
export const fetchJoke = async (): Promise<Joke> => {
  const res = await fetch('https://api.chucknorris.io/jokes/random?category=dev');

  if (!res.ok) {
    throw new Error(`Joke API klaida: ${res.status}`);
  }

  const data: Joke = await res.json();
  return data;
};
