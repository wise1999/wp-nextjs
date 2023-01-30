import { TINYMCE_KEY } from "@/constants/index"
import { Editor } from "@tinymce/tinymce-react"
import Link from "next/link"
import { coerce, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useMutation } from 'react-query'; import { useRouter } from "next/router";
import { usePostById } from "@/hooks/posts";
import { getPostById, updatePost } from "@/pages/api/posts";
import { PostInput } from "../new";
import { PostType } from "@/types";
import Image from "next/image";

const postSchema = object({
  postId: coerce
    .number(),
  title: string()
    .min(3, 'Title is required'),
  content: string()
    .min(1, 'Content is required')
});

export type EditPostInput = TypeOf<typeof postSchema>;

function ProfileArticlesEdit({ id }: PostType) {
  const { data, isLoading } = usePostById(id)

  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null)

  const methods = useForm<EditPostInput>({
    resolver: zodResolver(postSchema),
  });

  const { mutate: update } = useMutation(
    (post: EditPostInput) => updatePost(post),
    {
      onSuccess: () => {
        setSubmitMessage('Post updated successfully!')
      },
      onError: (error: any) => {
        setSubmitMessage(error)
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSubmitting(false)
    }

  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<EditPostInput> = async (values) => {
    setIsSubmitting(true)
    update(values)
  };

  if (isLoading) return <div>Loading...</div>

  const { title, content, featured_image } = data

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex w-full">
        <div className="flex flex-col py-10 px-8 w-full">
          <div className="flex wrap items-center justify-between mb-4">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Edit Article: {title.rendered}</h2>
            <Link href="/profile/articles" className="btn btn-primary">Go Back</Link>
          </div>
          <FormProvider {...methods}>
            <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmitHandler)}>
              <input type="hidden" defaultValue={id} {...register("postId", { required: true })} name="postId" />
              <div>
                <label className="block text-sm mb-2">Post Title</label>
                <textarea {...register("title", { required: true })} defaultValue={title.rendered} className="form-input" name="title" placeholder="Post Title" rows={3}></textarea>
                {errors.title?.message && <span className="block text-primary text-sm font-semibold mt-2">{errors.title?.message}</span>}
              </div>
              <div>
                <label className="block text-sm mb-2">Post Content</label>
                <Editor
                  apiKey={TINYMCE_KEY}
                  id='mce'
                  initialValue={content.rendered}
                  init={{
                    height: 500,
                    readonly: true,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                  onEditorChange={(val) => setValue('content', val)}
                />
                <textarea {...register("content", { required: true })} defaultValue={content.rendered} className="hidden" name="content" />
                {errors.content?.message && <span className="block text-primary text-sm font-semibold mt-2">{errors.content?.message}</span>}
              </div>
              <div>
                <label className="block text-sm mb-2">Featured Image</label>
                {featured_image && <div className="w-1/3">
                  <Image
                    src={featured_image.url}
                    alt={featured_image.alt}
                    width={440}
                    height={225}
                    className="object-cover w-full h-56 mb-5 bg-center rounded"
                  /></div>}
                <label className="form-input cursor-pointer" htmlFor="basicfile">
                  <input type="file" className="sr-only" id="basicfile" />
                  <span>Choose file...</span>
                </label>
              </div>
              <button className="btn btn-light-primary mx-auto" type="submit" disabled={isSubmitting}>Update</button>
            </form>
          </FormProvider>
          {submitMessage && <span className="block text-primary text-sm font-semibold text-center mt-4">{submitMessage}</span>}
        </div>
      </section>
    </>
  )
}

ProfileArticlesEdit.layout = "Profile"

export default ProfileArticlesEdit

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id ? parseInt(context.params.id[0]) : null;

  if (!id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['postById', id], () => getPostById(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id
    },
  }
}