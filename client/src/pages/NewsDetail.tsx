import { Helmet } from "react-helmet-async";
import { useParams, Link } from "wouter";
import { latestNews } from "@/lib/data";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import NewsCard from "@/components/shared/NewsCard";
import { formatDate } from "@/lib/utils";

const NewsDetail = () => {
  const { id } = useParams();
  const newsId = parseInt(id || "0");
  const newsItem = latestNews.find((news) => news.id === newsId);

  // Get related articles (exclude current article and limit to 3)
  const relatedArticles = latestNews
    .filter((news) => news.id !== newsId)
    .slice(0, 3);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-serie-gray/20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-serie-navy mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/news">
            <a className="bg-serie-blue text-white px-4 py-2 rounded hover:bg-serie-navy transition">
              Back to News
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{newsItem.title} | Serie A Insider</title>
        <meta name="description" content={newsItem.excerpt} />
        <meta property="og:title" content={newsItem.title} />
        <meta property="og:description" content={newsItem.excerpt} />
        <meta property="og:image" content={newsItem.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={newsItem.title} />
        <meta name="twitter:description" content={newsItem.excerpt} />
        <meta name="twitter:image" content={newsItem.image} />
      </Helmet>
      
      <main>
        <article className="pb-12">
          {/* Article Header */}
          <header className="bg-gradient-to-b from-serie-navy to-serie-blue text-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className={`${newsItem.categoryColor} text-white text-xs font-accent inline-block px-3 py-1 rounded mb-4`}>
                {newsItem.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">{newsItem.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-serie-light-blue text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-serie-gray">{newsItem.date}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaFacebookF />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaTwitter />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaLinkedinIn />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="container mx-auto px-4 max-w-4xl -mt-6">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={newsItem.image} 
                alt={newsItem.title} 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="container mx-auto px-4 max-w-4xl py-12">
            <div className="prose prose-lg mx-auto">
              <p className="font-bold text-xl text-serie-navy">{newsItem.excerpt}</p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
              </p>
              
              <p>
                Praesent euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
              </p>
              
              <blockquote>
                The victory marks a significant turning point in the season for the team, demonstrating their resilience and tactical adaptability under pressure.
                <cite>— Team Manager</cite>
              </blockquote>
              
              <h2>Key Moments of the Match</h2>
              
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <ul>
                <li>The opening goal came from an unexpected source</li>
                <li>A tactical substitution in the 65th minute changed the momentum</li>
                <li>The goalkeeper made a crucial save in the dying minutes</li>
                <li>A late set-piece sealed the victory</li>
              </ul>
              
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <h2>Looking Ahead</h2>
              
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 border-t pt-8">
              <div className="flex items-start">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarFallback className="bg-serie-blue text-white text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold font-heading text-lg text-serie-navy mb-1">John Doe</h3>
                  <p className="text-gray-600 text-sm mb-3">Serie A Correspondent</p>
                  <p className="text-gray-600">
                    John has been covering Italian football for over a decade. He specializes in tactical analysis and has a particular interest in the development of young talent in Serie A.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Sharing */}
            <div className="mt-12">
              <Separator className="mb-6" />
              <div className="flex justify-between items-center">
                <div className="text-serie-navy font-bold">Share this article:</div>
                <div className="flex space-x-3">
                  <button className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition">
                    <FaFacebookF />
                  </button>
                  <button className="bg-[#1da1f2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition">
                    <FaTwitter />
                  </button>
                  <button className="bg-[#0077b5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition">
                    <FaLinkedinIn />
                  </button>
                  <button className="bg-[#25d366] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="py-12 bg-serie-gray/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-serie-blue text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Stay Updated</h2>
            <p className="text-serie-gray mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest Serie A news, match previews, and exclusive content directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-serie-blue font-accent rounded-lg hover:bg-serie-gray transition">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default NewsDetail;
