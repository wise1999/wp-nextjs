import Post from "@/components/Post"
import { usePostsByAuthor } from "@/hooks/posts"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { deletePost, getPostsByAuthor } from "@/pages/api/posts"
import { PostType } from "@/types"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { getSession, useSession } from "next-auth/react"
import Link from "next/link"
import {
  dehydrate,
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from "react-query";

function ProfileArticles() {
  const queryClient = useQueryClient()
  const { data: session } = useSession();

  const userId = session ? session.userId : 0;

  const { data, isLoading } = usePostsByAuthor(userId);

  const { mutate } = useMutation(
    (postId: number) => deletePost(postId), {
    onMutate: async (postId) => {

      await queryClient.cancelQueries(['postsByAuthor', userId]);

      const previousTasks = queryClient.getQueryData(['postsByAuthor', userId]);

      //queryClient.setQueryData(['postsByAuthor', userId], (old: any) => old.filter((post: PostType) => post.id !== postId));

      return { previousTasks };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['postsByAuthor', userId], context.previousTasks);
    },
    onSettled: (newData, error) => {
      queryClient.invalidateQueries(['postsByAuthor', userId]);
    },
  }
  );

  const handleDelete = async (postId: number) => {
    mutate(postId)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex w-full">
        <div className="flex flex-col py-10 px-8 w-full">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Your Articles</h2>
            <Link href="/profile/articles/new" className="btn btn-primary">Add New</Link>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {data?.map((post: PostType) =>
              <div className="flex items-center wrap justify-between" key={post.id}>
                <Link href={`/post/${post.slug}`}>{post.title.rendered}</Link>
                <div className="flex gap-4">
                  <Link className="btn btn-light-primary" href={`/post/${post.slug}`}>View</Link>
                  <Link className="btn btn-primary" href={`/profile/articles/edit/${post.id}`}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

ProfileArticles.layout = "Profile"

export default ProfileArticles

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const userId = session?.userId

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['postsByAuthor'], () => getPostsByAuthor(session.userId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}