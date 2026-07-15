'use client';

import css from '@/app/components/addStoryForm/addStoryForm.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

type AddStoryFormValues = {
  title: string;
  category: string;
  article: string;
};

type Category = {
  _id: string;
  category: string;
};

const initialValues: AddStoryFormValues = {
  title: '',
  category: '',
  article: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Заголовок має містити щонайменше 2 символи.')
    .max(40, 'Заголовок має містити не більше 40 символів.')
    .required("Заголовок є обов'язковим."),

  category: Yup.string().required("Категорія є обов'язковою."),

  article: Yup.string()
    .min(12, 'Текст історії має містити щонайменше 12 символів.')
    .max(3000, 'Текст історії має містити не більше 3000 символів.')
    .required("Текст історії є обов'язковим."),
});

const categories: Category[] = [
  {
    _id: '6966a5cdbc1b90f344c2e0bb',
    category: 'Еко-ферми та гастротури',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0bc',
    category: 'Традиції та культура',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0bd',
    category: 'Карпати',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0be',
    category: 'Національні парки',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0bf',
    category: 'Поділля',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0c0',
    category: 'Озера та річки',
  },
  {
    _id: '6966a5cdbc1b90f344c2e0c1',
    category: 'Полісся',
  },
];

export default function AddStoryForm() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const categorySelectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categorySelectRef.current &&
        !categorySelectRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreview('');
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleResetImage = () => {
    setImageFile(null);
    setPreview('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (
    values: AddStoryFormValues,
    actions: FormikHelpers<AddStoryFormValues>,
  ) => {
    if (!imageFile) {
      toast.error('Оберіть фото для обкладинки.');
      actions.setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('article', values.article);
      formData.append('img', imageFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorMessage = data?.message || 'Помилка при створенні історії.';

        if (
          response.status === 401 ||
          data?.message === 'Missing access token'
        ) {
          errorMessage = 'Будь ласка, увійдіть в акаунт, щоб створити історію.';
        }

        throw new Error(errorMessage);
      }

      const storyId = data?.data?._id || data?._id || data?.story?._id;

      toast.success(data?.message || 'Історію успішно створено.');

      if (storyId) {
        router.push(`/stories/${storyId}`);
      } else {
        router.push('/stories');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при створенні історії.');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        resetForm,
        errors,
        isSubmitting,
        values,
        setFieldValue,
        setFieldTouched,
        submitCount,
      }) => {
        const isSubmitDisabled =
          !values.title.trim() ||
          !values.category ||
          !values.article.trim() ||
          !imageFile ||
          isSubmitting;

        return (
          <Form className={css.form}>
            <div className={css.coverBlock}>
              <p className={css.coverLabel}>Обкладинка статті</p>

              <div className={css.cover}>
                <img
                  className={css.coverImage}
                  src={preview || '/images/Placeholder_Image.jpg'}
                  alt="Обкладинка статті"
                />
              </div>
            </div>

            <label className={css.uploadButton}>
              Завантажити фото
              <input
                ref={fileInputRef}
                className={css.fileInput}
                type="file"
                name="img"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <label className={css.label}>
              Заголовок
              <Field
                className={`${css.input} ${
                  submitCount > 0 && errors.title ? css.inputError : ''
                }`}
                type="text"
                name="title"
                placeholder="Введіть заголовок історії"
              />
              {submitCount > 0 && errors.title && (
                <ErrorMessage
                  name="title"
                  component="p"
                  className={css.error}
                />
              )}
            </label>

            <div className={css.label}>
              <span>Категорія</span>

              <div ref={categorySelectRef} className={css.customSelect}>
                <button
                  className={`${css.selectButton} ${
                    submitCount > 0 && errors.category ? css.inputError : ''
                  }`}
                  type="button"
                  disabled={isSubmitting}
                  aria-haspopup="listbox"
                  aria-expanded={isCategoryOpen}
                  onClick={() => {
                    setFieldTouched('category', true);
                    setIsCategoryOpen((prev) => !prev);
                  }}
                >
                  <span>
                    {categories.find((item) => item._id === values.category)
                      ?.category || 'Категорія'}
                  </span>

                  <span
                    className={`${css.arrow} ${
                      isCategoryOpen ? css.arrowOpen : ''
                    }`}
                  >
                    ⌄
                  </span>
                </button>

                {isCategoryOpen && (
                  <ul className={css.optionsList} role="listbox">
                    {categories.map((item) => (
                      <li key={item._id}>
                        <button
                          className={`${css.option} ${
                            values.category === item._id
                              ? css.optionSelected
                              : ''
                          }`}
                          type="button"
                          role="option"
                          aria-selected={values.category === item._id}
                          onClick={() => {
                            setFieldValue('category', item._id);
                            setFieldTouched('category', true);
                            setIsCategoryOpen(false);
                          }}
                        >
                          {item.category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {submitCount > 0 && errors.category && (
                <ErrorMessage
                  name="category"
                  component="p"
                  className={css.error}
                />
              )}
            </div>

            <label className={css.label}>
              Текст історії
              <Field
                as="textarea"
                className={`${css.textarea} ${
                  submitCount > 0 && errors.article ? css.inputError : ''
                }`}
                name="article"
                placeholder="Ваша історія тут"
              />
              {submitCount > 0 && errors.article && (
                <ErrorMessage
                  name="article"
                  component="p"
                  className={css.error}
                />
              )}
            </label>

            <div className={css.buttons}>
              <button
                className={css.cancelButton}
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  handleResetImage();
                  setIsCategoryOpen(false);
                }}
              >
                Відмінити
              </button>

              <button
                className={css.submitButton}
                type="submit"
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? (
                  <span className={css.loaderText}>
                    <span className={css.loader} aria-hidden="true" />
                    Збереження...
                  </span>
                ) : (
                  'Зберегти'
                )}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
