import css from '@/app/components/AddStory/AddStory.module.css';

import AddStoryForm from '../AddStoryForm/AddStoryForm';

export default function AddStory() {
  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </main>
  );
}
