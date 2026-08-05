export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  image: string;
  username: string;
  phone: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
