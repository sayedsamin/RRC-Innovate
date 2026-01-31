"use client";

import { motion } from "framer-motion";
import { BarChart3, ExternalLink } from "lucide-react";

interface DataSourcesChartProps {
  role: string;
}

const getSourceData = (role: string) => {
  switch (role) {
    case "hr":
      return [
        { name: "LinkedIn", value: 45, color: "bg-blue-600" },
        { name: "Glassdoor", value: 20, color: "bg-green-500" },
        { name: "Internal Slack", value: 15, color: "bg-purple-500" },
        { name: "Gartner", value: 10, color: "bg-indigo-500" },
        { name: "Gov Sites", value: 10, color: "bg-orange-500" },
      ];
    case "data-scientist":
      return [
        { name: "arXiv", value: 40, color: "bg-red-500" },
        { name: "GitHub", value: 30, color: "bg-gray-800 dark:bg-gray-200" },
        { name: "HuggingFace", value: 15, color: "bg-yellow-500" },
        { name: "Medium/Blogs", value: 10, color: "bg-green-600" },
        { name: "Reddit (r/ML)", value: 5, color: "bg-orange-500" },
      ];
    case "marketing":
      return [
        { name: "Twitter/X", value: 35, color: "bg-blue-400" },
        { name: "Reddit", value: 25, color: "bg-orange-500" },
        { name: "TechCrunch", value: 20, color: "bg-green-500" },
        { name: "Instagram", value: 15, color: "bg-pink-500" },
        { name: "Gartner", value: 5, color: "bg-indigo-500" },
      ];
    default:
      return [
        { name: "Internal Wiki", value: 40, color: "bg-blue-500" },
        { name: "SharePoint", value: 30, color: "bg-teal-500" },
        { name: "Gartner", value: 15, color: "bg-indigo-500" },
        { name: "LinkedIn", value: 10, color: "bg-blue-700" },
        { name: "Reddit", value: 5, color: "bg-orange-500" },
      ];
  }
};

export function DataSourcesChart({ role }: DataSourcesChartProps) {
  const data = getSourceData(role);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Knowledge Sources
          </h3>
          <p className="text-sm text-muted-foreground">
            Where Agent is gathering intelligence
          </p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {data.map((item, index) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.name}</span>
                </div>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
        <span>Last updated: Just now</span>
        <button className="flex items-center hover:text-primary transition-colors">
            View Source Logs <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
}
