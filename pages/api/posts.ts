import { API_URL } from "@/constants";

export const getPosts = async (page: number) => {
  const response = await fetch(API_URL + "wp-json/wp/v2/posts?per_page=1&page=" + page, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })

  const headers = response.headers
  const data = await response.json();

  if (data) {
    if (data.data?.status == 400) {
      throw new Error("Posts not found")
    } else {
      return {
        data,
        postsCount: headers.get('x-wp-total') ? parseInt(headers.get('x-wp-total') ?? '') : 0,
        maxPages: headers.get('x-wp-totalpages') ? parseInt(headers.get('x-wp-totalpages') ?? '') : 0,
      }
    }
  } else {
    throw new Error("Posts not found")
  }
}

export const getPostBySlug = async (slug: string) => {
  const response = await fetch(API_URL + "wp-json/wp/v2/posts?slug=" + slug, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })

  const data = await response.json();
  return data[0];
}