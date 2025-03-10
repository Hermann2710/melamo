import CommentForm from "@/components/home/comments/form";
import CommentList from "@/components/home/comments/list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/store";
import Comment, { initialCommentData } from "@/types/Comment";
import Post from "@/types/Post";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DetailsPost() {
  const { post_id } = useParams();
  const { posts } = useSelector((state: RootState) => state.postsReducer);
  const [post, setPost] = useState<Post>();
  const [comment, setComment] = useState<Comment>(initialCommentData);

  useEffect(() => {
    posts.forEach((post) => {
      if (post._id === post_id) {
        setPost(post);
      }
    });
  }, [post_id, posts]);

  return (
    <div className="my-3">
      {!post ? (
        <h2 className="text-2xl font-bold">Post doesn't exist</h2>
      ) : (
        <Card>
          <CardContent>
            <CardHeader className="flex flex-col max-w-full">
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.subtitle}</CardDescription>
              <p className="my-2">{post.message}</p>
              <CommentList post={post} setComment={setComment} />
            </CardHeader>
            <CardFooter>
              <CommentForm
                post={post}
                setComment={setComment}
                comment={comment}
              />
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default DetailsPost;
