'use client';
import { useAuthStore } from '@/auth/model/authStore';
import HeaderModal from './heder-modal/header-modal';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import css from './header.module.css';
import { AppIcon } from '../icon/appIcon';

import { usePathname } from 'next/navigation';

import AuthBlock from './authBlock';

export default function Header() {
   const [isDarkTheme, setIsDarkTheme] = useState(false)

   useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme === 'dark-theme') {
      setIsDarkTheme(true)
      document.body.classList.add('dark-theme')
    }
   },[])

   const handleThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsDarkTheme(checked)

    if(checked) {
      document.body.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light-theme')
    }
   }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuth = Boolean(user);

  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const pathname = usePathname()

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  if (pathname.startsWith('/auth')) {
    return null;
  }

  return isMenuOpen ? (
    <HeaderModal onClose={closeMenu} />
  ) : (
    <header className={css.header}>
      <div className={css.container}>

      
      <Link href="/">
        <AppIcon icon="icon-Company-Logo" className={css.logo} />
      </Link>

      <div className={css.themWwrapp}>
        <input 
        type="checkbox"
        id='theme-toggle' 
        className={css.checkboxTheme}
        checked={isDarkTheme}
        onChange={handleThemeToggle}
        />
        <label 
        htmlFor="theme-toggle"
        className={css.labelTheme}
        >
          <span className={css.themeSlider}>
          <svg className={css.leafIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" id="Leaf--Streamline-Tabler" height="24" width="24">
            <path d="M5 21c0.5 -4.5 2.5 -8 7 -10" strokeWidth="2"></path>
            <path d="M9 18c6.218 0 10.5 -3.288 11 -12V4h-4.014c-9 0 -11.986 4 -12 9 0 1 0 3 2 5h3z" strokeWidth="2"></path>
          </svg>
          </span>
        </label>
      </div>

      <nav className={css.wrapper}>
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
            <Link className={css.navText} href="/travellers" prefetch={false}>
              Еко-Мандрівники
            </Link>
          </li>
          {isAuth && user && (
            <li className={css.navListItem}>
              <Link className={css.navText} href="/profile" prefetch={false}>
                Мій Профіль
              </Link>
            </li>
          )}
        </ul>

        <div className={css.buttonContainer}>
          {isAuth && user ? (
            <>
              <Link href="/stories/new" className={css.buttonEddStory}>
                Опублікувати статтю
              </Link>

              <div className={css.desktopAuthBlock}>
                <AuthBlock />
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={css.buttonLogin}>
                Вхід
              </Link>

              <Link href="/auth/register" className={css.buttonRegister}>
                Реєстрація
              </Link>
            </>
          )}

          <button
            type="button"
            className={css.button}
            onClick={openMenu}
            aria-label="Відкрити меню"
          >
            <AppIcon icon="icon-menu" className={css.menu} />
          </button>
        </div>
      </nav>
      </div>
    </header>
  );
}
