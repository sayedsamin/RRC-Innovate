"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  ThumbsUp
} from "lucide-react";
import kpiData from "@/data/kpi-data.json";
import { KPIDrawer, KPIData } from "./KPIDrawer";

export function UniversalKPIs() {
  const [selectedKPI, setSelectedKPI] = useState<KPIData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleKPIClick = (key: keyof typeof kpiData) => {
    setSelectedKPI(kpiData[key] as KPIData);
    setIsDrawerOpen(true);
  };

  return (
    <>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* 1. Trust & Quality */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleKPIClick("trust-score")}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="h-24 w-24 text-blue-500" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                            <ShieldCheck className="h-4 w-4" />
                        </span>
                        <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">Trust & Quality</h3>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-4xl font-bold tracking-tight text-blue-700 dark:text-blue-400">98%</span>
                        <span className="text-sm font-medium text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Verified
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Avg. Content Trust Score</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Source Citations</span>
                        <span className="font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-full" />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-yellow-500" />
                            Low Confidence
                        </span>
                        <span className="font-medium text-yellow-600">1.2%</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* 2. Relevance & Timeliness */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleKPIClick("relevance")}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock className="h-24 w-24 text-emerald-500" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                            <Clock className="h-4 w-4" />
                        </span>
                        <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">Relevance</h3>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-4xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">92%</span>
                        <span className="text-sm font-medium text-emerald-600 flex items-center">
                            <Zap className="h-3 w-3 mr-1" /> Fresh
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Content Updated (Last 30d)</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Role Match</span>
                        <span className="font-medium">96%</span>
                    </div>
                    <div className="w-full bg-emerald-100 dark:bg-emerald-900 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Stale content ratio</span>
                        <span className="font-medium text-yellow-600">4%</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* 3. Adoption & Engagement */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleKPIClick("adoption")}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="h-24 w-24 text-purple-500" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                            <Users className="h-4 w-4" />
                        </span>
                        <h3 className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">Adoption</h3>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-4xl font-bold tracking-tight text-purple-700 dark:text-purple-400">2.5h</span>
                        <span className="text-sm font-medium text-purple-600 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Saved
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Avg Time Saved / User / Week</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-xs text-muted-foreground">Active Users</p>
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-400">845</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-xs text-muted-foreground">Content Likes</p>
                        <p className="text-lg font-bold text-pink-700 dark:text-pink-400">12k <ThumbsUp className="inline h-3 w-3" /></p>
                    </div>
                </div>
            </div>
        </motion.div>
        </div>

        <KPIDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            data={selectedKPI} 
        />
    </>
  );
}
