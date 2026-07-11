import Image from 'next/image';
import css from './authBlock.module.css';
import { AppIcon } from '../icon/appIcon';

type AuthBlockProps = {
  user: {
    name?: string;
    avatar?: string;
  };
  onLogout: () => void;
};

// { user, onLogout }: AuthBlockProps
// onClick = { onLogout };

export default function AuthBlock() {
  return (
    <div className={css.authBlokContainer}>
      {/* <Image
        src={user.avatar || '/default.png'}
        alt={user.name ?? 'Аватар користувача'}
        width={32}
        height={32}
      className={css.img}
      /> */}
      {/* <span className={css.name} >{user.name}</span> */}

      <div className={css.img}></div>

      <span className={css.name}>name</span>
      <button type="button" className={css.buttonLogout}>
        <AppIcon className={css.logoutSvg} icon="icon-logout" />
      </button>
    </div>
  );
}
