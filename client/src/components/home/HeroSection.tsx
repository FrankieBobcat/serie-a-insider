import { Link } from "wouter";
import { latestNews } from "@/lib/data";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  // Featured story is the first item in the latest news
  const featuredStory = latestNews[0];
  
  // Secondary stories are the next three items
  const secondaryStories = latestNews.slice(1, 4);

  return (
    <section className="bg-gradient-to-b from-serie-navy to-serie-blue">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main featured story */}
          <div className="lg:col-span-8 relative rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80"
              alt="Milan Derby Highlights"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transition-all duration-300">
              <div className="bg-serie-red text-white text-xs font-accent inline-block px-2 py-1 mb-2 rounded">
                MATCH OF THE WEEK
              </div>
              <h2 className="text-white text-3xl font-bold font-heading leading-tight mb-2">
                Milan Claims Derby Victory with Late Leão Winner
              </h2>
              <p className="text-serie-gray mb-4">
                A stunning finish by Rafael Leão secured bragging rights for the Rossoneri in a thrilling Derby della Madonnina.
              </p>
              <div className="flex items-center">
                <span className="text-serie-gray text-sm">February 17, 2024</span>
                <span className="mx-2 text-serie-gray">•</span>
                <span className="text-serie-gray text-sm">5 min read</span>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay />
              </div>
            </div>
          </div>

          {/* Secondary stories */}
          <div className="lg:col-span-4 space-y-4">
            {secondaryStories.map((story) => (
              <Link key={story.id} href={`/news/${story.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="flex h-32">
                    <div className="w-1/3">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-4">
                      <div className={`${story.categoryColor} text-white text-xs font-accent inline-block px-2 py-1 mb-2 rounded`}>
                        {story.category}
                      </div>
                      <h3 className="text-serie-navy font-heading font-bold">{story.title}</h3>
                      <div className="mt-2 text-xs text-gray-500">{story.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
