import type { User } from "../types/User";

export const fetchUsers = async (query: string): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
};
