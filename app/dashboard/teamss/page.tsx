import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // Fetch counts + lists
  const [teams, players, matches] = await Promise.all([
    prisma.team.findMany(),
    prisma.player.findMany({ include: { team: true } }),
    prisma.match.findMany(),
  ]);


  return (
    <div>
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
                  className="w-full h-100 object-cover  mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <p className="text-gray-600">{team.city}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}