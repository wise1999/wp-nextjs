import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { registerUser } from './api/register';
import { useRouter } from 'next/router';
import useAuth from '@/middleware/useAuth';

const registerSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

export default function Login() {
  const router = useRouter()
  const isAuthenticated = useAuth(true);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  const { mutate, isLoading } = useMutation(
    (userData: RegisterInput) => registerUser(userData),
    {
      onSuccess() {
        router.push('/login')
      },
      onError(error: any) {
        setSubmitError(error)
      },
    }
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitting(false)
    }

  }, [isSubmitSuccessful]);


  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    mutate(values);
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
          <div className="flex column">
            <input {...register("passwordConfirm", { required: true })} type="password" name="passwordConfirm" placeholder="Repeat a passowrd" />
            {errors.passwordConfirm?.message && <span className="block">{errors.passwordConfirm?.message}</span>}
          </div>
          <button disabled={isSubmitting} type="submit">Sign Up</button>
        </form>
        {submitError && <span className="block">{submitError}</span>}
      </FormProvider>
    </>
  )
}
