import { ScrollArea } from "@/components/ui/scroll-area";

export default function Gallery() {
  return (
    <div className="container mx-auto px-[10px] xl:px-[200px] mt-[50px]">
      <ScrollArea className="h-[800px] p-4">
        <div className="flex flex-col gap-[20px]">
          <img
            className=""
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
