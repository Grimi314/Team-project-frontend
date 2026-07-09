import styles from './PageTitle.module.css';

interface PageTitleProps {
  titleText: string;
  className: string;
}

export const PageTitle = ({ titleText, className }: PageTitleProps) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={`${styles.Pagetitle} ${className || ''}`}>{titleText}</h1>
    </div>
  );
};
