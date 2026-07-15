'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { AuthBar } from '@/app/components/authBar/authBar';
import styles from './loginPage.module.css';

import { useAuthStore } from '@/auth/model/authStore';



type LoginValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Введіть коректний email')
    .max(64, 'Максимум 64 символи')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Обов'язкове поле"),
});

export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const queryClient = useQueryClient(); 
  const [showPassword, setShowPassword] = useState(false);
  
 

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const { data } = await api.post(endpoints.auth.login, values);
      return data; 
    },

onSuccess: async (data) => {
      toast.success('Успішний вхід!');

      const token = data.token ?? data.accessToken ?? data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      try {
        const response = await api.get('/users/me');

        const user =
          response.data?.data?.user ??
          response.data?.user ??
          response.data?.data ??
          response.data;

        setUser(user);

        queryClient.setQueryData(['currentUser'], user);

        router.push('/');
        router.refresh();
      } catch {
        toast.error('Не вдалося отримати дані користувача');
      }
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ??
          'Не вдалося увійти. Перевірте дані та спробуйте ще раз.')
        : 'Не вдалося увійти. Перевірте дані та спробуйте ще раз.';
      toast.error(message);
    },
  });

  const formik = useFormik<LoginValues>({
    initialValues: { email: '', password: '' },
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) =>
      mutate({
        email: values.email.trim(),
        password: values.password.trim(),
      }),
  });

  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <>
      <AuthBar />

      <div className={styles.wrap}>
        <h1 className={styles.title}>Вхід</h1>
        <p className={styles.subtitle}>
          Вітаємо знову у спільноті
          <br />
          мандрівників!
        </p>

        <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Пошта*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="hello@podorozhnyky.ua"
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {emailError && (
              <span className={styles.errorText}>{formik.errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Пароль*
            </label>
            <div className={styles.passwordBox}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isPending}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? 'Приховати пароль' : 'Показати пароль'
                }
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M6.5 6.7C4 8.3 2.5 10.7 2 12c1.4 3.2 5 7 10 7 1.7 0 3.2-.4 4.6-1.1M9.9 4.2C10.6 4.1 11.3 4 12 4c5 0 8.6 3.8 10 7-.4 1-1.1 2.3-2.1 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 12c1.4-3.2 5-7 10-7s8.6 3.8 10 7c-1.4 3.2-5 7-10 7s-8.6-3.8-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <span className={styles.errorText}>{formik.errors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? 'Входимо...' : 'Увійти'}
          </button>
        </form>
      </div>
    </>
  );
}
