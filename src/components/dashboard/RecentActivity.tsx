import { FileText, MessageSquare, Plus, Bot, Brain, Database, Sparkles } from "lucide-react";

interface RecentActivityProps {
    role: string;
}

const getActivities = (role: string) => {
    const common = [
         { user: "System", action: "maintenance", target: "Scheduled for Sunday", time: "1 day ago", icon: Database, color: "text-gray-500", type: "system" },
    ];

    const hrActivities = [
        { user: "Recruiter Agent", action: "parsed", target: "50 New Resumes", time: "10 mins ago", icon: Bot, color: "text-blue-500", type: "ai" },
        { user: "Policy Bot", action: "flagged", target: "Outdated Travel Policy", time: "1 hour ago", icon: Shield, color: "text-orange-500", type: "ai" },
        { user: "Mark Johnson", action: "approved", target: "New Onboarding Flow", time: "4 hours ago", icon: FileText, color: "text-green-500", type: "user" },
    ];

    const dsActivities = [
        { user: "Research Agent", action: "discovered", target: "New Transformer Arch Paper", time: "5 mins ago", icon: Brain, color: "text-purple-500", type: "ai" },
        { user: "AutoML Bot", action: "completed", target: "Hyperparameter Tuning", time: "45 mins ago", icon: Cpu, color: "text-blue-500", type: "ai" },
        { user: "Alice Chen", action: "deployed", target: "Model v4.5.1", time: "2 hours ago", icon: Rocket, color: "text-green-500", type: "user" },
    ];

    const marketingActivities = [
        { user: "Content AI", action: "generated", target: "5 Social Media Drafts", time: "15 mins ago", icon: Sparkles, color: "text-pink-500", type: "ai" },
        { user: "Sarah Smith", action: "reviewed", target: "Q4 Campaign Strategy", time: "3 hours ago", icon: FileText, color: "text-blue-500", type: "user" },
        { user: "Sentiment Bot", action: "analyzed", target: "Twitter Feed Trends", time: "5 hours ago", icon: BarChart, color: "text-orange-500", type: "ai" },
    ];

    switch(role) {
        case 'hr': return [...hrActivities, ...common];
        case 'data-scientist': return [...dsActivities, ...common];
        case 'marketing': return [...marketingActivities, ...common];
        default: return common;
    }
}

// Helper icons needed for the arrays above but not imported in the top line, fix imports
import { Shield, Cpu, Rocket, BarChart } from "lucide-react";

export function RecentActivity({ role }: RecentActivityProps) {
  const activities = getActivities(role);

  return (
    <div className="col-span-1 rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Real-time Intelligence Feed</h3>
        <p className="text-sm text-muted-foreground">Live updates from Agents & Team.</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center border mr-4 ${activity.type === 'ai' ? 'bg-primary/10' : 'bg-muted'}`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="text-primary hover:underline cursor-pointer">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
