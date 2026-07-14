<<<<<<< HEAD
=======
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api/axios';
import { PageTitle } from '@/app/components/PageTitle/PageTitle';
import { TravellersStories } from '@/app/components/travellersStories/travellersStories';
import { TravellerInfo } from '@/app/components/travellerInfo/travellerInfo';
import Loader from '@/app/components/loader/loader';
import styles from './travellerPage.module.css';
import { MessageNoStories } from '@/app/components/messageNoStories/messageNoStories';
import { getTravellerByIdServer } from '@/lib/api/travellers';
import { type Traveller } from '@/lib/api/travellers';

import Story from '../travelPageRender/travelPageRender';

export default function TravellerPage() {
  const params = useParams();
  const travellerId = params?.travellerId as string;

  const [travellerInfo, setTravellerInfo] = useState<Traveller>({
    _id: '',
    name: 'Мандрівник',
    avatarUrl: null,
    articlesAmount: 0,
  });
  const [stories, setStories] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  const loadStoriesData = async (
    targetPage: number,
    isInitial: boolean = false,
  ) => {
    if (!travellerId) return;
    if (isInitial) setIsInitialLoading(true);
    setIsLoadingMore(true);

    try {
      const res = await api.get(
        `/users/${travellerId}/stories?page=${targetPage}&perPage=6`,
      );

      const rawArticles = res.data?.articles || [];
      const totalItems = Number(res.data?.totalItems) || 0;

      const adaptedStories = rawArticles.map((article: any) => {
        const rawAuthor = article.ownerId || article.owner || {};

        return {
          id: article._id || article.id,
          title: article.title || 'Без назви',
          imageUrl: article.img || article.imageUrl || null,
          rating:
            typeof article.rate === 'number'
              ? article.rate
              : article.rating || 0,

          author: {
            id: rawAuthor._id || '',
            name: rawAuthor.name || 'Мандрівник',
            avatarUrl: rawAuthor.avatarUrl || null,
          },
        };
      });

      if (isInitial) {
        setStories(adaptedStories);
        setHasMore(
          adaptedStories.length > 0 && adaptedStories.length < totalItems,
        );
      } else {
        const updatedStories = [...stories, ...adaptedStories];
        setStories(updatedStories);
        setHasMore(updatedStories.length < totalItems);
      }
    } catch (error) {
      console.error('Помилка завантаження історій:', error);
    } finally {
      setIsLoadingMore(false);
      if (isInitial) setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    loadStoriesData(1, true);
  }, [travellerId]);

  useEffect(() => {
    if (!travellerId) return;

    const fetchTravellerData = async () => {
      try {
        const data = await getTravellerByIdServer(travellerId);
        setTravellerInfo(data);
      } catch (error) {
        console.error('Помилка завантаження профілю мандрівника:', error);
      }
    };

    fetchTravellerData();
  }, [travellerId]);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadStoriesData(nextPage, false);
  };

  return (
    <div className="container">
      {/* TravellerInfo буде працювати після виправлення коду на бекенді. Отримати юзера за айді - роут: users/userId: не працює на бекенді */}
      <section className={styles.sectionInfo}>
        <TravellerInfo
          name={travellerInfo.name}
          avatarUrl={travellerInfo.avatarUrl || ''}
          storiesCount={travellerInfo.articlesAmount}
        />
      </section>
      <section className={styles.sectionTitle}>
        <PageTitle titleText="Статті Мандрівника" className="page-title" />
      </section>
      <section className={styles.sectionArticles}>
        {isInitialLoading ? (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <Loader />
          </div>
        ) : stories.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '40px 0', color: '#666' }}>
            <MessageNoStories tab="user" />
          </div>
        ) : (
          <TravellersStories
            tab="own"
            stories={stories}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onShowMore={handleShowMore}
          />
        )}
      </section>
    </div>
  );
}
>>>>>>> main
