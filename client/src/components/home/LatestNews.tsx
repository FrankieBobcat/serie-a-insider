import { Link } from "wouter";
import { latestNews } from "@/lib/data";
import NewsCard from "@/components/shared/NewsCard";

const LatestNews = () => {
  return (
    <section className="py-12 bg-serie-gray/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-serie-navy">Latest News</h2>
          <Link
            href="/news"
            className="bg-serie-blue hover:bg-serie-navy text-white px-4 py-2 rounded font-accent transition"
          >
            View All News
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.slice(0, 6).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
