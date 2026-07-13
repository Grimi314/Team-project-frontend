'use client';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import styles from './travellersList.module.css';

import { getTravellers } from '@/lib/api/clientApi';
import { Traveller } from '@/app/types/traveller';
import TravellerCard from '@/app/components/travellerCard/travellerCard';

import { Loader } from '@/app/components/loader/loader';
import { Pagination } from '@/app/components/pagination/pagination';
//import { TravellerCardSkeleton } from '@/app/components/base/TravallerCard/TravellerCardSkeleton';

const PER_PAGE = 12;

const TravellersList = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  //const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const loadData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await getTravellers(PER_PAGE, currentPage);

      // setTotalItems(response.totalItems);
      setHasNextPage(response.nextPage);

      const newTravellers = response.users;
      setTravellers((prev) =>
        currentPage === 1 ? newTravellers : [...prev, ...newTravellers],
      );
      if (currentPage > 1) {
        setTimeout(() => {
          scrollAnchorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 200);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            'Помилка при завантаженні списку мандрівників',
        );
      } else {
        toast.error('Непередбачувана помилка. Спробуйте пізніше');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initLoad = async () => {
      await loadData(1);
    };
    initLoad();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Мандрівники</h1>
      {isLoading && travellers.length === 0 ? (
        <div className={styles.loaderBottomWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.grid}>
          {travellers.map((traveller) => (
            <div key={traveller._id}>
              <TravellerCard traveller={traveller} />
            </div>
          ))}
        </div>
      )}
      {/* Показуємо лоудер знизу лише під час дозавантаження наступних сторінок */}
      {isLoading && travellers.length > 0 && (
        <div className={styles.loaderBottomWrapper}>
          <Loader />
        </div>
      )}
      {/* Точка фокусування для скролу */}
      <div ref={scrollAnchorRef} style={{ height: '1px' }} />
      <Pagination
        onClick={handleLoadMore}
        isLoading={isLoading}
        isVisible={hasNextPage}
        className={styles.paginationWrapper}
      />
    </section>
  );
};
export default TravellersList;
