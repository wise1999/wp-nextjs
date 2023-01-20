import { API_URL } from "@/constants";

export const getPosts = async () => {
  const request = await fetch(API_URL + "wp-json/wp/v2/posts", {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })

  const response = await request.json();
  return response;
}