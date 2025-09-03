import { prisma } from "@/lib/prisma";

type Team = {
  id: number;
  name: string;
  city: string | null;
  image: string | null;
};

type PlayerWithTeam = {
  id: number;
  name: string;
  position: string | null;
  number: number | null;
  image: string | null;
  teamId: number | null;
  teamName: string | null;
  teamCity: string | null;
  teamImage: string | null;
};

export default async function DashboardPage() {
  // Fetch data directly from Prisma
  const [teams, players] = await Promise.all([
    prisma.team.findMany(),
    prisma.player.findMany({
      include: {
        team: true,
      },
    }),
  ]);

  // Map players into PlayerWithTeam shape
  const playersWithTeam: PlayerWithTeam[] = players.map((p) => ({
    id: p.id,
    name: p.name,
    position: p.position,
    number: p.number,
    image: p.image,
    teamId: p.teamId,
    teamName: p.team?.name ?? null,
    teamCity: p.team?.city ?? null,
    teamImage: p.team?.image ?? null,
  }));

  return (
    <div className="p-6 space-y-12">
      {/* Teams Section */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Teams</h1>
        <div className="grid grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="rounded-xl shadow p-4 bg-white">
              {team.image && (
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full h-40 object-cover rounded-full mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <p className="text-gray-600">{team.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Players Section */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Players</h1>
        <div className="grid grid-cols-4 gap-6">
          {playersWithTeam.map((player) => (
            <div key={player.id} className="rounded-xl shadow p-4 bg-white">
              {player.image && (
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-[500px] object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{player.name}</h2>
              <p className="text-gray-600">{player.position}</p>
              <p className="text-gray-500">#{player.number}</p>

              {player.teamName && (
                <div className="mt-3 flex items-center gap-2">
                  {player.teamImage && (
                    <img
                      src={player.teamImage}
                      alt={player.teamName}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">{player.teamName}</p>
                    <p className="text-xs text-gray-500">{player.teamCity}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
