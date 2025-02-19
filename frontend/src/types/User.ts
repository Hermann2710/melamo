type User = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" | "admin";
  followers: String[];
  followings: String[];
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

export default User;

export interface InitialAuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}
