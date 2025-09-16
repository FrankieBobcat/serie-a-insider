import { liveMatches } from "@/lib/data";

const LiveMatchTicker = () => {
  return (
    <div className="bg-gradient-to-r from-serie-blue to-serie-light-blue text-white py-2 overflow-hidden">
      <div className="flex space-x-12 ticker-animation" style={{ width: "fit-content" }}>
        {liveMatches.map((match) => (
          <div key={match.id} className="flex items-center space-x-2 px-4">
            <span className="font-accent">{match.homeTeam}</span>
            <img src={match.homeTeamLogo} alt={match.homeTeam} className="h-5" />
            <span className="font-bold">
              {match.homeTeamScore}-{match.awayTeamScore}
            </span>
            <img src={match.awayTeamLogo} alt={match.awayTeam} className="h-5" />
            <span className="font-accent">{match.awayTeam}</span>
            {match.status === "LIVE" ? (
              <span className="text-xs bg-serie-red px-1 rounded">
                LIVE {match.minute}'
              </span>
            ) : (
              <span className="text-xs bg-serie-green px-1 rounded">{match.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMatchTicker;
