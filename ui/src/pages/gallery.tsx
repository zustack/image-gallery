import CreatePost from "@/components/create-post";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Gallery() {
  return (
    <div className="container mx-auto px-[10px] xl:px-[200px] mt-[50px]">
      <div className="pb-[10px]">
      <CreatePost />
      </div>
      <ScrollArea className="h-[800px] p-4 border rounded-md">
        <div className="flex flex-col gap-[20px]">
          <img
            className="rounded-md"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt=""
          />
          <img
            className=""
            src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
            alt=""
          />
        </div>
      </ScrollArea>
    </div>
  );
}
