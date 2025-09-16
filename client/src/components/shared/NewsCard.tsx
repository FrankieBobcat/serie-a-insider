import { Link } from "wouter";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  categoryColor: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/news/${news.id}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
        <div className="relative">
          <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
          <div className={`absolute top-0 left-0 ${news.categoryColor} text-white text-xs font-accent px-2 py-1 m-3 rounded`}>
            {news.category}
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-bold font-heading text-xl text-serie-navy mb-3">{news.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{news.excerpt}</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t">
            <span className="text-gray-500 text-sm">{news.date}</span>
            <button className="text-serie-light-blue hover:underline font-accent">Read More</button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
