import { useQuery } from 'react-query';
import { getPostBySlug, getPosts, getPostById } from '@/pages/api/posts';
import { PostInput } from '@/pages/profile/articles/new';

export const usePosts = (page: number) => {
  return useQuery(['posts'], () => getPosts(page));
}

export const usePost = (slug: string) => {
  return useQuery(['post'], () => getPostBySlug(slug));
}

export const usePostById = (id: number) => {
  return useQuery(['postById'], () => getPostById(id));
}