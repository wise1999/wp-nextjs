import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react"
import useAuth from '@/middleware/useAuth';

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
});

export type LoginInput = TypeOf<typeof loginSchema>;

export default function Login() {
  const isAuthenticated = useAuth(true);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitting(false)
    }

  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    })

    if (res?.error) {
      setSubmitError(res.error)
    }

    setIsSubmitting(true)
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} action="/api/auth/callback/credentials">
          <div className="flex column">
            <input {...register("email", { required: true })} type="email" name="email" placeholder="Enter an e-mail address" />
            {errors.email?.message && <span className="block">{errors.email?.message}</span>}
          </div>
          <div className="flex column">
            <input {...register("password", { required: true })} type="password" name="password" placeholder="Enter a password" />
            {errors.password?.message && <span className="block">{errors.password?.message}</span>}
          </div>
          <button disabled={isSubmitting} type="submit">Log In</button>
        </form>
        {submitError && <span className="block">{submitError}</span>}
      </FormProvider>
    </>
  )
}
