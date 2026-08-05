import type { User, UsersResponse } from "../types/user";

const BASE_URL = "https://dummyjson.com/Users";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  const data: UsersResponse = await response.json();

  return data.users;
}
