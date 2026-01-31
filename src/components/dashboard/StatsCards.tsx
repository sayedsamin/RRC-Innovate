import { FileText, Users, Eye, TrendingUp, Cpu, Database, Shield } from "lucide-react";

interface StatsCardsProps {
    role: string;
}

const getRoleStats = (role: string) => {
    switch (role) {
        case 'hr':
            return [
                { title: "Resumes Parsed", value: "2,450", change: "+120", icon: FileText, desc: "AI processed this week" },
                { title: "Policy Queries", value: "145", change: "+12%", icon: Users, desc: "Answered by Agent" },
                
                { title: "Active Employees", value: "1,204", change: "+10", icon: Users, desc: "In system" },
            ];
        case 'data-scientist':
             return [
                { title: "Models Trained", value: "42", change: "+3", icon: Cpu, desc: "In production" },
                { title: "Datasets Indexed", value: "15TB", change: "+2TB", icon: Database, desc: "New ingestion" },
                { title: "Paper Summaried", value: "85", change: "+15", icon: FileText, desc: "By Research Agent" },
                { title: "GPU Usage", value: "82%", change: "+5%", icon: TrendingUp, desc: "Cluster load" },
            ];
        case 'marketing':
             return [
                { title: "Campaigns Active", value: "8", change: "+2", icon: TrendingUp, desc: "Multi-channel" },
                { title: "Brand Mentions", value: "12.5k", change: "+15%", icon: Eye, desc: "AI Sentiment Analysis" },
                { title: "Content Generated", value: "34", change: "+10", icon: FileText, desc: "Drafts by CopyBot" },
                { title: "Engagement Rate", value: "4.8%", change: "+0.2%", icon: Users, desc: "Across platforms" },
            ];
        default:
            return [
                 { title: "Total Documents", value: "1,234", change: "+12.5%", icon: FileText, desc: "Active knowledge assets" },
                 { title: "Total Views", value: "45.2k", change: "+4.3%", icon: Eye, desc: "Across all departments" },
                 { title: "Active Contributors", value: "89", change: "+2.1%", icon: Users, desc: "Editors this month" },
                 { title: "Knowledge Score", value: "92%", change: "+5.4%", icon: TrendingUp, desc: "System health metric" },
            ];
    }
}

export function StatsCards({ role }: StatsCardsProps) {
  const stats = getRoleStats(role);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">
              {stat.title}
            </h3>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">{stat.change}</span> {stat.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
