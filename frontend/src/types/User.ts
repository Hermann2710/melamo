export default interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
  password: string;
  avatar: string;
  followers: any[];
  followings: any[];
  createdAt: string;
  updatedAt: string;
}

export const initialAuthState: {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
} = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export const initialUserData: User = {
  _id: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  role: "user",
  password: "",
  avatar: "",
  followers: [],
  followings: [],
  createdAt: "",
  updatedAt: ""
};
