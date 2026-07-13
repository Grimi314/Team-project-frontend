import css from '@/app/components/addStory/addStory.module.css';
import AddStoryForm from '@/app/components/addStoryForm/addStoryForm';

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
