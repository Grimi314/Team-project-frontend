'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section>
      <h1>Щось пішло не так</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Спробувати ще раз</button>
    </section>
  );
}
