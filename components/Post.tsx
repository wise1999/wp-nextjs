import { PostType } from "@/types";
import moment from 'moment';
import Image from 'next/image'
import Link from "next/link";

interface AppProps {
  post: PostType
}

export default function Post({ post }: AppProps) {
  const { slug, title, excerpt, date, featured_image, author } = post
  const dateFormatted = moment(date).format("MMM Do YY")

  return (
    <div>
      <Link href={`/post/${slug}`}>
        <Image
          src={featured_image.url}
          alt={featured_image.alt}
          width={440}
          height={225}
          className="object-cover w-full h-56 mb-5 bg-center rounded"
        />
      </Link>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        <Link href={`/post/${slug}`} className="text-gray-900 hover:text-purple-700">{title.rendered}</Link>
      </h2>
      <div className="mb-3 text-sm font-normal text-gray-500" dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
      <p className="mb-3 text-sm font-normal text-gray-500">
        <span className="font-medium text-gray-900 hover:text-purple-700">{author} </span>
        • {dateFormatted}
      </p>
    </div>
  )
}