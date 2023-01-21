import { getPosts } from './api/posts';
import { dehydrate, QueryClient } from 'react-query';
import { usePosts } from '@/hooks/posts';
import Post from '@/components/Post';
import { PostType } from '@/types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '@etchteam/next-pagination'
import '@etchteam/next-pagination/dist/index.css'

function PostsPage() {
  const router = useRouter();
  const currentPage = router.query.page as string;
  const [page, setPage] = useState(parseInt(currentPage) || 1);
  const { data, isLoading } = usePosts(page);

  return (
    <>
      <section className="px-4 py-24 mx-auto max-w-7xl">
        <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Blog</h2>
        <div className="mb-20 text-lg text-gray-500">Comes directly from the desk of engineers, creators and managers at Skcript.</div>
        {isLoading ? (<div>Loading Posts...</div>) : (
          <>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {data?.data.map((post: PostType) =>
                <Post key={post.id}
                  post={post} />
              )}
            </div>
            <div className="flex flex-col items-center justify-center mt-20 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
              <Pagination perPageText={''} sizes={[1]} total={data?.maxPages} />
            </div>
          </>
        )}
      </section>
    </>
  )
}

PostsPage.layout = "Main"

export default PostsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  const currentPage = context.query.page as string;

  currentPage ? page = parseInt(currentPage) : ''

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], () => getPosts(page))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}