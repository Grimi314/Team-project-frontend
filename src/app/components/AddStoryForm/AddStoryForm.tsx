'use client';

import css from '@/app/components/AddStoryForm/AddStoryForm.module.css';
import { ChangeEvent, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type AddStoryFormValues = {
  title: string;
  category: string;
  article: string;
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

type Category = {
  _id: string;
  category: string;
};

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {}}
    >
      {({ dirty, isValid, resetForm, errors, touched }) => (
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
                touched.title && errors.title ? css.inputError : ''
              }`}
              type="text"
              name="title"
              placeholder="Введіть заголовок історії"
            />
            <ErrorMessage name="title" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Категорія
            <div className={css.selectWrapper}>
              <Field
                as="select"
                className={`${css.input} ${
                  touched.category && errors.category ? css.inputError : ''
                }`}
                name="category"
              >
                <option value="">Категорія</option>

                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.category}
                  </option>
                ))}
              </Field>
            </div>
            <ErrorMessage name="category" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Текст історії
            <Field
              as="textarea"
              className={`${css.textarea} ${
                touched.article && errors.article ? css.inputError : ''
              }`}
              name="article"
              placeholder="Ваша історія тут"
            />
            <ErrorMessage name="article" component="p" className={css.error} />
          </label>
          <div className={css.buttons}>
            <button
              className={css.cancelButton}
              type="button"
              onClick={() => {
                resetForm();
                handleResetImage();
              }}
            >
              Відмінити
            </button>
            <button
              className={css.submitButton}
              type="submit"
              disabled={!dirty || !isValid || !imageFile}
            >
              Зберегти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
