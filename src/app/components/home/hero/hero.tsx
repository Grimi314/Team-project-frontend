import styles from './hero.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { PageTitle } from '../../PageTitle/PageTitle';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={'container ' + styles.heroContainer}>
        <div className={styles.heroBox}>
          <div className={styles.heroContent}>
            <PageTitle
              titleText="Відкрий Україну заново — еко-мандри для натхнення"
              className={styles.heroTitle}
            />
            <p className={styles.heroText}>
              Подорожуй екологічно, відкривай заповідні місця, гори та річки
              України. Ми зібрали маршрути, які допоможуть побачити красу
              природи без шкоди для неї.
            </p>
          </div>
          <Link href="/#join" className={styles.heroBtnLink}>
            Доєднатись до мандрів
          </Link>
        </div>

        <Image
          src="/hero.jpg"
          alt="green hills"
          width={3072}
          height={2048}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 375px) 100vw, (max-width: 768px) 100vw"
          className={styles.heroImage}
          priority
        />
      </div>
    </section>
  );
}
