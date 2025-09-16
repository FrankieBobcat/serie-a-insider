import { Link } from "wouter";
import { teams } from "@/lib/data";
import TeamCard from "@/components/shared/TeamCard";

const TeamShowcase = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold font-heading text-serie-navy text-center mb-4">
          Serie A Teams
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore in-depth information about all 20 clubs competing in Italy's top football division.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {teams.slice(0, 10).map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/teams"
            className="inline-block bg-serie-navy hover:bg-serie-blue text-white font-accent px-6 py-3 rounded-lg transition"
          >
            Explore All Teams
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-serie-blue/5 to-serie-light-blue/5 z-0"></div>
    </section>
  );
};

export default TeamShowcase;
