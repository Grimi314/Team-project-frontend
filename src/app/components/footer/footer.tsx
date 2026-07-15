'use client'

import css from './footer.module.css';
import { AppIcon } from '../icon/appIcon';
import Link from 'next/link';
import {  usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

   if (pathname?.startsWith('/auth')) {
    return null
  }


  return (
    <div className={css.container}>
      <footer className={css.footer}>
        <div className={css.decktopWrapper}>
          <div className={css.tabletWrapper}>
            <Link href="/">
              <AppIcon icon="icon-Company-Logo" className={css.logo} />
            </Link>

            <ul className={css.iconList}>
              <li className={css.iconItem}>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AppIcon icon="icon-facebook--1-" className={css.socialIcon} />
                </a>
              </li>
              <li className={css.iconItem}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AppIcon
                    icon="icon-instagram--1-"
                    className={css.socialIcon}
                  />
                </a>
              </li>
              <li className={css.iconItem}>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AppIcon icon="icon-x--1-" className={css.socialIcon} />
                </a>
              </li>
              <li className={css.iconItem}>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <AppIcon icon="icon-youtube--1-" className={css.socialIcon} />
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
                href="/travellers"
                prefetch={false}
              >
                Еко-Мандрівники
              </Link>
            </li>
          </ul>
        </div>
        <div className={css.footerTextContainer}> </div>
        <p className={css.footerText}>
          © {currentYear} Природні Мандри. Усі права захищені.
        </p>
      </footer>
    </div>
  );
}
