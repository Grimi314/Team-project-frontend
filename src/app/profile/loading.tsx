import { Loader } from '@/app/components/loader/loader';
import styles from '@/app/components/profile/profile.module.css';

export default function ProfileLoadingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.loaderState}>
            <Loader label="Завантажуємо профіль..." />
          </div>
        </div>
      </section>
    </div>
  );
}
