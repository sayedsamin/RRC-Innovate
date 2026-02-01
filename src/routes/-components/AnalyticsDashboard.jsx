import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Clock, BookOpen, Zap, Info } from 'lucide-react';
import { mockAnalyticsData } from '../../../data/mockAnalyticsData';
import { useKMS } from '../../context/KMSContext';

const StatCard = ({ icon: Icon, label, value, change, colors }) => (
  <div style={{ 
      background: colors.surface, 
      border: `1px solid ${colors.border}`, 
      borderRadius: "16px", 
      padding: "24px",
      display: "flex", 
      flexDirection: "column",
      gap: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
      <div style={{ 
          padding: "10px", borderRadius: "10px", 
          background: `rgba(99, 102, 241, 0.1)`, 
          color: colors.primary 
      }}>
        <Icon size={24} />
      </div>
      <span style={{ 
          fontSize: "12px", fontWeight: "600", 
          color: change.startsWith("+") ? "#22c55e" : colors.textSecondary,
          background: change.startsWith("+") ? "rgba(34, 197, 94, 0.1)" : "rgba(0,0,0,0.05)",
          padding: "4px 8px", borderRadius: "20px"
      }}>
        {change}
      </span>
    </div>
    <div>
      <h4 style={{ fontSize: "28px", fontWeight: "800", color: colors.text, margin: 0, lineHeight: "1.2" }}>{value}</h4>
      <span style={{ fontSize: "14px", color: colors.textSecondary, fontWeight: "500" }}>{label}</span>
    </div>
  </div>
);

export default function AnalyticsDashboard() {
  const { colors } = useKMS();
  const { basicStats, hourlyActivity, skills, taskImpact, timeAllocation } = mockAnalyticsData;

  const CHART_COLORS = [colors.primary, colors.secondary, colors.accent, colors.warning];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
      
      {/* 1. Basic Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        <StatCard icon={BookOpen} label="Articles Read" value={basicStats[0].value} change={basicStats[0].change} colors={colors} />
        <StatCard icon={Clock} label="Learning Hours" value={basicStats[1].value} change={basicStats[1].change} colors={colors} />
        <StatCard icon={Zap} label="Productivity Score" value={basicStats[2].value} change={basicStats[2].change} colors={colors} />
        <StatCard icon={TrendingUp} label="Day Streak" value={basicStats[3].value} change={basicStats[3].change} colors={colors} />
      </div>

      {/* 2. Activity & Productivity Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Hourly Activity (Bar Chart) */}
        <div style={{ background: colors.surface, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginBottom: "4px" }}>Knowledge Retrieval</h3>
            <p style={{ fontSize: "12px", color: colors.textSecondary, margin: 0 }}>Avg minutes spent finding answers (Lower is better)</p>
          </div>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <BarChart data={hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                <XAxis dataKey="time" stroke={colors.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={colors.textSecondary} fontSize={12} tickLine={false} axisLine={false} unit="m" width={30}/>
                <Tooltip 
                    contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px" }}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                    formatter={(value) => [`${value} mins`, 'Engagement']}
                />
                <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} activeBar={{ fill: colors.accent }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Allocation (Donut) */}
        <div style={{ background: colors.surface, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginBottom: "4px" }}>Time Breakdown</h3>
             <p style={{ fontSize: "12px", color: colors.textSecondary, margin: 0 }}>Weekly Average Distribution</p>
          </div>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={timeAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px" }} 
                    formatter={(value) => [`${value}%`, 'Time Spent']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
                {timeAllocation.map((entry, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: colors.textSecondary }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: CHART_COLORS[index % CHART_COLORS.length] }} />
                        {entry.name}
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Skill & Trends Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Task Velocity Impact (Grouped Bar Chart) */}
        <div style={{ background: colors.surface, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, margin: 0 }}>Jira Task Velocity</h3>
                    <div 
                        title="Baseline: Avg hours per task (Last 6 mo avg).&#013;Current: Avg hours per task (This month)." 
                        style={{ cursor: "help", display: "flex", color: colors.textSecondary }}
                    >
                        <Info size={14} />
                    </div>
                </div>
                <p style={{ fontSize: "12px", color: colors.textSecondary, margin: 0 }}>Time reduction by Task Type (Hours)</p>
             </div>
             <span style={{ fontSize: "12px", color: "#22c55e", background: "rgba(34, 197, 94, 0.1)", padding: "4px 8px", borderRadius: "12px", fontWeight: "600" }}>Avg 2.5x Faster</span>
          </div>
          
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <BarChart data={taskImpact}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                <XAxis dataKey="name" stroke={colors.textSecondary} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={colors.textSecondary} fontSize={12} tickLine={false} axisLine={false} unit="h" />
                <Tooltip 
                    contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px" }} 
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="baseline" name="Baseline (Old)" fill={colors.textSecondary} fillOpacity={0.3} radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Current (With AI)" fill={colors.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: "13px", color: colors.textSecondary, textAlign: "center", marginTop: "12px" }}>
              Knowledge applied from "AI Picks" has significantly reduced cycle time across all Jira categories.
          </p>
        </div>

        {/* Skill Radar */}
        <div style={{ background: colors.surface, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginBottom: "4px" }}>Skill Evolution</h3>
            <p style={{ fontSize: "12px", color: colors.textSecondary, margin: 0 }}>Current Proficiency vs Q2 Goal</p>
          </div>
          <div style={{ height: "300px", width: "100%" }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <PolarGrid stroke={colors.border} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: colors.textSecondary, fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Current" dataKey="A" stroke={colors.accent} fill={colors.accent} fillOpacity={0.6} />
                <Radar name="Goal" dataKey="B" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "8px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
