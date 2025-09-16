import { Link } from "wouter";
import { mediaHighlights } from "@/lib/data";
import VideoCard from "@/components/shared/VideoCard";

const MediaSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-serie-navy mb-4">Media Highlights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Catch up with the most spectacular moments from recent Serie A action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaHighlights.map((highlight) => (
            <VideoCard key={highlight.id} video={highlight} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/media"
            className="inline-block bg-serie-light-blue hover:bg-serie-navy text-white font-accent px-6 py-3 rounded-lg transition"
          >
            Browse All Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
