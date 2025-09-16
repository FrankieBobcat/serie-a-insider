import { FaPlay, FaHeart } from "react-icons/fa";
import MatchHighlightShare from "@/components/media/MatchHighlightShare";
import { Link } from "wouter";

interface Video {
  id: number;
  title: string;
  description: string;
  views: string;
  thumbnail: string;
  category: string;
  videoUrl: string;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <Link href={`/media/video/${video.id}`}>
        <div className="relative aspect-video cursor-pointer">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/40 transition">
            <div className="w-16 h-16 rounded-full bg-serie-red flex items-center justify-center">
              <FaPlay className="text-white text-xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 bg-serie-navy text-white px-3 py-1 m-3 rounded text-sm font-accent">
            {video.category}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/media/video/${video.id}`}>
          <h3 className="font-bold font-heading text-lg text-serie-navy mb-2 hover:text-serie-light-blue cursor-pointer">{video.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{video.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{video.views} views</span>
          <div className="flex space-x-2 items-center">
            <button className="text-gray-500 hover:text-serie-red transition" aria-label="Like">
              <FaHeart />
            </button>
            <MatchHighlightShare 
              videoId={video.id}
              title={video.title}
              description={video.description}
              thumbnail={video.thumbnail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
