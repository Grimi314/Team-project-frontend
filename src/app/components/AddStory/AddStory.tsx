import css from '@/app/components/AddStory/AddStory.module.css';
import Header from '../header/header';
import AddStoryForm from '../AddStoryForm/AddStoryForm';
import Footer from '../footer/footer';
export default function AddStory() {
  return (
    <main className={css.page}>
      <div className={css.container}>
        <Header />
        <h1 className={css.title}>Створити нову історію</h1>
        <AddStoryForm />
        <Footer />
      </div>
    </main>
  );
}
