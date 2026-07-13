import css from '@/app/components/addStory/addStory.module.css';
import AddStoryForm from '@/app/components/addStoryForm/addStoryForm';

export default function AddStory() {
  return (
    <section className={css.page} aria-labelledby="add-story-title">
      <div className={css.container}>
        <h1 className={css.title}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </section>
  );
}
