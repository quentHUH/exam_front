import type { User } from "../model/user";

export const fetchUsers = async () => {
  const response = await fetch('https://dummyjson.com/users?limit=0');
  const data = await response.json();
  return (data.users ?? []) as User[];;
};

export const fetchUserById = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await response.json();
  return data
};