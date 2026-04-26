import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import Affiliations  from "@/components/Affiliations";
import Overview      from "@/components/Overview";
import Hardware      from "@/components/Hardware";
import AIModels      from "@/components/AIModels";
import Pipeline      from "@/components/Pipeline";
import Architecture  from "@/components/Architecture";
import Performance   from "@/components/Performance";
import Footer        from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Navbar />
      <main>
        <Hero />
        <Affiliations />
        <Overview />
        <Hardware />
        <AIModels />
        <Pipeline />
        <Architecture />
        <Performance />
      </main>
      <Footer />
    </>
  );
}
