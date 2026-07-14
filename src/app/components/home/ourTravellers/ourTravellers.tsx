'use client';

import { AppIcon } from '@/app/components/icon/appIcon';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { fetchTravellers, type Traveller } from '@/lib/api/travellers';
import TravellerCard from '../../travellerCard/travellerCard';

import css from './ourTravellers.module.css';

function splitIntoGroups(items: Traveller[], groupSize: number): Traveller[][] {
  if (!Array.isArray(items) || groupSize <= 0) {
    return [];
  }

  const groups: Traveller[][] = [];

  for (let i = 0; i < items.length; i += groupSize) {
    groups.push(items.slice(i, i + groupSize));
  }

  return groups;
}

export default function OurTravellers() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Захист від помилок гідратації SSR в Next.js

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateScreen = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateScreen();

    mediaQuery.addEventListener('change', updateScreen);

    return () => {
      mediaQuery.removeEventListener('change', updateScreen);
    };
  }, []);

  useEffect(() => {
    const loadTravellers = async () => {
      try {
        const data = await fetchTravellers(1, 12);
        setTravellers(data.users || []);
      } catch (error) {
        console.error('Не вдалося завантажити мандрівників:', error);
      }
    };

    loadTravellers();
  }, []);

  const travellerGroups = useMemo<Traveller[][]>(() => {
    // Поки сервер рендерить сторінку, використовуємо десктопний розмір (4)
    const size = isMounted && isMobile ? 3 : 4;
    return splitIntoGroups(travellers, size);
  }, [travellers, isMobile, isMounted]);

  // Запобігає блиманню верстки та помилкам гідратації
  if (!isMounted) {
    return null;
  }

  return (
    <section className={css.ourTravellersSection}>
      <div className="container">
        <div className={css.headerTravellers}>
          <h2 className={css.ourTravellersTitle}>Наші мандрівники</h2>

          <Link href="/travellers" className={css.desktopLink}>
            Всі мандрівники
          </Link>
        </div>

        <Swiper
          key={`${isMobile}-${travellerGroups.length}`}
          className={css.travellersSwiper}
          slidesPerView={1}
          spaceBetween={16}
          loop={travellerGroups.length > 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {travellerGroups.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <div className={css.travellersGroup}>
                {group.map((traveller) => (
                  <TravellerCard
                    key={traveller._id}
                    id={traveller._id}
                    name={traveller.name}
                    avatarUrl={traveller.avatarUrl}
                    articlesAmount={traveller.articlesAmount}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={css.navigation}>
          <button
            type="button"
            className={css.buttonTravelers}
            aria-label="Попередня група мандрівників"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <AppIcon icon="icon-arrow_back" className={css.navigationIcon} />
          </button>

          <button
            type="button"
            className={css.buttonTravelers}
            aria-label="Наступна група мандрівників"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <AppIcon icon="icon-arrow_forward" className={css.navigationIcon} />
          </button>
        </div>
        <Link href="/travellers" className={css.allTravellersLink}>
          Всі мандрівники
        </Link>
      </div>
    </section>
  );
}
