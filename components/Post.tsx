import { PostType } from "@/types";
import moment from 'moment';
import Link from "next/link";

interface AppProps {
  post: PostType
}

export default function Post({ post }: AppProps) {

  const { title, excerpt, date } = post
  const dateFormatted = moment(date).format("MMM Do YY")

  return (
    <div>
      <Link href="#">
      </Link>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        <Link href="#" className="text-gray-900 hover:text-purple-700">{title.rendered}</Link>
      </h2>
      <div className="mb-3 text-sm font-normal text-gray-500" dangerouslySetInnerHTML={{ __html: excerpt.rendered }}>

      </div>
      <p className="mb-3 text-sm font-normal text-gray-500">
        <Link href="#" className="font-medium text-gray-900 hover:text-purple-700">Praveen Juge</Link>
        • {dateFormatted}
      </p>
    </div >
  )
}