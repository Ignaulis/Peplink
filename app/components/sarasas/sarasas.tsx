import { useMemo, useState } from "react";
import { User } from "@/app/types/user";
import CustomButton from "../ui/button";
import { SarasasList } from "./sarasasList";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  setOpen: (value: boolean) => void;
  lastAddedId?: string;
}

export const UserList = ({ users, onDelete, setOpen, lastAddedId }: Props) => {
  const [sortBy, setSortBy] = useState("vardas");

  // rusiuojami vartotojai pagal pasirinkima
  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    switch (sortBy) {
      case "vardas":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "pozicija":
        return sorted.sort((a, b) => a.position.localeCompare(b.position));
      case "lytis":
        return sorted.sort((a, b) => a.gender.localeCompare(b.gender));
      case "amzius":
        return sorted.sort((a, b) => a.age - b.age);
      default:
        return sorted;
    }
  }, [users, sortBy]);

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-white/20 shadow-lg backdrop-blur-xl">
      {/* pavadinimas */}
      <div className="flex w-full justify-center border-b bg-blue-300 p-4">
        <h2 className="text-2xl select-none">Vartotojų sąrašas</h2>
      </div>
      <div className="flex flex-row md:flex-col">
        {/* antraste */}
        <div className="flex flex-col justify-between gap-1 bg-blue-100 p-4 font-semibold select-none md:grid md:grid-cols-6 md:border-b">
          <span>Nr.</span>
          <span>Vardas</span>
          <span>Pozicija</span>
          <span>Lytis</span>
          <span>Amžius</span>
          <span className="text-right">Veiksmas</span>
        </div>

        {/* sarasas vartotoju */}
        <SarasasList
          users={sortedUsers}
          onDelete={onDelete}
          lastAddedId={lastAddedId}
        />
      </div>
      {/* filtas ir mygtukas prideti naujiems vartotojams */}
      <div className="flex justify-between bg-blue-300 p-4">
        <div>
          <select
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full cursor-pointer rounded bg-blue-100 p-2 outline-0"
          >
            <option value="vardas">Pagal vardą</option>
            <option value="pozicija">Pagal poziciją</option>
            <option value="lytis">Pagal lytį</option>
            <option value="amzius">Pagal amžių</option>
          </select>
        </div>
        <CustomButton
          text={"Pridėti vartotoją"}
          color={"#DBE9FF"}
          type={false}
          click={() => setOpen(true)}
        />
      </div>
    </div>
  );
};
