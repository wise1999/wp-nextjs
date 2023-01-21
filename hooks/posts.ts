import { useQuery } from 'react-query';
import { getPostBySlug, getPosts } from '@/pages/api/posts';

export const usePosts = (page: number) => {
  return useQuery(['posts'], () => getPosts(page));
}

export const usePost = (slug: string) => {
  return useQuery(['post'], () => getPostBySlug(slug));
}