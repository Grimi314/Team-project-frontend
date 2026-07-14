'use client'

import Link from "next/link";
import css from './mainAuthNav.module.css'
import { usePathname } from "next/navigation";

export default function MainAuthNav() {
    const pathname = usePathname();
    
    const isRegisterActive = pathname === '/auth/register';
    const isLoginActive = pathname === '/auth/login';

    return (
        <nav className={css.authNav}>
            <Link
            href={'/auth/register'}
            className={`${css.navLink} ${isRegisterActive ? css.activeLink : ''}`}>
            Реєстраця
            </Link>

            <Link 
            href={'/auth/login'}
            className={`${css.navLink} ${isLoginActive ? css.activeLink : ''}`}>
            Вхід
            </Link>
        </nav>
    )
}