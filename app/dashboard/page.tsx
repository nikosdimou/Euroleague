import { prisma } from "@/lib/prisma";
import NewPlayerPage from "./players/page";
import NewTeamPage from "./teams/page";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "lucide-react";
import EmployeeForm from "./employee/page";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default async function DashboardPage() {
  // Fetch counts + lists
  const [teams, players, matches, employee] = await Promise.all([
    prisma.team.findMany(),
    prisma.player.findMany({ include: { team: true } }),
    prisma.match.findMany(),
    prisma.employee.findMany()
    
    
   
  ]);
    const adminName = "Admin";

  const teamCount = teams.length;
  const playerCount = players.length;
  const matchCount = matches.length;
  const employeeCount = employee.length;
  

  return (
    
    
    
    
    <div className="@container/main flex flex-1 flex-col gap-2">
    <div className="">
      <Header adminName={adminName} />
    </div>
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
       <Card className="@container/card">
        <CardHeader>
          <CardDescription>Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
           {employeeCount}
          </CardTitle>
          <CardAction>
            
          </CardAction>
        </CardHeader>
        
      </Card>
       
      
    </div>
     
  <div className="p-6 space-y-12">
  {/* Stat Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* ... your stat cards ... */}
  </div>

  {/* Forms Section */}
  <section>
    <h2 className="text-2xl font-bold mb-6">Add Data</h2>

    {/* Forms in 3-column grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Add Team Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Add Team</h3>
        <NewTeamPage/>
      </div>

      {/* Add Player Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Add Player</h3>
        <NewPlayerPage/>
      </div>

      {/* Add Employee Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold ">Add Employee</h3>
        <EmployeeForm/>
      </div>
    </div>
  </section>
</div>

          
        </div>

     </div>
    

    
        
     
    
  );
}
