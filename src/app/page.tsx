import Hero from './components/home/hero/hero';
import PopularStories from './components/home/popularStories/popularStories';
import About from './components/home/about/about';
import Join from './components/home/join/join';

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
