import About from './components/home/about/about';
import Hero from './components/home/hero/hero';
import Join from './components/home/join/join';
import OurTravellers from './components/home/ourTravellers/ourTravellers';
import PopularStories from './components/home/popularStories/popularStories';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers />
      <Join />
    </main>
  );
}
