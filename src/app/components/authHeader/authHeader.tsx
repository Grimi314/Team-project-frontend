import Link from 'next/link';
import css from './authHeader.module.css';
import { AppIcon } from '../icon/appIcon';

export default function AuthHeader() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/">
          <AppIcon icon="icon-Company-Logo" className={css.logo} />
        </Link>
      </div>
    </header>
  );
}
