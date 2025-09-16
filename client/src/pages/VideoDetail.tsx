import { useParams, Link } from "wouter";
import { FaArrowLeft, FaPlay, FaClock, FaEye, FaHeart } from "react-icons/fa";
import { mediaHighlights } from "@/lib/data";
import { useState, useEffect } from "react";
import MatchHighlightShare from "@/components/media/MatchHighlightShare";
import { Helmet } from "react-helmet-async";

export default function VideoDetail() {
  const { id } = useParams();
  const videoId = parseInt(id || "0");

  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    
    // Find the video by ID
    const foundVideo = mediaHighlights.find(v => v.id === videoId);
    
    // Find related videos (same category or other criteria)
    const related = mediaHighlights
      .filter(v => v.id !== videoId)
      .slice(0, 3);
    
    setTimeout(() => {
      setVideo(foundVideo);
      setRelatedVideos(related);
      setLoading(false);
    }, 500);
  }, [videoId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-serie-blue"></div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-serie-navy mb-4">Video Not Found</h2>
          <p className="mb-4">Sorry, the video you're looking for doesn't exist.</p>
          <Link href="/media" className="text-serie-light-blue hover:underline flex items-center justify-center">
            <FaArrowLeft className="mr-2" /> Back to Media
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{video.title} | Serie A Insider</title>
        <meta name="description" content={video.description} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description} />
        <meta property="og:image" content={video.thumbnail} />
        <meta property="og:type" content="video" />
      </Helmet>
    
      <div className="container mx-auto px-4 py-8">
        <Link href="/media" className="inline-flex items-center mb-6 text-serie-light-blue hover:underline">
          <FaArrowLeft className="mr-2" /> Back to Media
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="rounded-lg overflow-hidden bg-black mb-6 aspect-video relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition">
                <div className="w-20 h-20 rounded-full bg-serie-red flex items-center justify-center">
                  <FaPlay className="text-white text-3xl" />
                </div>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-serie-navy">{video.title}</h1>
                <div className="flex space-x-2">
                  <MatchHighlightShare 
                    videoId={video.id}
                    title={video.title}
                    description={video.description}
                    thumbnail={video.thumbnail}
                  />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <span className="flex items-center">
                  <FaClock className="mr-1" /> Published: 2 days ago
                </span>
                <span className="flex items-center">
                  <FaEye className="mr-1" /> {video.views} views
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{video.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block bg-serie-navy text-white px-3 py-1 rounded text-sm font-accent">
                    {video.category}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-serie-red transition">
                    <FaHeart />
                    <span>Like</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <h2 className="text-xl font-bold text-serie-navy mb-4">More Highlights</h2>
            <div className="space-y-4">
              {relatedVideos.map(relatedVideo => (
                <Link key={relatedVideo.id} href={`/media/video/${relatedVideo.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden flex cursor-pointer hover:shadow-lg transition">
                    <div className="w-1/3 relative">
                      <img 
                        src={relatedVideo.thumbnail} 
                        alt={relatedVideo.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <FaPlay className="text-white" />
                      </div>
                    </div>
                    <div className="w-2/3 p-3">
                      <h3 className="font-bold text-sm text-serie-navy mb-1 line-clamp-2">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-gray-500">{relatedVideo.views} views</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}