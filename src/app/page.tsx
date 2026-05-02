import NavBar from '@/components/landing/NavBar';
import Hero from '@/components/landing/Hero';
import FluxUtilisation from '@/components/landing/FluxUtilisation';
import About from '@/components/landing/About';
import Comment from '@/components/landing/Comment';
import Demo from '@/components/landing/Demo';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Page() {
  return (
    <main>
      <NavBar />
      <Hero />
      <FluxUtilisation />
      <About />
      <Comment />
      <Demo />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
