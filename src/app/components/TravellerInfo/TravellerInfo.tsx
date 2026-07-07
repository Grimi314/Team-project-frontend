import Image from 'next/image';
import styles from './TravellerInfo.module.css';
import axios from 'axios';

interface TravellerInfoProps {
  travellerId: string;
}

interface TravellerData {
  avatarUrl: string;
  name: string;
  articlesAmount: number;
}

export const TravellerInfo = async ({ travellerId }: TravellerInfoProps) => {
  let user: TravellerData | null = null;

  try {
    const res = await axios.get(`http://localhost:3000/api/users/${travellerId}`);
    user = res.data.user;
  } catch (error) {
    console.error('Помилка завантаження мандрівника:', error);
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
          priority
        />
      </div>
      <div className={styles.infoBlock}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.count}>Статей: {user.articlesAmount}</p>
      </div>
    </div>
  );
};