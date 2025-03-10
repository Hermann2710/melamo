export default interface Post {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  message: string;
  author: any;
  createdAt: string;
  updatedAt: string;
}

export const initialPostState: {
  isLoading: boolean;
  posts: Post[];
} = {
  isLoading: false,
  posts: [],
};

export const initialPostData: Post = {
  _id: "",
  title: "",
  subtitle: "",
  slug: "",
  message: "",
  author: null,
  createdAt: "",
  updatedAt: "",
};
