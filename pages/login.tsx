import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }

  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    })

    if (res?.error) {
      setError('submit' as any, {
        type: "server",
        message: res.error
      });
    }
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
          <button type="submit">Log In</button>
        </form>
        {errors.submit?.message && <span className="block">{errors.submit?.message}</span>}
      </FormProvider>
    </>
  )
}

const SignInError = ({ error }) => {
  const errorMessage = error;
  return <div>{errorMessage}</div>;
};