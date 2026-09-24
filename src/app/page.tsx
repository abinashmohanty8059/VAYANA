import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeritageSection from "@/components/HeritageSection";
import CollectionSection from "@/components/CollectionSection";
import WeavingSection from "@/components/WeavingSection";
import SareeSection from "@/components/SareeSection";
import MotifsSection from "@/components/MotifsSection";
import WhyVayana from "@/components/WhyVayana";
import EditorialBanner from "@/components/EditorialBanner";
import StorySection from "@/components/StorySection";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MotionShell from "@/components/motion/MotionShell";
import { CredentialsMarquee, IkatBand, WeaveMarquee } from "@/components/ui/Dividers";

export default function Home() {
  return (
    <MotionShell chrome={<Navbar />}>
      <main>
        <Hero />
        <CredentialsMarquee />
        <HeritageSection />
        <WeaveMarquee />
        <CollectionSection />
        <WeavingSection />
        <SareeSection />
        <MotifsSection />
        <WhyVayana />
        <EditorialBanner />
        <StorySection />
        <Testimonials />
        <FinalCTA />
        <IkatBand />
      </main>
      <Footer />
    </MotionShell>
  );
}
