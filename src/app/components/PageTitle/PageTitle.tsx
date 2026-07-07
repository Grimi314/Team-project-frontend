import styles from './PageTitle.module.css';

interface PageTitleProps {
  titleText: string;
}

export const PageTitle = ({ titleText }: PageTitleProps) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.Pagetitle}>{titleText}</h1>
    </div>
  );
};