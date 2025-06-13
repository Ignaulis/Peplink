import { useState } from "react";
import { User } from "@/app/types/user";
import CustomButton from "../ui/button";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onAdd: (user: User) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UserForm = ({ onAdd, open, setOpen }: Props) => {
  // busena
  const [formData, setFormData] = useState<{
    name: string;
    position: string;
    gender: string;
    age: number | "";
  }>({
    name: "",
    position: "",
    gender: "Vyras",
    age: 18,
  });
  // ivesties lauku keitimas
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    // amziaus validacijs
    if (name === "age") {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          age: "",
        }));
      } else {
        const parsed = +value;
        if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
          setFormData((prev) => ({
            ...prev,
            age: parsed,
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // blokuojam netiketus simbolius
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === ".") {
      e.preventDefault();
    }
  };
  // pateikiam forma
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.age === "" ||
      typeof formData.age !== "number" ||
      formData.age < 1 ||
      formData.age > 100
    ) {
      alert("Amžius turi būti nuo 1 iki 100");
      return;
    }
    // sukuriam nauja vartotoja
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      position: formData.position,
      gender: formData.gender === "Vyras" ? "Vyras" : "Moteris",
      age: typeof formData.age === "number" ? formData.age : 18,
    };

    onAdd(newUser);
    setFormData({ name: "", position: "", gender: "Vyras", age: 18 });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="relative mx-3 w-96 space-y-4 rounded-xl bg-blue-200 p-6 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* topas */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-center text-2xl">Naujas vartotojas</h3>
              <AiFillCloseCircle
                type="button"
                onClick={() => setOpen(false)}
                className="transform cursor-pointer text-3xl text-red-500 transition duration-300 hover:scale-105 hover:opacity-80 active:scale-98"
              />
            </div>
            {/* laukai ivesties */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Vardas"
              className="custom-input"
              required
            />
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Pareigos"
              className="custom-input"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="custom-input"
            >
              <option value="Vyras">Vyras</option>
              <option value="Moteris">Moteris</option>
            </select>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Amžius"
              className="custom-input"
              min={1}
              max={100}
              required
            />
            {/* mygtukas formos */}
            <div className="flex w-full justify-center">
              <CustomButton text={"Pridėti"} color={"#8EC6FF"} type />
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
