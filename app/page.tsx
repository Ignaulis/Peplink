"use client";

import { useState, useEffect } from "react";
import { initialUsers } from "./data/users";
import { User } from "./types/user";
import { UserForm } from "./components/sarasas/forma";
import { UserList } from "./components/sarasas/sarasas";
import Animacija from "./components/ui/animacija";

const LOCAL_STORAGE_KEY = "usersData";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [lastAddedId, setLastAddedId] = useState<string | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  // imame duomenis is localstorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    }
    setIsClient(true);
  }, []);

  // irasome duomenis i localstorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isClient]);
  // pridedame nauja vartotoja
  const handleAddUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
    setLastAddedId(user.id);
  };
  // triname vartotoja pagal jo id
  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (id === lastAddedId) {
      setLastAddedId(undefined);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Animacija>
      <main className="w-full">
        <div className="mt-0 flex items-center justify-center space-y-6 p-4 md:mt-20">
          <div className="flex w-11/12 justify-center lg:w-2/3">
            <UserForm onAdd={handleAddUser} open={open} setOpen={setOpen} />
            <UserList
              users={users}
              setOpen={setOpen}
              onDelete={handleDeleteUser}
              lastAddedId={lastAddedId}
            />
          </div>
        </div>
      </main>
    </Animacija>
  );
};

export default UsersPage;
