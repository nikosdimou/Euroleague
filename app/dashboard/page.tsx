import { prisma } from "@/lib/prisma";
import NewPlayerPage from "./players/page";
import NewTeamPage from "./teams/page";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react";

export default async function DashboardPage() {
  // Fetch counts + lists
  const [teams, players, matches] = await Promise.all([
    prisma.team.findMany(),
    prisma.player.findMany({ include: { team: true } }),
    prisma.match.findMany(),
  ]);

  const teamCount = teams.length;
  const playerCount = players.length;
  const matchCount = matches.length;

  return (
     <div className="@container/main flex flex-1 flex-col gap-2">
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Players</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {playerCount}
          </CardTitle>
          <CardAction>
           
              
            
          </CardAction>
        </CardHeader>
        
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Teams</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {teamCount}
          </CardTitle>
          <CardAction>
            
          </CardAction>
        </CardHeader>
        
      </Card>
     
       
       
      
    </div>
     <div className="p-6 space-y-12">
          <section>
            <div className="grid grid-cols-3 gap-6">
            <NewPlayerPage />
            <NewTeamPage />
            </div>
          </section>
        </div>

     </div>
     </div>

    
        
     
    
  );
}
