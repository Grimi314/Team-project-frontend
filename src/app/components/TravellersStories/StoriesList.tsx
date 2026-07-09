"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import styles from "./TravellersStories.module.css";
import StoryCard from "../StoryCard/StoryCard";
import Pagination from "../Pagination/Pagination"; 
import MessageNoStories from "../MessageNoStories/MessageNoStories";

interface Story {
  _id: string;
  img: string;
  title: string;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl?: string;
  };
  rate?: number;
}

interface StoriesListProps {
  travellerId: string;
}

export default function StoriesList({ travellerId }: StoriesListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [lastAddedCount, setLastAddedCount] = useState<number>(0);
  
  const [perPage, setPerPage] = useState<number>(4);

  const scrollRef = useRef<HTMLLIElement | null>(null);

  const getItemsPerPage = (): number => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1440 ? 6 : 4;
    }
    return 4;
  };

  const fetchStories = async (targetPage: number, currentPerPage: number, append: boolean = false) => {
    if (append) {
      setIsButtonLoading(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/users/${travellerId}/stories?page=${targetPage}&perPage=${currentPerPage}`
      );
      
      const { articles, totalPages: fetchedTotalPages } = res.data;
      const newArticles = articles || [];
      
      if (append) {
        setStories((prev) => {
          const currentIds = new Set(prev.map(s => s._id));
          const filteredNew = newArticles.filter((s: Story) => !currentIds.has(s._id));
          setLastAddedCount(filteredNew.length);
          return [...prev, ...filteredNew];
        });
        
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        setStories(newArticles);
        setLastAddedCount(0);
      }
      
      setTotalPages(fetchedTotalPages || 1);
      setPage(targetPage);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Не вдалося завантажити історії мандрівника";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    if (travellerId) {
      const initialPerPage = getItemsPerPage();
      setPerPage(initialPerPage);
      
      setStories([]);
      setPage(1);
      
      fetchStories(1, initialPerPage, false);
    }
  }, [travellerId]);

  const handleLoadMore = () => {
    if (isButtonLoading || isLoading) return;

    const nextPage = page + 1;
    if (page < totalPages) {
      fetchStories(nextPage, perPage, true);
    }
  };

  if (isLoading) {
    return <div className={styles.loader}>Завантаження історій...</div>;
  }

  if (stories.length === 0) {
    return (
      <MessageNoStories 
        message="Цей користувач ще не публікував історій" 
        btnText="Назад до історій" 
        linkUrl="/stories"
      />
    );
  }

  const firstNewStoryIndex = stories.length - lastAddedCount;

  return (
    <>
      <ul className={styles.storiesGrid}>
        {stories.map((story, index) => {
          const isFirstNewItem = page > 1 && lastAddedCount > 0 && index === firstNewStoryIndex;
          
          return (
            <li key={story._id} ref={isFirstNewItem ? scrollRef : null}>
              <StoryCard story={story} />
            </li>
          );
        })}
      </ul>
      {page < totalPages && (
        <Pagination 
          onLoadMore={handleLoadMore} 
          isLoading={isButtonLoading} 
        />
      )}
    </>
  );
}