import type { User } from '../types/User';

const mockUsers: User[] = [
  { id: 1, name: 'Raphael Guimarães' },
  { id: 2, name: 'Ana Vitória' },
  { id: 3, name: 'Bruno Marrone' },
  { id: 4, name: 'Carlos Alberto' },
  { id: 5, name: 'Dede Santana' },
  { id: 6, name: 'Rafael Ribeiro' },
];

export const fetchUsersMock = async (query: string): Promise<User[]> => {
  await new Promise(res => setTimeout(res, 200));

  return mockUsers.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
};
