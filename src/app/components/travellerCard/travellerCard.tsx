import Link from 'next/link';
import css from './travellerCard.module.css';

type TravellerCardProps = {
  id: string;
  name: string;
  avatarUrl: string | null;
  articlesAmount: number;
};

export default function TravellerCard({
  id,
  name,
  avatarUrl,
  articlesAmount,
}: TravellerCardProps) {
  return (
    <div className={css.travellerCard}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={avatarUrl || '/default.png'}
          alt={`Аватар користувача ${name}`}
        />
      </div>

      <h3 className={css.name}>{name}</h3>

      <p className={css.articlesAmount}>Статей: {articlesAmount}</p>

      <Link href={`/travellers/${id}`} className={css.profileLink}>
        Переглянути профіль
      </Link>
    </div>
  );
}
