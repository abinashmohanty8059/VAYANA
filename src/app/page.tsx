import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeritageSection from "@/components/HeritageSection";
import CollectionSection from "@/components/CollectionSection";
import WeavingSection from "@/components/WeavingSection";
import MotifsSection from "@/components/MotifsSection";
import WhyVayana from "@/components/WhyVayana";
import EditorialBanner from "@/components/EditorialBanner";
import StorySection from "@/components/StorySection";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { IkatBorderStrip, IkatSubtleStrip } from "@/components/ui/Dividers";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <IkatBorderStrip />
      <HeritageSection />
      <IkatSubtleStrip />
      <CollectionSection />
      <WeavingSection />
      <MotifsSection />
      <WhyVayana />
      <EditorialBanner />
      <StorySection />
      <Testimonials />
      <FinalCTA />
      <IkatBorderStrip />
      <Footer />
    </main>
  );
}
