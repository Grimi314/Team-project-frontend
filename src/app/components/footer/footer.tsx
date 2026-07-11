import css from './footer.module.css';
import { Icon } from '../icon/icon';
import Link from 'next/link';
export default function Footer() {
  return (
    <div className={css.container}>
      <footer className={css.footer}>
        <div className={css.decktopWrapper}>
          <div className={css.tabletWrapper}>
            <Link href="/">
              <Icon icon="icon-Company-Logo" className={css.logo} />
            </Link>

            <ul className={css.iconList}>
              <li className={css.iconItem}>
                <a href="https://www.facebook.com/" target="_blank">
                  <Icon icon="icon-facebook--1-" className={css.socialIcon} />
                </a>
              </li>
              <li className={css.iconItem}>
                <a href="https://www.instagram.com/" target="_blank">
                  <Icon icon="icon-instagram--1-" className={css.socialIcon} />
                </a>
              </li>
              <li className={css.iconItem}>
                <a href="https://x.com/" target="_blank">
                  <Icon icon="icon-x--1-" className={css.socialIcon} />
                </a>
              </li>
              <li className={css.iconItem}>
                <a href="youtube.com/" target="_blank">
                  <Icon icon="icon-youtube--1-" className={css.socialIcon} />
                </a>
              </li>
            </ul>
          </div>

          <ul className={css.navList}>
            <li className={css.navListItem}>
              <Link className={css.navText} href="/" prefetch={false}>
                Головна
              </Link>
            </li>
            <li className={css.navListItem}>
              <Link className={css.navText} href="/stories" prefetch={false}>
                Статті
              </Link>
            </li>
            <li className={css.navListItem}>
              <Link
                className={css.navText}
                href=" /travellers"
                prefetch={false}
              >
                Еко-Мандрівники
              </Link>
            </li>
          </ul>
        </div>
        <div className={css.footerTextContainer}> </div>
        <p className={css.footerText}>
          © 2025 Природні Мандри. Усі права захищені.
        </p>
      </footer>
    </div>
  );
}
