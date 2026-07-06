import Image from 'next/image';
import styles from './TravellerInfo.module.css';

interface TravellerInfoProps {
  travellerId: string;
}

export const TravellerInfo = async ({ travellerId }: TravellerInfoProps) => {
  let user = null;

  try {
    const res = await fetch(`http://localhost:3000/api/users/${travellerId}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      user = data.user;
    }
  } catch (error) {
    console.error('Помилка завантаження! ДОДАТИ LAYOUT!', error);
  }

  if (!user) return <p>Мандрівника не знайдено. ДОДАТИ LAYOUT!</p>;

  return (
    <div className={styles.TravellerInfoContainer}>
      <div className={styles.avatarWrapper}>
        <Image
          src={user.avatarUrl}
          alt={user.name}
          fill
          className={styles.avatar}
          sizes="64px"
        />
      </div>
      <div className={styles.infoBlock}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.count}>Статей: {user.articlesAmount}</p>
      </div>
    </div>
  );
};