import { useQuery } from 'react-query';
import { getPosts } from '@/pages/api/posts';

export const usePosts = () => {
  return useQuery(['posts'], () => getPosts());
}