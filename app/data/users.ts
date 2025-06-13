import { User } from "../types/user";
// dummy data
export const initialUsers: User[] = [
    {
    id: Date.now().toString() + '_1',
    name: 'Jonas Jonaitis',
    position: 'Programuotojas',
    gender: 'Vyras',
    age: 28,
  },
  {
    id: Date.now().toString() + '_2',
    name: 'Agnė Petrauskaitė',
    position: 'Projektų vadovė',
    gender: 'Moteris',
    age: 35,
  },
  {
    id: Date.now().toString() + '_3',
    name: 'Tomas Tamulevičius',
    position: 'Dizaineris',
    gender: 'Vyras',
    age: 30,
  }
]