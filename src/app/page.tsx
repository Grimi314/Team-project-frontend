import About from './components/home/about/about';
import Hero from './components/home/hero/hero';
import Join from './components/home/join/join';
import PopularStories from './components/home/popularStories/popularStories';
import RecommendedStories from './components/recommendedStories/recommendedStories';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularStories />
      <RecommendedStories categoryId="6966a5cdbc1b90f344c2e0be" />
      <About />

      <Join />
    </main>
  );
}
