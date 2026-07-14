'use client';

import { useAuthStore } from '@/auth/model/authStore';
import Link from 'next/link';
import css from './join.module.css';

export default function Join() {
  const { isAuth } = useAuthStore();

  return (
    <section className={css.joinSection} id="join">
      <div className="container">
        <div className={css.joinContent}>
          <h2 className={css.joinTitle}>
            Приєднуйся до спільноти свідомих мандрівників
          </h2>

          <p className={css.joinDescription}>
            Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
            внеском у збереження природи. Тут ти знайдеш однодумців, поради для
            сталих мандрів та натхнення для нових маршрутів Україною.
          </p>

          <Link
            href={isAuth ? '/profile' : '/auth/register'}
            className={css.joinLink}
          >
            {isAuth ? 'Збережені статті' : 'Зареєструватися'}
          </Link>
        </div>
      </div>
    </section>
  );
}
