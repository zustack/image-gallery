import { getPosts } from "@/api/posts";
import CreatePost from "@/components/create-post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/lib/types";
import LoadImage from "@/components/load-image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Gallery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return (
    <div className="container mx-auto px-[10px] xl:px-[200px] mt-[50px]">
      <div className="pb-[10px]">
        <CreatePost />
      </div>
      <ScrollArea className="h-[800px] p-4 border rounded-md">
        <div className="flex flex-col">
          {isError && (
            <div className="flex justify-center mt-[100px]">
              <p>An unexpected error occurred.</p>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col gap-[5px]">
              <Skeleton className="rounded-md w-full h-[400px]" />
              <Skeleton className="rounded-md w-full h-[400px]" />
            </div>
          )}
          {data?.data?.map((post: Post, index: number) => (
            <div key={post.id}>
              <div className="flex flex-col gap-[5px]">
                <LoadImage
                  cn="rounded-md w-full h-[400px]"
                  src={`${post.media_url}?jwt=${data.jwt}`}
                />
                <p>{post.body}</p>
                <p className="text-muted-foreground text-sm">
                  {post.created_at}
                </p>
              </div>
              {index !== data.data.length - 1 && (
                <Separator className="my-[25px]" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
