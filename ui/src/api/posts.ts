import { authAxios } from "@/lib/axios-instance";
import axios from "axios";

export const getPosts = async () => {
  const response = await authAxios.get("/posts");
  return response.data;
};

export const getSignUrl = async (scope: string) => {
  const response = await authAxios.post(`/posts/signurl/${scope}`);
  return response.data;
};

export const uploadImageZustack = async (jwt: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("access", "private");
  formData.append("webp", "yes");
  const response = await axios.post(
    `https://zustack.com/files/upload/image/${import.meta.env.VITE_ZUSTACK_BUCKET_ID}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const createPost = async (
  file_id: string,
  body: string,
) => {
  const response = await authAxios.post("/posts", {
    file_id,
    body,
  });
  return response.data;
};
