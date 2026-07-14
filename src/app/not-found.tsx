import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1>Сторінку не знайдено</h1>
      <Link href="/">На головну</Link>
    </section>
  );
}
