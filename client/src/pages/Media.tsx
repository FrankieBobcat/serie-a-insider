import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "wouter";
import { mediaHighlights } from "@/lib/data";
import { teams } from "@/lib/data";
import VideoCard from "@/components/shared/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Create more video data
const allVideos = [
  ...mediaHighlights,
  {
    id: 4,
    title: "Inter vs Milan: Derby Highlights",
    description: "Watch the full highlights from the thrilling Milan derby with goals from both sides.",
    views: "6.7M",
    thumbnail: "https://images.unsplash.com/photo-1610201417828-29dd1173d62f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "HIGHLIGHTS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 5,
    title: "Juventus vs Roma: Match Analysis",
    description: "Tactical breakdown of the key moments from Juventus' clash with Roma.",
    views: "2.3M",
    thumbnail: "https://images.unsplash.com/photo-1578021042022-ba1ce6d9a4c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "ANALYSIS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 6,
    title: "Napoli Star's Hat-trick Performance",
    description: "Watch all three goals from Napoli's star forward in their 4-0 victory.",
    views: "3.1M",
    thumbnail: "https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "GOALS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 7,
    title: "Best Defensive Actions - Matchday 26",
    description: "Amazing tackles, blocks, and defensive plays from the latest round of Serie A action.",
    views: "1.8M",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "DEFENSIVE PLAYS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 8,
    title: "Serie A Weekly Roundup",
    description: "Catch up on all the action from the latest round of Serie A matches in our weekly review.",
    views: "2.5M",
    thumbnail: "https://images.unsplash.com/photo-1550881111-7cfde14b8073?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "WEEKLY REVIEW",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 9,
    title: "Lazio vs Fiorentina: Full Highlights",
    description: "All the goals and key moments from the exciting clash between Lazio and Fiorentina.",
    views: "1.9M",
    thumbnail: "https://images.unsplash.com/photo-1559251606-c623743a6d76?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=340&q=80",
    category: "HIGHLIGHTS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];

const Media = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter videos based on search, team, and category
  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = !selectedTeam || video.title.includes(selectedTeam);
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    
    // Filter for tab
    if (activeTab !== "all") {
      return matchesSearch && matchesTeam && matchesCategory && video.category.toLowerCase().includes(activeTab.toLowerCase());
    }
    
    return matchesSearch && matchesTeam && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Serie A Media Highlights | Serie A Insider</title>
        <meta 
          name="description" 
          content="Watch the latest Serie A highlights, goals, skills, and analysis. Stay up to date with all the action from Italy's top football league." 
        />
        <meta name="keywords" content="Serie A highlights, Serie A goals, Italian football videos, soccer highlights, Serie A analysis" />
      </Helmet>
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-serie-navy text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
              alt="Serie A Stadium" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Serie A Media Center</h1>
              <p className="text-serie-gray text-lg mb-8">
                Watch the latest goals, highlights, and analysis from Italy's top football league. Never miss a moment of Serie A action.
              </p>
              <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/20 text-white placeholder:text-white/70 border-white/30"
                />
                <Button className="bg-serie-red hover:bg-serie-red/80">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Video */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-serie-navy mb-8">Featured Video</h2>
            
            <div className="bg-gradient-to-r from-serie-navy to-serie-blue rounded-lg overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="bg-serie-red text-white text-xs font-accent inline-block px-2 py-1 mb-4 rounded">
                    EXCLUSIVE
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
                    Serie A Weekend Review: All the Goals and Highlights
                  </h3>
                  <p className="text-serie-gray mb-6">
                    Catch up on all the action from the latest round of Serie A matches. Goals, skills, saves, and the biggest talking points from Italy's top football league.
                  </p>
                  <Button className="bg-white text-serie-navy hover:bg-serie-gray w-fit" asChild>
                    <Link href="/media/video/1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Now
                    </Link>
                  </Button>
                </div>
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1540866225557-9e4a10a19a9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=675&q=80" 
                    alt="Serie A Weekend Review" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                      <div className="w-16 h-16 bg-serie-red rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Categories */}
        <section className="py-12 bg-serie-gray/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-heading text-serie-navy">Video Gallery</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-teams">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="HIGHLIGHTS">Highlights</SelectItem>
                    <SelectItem value="GOALS">Goals</SelectItem>
                    <SelectItem value="SKILLS">Skills</SelectItem>
                    <SelectItem value="ANALYSIS">Analysis</SelectItem>
                    <SelectItem value="WEEKLY REVIEW">Weekly Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="mb-8"
            >
              <TabsList className="bg-white shadow-sm w-full justify-start overflow-x-auto flex-nowrap">
                <TabsTrigger value="all" className="font-accent">All Videos</TabsTrigger>
                <TabsTrigger value="highlights" className="font-accent">Highlights</TabsTrigger>
                <TabsTrigger value="goals" className="font-accent">Goals</TabsTrigger>
                <TabsTrigger value="skills" className="font-accent">Skills</TabsTrigger>
                <TabsTrigger value="analysis" className="font-accent">Analysis</TabsTrigger>
                <TabsTrigger value="weekly" className="font-accent">Weekly Review</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-serie-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold font-heading text-serie-navy mb-2">No Videos Found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any videos matching your search criteria.</p>
                <Button 
                  className="bg-serie-blue hover:bg-serie-navy"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTeam("all-teams");
                    setSelectedCategory("all-categories");
                    setActiveTab("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredVideos.length > 0 && (
              <div className="text-center mt-12">
                <Button className="bg-serie-blue hover:bg-serie-navy px-8">
                  Load More Videos
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Live Matches */}
        <section className="py-12 bg-gradient-to-r from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-heading mb-4 md:mb-0">Upcoming Live Matches</h2>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-serie-navy">
                View Full Schedule
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-sm text-serie-gray mb-2">
                    {num === 1 ? "Today" : num === 2 ? "Tomorrow" : "Saturday"} • {num === 1 ? "20:45" : num === 2 ? "18:00" : "15:00"} CET
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={teams[num]?.logo || "https://via.placeholder.com/30"} 
                        alt={teams[num]?.name || "Team"} 
                        className="h-8 w-8 mr-2"
                      />
                      <span className="font-accent">{teams[num]?.name || "Home Team"}</span>
                    </div>
                    <span className="text-xs bg-serie-red px-2 py-1 rounded">LIVE</span>
                    <div className="flex items-center">
                      <span className="font-accent">{teams[num + 3]?.name || "Away Team"}</span>
                      <img 
                        src={teams[num + 3]?.logo || "https://via.placeholder.com/30"} 
                        alt={teams[num + 3]?.name || "Team"} 
                        className="h-8 w-8 ml-2"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-serie-red hover:bg-serie-red/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Live
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-serie-gray/10 rounded-lg p-8 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold font-heading text-serie-navy mb-3">Subscribe to Our Channel</h2>
                <p className="text-gray-600">
                  Subscribe to the official Serie A Insider YouTube channel for exclusive video content, interviews, highlights, and behind-the-scenes footage from Italy's top football league.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Button className="bg-serie-red hover:bg-serie-red/80 px-8 py-6 text-lg">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Media;
