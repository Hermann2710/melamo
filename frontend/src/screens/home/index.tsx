import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import BlogCard from "@/components/home/blog/card";
import { useEffect } from "react";
import { fetchPosts } from "@/store/posts";

export default function HomePage() {
  const { posts } = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts({}));
  }, []);
  return (
    <div>
      <div>
        <header className="pb-6 space-y-3">
          <div className="container space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Your Blogs</h1>
              <p className="text-gray-500 dark:text-gray-400">
                A collection of your blogs.
              </p>
            </div>
          </div>
        </header>
        <div className="container py-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 md:mx-5">
            {posts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
