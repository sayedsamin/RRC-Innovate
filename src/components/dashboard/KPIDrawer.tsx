"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, ArrowUpRight, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface KPIData {
    title: string;
    value: string;
    trend: string;
    trendValue: string;
    description: string;
    breakdown: { label: string; value: number; color: string }[];
    evidence: { title: string; source: string }[];
    impact: string[];
    actions: string[];
    confidence: string;
}

interface KPIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: KPIData | null;
}

export function KPIDrawer({ isOpen, onClose, data }: KPIDrawerProps) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                   <h2 className="text-xl font-bold tracking-tight">{data.title}</h2>
                   <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-extrabold text-primary">{data.value}</span>
                        <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full flex items-center">
                             <ArrowUpRight className="h-3 w-3 mr-1" />
                             {data.trendValue}
                        </span>
                   </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Why This Matters */}
              <div className="bg-muted/50 p-4 rounded-xl border border-muted">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Why this Matters</h3>
                <p className="text-sm leading-relaxed font-medium">
                  {data.description}
                </p>
              </div>

              {/* Breakdown */}
              <div>
                 <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    Metric Breakdown
                 </h3>
                 <div className="space-y-3">
                    {data.breakdown.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                                <span>{item.label}</span>
                                <span className="font-medium">{item.value}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                            </div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* Supporting Evidence */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Supporting Evidence</h3>
                <div className="space-y-2">
                    {data.evidence.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded flex items-center group-hover:bg-background">
                                {item.source} <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                            </span>
                        </div>
                    ))}
                </div>
              </div>

              {/* Impact by Role */}
              <div>
                 <h3 className="text-sm font-semibold mb-3">Impact by Role</h3>
                 <div className="flex flex-wrap gap-2">
                    {data.impact.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full border text-xs font-medium bg-background text-foreground shadow-sm">
                            {tag}
                        </span>
                    ))}
                 </div>
              </div>

              {/* Recommended Actions */}
              <div>
                  <h3 className="text-sm font-semibold mb-3 text-primary">Recommended Actions</h3>
                  <div className="space-y-2">
                      {data.actions.map((action, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                                <span className="font-medium">{action}</span>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Footer / Confidence */}
              <div className="pt-6 border-t mt-8">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                    <p>{data.confidence}</p>
                  </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
