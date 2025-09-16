import { Helmet } from "react-helmet-async";
import { useParams, Link } from "wouter";
import { teams } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const TeamDetail = () => {
  const { id } = useParams();
  const teamId = parseInt(id || "0");
  const team = teams.find((team) => team.id === teamId);

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-serie-gray/20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-serie-navy mb-4">Team Not Found</h1>
            <p className="text-gray-600 mb-4">Sorry, the team you're looking for doesn't exist or has been moved.</p>
            <Link href="/teams">
              <a className="bg-serie-blue text-white px-4 py-2 rounded hover:bg-serie-navy transition">
                View All Teams
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{team.name} - Serie A Insider</title>
        <meta 
          name="description" 
          content={`Learn about ${team.name}: history, squad, coach, stadium, and latest results. Get official ${team.name} merchandise and news.`} 
        />
      </Helmet>
      
      <main>
        {/* Team Header */}
        <section className="py-12 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-3 flex items-center justify-center">
                <img src={team.logo} alt={team.name} className="max-w-full max-h-full" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold font-heading mb-2">{team.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <div className="bg-black/30 px-3 py-1 rounded text-sm">
                    <span className="font-bold">Founded:</span> {team.founded}
                  </div>
                  <div className="bg-black/30 px-3 py-1 rounded text-sm">
                    <span className="font-bold">Stadium:</span> {team.stadium}
                  </div>
                  <div className="bg-black/30 px-3 py-1 rounded text-sm">
                    <span className="font-bold">Coach:</span> {team.coach}
                  </div>
                  <div className="bg-black/30 px-3 py-1 rounded text-sm">
                    <span className="font-bold">Colors:</span> {team.colors.join(", ")}
                  </div>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <a 
                    href={team.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-serie-light-blue hover:bg-white hover:text-serie-navy text-white px-4 py-2 rounded-lg font-accent transition"
                  >
                    Official Website
                  </a>
                  <Link href={`/shop?team=${team.id}`}>
                    <a className="bg-serie-red hover:bg-white hover:text-serie-navy text-white px-4 py-2 rounded-lg font-accent transition">
                      Shop {team.shortName} Merchandise
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Tabs */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="history" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-serie-gray/30">
                  <TabsTrigger value="history" className="font-accent">History</TabsTrigger>
                  <TabsTrigger value="squad" className="font-accent">Squad</TabsTrigger>
                  <TabsTrigger value="stadium" className="font-accent">Stadium</TabsTrigger>
                  <TabsTrigger value="fixtures" className="font-accent">Fixtures & Results</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="history" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold font-heading text-serie-navy mb-4">Club History</h2>
                  <p className="text-gray-600 mb-6">{team.history}</p>
                  
                  <h3 className="text-xl font-bold font-heading text-serie-navy mb-3">Major Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-serie-gray/10 p-4 rounded-lg">
                      <span className="font-bold text-serie-blue block mb-1">Serie A Titles</span>
                      <span className="text-2xl font-accent">{team.name === "Juventus" ? "36" : team.name === "Inter" || team.name === "Milan" ? "19" : "0-10"}</span>
                    </div>
                    <div className="bg-serie-gray/10 p-4 rounded-lg">
                      <span className="font-bold text-serie-blue block mb-1">Coppa Italia</span>
                      <span className="text-2xl font-accent">{team.name === "Juventus" ? "14" : team.name === "Roma" ? "9" : "0-10"}</span>
                    </div>
                    <div className="bg-serie-gray/10 p-4 rounded-lg">
                      <span className="font-bold text-serie-blue block mb-1">European Cups</span>
                      <span className="text-2xl font-accent">{team.name === "Milan" ? "7" : team.name === "Inter" ? "3" : team.name === "Juventus" ? "2" : "0"}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-serie-navy mb-3">Main Rivals</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.rivals?.map((rival, index) => (
                      <span key={index} className="bg-serie-navy text-white px-3 py-1 rounded-full text-sm">
                        {rival}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="squad" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold font-heading text-serie-navy mb-4">Current Squad</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Goalkeepers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div key={`gk-${num}`} className="flex items-center p-3 border rounded hover:bg-serie-gray/10 transition">
                          <div className="w-12 h-12 bg-serie-gray/20 rounded-full mr-3"></div>
                          <div>
                            <div className="font-bold text-serie-navy">Goalkeeper {num}</div>
                            <div className="text-sm text-gray-500">#{Math.floor(Math.random() * 99) + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Defenders</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={`def-${num}`} className="flex items-center p-3 border rounded hover:bg-serie-gray/10 transition">
                          <div className="w-12 h-12 bg-serie-gray/20 rounded-full mr-3"></div>
                          <div>
                            <div className="font-bold text-serie-navy">Defender {num}</div>
                            <div className="text-sm text-gray-500">#{Math.floor(Math.random() * 99) + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Midfielders</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={`mid-${num}`} className="flex items-center p-3 border rounded hover:bg-serie-gray/10 transition">
                          <div className="w-12 h-12 bg-serie-gray/20 rounded-full mr-3"></div>
                          <div>
                            <div className="font-bold text-serie-navy">Midfielder {num}</div>
                            <div className="text-sm text-gray-500">#{Math.floor(Math.random() * 99) + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Forwards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div key={`fwd-${num}`} className="flex items-center p-3 border rounded hover:bg-serie-gray/10 transition">
                          <div className="w-12 h-12 bg-serie-gray/20 rounded-full mr-3"></div>
                          <div>
                            <div className="font-bold text-serie-navy">Forward {num}</div>
                            <div className="text-sm text-gray-500">#{Math.floor(Math.random() * 99) + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stadium" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold font-heading text-serie-navy mb-4">{team.stadium}</h2>
                  
                  <div className="mb-6 aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1577223624816-6cf3267c500c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80`} 
                      alt={team.stadium} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Stadium Details</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between border-b pb-2">
                          <span className="font-bold text-serie-navy">Capacity:</span>
                          <span>{team.capacity.toLocaleString()} spectators</span>
                        </li>
                        <li className="flex justify-between border-b pb-2">
                          <span className="font-bold text-serie-navy">Location:</span>
                          <span>{team.name === "Milan" || team.name === "Inter" ? "Milan" : team.name === "Roma" || team.name === "Lazio" ? "Rome" : "Italy"}</span>
                        </li>
                        <li className="flex justify-between border-b pb-2">
                          <span className="font-bold text-serie-navy">Opened:</span>
                          <span>{team.name === "Juventus" ? "2011" : "1900-1990"}</span>
                        </li>
                        <li className="flex justify-between border-b pb-2">
                          <span className="font-bold text-serie-navy">Surface:</span>
                          <span>Grass</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Getting There</h3>
                      <p className="text-gray-600 mb-4">
                        The stadium is easily accessible by public transportation. Several bus lines stop near the stadium, and there are dedicated shuttle services on match days.
                      </p>
                      <a href="#" className="text-serie-light-blue hover:underline font-accent inline-flex items-center">
                        View on Map
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold font-heading text-serie-blue mb-3">Stadium Tours</h3>
                    <p className="text-gray-600 mb-4">
                      Experience the magic of {team.stadium} with our guided tours. Visit the locker rooms, press areas, and walk through the players' tunnel onto the pitch.
                    </p>
                    <a href="#" className="bg-serie-blue hover:bg-serie-navy text-white px-4 py-2 rounded-lg font-accent transition inline-block">
                      Book Stadium Tour
                    </a>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fixtures" className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-heading text-serie-navy">Fixtures & Results</h2>
                    <div className="flex gap-2">
                      <button className="bg-serie-navy text-white px-3 py-1 rounded text-sm font-accent">Fixtures</button>
                      <button className="bg-serie-gray/20 text-serie-navy px-3 py-1 rounded text-sm font-accent">Results</button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="text-sm font-bold text-serie-blue uppercase mb-2">March 2024</div>
                    {[1, 2, 3].map((num) => (
                      <div key={`fixture-${num}`} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">Sun, Mar {10 + num * 5}, 20:45 CET</div>
                          <div className="bg-serie-light-blue text-white text-xs px-2 py-1 rounded">Serie A</div>
                        </div>
                        <div className="flex items-center justify-center my-3">
                          <div className="flex items-center justify-end flex-1">
                            <span className="font-accent mr-2">{team.name}</span>
                            <img src={team.logo} alt={team.name} className="h-8" />
                          </div>
                          <div className="px-4 font-bold">VS</div>
                          <div className="flex items-center justify-start flex-1">
                            <img src={teams[num]?.logo || team.logo} alt={teams[num]?.name || "Opponent"} className="h-8" />
                            <span className="font-accent ml-2">{teams[num]?.name || "Opponent"}</span>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">{team.stadium}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm font-bold text-serie-blue uppercase mb-2">April 2024</div>
                    {[4, 5, 6].map((num) => (
                      <div key={`fixture-${num}`} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">Sun, Apr {num * 5}, 18:00 CET</div>
                          <div className="bg-serie-light-blue text-white text-xs px-2 py-1 rounded">Serie A</div>
                        </div>
                        <div className="flex items-center justify-center my-3">
                          <div className="flex items-center justify-end flex-1">
                            <span className="font-accent mr-2">{teams[num + 1]?.name || "Opponent"}</span>
                            <img src={teams[num + 1]?.logo || team.logo} alt={teams[num + 1]?.name || "Opponent"} className="h-8" />
                          </div>
                          <div className="px-4 font-bold">VS</div>
                          <div className="flex items-center justify-start flex-1">
                            <img src={team.logo} alt={team.name} className="h-8" />
                            <span className="font-accent ml-2">{team.name}</span>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">{teams[num + 1]?.stadium || "Away Stadium"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Merchandise */}
        <section className="py-8 bg-serie-gray/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-serie-navy">{team.name} Merchandise</h2>
              <Link href={`/shop?team=${team.id}`}>
                <a className="text-serie-light-blue hover:underline font-accent text-sm">
                  View All
                </a>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={`product-${num}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="h-48 bg-serie-gray/20 flex items-center justify-center">
                    <img src={team.logo} alt={team.name} className="h-24" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-serie-navy mb-1">{team.name} {num === 1 ? "Home Jersey" : num === 2 ? "Away Jersey" : num === 3 ? "Training Shirt" : "Scarf"}</h3>
                    <div className="text-lg font-bold text-serie-blue">€{num === 1 || num === 2 ? "89.99" : num === 3 ? "59.99" : "24.99"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TeamDetail;
