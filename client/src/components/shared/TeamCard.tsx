import { Link } from "wouter";

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-serie-gray/20 transition group cursor-pointer">
        <div className="w-16 h-16 flex items-center justify-center mb-3">
          <img src={team.logo} alt={team.name} className="max-w-full max-h-full" />
        </div>
        <h3 className="font-accent font-bold text-serie-navy group-hover:text-serie-light-blue transition">
          {team.name}
        </h3>
      </div>
    </Link>
  );
};

export default TeamCard;
