import { TINYMCE_KEY } from "@/constants"
import { Editor } from "@tinymce/tinymce-react"
import Link from "next/link"
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { createPost } from "@/pages/api/posts";
import { useRouter } from "next/router";

const postSchema = object({
  title: string()
    .min(3, 'Title is required'),
  content: string()
    .min(1, 'Content is required')
});

export type PostInput = TypeOf<typeof postSchema>;

function ProfileArticlesNew() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  const { mutate: create, isLoading } = useMutation(
    (post: PostInput) => createPost(post),
    {
      onSuccess: (post) => {
        router.push('/profile/articles/edit/' + post.id)
      },
      onError: (error: any) => {
        setSubmitError(error)
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitting(false)
    }

  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<PostInput> = async (values) => {
    create(values)
    setIsSubmitting(true)
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex w-full">
        <div className="flex flex-col py-10 px-8 w-full">
          <div className="flex wrap items-center justify-between mb-4">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">New Article</h2>
            <Link href="/profile/articles" className="btn btn-primary">Go Back</Link>
          </div>
          <FormProvider {...methods}>
            <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmitHandler)}>
              <div>
                <label className="block text-sm mb-2">Post Title</label>
                <textarea {...register("title", { required: true })} className="form-input" name="title" placeholder="Post Title" rows={3}></textarea>
                {errors.title?.message && <span className="block text-primary text-sm font-semibold mt-2">{errors.title?.message}</span>}
              </div>
              <div>
                <label className="block text-sm mb-2">Post Content</label>
                <Editor
                  apiKey={TINYMCE_KEY}
                  id='mce'
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
                <textarea {...register("content", { required: true })} className="hidden" name="content" />
                {errors.content?.message && <span className="block text-primary text-sm font-semibold mt-2">{errors.content?.message}</span>}
              </div>
              <button className="btn btn-light-primary mx-auto" type="submit" disabled={isSubmitting}>Add New Post</button>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  )
}

ProfileArticlesNew.layout = "Profile"

export default ProfileArticlesNew