export default interface Post {
  _id: string;
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
  message: "",
  author: null,
  createdAt: "",
  updatedAt: "",
};
