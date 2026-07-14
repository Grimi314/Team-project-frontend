import { Metadata } from 'next';
import TravellersList from '@/app/components/travellersPage/travellersList/travellersList';
import styles from './travellersPage.module.css';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description:
    'Познайомтеся зі спільнотою "Природні Мандри". Дізнайтеся історії їхніх подорожей, маршрути, відкриття та корисні поради для власних мандрівок на нашому сайті!',
  openGraph: {
    title: 'Мандрівники спільноти "Природні Мандри"',
    description:
      'Шукаєте компанію для походів чи подорожей? Усі активні учасники спільноти "Природні Мандри" зібрані на одній сторінці!',
    images: [
      {
        url: '/hero-desktop.jpg',
        width: 1200,
        height: 630,
        alt: 'Спільнота мандрівників',
      },
    ],
    type: 'website',
  },
};

const TravellersPage = () => {
  return (
    <div className={styles.travellersContainer}>
      <TravellersList />
    </div>
  );
};
export default TravellersPage;
