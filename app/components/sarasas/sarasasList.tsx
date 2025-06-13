import { User } from "@/app/types/user";
import { IoTrashBin } from "react-icons/io5";
import Lottie from "lottie-react";
import newOne from "../../../public/lotties/new.json";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  lastAddedId?: string;
}

export const SarasasList = ({ users, onDelete, lastAddedId }: Props) => {
  return (
    <ul className="relative my-2 max-h-[270px] w-full space-y-2 overflow-y-auto px-1">
      <AnimatePresence>
        {/* mapinam vartotoju masyva */}
        {users.map((user, index) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
            className="relative flex h-full w-full flex-col items-center justify-between gap-1 rounded bg-blue-100 p-4 md:grid md:grid-cols-6"
          >
            <span className="flex items-center gap-2">
              {index + 1}
              {user.id === lastAddedId && (
                <Lottie
                  animationData={newOne}
                  loop={true}
                  className="h-12 w-12"
                  autoplay
                />
              )}
            </span>
            <span>{user.name}</span>
            <span>{user.position}</span>
            <span>{user.gender}</span>
            <span>{user.age}</span>
            <div className="flex items-center justify-end gap-4">
              <IoTrashBin
                onClick={() => onDelete(user.id)}
                className="transform cursor-pointer text-2xl text-red-500 transition duration-300 hover:scale-105 active:scale-98"
              />
            </div>
          </motion.li>
        ))}
        {/* jei nera vartotojo spausdiname 'Nėra vartotoju' */}
        {users.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
            className="flex items-center justify-center gap-1 rounded bg-blue-100 p-4 select-none"
          >
            Nėra vartotoju
          </motion.div>
        )}
      </AnimatePresence>
    </ul>
  );
};
