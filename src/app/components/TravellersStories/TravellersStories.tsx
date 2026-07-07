import StoriesList from "./StoriesList";
import styles from "./TravellersStories.module.css";

interface TravellersStoriesProps {
  travellerId: string;
}

export function TravellersStories({ travellerId }: TravellersStoriesProps) {
  return (
    <section className={styles.section}>
      <StoriesList travellerId={travellerId} />
    </section>
  );
}