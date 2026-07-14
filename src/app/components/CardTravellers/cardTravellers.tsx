import styles from './cardTravellers.module.css';
import { Traveller } from '@/lib/api/travellers';
import { TravellerInfo } from '@/app/components/travellerInfo/travellerInfo';
//import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  traveller: Traveller;
};

export default function CardTravellers({ traveller }: Props) {
  return (
    <div className={styles.card}>
      <TravellerInfo
        name={traveller.name}
        avatarUrl={traveller.avatarUrl}
        storiesCount={traveller.articlesAmount}
        variant="card"
      >
        <Link
          href={`/traveller/${traveller._id}`}
          prefetch={false}
          className={styles.profileLink}
        >
          Переглянути профіль
        </Link>
      </TravellerInfo>
    </div>
  );
}
