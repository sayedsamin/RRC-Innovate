"use client";

import { Loader2, Bot, CheckCircle2 } from "lucide-react";

interface AgentStatusProps {
    role: string;
}

export function AgentStatus({ role }: AgentStatusProps) {
    const getAgents = (role: string) => {
        switch(role) {
            case 'hr':
                return [
                    { name: 'Sourcing Agent', status: 'scanning', task: 'Scanning LinkedIn for "Senior Dev"', progress: 45 },
                    { name: 'Compliance Bot', status: 'idle', task: 'Waiting for new policies', progress: 100 },
                    { name: 'Onboarding Asst', status: 'working', task: 'Preparing kits for 3 new hires', progress: 78 },
                ];
            case 'data-scientist':
                return [
                    { name: 'ArXiv Crawler', status: 'scanning', task: 'Indexing "LLM Reasoning"', progress: 62 },
                    { name: 'Data Cleaner', status: 'working', task: 'Normalizing sales_data.csv', progress: 34 },
                    { name: 'Training Monitor', status: 'idle', task: 'Model v4 Converged', progress: 100 },
                ];
             case 'marketing':
                return [
                    { name: 'Trend Watcher', status: 'scanning', task: 'Analyzing viral hashtags', progress: 88 },
                    { name: 'Copy Generator', status: 'working', task: 'Drafting email newsletters', progress: 12 },
                    { name: 'SEO Optimizer', status: 'idle', task: 'Audit complete', progress: 100 },
                ];
            default:
                return [];
        }
    }

    const agents = getAgents(role);

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Active Knowledge Agents
            </h3>
            <div className="space-y-4">
                {agents.map((agent, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{agent.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    agent.status === 'idle' ? 'bg-green-100 text-green-700' : 
                                    'bg-blue-100 text-blue-700 animate-pulse'
                                }`}>
                                    {agent.status}
                                </span>
                            </div>
                            <span className="text-muted-foreground text-xs">{agent.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full transition-all duration-500 ${agent.status === 'idle' ? 'bg-green-500' : 'bg-primary'}`} 
                                style={{ width: `${agent.progress}%` }}
                             />
                        </div>
                        <p className="text-xs text-muted-foreground pl-1">{agent.task}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
