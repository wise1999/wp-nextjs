import { getPosts } from './api/posts';
import { dehydrate, QueryClient } from 'react-query';
import { usePosts } from '@/hooks/usePosts';
import Link from 'next/link';
import Post from '@/components/Post';
import { PostType } from '@/types';

function Blog() {

  const { data, isLoading } = usePosts();

  return (
    <>
      <section className="px-4 py-24 mx-auto max-w-7xl">
        <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Blog</h2>
        <div className="mb-20 text-lg text-gray-500">Comes directly from the desk of engineers, creators and managers at Skcript.</div>
        {isLoading ? (<div>Loading Posts...</div>) : (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {data.map((post: PostType) =>
              <Post key={post.id}
                post={post} />
            )}
          </div>
        )}
        <div className="flex flex-col items-center justify-center mt-20 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
          <Link href="#" className="w-full rounded-full btn btn-light btn-xl md:w-auto">Previous Page</Link>
          <Link href="#" className="w-full rounded-full btn btn-light btn-xl md:w-auto">Next Page</Link>
        </div>
      </section>
    </>
  )
}

Blog.layout = "Main"

export default Blog

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], () => getPosts())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}