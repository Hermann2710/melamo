export default interface Comment {
  _id: string;
  message: string;
  author: any;
  post: any;
  createdAt: string;
  updatedAt: string;
}

export const initialCommentData: Comment = {
  _id: "",
  message: "",
  author: "",
  post: "",
  createdAt: "",
  updatedAt: "",
};

export const initialCommentsState: {
  isLoading: boolean;
  comments: Comment[];
} = {
  isLoading: false,
  comments: [],
};
