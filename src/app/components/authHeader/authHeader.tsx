import Link from "next/link";
import css from './authHeader.module.css'
import { Icon } from "../icon/svgIcon";

export default function AuthHeader() {
    return (
        <header className={css.header}>
            <div className={css.container}>
            <Link href='/'> 
                <Icon icon="icon-Company-Logo" className={css.logo}/>
            </Link>
            </div>
        </header>
    )
}