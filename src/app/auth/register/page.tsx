'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './registerPage.module.css';
import { AuthBar } from '@/app/components/authBar/authBar';
// 1. Імпортуємо твоє Zustand-сховище
import { useAuthStore } from '@/auth/model/authStore';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Ім’я повинно бути не менше 3 символів')
    .max(32, 'Ім’я занадто довге')
    .required('Це поле є обов’язковим'),

  email: Yup.string()
    .email('Некоректний формат електронної пошти')
    .max(64, 'Електронна пошта занадто довга')
    .required('Це поле є обов’язковим'),

  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(128, 'Пароль занадто довгий')
    .required('Це поле є обов’язковим'),
});

export default function RegistrationForm() {
  const router = useRouter();
  // 2. Дістаємо функцію setUser зі сховища Zustand
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await api.post('/auth/register', values);
      return response.data; // Бекенд має повернути { token: '...', user: {...} } або схожу структуру
    },
    onSuccess: (data) => {
      toast.success('Реєстрація успішна!');

      // 3. Зберігаємо токен у localStorage, щоб AuthProvider бачив його при перезавантаженні сторінки
      const token = data.token ?? data.accessToken ?? data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // 4. Одразу записуємо дані користувача у Zustand-стан, щоб інтерфейс (хедер) миттєво оновився
      const userData = data.user ?? data.data ?? data;
      if (userData) {
        setUser(userData);
      }

      // 5. Перенаправляємо на головну сторінку
      router.push('/');
    },
    onError: (error: any) => {
      const errorMsg = 'Помилка реєстрації. Спробуйте пізніше.';
      toast.error(errorMsg);
    },
  });

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return (
    <>
      <AuthBar />
      <div className={styles.wrap}>
        <h1 className={styles.title}>Реєстрація</h1>
        <p className={styles.subtitle}>
          Раді вас бачити у спільноті мандрівників!
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, errors, touched }) => {
            const nameError = touched.name && errors.name;
            const emailError = touched.email && errors.email;
            const passwordError = touched.password && errors.password;

            return (
              <Form className={styles.form} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Імʼя та Прізвище*
                  </label>

                  <Field
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Ваше імʼя та прізвище"
                    className={`${styles.input} ${
                      nameError ? styles.inputError : ''
                    }`}
                    disabled={isPending}
                  />

                  <span className={styles.errorText}>
                    {nameError ? errors.name : '\u00A0'}
                  </span>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    Пошта*
                  </label>

                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="hello@podorozhnyky.ua"
                    className={`${styles.input} ${
                      emailError ? styles.inputError : ''
                    }`}
                    disabled={isPending}
                  />

                  <span className={styles.errorText}>
                    {emailError ? errors.email : '\u00A0'}
                  </span>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="password">
                    Пароль*
                  </label>

                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    className={`${styles.input} ${
                      passwordError ? styles.inputError : ''
                    }`}
                    disabled={isPending}
                  />

                  <span className={styles.errorText}>
                    {passwordError ? errors.password : '\u00A0'}
                  </span>
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={isPending}
                >
                  {isPending ? 'Завантаження...' : 'Зареєструватись'}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
