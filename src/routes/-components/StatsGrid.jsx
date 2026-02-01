import React from "react";
import { FileText, Clock, AlertCircle, MessageCircle } from "lucide-react";

const StatsGrid = ({ stats, colors }) => {
  const statItems = [
    { icon: FileText, value: stats.totalArticles, label: "Total Articles", gradient: [colors.primary, colors.secondary] },
    { icon: Clock, value: stats.thisWeek, label: "Added This Week", gradient: [colors.accent, colors.cyan] },
    { icon: AlertCircle, value: stats.highPriority, label: "High Priority", gradient: [colors.warning, colors.danger] },
    { icon: MessageCircle, value: stats.totalEngagement, label: "Total Engagement", gradient: [colors.secondary, colors.primary] },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
      {statItems.map((item, index) => (
        <div key={index} style={{ 
            background: colors.surface, border: `2px solid ${colors.border}`, 
            borderRadius: "12px", padding: "24px", display: "flex", gap: "20px", alignItems: "center" 
        }}>
          <div style={{ 
              width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`, color: "var(--color-white)"
          }}>
            <item.icon size={24} />
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "800", color: colors.text }}>{item.value}</div>
            <div style={{ fontSize: "14px", color: colors.textSecondary, fontWeight: "600", marginTop: "4px" }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;