import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileImage, Image } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ErrorResponse } from "@/lib/types";
import Spinner from "./spinner";
import { createPost, getSignUrl, uploadImageZustack } from "@/api/posts";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const queryClient = useQueryClient();

  // primero hace el request para obtener un token con scope write
  const getSignUrlMutation = useMutation({
    mutationFn: () => getSignUrl("Write"),
    onSuccess: (response) => {
      uploadImageZustackMutation.mutate(response.jwt);
      setIsPending(true);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response.data || "An unexpected error occurred.");
      setIsPending(false);
    },
  });

  // 2. subi la imagen a zustack y guarda el file id
  const uploadImageZustackMutation = useMutation({
    mutationFn: (jwt: string) => {
      if (!file) throw new Error("No file provided");
      if (file.size >= 50 * 1024 * 1024)
        throw new Error("Image size must be less than 50 MiB");
      return uploadImageZustack(jwt, file);
    },
    onSuccess: (response) => {
      createPostMutation.mutate(response.file_id);
    },
    onError: (error: ErrorResponse) => {
      setIsPending(false);
      toast.error(error.response.data || "An unexpected error occurred.");
    },
  });

  // 3. crea el nuevo post en image gallery con file id y body
  const createPostMutation = useMutation({
    mutationFn: (file_id: string) => createPost(file_id, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["files"] });
      setIsOpen(false);
      setIsPending(false);
      setFile(undefined);
      setBody("");
    },
    onError: (error: ErrorResponse) => {
      setIsPending(false);
      toast.error(error.response.data || "An unexpected error occurred.");
    },
  });

  return (
    <AlertDialog
      onOpenChange={(open: boolean) => setIsOpen(open)}
      open={isOpen}
    >
      <AlertDialogTrigger>
        <Button variant="outline">
          <Image className="h-4 w-4" />
          <span>Create new Post</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Create Post
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <div className="flex items-center justify-center p-2">
                <div className="mx-auto grid w-full max-w-md gap-6">
                  <div className="mx-auto grid w-full max-w-2xl gap-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="file">File</Label>
                        <Button
                          id="file"
                          onClick={() => fileRef.current?.click()}
                          variant="outline"
                          className="flex justify-start gap-4"
                        >
                          <FileImage className="size-4" />
                          <span>
                            {file?.name ? (
                              <>{file?.name.slice(0, 40)}</>
                            ) : (
                              <>JPEG, PNG, WEBP, GIF, SVG+XML</>
                            )}
                          </span>
                        </Button>
                        <Input
                          ref={fileRef}
                          required
                          onChange={handleFile}
                          id="file"
                          type="file"
                          className="hidden"
                          accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
                        />
                      </div>
                      <div className="grid w-full gap-3">
                        <Label htmlFor="body">Body</Label>
                        <Textarea
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          placeholder="Type your body here."
                          id="body"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              onClick={() => {
                setIsPending(true);
                getSignUrlMutation.mutate();
              }}
            >
              <span>Create</span>
              {isPending && <Spinner />}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
