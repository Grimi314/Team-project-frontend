import About from './components/home/about/about';
import Hero from './components/home/hero/hero';
import Join from './components/home/join/join';
import PopularStories from './components/home/popularStories/popularStories';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularStories />

      <About />

      <Join />
    </main>
  );
}
