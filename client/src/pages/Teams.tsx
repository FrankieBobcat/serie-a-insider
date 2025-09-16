import { Helmet } from "react-helmet-async";
import { teams } from "@/lib/data";
import TeamCard from "@/components/shared/TeamCard";

const Teams = () => {
  return (
    <>
      <Helmet>
        <title>Serie A Teams - Serie A Insider</title>
        <meta 
          name="description" 
          content="Explore all 20 Serie A teams with detailed information about each club, including history, squad, coach, and more." 
        />
      </Helmet>
      
      <main>
        <section className="py-12 bg-gradient-to-b from-serie-navy to-serie-blue text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold font-heading text-center mb-4">Serie A Teams</h1>
            <p className="text-serie-gray text-center max-w-3xl mx-auto">
              Discover detailed information about all 20 clubs competing in Italy's top football division.
              Each team page features club history, current squad, coach bio, stadium details, and much more.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Teams;
