'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import {api }  from "@/lib/api/axios"; 
import toast from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';
import styles from './loginForm.module.css';

interface FormValues {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSuccessRedirect?: string;
}

const initialValues: FormValues = {
    email: '',
    password: '',
};


const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некоректний формат електронної пошти')
        .required('Це поле є обов’язковим'),
    
    password: Yup.string()
        .min(8, 'Пароль має бути не менше 8 символів')
        .required('Це поле є обов’язковим')
});

export default function LoginForm({ onSuccessRedirect = '/' }: LoginFormProps) {
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: FormValues) => {
            const response = await api.post('/auth/login', values);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Вхід успішний! З поверненням.');
            router.push(onSuccessRedirect);
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || 'Невірний email або пароль.';
            toast.error(errorMsg);
        }
    });

    const handleSubmit = (values: FormValues) => {
        mutate(values);
    };

    return (
        <div className={styles.formWrapper}>
            <h1 className={styles.title}>Вхід</h1>
            <p className={styles.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

            <Formik
                initialValues={initialValues}
                validationSchema={LoginFormSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Пошта*</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="hello@podorozhnyky.ua"
                                className={styles.input}
                            />
                            <ErrorMessage name="email" component="span" className={styles.error} />
                        </div>

                        {/* Поле: Пароль */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Пароль*</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="********"
                                className={styles.input}
                            />
                            <ErrorMessage name="password" component="span" className={styles.error} />
                        </div>


                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isPending || !(isValid && dirty)}
                        >
                            {isPending ? 'Вхід...' : 'Увійти'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}