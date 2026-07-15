'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { StoryCard } from '../../storyCard/storyCard';
import type { NormalizedProfileStory } from '@/lib/api/profile';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import css from './popularStories.module.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';

export default function PopularStories() {
  const [popularStories, setPopularStories] = useState<
    NormalizedProfileStory[]
  >([]);

  useEffect(() => {
    async function fetchPopularStories() {
      try {
        const res = await api.get(endpoints.stories.popular);
        const rawStories = Array.isArray(res.data) ? res.data : [];

        const normalizedStories: NormalizedProfileStory[] = rawStories
          .slice(0, 10)
          .map((story: any) => ({
            id: story._id || String(Math.random()),
            title: story.title || 'Без назви',
            imageUrl: story.img || null,
            excerpt: story.article
              ? `${story.article.substring(0, 100)}...`
              : '',
            rating: story.rate || 0,
            author: {
              id: story.ownerId?._id || 'unknown',
              name: story.ownerId?.name || 'Aнонім',
              avatarUrl: story.ownerId?.avatarUrl || null,
            },
            date: story.date || null,
          }));

        setPopularStories(normalizedStories);
      } catch (err) {
        console.error('Error fetching popular stories:', err);
      }
    }
    fetchPopularStories();
  }, []);

  return (
    <section className={css.popular}>
      <div className={'container ' + css.popularContainer}>
        <div className={css.popularHeader}>
          <h2 className={css.popularTitle}>Популярні статті</h2>
          <Link href="/stories" className={css.allStoriesBtnDesk}>
            Всі статті
          </Link>
        </div>

        {popularStories.length > 0 && (
          <div className={css.sliderWrapper}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              navigation={{
                prevEl: '#swiper-prev',
                nextEl: '#swiper-next',
              }}
              breakpoints={{
                375: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1440: { slidesPerView: 3 },
              }}
              className={css.swiperContainer}
            >
              {popularStories.map((story) => (
                <SwiperSlide key={story.id}>
                  <StoryCard story={story} tab="saved" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={css.navSlider}>
              <div className={css.navSliderButtons}>
                <button id="swiper-prev" className={css.navBtn}>
                  <BsArrowLeftShort className={css.arrowSlider} />
                </button>
                <button id="swiper-next" className={css.navBtn}>
                  <BsArrowRightShort className={css.arrowSlider} />
                </button>
              </div>
            </div>
          </div>
        )}
        <Link href="/stories" className={css.allStoriesBtnMobile}>
          Всі статті
        </Link>
      </div>
    </section>
  );
}
