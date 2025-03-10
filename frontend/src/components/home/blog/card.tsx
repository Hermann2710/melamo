import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Post from "@/types/Post";
import { Link } from "react-router-dom";

function BlogCard({ post }: { post: Post }) {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <CardContent className="flex-1 p-4 space-y-4">
          <div className="space-y-2">
            {/* <Badge variant="default">Design</Badge> */}
            <Link to={`/posts/${post._id}`} className="text-2xl font-bold">
              {post.title}
            </Link>
            <h2 className="text-gray-500 dark:text-gray-400">
              {post.subtitle}
            </h2>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Link to={`/users/${post.author.username}`}>
              <Avatar>
                <AvatarImage
                  src={`/uploads/${post.author.avatar}`}
                  alt={post.author.username}
                />
                <AvatarFallback className="uppercase">
                  {post.author.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="ml-auto flex flex-col">
              <span className="font-semibold">{post.author.username}</span>
              <span className="text-xs text-gray-400">Author</span>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default BlogCard;
