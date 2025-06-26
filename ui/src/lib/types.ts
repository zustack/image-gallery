export type ErrorResponse = {
  response: {
    data: string;
  };
};

export type Post = {
  id: string;
  media_url: string;
  body: string;
  created_at: string;
}
