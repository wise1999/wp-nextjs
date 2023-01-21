import { usePost } from "@/hooks/posts";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from 'react-query';
import { getPostBySlug } from "../api/posts";
import moment from 'moment';
import Image from "next/image";
import Link from "next/link";

function SinglePost() {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug : '';

  const { data, isLoading } = usePost(slug[0])

  if (isLoading) return <div>Loading...</div>

  const { title, content, date, featured_image, author } = data
  const dateFormatted = moment(date).format("MMM Do YY")

  return (
    <article className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto mb-12 text-center md:w-2/3">
        <Image
          src={featured_image.url}
          alt={featured_image.alt}
          width={710}
          height={255}
          className="object-cover w-full h-64 bg-center rounded-lg mb-3"
        />
        <span className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">Article</span>
        <h1 className="mb-3 text-4xl font-bold text-gray-900 md:leading-tight md:text-5xl" title="Rise of Tailwind - A Utility First CSS Framework">
          {title.rendered}
        </h1>
        <span className="text-gray-700">
          Written by:
          <span className="byline author vcard">
            <span className="text-primary hover:text-primary-dark"><span> {author} </span></span>
          </span>
          on <time>{dateFormatted}</time>
        </span>

        <div className="mx-auto prose text-left mb-3" dangerouslySetInnerHTML={{ __html: content.rendered }} />
        <Link href="/posts" className="btn btn-light-primary">Back to Posts</Link>
      </div>
    </article>
  )
}

SinglePost.layout = "Main"

export default SinglePost

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string

  const queryClient = new QueryClient()

  await queryClient.fetchQuery(['post', slug], () => getPostBySlug(slug))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}