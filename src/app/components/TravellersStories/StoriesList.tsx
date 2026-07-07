"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TravellersStories.module.css";
import StoryCard from "../StoryCard/StoryCard";

interface Story {
  _id: string;
  img: string;
  title: string;
  ownerId: {
    _id: string;
    name: string;
  }
  rate?: number;
}

interface StoriesListProps {
  travellerId: string;
}

export default function StoriesList({ travellerId }: StoriesListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/articles?ownerId=${travellerId}`
        );
        setStories(res.data.articles);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Не вдалося завантажити статті";
      } finally {
        setIsLoading(false);
      }
    };

    if (travellerId) {
      fetchStories();
    }
  }, [travellerId]);

  if (isLoading) {
    return <div className={styles.loader}>Завантаження історій... ДОДАТИ ЛОАДЕР!</div>;
  }

  if (stories.length === 0) {
    return <div className={styles.noStories}>У цього мандрівника ще немає опублікованих історій.</div>;
  }

  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <li key={story._id}>
          <StoryCard story={story} />
        </li>
      ))}
    </ul>
  );
}