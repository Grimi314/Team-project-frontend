import Link from 'next/link';
import css from './header.module.css';
import { Icon } from '../icon/icon';

export default function Header() {
  const travellerId = null;

  return (
    <header className={css.container}>
      <Link href="/">
        <Icon icon="icon-Company-Logo" className={css.logo} />
      </Link>

      <nav className={css.wrapper}>
        <ul className={css.navList}>
          <li className={css.navListItem}>
            <Link href="/" prefetch={false}>
              Головна
            </Link>
          </li>
          <li className={css.navListItem}>
            <Link href="/stories" prefetch={false}>
              Статті
            </Link>
          </li>
          <li className={css.navListItem}>
            <Link href=" /travellers" prefetch={false}>
              Еко-Мандрівники
            </Link>
          </li>
          <li className={css.navListItem}>
            <Link href={`/traveller/${travellerId}`} prefetch={false}>
              Мій Профіль
            </Link>
          </li>
        </ul>

        <div className={css.buttonContainer}>
          <Link href={'/stories/enw'} className={css.buttonEddStory}>
            Опублікувати статтю
          </Link>

          <button className={css.button}>
            <Icon icon="icon-menu" className={css.menu} />
          </button>
        </div>
      </nav>
    </header>
  );
}
