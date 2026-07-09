import styles from "./MessageNoStories.module.css"
import Link from "next/link";

interface MessageNoStoriesProps {
  message: string; 
  btnText: string;
  linkUrl: string;
}

export default function MessageNoStories({ message, btnText, linkUrl}: MessageNoStoriesProps) {
    return (
    <div className={styles.NoStoriesContainer}>
        <p className={styles.NoStoriesText}>{message}</p>
        <Link href={linkUrl} className={styles.NoStoriesBtn}>{btnText}</Link>
    </div>
  );
}