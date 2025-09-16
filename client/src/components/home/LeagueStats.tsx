import { Link } from "wouter";
import { leagueTable, topScorers } from "@/lib/data";

const LeagueStats = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* League table */}
          <div className="lg:col-span-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-serie-navy">Serie A Table</h2>
              <Link href="/table" className="text-serie-light-blue hover:underline font-accent text-sm">
                Full Table
              </Link>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-serie-gray">
                    <th className="py-2 px-3 text-sm font-accent">#</th>
                    <th className="py-2 px-3 text-sm font-accent">Team</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">P</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">W</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">D</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">L</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">GD</th>
                    <th className="py-2 px-3 text-sm font-accent text-center">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueTable.slice(0, 5).map((team) => (
                    <tr key={team.position} className="border-b hover:bg-serie-gray/20 cursor-pointer">
                      <td className="py-3 px-3">{team.position}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center">
                          <img src={team.teamLogo} alt={team.team} className="h-5 mr-2" />
                          <span>{team.team}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">{team.played}</td>
                      <td className="py-3 px-3 text-center">{team.won}</td>
                      <td className="py-3 px-3 text-center">{team.drawn}</td>
                      <td className="py-3 px-3 text-center">{team.lost}</td>
                      <td className="py-3 px-3 text-center">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                      <td className="py-3 px-3 text-center font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top scorers */}
          <div className="lg:col-span-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-serie-navy">Top Scorers</h2>
              <Link href="/stats/scorers" className="text-serie-light-blue hover:underline font-accent text-sm">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {topScorers.slice(0, 3).map((scorer) => (
                <div key={scorer.position} className="flex items-center bg-white rounded-lg p-3 border border-serie-gray hover:shadow-md transition">
                  <div className="mr-4 relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img src={scorer.image} alt={scorer.player} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-serie-navy text-white rounded-full w-8 h-8 flex items-center justify-center font-accent font-bold">
                      {scorer.position}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold font-heading text-serie-navy">{scorer.player}</h3>
                    <div className="flex items-center mt-1">
                      <img src={scorer.teamLogo} alt={scorer.team} className="h-5 mr-2" />
                      <span className="text-sm text-gray-600">{scorer.team}</span>
                    </div>
                  </div>
                  <div className="text-center pl-4 border-l">
                    <div className="text-2xl font-bold text-serie-blue">{scorer.goals}</div>
                    <div className="text-xs text-gray-500">goals</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeagueStats;
