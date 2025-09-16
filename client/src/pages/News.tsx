import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "wouter";
import { latestNews } from "@/lib/data";
import NewsCard from "@/components/shared/NewsCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "ALL", value: null },
    { name: "MATCH REPORT", value: "MATCH REPORT" },
    { name: "INTERVIEW", value: "INTERVIEW" },
    { name: "TRANSFER NEWS", value: "TRANSFER NEWS" },
    { name: "ANALYSIS", value: "ANALYSIS" },
    { name: "LEAGUE NEWS", value: "LEAGUE NEWS" },
    { name: "PLAYER PROFILE", value: "PLAYER PROFILE" }
  ];

  const filteredNews = latestNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Latest Serie A News & Analysis | Serie A Insider</title>
        <meta 
          name="description" 
          content="Get the latest Serie A news, match reports, transfer rumors, and in-depth analysis of Italian football from Serie A Insider." 
        />
        <meta name="keywords" content="Serie A news, Italian football news, calcio news, Serie A transfers, Serie A match reports" />
      </Helmet>
      
      <main>
        <section className="py-12 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading text-center mb-4">Serie A News</h1>
            <p className="text-serie-gray text-center max-w-3xl mx-auto mb-8">
              Stay up to date with the latest news, match reports, transfer rumors, and in-depth analysis from Serie A.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/90 text-serie-navy pl-10"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category, index) => (
                <Button 
                  key={index}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className={`font-accent ${selectedCategory === category.value ? "bg-serie-blue" : ""}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map(news => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-serie-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-2xl font-bold font-heading text-serie-navy mb-2">No News Found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any news matching your search criteria.</p>
                <Button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}} className="bg-serie-blue hover:bg-serie-navy">
                  Reset Filters
                </Button>
              </div>
            )}

            {filteredNews.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button disabled variant="outline" className="border-serie-blue text-serie-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="bg-serie-blue text-white border-serie-blue">1</Button>
                  <Button variant="outline" className="text-serie-blue border-serie-blue">2</Button>
                  <Button variant="outline" className="text-serie-blue border-serie-blue">3</Button>
                  <Button variant="outline" className="border-serie-blue text-serie-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 bg-serie-gray/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy text-center mb-8">Featured Article</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80" 
                    alt="Serie A Analysis" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="bg-serie-blue text-white text-xs font-accent inline-block px-3 py-1 rounded mb-3">
                    ANALYSIS
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-serie-navy mb-3">
                    The Evolution of Tactics in Serie A: A Deep Dive into Italy's Tactical Renaissance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    From catenaccio to the modern high-pressing game, Italian football has always been at the forefront of tactical innovation. This in-depth analysis explores how Serie A coaches are redefining the game.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-serie-gray/30 mr-3"></div>
                      <div>
                        <div className="font-bold text-serie-navy">Marco Rossi</div>
                        <div className="text-xs text-gray-500">Tactical Analyst</div>
                      </div>
                    </div>
                    <Link href="/news/tactical-analysis">
                      <a className="text-serie-light-blue hover:underline font-accent">
                        Read More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-serie-blue text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-heading mb-3">Never Miss a Story</h2>
              <p className="text-serie-gray">
                Subscribe to our newsletter and get the latest Serie A news, match previews, and exclusive content delivered to your inbox.
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30"
              />
              <Button className="bg-white text-serie-blue hover:bg-serie-gray">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default News;
