import About from './components/home/about/about';
import Join from './components/home/join/join';
import OurTravellers from './components/home/ourTravellers/ourTravellers';

export default function Home() {
  return (
    <main>
      <About />
      <OurTravellers />
      <Join />
    </main>
  );
}
