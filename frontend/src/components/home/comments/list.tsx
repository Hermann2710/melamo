import { AppDispatch, RootState } from "@/store";
import { fetchComments } from "@/store/comments";
import Post from "@/types/Post";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./card";
import Comment from "@/types/Comment";

type Props = {
  post: Post;
  setComment: Dispatch<SetStateAction<Comment>>;
};

function CommentList({ post, setComment }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { comments, isLoading } = useSelector(
    (state: RootState) => state.commentsReducer
  );

  useEffect(() => {
    dispatch(fetchComments({ post: post._id }));
  }, [dispatch]);

  return (
    <>
      <h1 className="text-xl font-bold">Comments</h1>
      <hr />
      {isLoading ? (
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-lg font-medium">Fetching Comments</h1>
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          {comments.map((comment) => (
            <CommentCard
              user={user!}
              comment={comment}
              setComment={setComment}
              key={comment._id}
            />
          ))}
        </>
      )}
    </>
  );
}

export default CommentList;
