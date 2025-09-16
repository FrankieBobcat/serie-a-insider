import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import LeagueStats from "@/components/home/LeagueStats";
import LatestNews from "@/components/home/LatestNews";
import TeamShowcase from "@/components/home/TeamShowcase";
import FeaturedMerchandise from "@/components/home/FeaturedMerchandise";
import MediaSection from "@/components/home/MediaSection";
import FanEngagement from "@/components/home/FanEngagement";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Serie A Insider - Your Source for Italian Football News, Teams & Merchandise</title>
        <meta 
          name="description" 
          content="Get the latest Serie A news, team information, match results, and official merchandise from Italy's top football league." 
        />
      </Helmet>
      
      <main>
        <HeroSection />
        <LeagueStats />
        <LatestNews />
        <TeamShowcase />
        <FeaturedMerchandise />
        <MediaSection />
        <FanEngagement />
      </main>
    </>
  );
};

export default Home;
