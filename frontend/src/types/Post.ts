export default interface Post {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  postImage?: string;
  author: any;
  topic: any;
}

export interface InitialPostState {
  isLoading: boolean;
  posts: Post[];
}

export const initialPostState = {
  _id: "",
  title: "",
  slug: "",
  description: "",
  postImage: "",
  author: null,
  topic: null,
};
