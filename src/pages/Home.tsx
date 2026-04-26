import Header from '../components/Header.tsx';
import HeroSection from '../components/HeroSection.tsx';
import Features from '../components/Features.tsx';
import Destinations from '../components/Destinations.tsx';
import Footer from '../components/Footer.tsx';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Features />
      <Destinations />
      <Footer />
    </>
  );
}
