import { prisma } from "@/lib/prisma";

export default async function panathinaikosPlayersPage() {
  // Fetch only players belonging to Olympiacos
  const players = await prisma.player.findMany({
    where: {
      team: {
        name: "Panathinaikos", // filter by team name
      },
    },
    include: {
      team: true, // include team info
    },
  });

  return (
    <div className="p-6 space-y-1">
      <h1 className="text-2xl font-bold mb-6">Panathinaikos</h1>
      <div className="grid grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.id} className="rounded-xl shadow p-4 bg-white">
            {player.image && (
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-[600px] object-cover rounded-lg mb-3"
              />
            )}
            <h2 className="text-lg font-semibold">{player.name}</h2>
            <p className="text-gray-600">{player.position}</p>
            <p className="text-gray-500">#{player.number}</p>

            {player.team && (
              <div className="mt-3 flex items-center gap-2">
                {player.team.image && (
                  <img
                    src={player.team.image}
                    alt={player.team.name}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{player.team.name}</p>
                  <p className="text-xs text-gray-500">{player.team.city}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}