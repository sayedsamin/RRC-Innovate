import { notFound } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AgentStatus } from "@/components/dashboard/AgentStatus";
import { DataSourcesChart } from "@/components/dashboard/DataSourcesChart";
import { UniversalKPIs } from "@/components/dashboard/UniversalKPIs";

// ... (rest of imports)

// ... inside component ...


const roles = {
  hr: {
    title: "HR Manager Dashboard",
    description: "Welcome to the HR management portal.",
  },
  "data-scientist": {
    title: "Data Scientist Dashboard",
    description: "Welcome to the Data Science analytics hub.",
  },
  marketing: {
    title: "Marketing Manager Dashboard",
    description: "Welcome to the Marketing campaign center.",
  },
};

export default async function RoleDashboard({ params }: { params: Promise<{ role: string }> }) {
  // Await params first
  const resolvedParams = await params;
  const role = resolvedParams.role;
  const roleKey = role as keyof typeof roles;
  const roleData = roles[roleKey];

  if (!roleData) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Sidebar */}
        <Sidebar role={role} className="min-h-screen border-r bg-sidebar" />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header title={roleData.title} />
        
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-y-auto">
             {/* Universal KPIs (Trust, Relevance, Adoption) */}
             <UniversalKPIs />

             {/* Welcome Section */}
             <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground">{roleData.description}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <StatsCards role={role} />

            {/* Dashboard Grid */}
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                
                {/* Main Widget Area - Replaced with Agent Activity for "Background Collection" feel */}
                <div className="xl:col-span-2 space-y-4">
                     {/* Search / Knowledge Entry Area could go here if separate */}
                     
                     {/* Data Source Graph */}
                     <DataSourcesChart role={role} />

                     {/* Role Specific Quick Access (Mocked dynamically) */}
                     <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Access: {role === 'hr' ? 'HR Policies' : role === 'data-scientist' ? 'Research Papers' : role === 'marketing' ? 'Brand Assets' : 'Files'}</h3>
                        <div className="space-y-4">
                            {(role === 'hr' ? ["Employee Handbook 2026", "Offer Letter Template", "Remote Work Policy"] : 
                              role === 'data-scientist' ? ["Attention Is All You Need", "YOLOv9 Architecture", "CUDA Guide"] :
                              ["Brand Guidelines", "Q4 Campaign Assets", "Social Media Kit"]
                            ).map((item, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors">
                                    <span className="text-sm font-medium border-b-0">{item}</span>
                                    <span className="text-xs text-muted-foreground">PDF</span>
                                 </div>
                            ))}
                        </div>
                     </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* Agent Status Widget */}
                    <AgentStatus role={role} />

                    {/* Recent Activity */}
                    <RecentActivity role={role} />
                </div>
                
            </div>
        </main>
      </div>
    </div>
  );
}
