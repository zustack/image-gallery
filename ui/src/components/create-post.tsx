import { useState, useRef, useEffect } from "react";
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
import { useAuthStore } from "@/store/auth";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const { userId } = useAuthStore();

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket(`ws://localhost:8081/ws?user_id=${userId}`);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket conectado");
      };

      socket.onmessage = (event) => {
        console.log("📨 Mensaje recibido:", event.data);
        if (event.data == "success") {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          setIsOpen(false);
          setIsPending(false);
          setFile(undefined);
          setBody("");
        }
      };

      socket.onerror = (err) => {
        console.error("❌ Error en WebSocket:", err);
      };

      socket.onclose = () => {
        console.log("🔌 Conexión cerrada. Reconectando en 3s...");
        setTimeout(connect, 3000); // reconecta después de 3s
      };
    };

    connect(); // conectar al montar

    return () => {
      socketRef.current?.close(); // cerrar al desmontar
    };
  }, [userId]);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const queryClient = useQueryClient();

  // 1. get the jwt for the zustack request
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

  // 2. upload the image to zustack
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

  // 3. create the new image gallery post with the file id and body
  const createPostMutation = useMutation({
    mutationFn: (file_id: string) => createPost(file_id, body),
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
