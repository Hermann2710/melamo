import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Component() {
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
          <div className="grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Design</Badge>
                    <h2 className="text-2xl font-bold">
                      The Art of Consistency in Design
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      How consistency can make or break a design, and tips for
                      achieving it.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        Jane Doe
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Technology</Badge>
                    <h2 className="text-2xl font-bold">
                      The Future of Quantum Computing
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Exploring the potential and challenges of quantum
                      computing.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        John Smith
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Science</Badge>
                    <h2 className="text-2xl font-bold">
                      The Mysteries of Dark Matter
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Unraveling the enigma of dark matter and its significance
                      in the universe.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        Emily Johnson
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Health</Badge>
                    <h2 className="text-2xl font-bold">
                      Mindfulness in Everyday Life
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Embracing mindfulness to find peace and purpose in the
                      modern world.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        Michael Brown
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Travel</Badge>
                    <h2 className="text-2xl font-bold">
                      Off the Beaten Path: Hidden Gems Around the World
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Discovering extraordinary destinations that are often
                      overlooked by tourists.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        Sarah Lee
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col h-full">
                <CardContent className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="default">Food</Badge>
                    <h2 className="text-2xl font-bold">
                      Culinary Adventures: Exploring Global Cuisine
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Embarking on a gastronomic journey to savor diverse and
                      delicious foods from around the world.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/placeholder.svg"
                        width="32"
                        height="32"
                        alt="Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "32/32", objectFit: "cover" }}
                      />
                      <div className="text-sm font-medium leading-none">
                        Alex Chen
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href="#"
                        className="inline-block w-4 h-4 rounded-full border border-gray-200\n                      border-dashed flex items-center justify-center\n                      text-gray-500 dark:text-gray-400 hover:text-gray-500\n                      dark:hover:text-gray-400 transition-colors"
                        title="Bookmark"
                        prefetch={false}
                      >
                        <BookmarkIcon className="w-3 h-3" />
                        <span className="sr-only">Bookmark</span>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
