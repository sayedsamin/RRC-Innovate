import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useKMS } from '../context/KMSContext';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  Settings, 
  RefreshCw,
  Clock,
  Globe,
  MoreHorizontal,
  Brain
} from 'lucide-react';

export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
});

function AssessmentPage() {
  const { colors, isDarkMode } = useKMS(); // Added isDarkMode
  const [activeTab, setActiveTab] = useState('live');
  const [threshold, setThreshold] = useState(85);

  // Mock Feed Data
  const [items, setItems] = useState([
    {
      id: 1,
      status: 'approved',
      title: 'Scaling Laws for Neural Language Models',
      source: 'arXiv AI Papers',
      reason: 'High-quality research, clear relevance',
      category: 'AI Fundamentals',
      confidence: 96,
      time: '30 seconds ago'
    },
    {
      id: 2,
      status: 'rejected',
      title: 'Top 10 AI Memes This Week',
      source: 'TechCrunch AI',
      reason: 'Low signal-to-noise ratio, classified as entertainment',
      category: 'Social Media',
      confidence: 12,
      time: '1 minute ago'
    },
    {
      id: 3,
      status: 'flagged',
      title: 'Migrating Legacy Monoliths to Microservices',
      source: 'Medium / Tech Blog',
      reason: 'Potential duplicate of existing internal guide. Human review needed.',
      category: 'Architecture',
      confidence: 82,
      time: '2 minutes ago'
    },
    {
      id: 4,
      status: 'approved',
      title: 'PostgreSQL 16 New Features Deep Dive',
      source: 'Postgres Official Blog',
      reason: 'Official documentation update, highly relevant to engineering.',
      category: 'Database',
      confidence: 98,
      time: '5 minutes ago'
    }
  ]);

  const handleDetails = () => {
      // Placeholder for expanding details
      alert("Opening detailed view...");
  };

  const handleAction = (id, newStatus) => {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
  };

  // UI Helpers
  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'approved':
        return (
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={24} />
          </div>
        );
      case 'rejected':
        return (
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <XCircle size={24} />
          </div>
        );
      case 'flagged':
        return (
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(234, 179, 8, 0.1)", color: "#eab308", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle size={24} />
          </div>
        );
      default: return null;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'approved': return <span style={{ fontWeight: "700", color: "#22c55e", fontSize: "12px", letterSpacing: "1px" }}>AUTO-APPROVED</span>;
      case 'rejected': return <span style={{ fontWeight: "700", color: "#ef4444", fontSize: "12px", letterSpacing: "1px" }}>AUTO-REJECTED</span>;
      case 'flagged': return <span style={{ fontWeight: "700", color: "#eab308", fontSize: "12px", letterSpacing: "1px" }}>FLAGGED</span>;
      default: return null;
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "40px" }}>
      
      {/* HEADER & METRICS */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
             <h1 style={{ fontSize: "24px", fontWeight: "800", color: colors.text, margin: 0 }}>AI Knowledge Engine</h1>
             <span style={{ 
               padding: "4px 12px", borderRadius: "20px", 
               border: "1px solid #22c55e", color: "#22c55e", 
               fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px"
             }}>
               <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }}></span>
               Actively Processing
             </span>
           </div>
           <button style={{ background: "transparent", border: "none", cursor: "pointer", color: colors.textSecondary }}><XCircle size={20}/></button>
        </div>

        {/* METRICS ROW */}
        <div style={{ 
          display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px",
          background: colors.surface, borderRadius: "16px", padding: "24px 32px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: `1px solid ${colors.border}`
        }}>
           {[
             { label: "PROCESSED TODAY", value: "1247", color: colors.text },
             { label: "AUTO-APPROVED", value: "1189", color: "#22c55e" },
             { label: "AUTO-REJECTED", value: "43", color: "#ef4444" },
             { label: "FLAGGED", value: "15", color: "#eab308" },
             { label: "DUPLICATES", value: "28", color: colors.text },
             { label: "AVG TIME", value: "1.2s", color: colors.text }
           ].map((stat, i) => (
             <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
               <span style={{ fontSize: "11px", fontWeight: "700", color: colors.textSecondary, letterSpacing: "0.5px" }}>{stat.label}</span>
               <span style={{ fontSize: "28px", fontWeight: "800", color: stat.color }}>{stat.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* CONTROLS & TABS */}
      <div style={{ marginBottom: "24px" }}>
        {/* TABS */}
        <div style={{ display: "flex", gap: "32px", borderBottom: `1px solid ${colors.border}`, marginBottom: "24px" }}>
           {['Live Activity', 'Flagged for Review (2)', 'Sources (8)'].map((tab) => {
             const key = tab.split(' ')[0].toLowerCase();
             const isActive = activeTab === key || (key === 'flagged' && activeTab === 'flagged');
             return (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(key)}
                 style={{ 
                   background: "transparent", border: "none", padding: "12px 0", cursor: "pointer",
                   fontSize: "14px", fontWeight: "600",
                   color: isActive ? colors.primary : colors.textSecondary,
                   borderBottom: isActive ? `2px solid ${colors.primary}` : "2px solid transparent",
                   display: "flex", alignItems: "center", gap: "8px"
                 }}
               >
                 {key === 'live' && <Activity size={16} />}
                 {key === 'flagged' && <AlertTriangle size={16} />}
                 {key === 'sources' && <Globe size={16} />}
                 {tab}
               </button>
             );
           })}
        </div>

        {/* DESCRIPTION + SLIDER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
           <p style={{ color: colors.textSecondary, fontSize: "14px", margin: 0 }}>
             Real-time AI decisions. The system autonomously approves high-confidence content, rejects low-quality items, and flags edge cases for human review.
           </p>
           
           <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
             <label style={{ fontSize: "13px", fontWeight: "700", color: colors.text, whiteSpace: "nowrap" }}>
               Auto-Approval Threshold: {threshold}%
             </label>
             <div style={{ flex: 1, position: "relative", height: "6px", background: colors.border, borderRadius: "3px" }}>
               <div style={{ 
                 position: "absolute", left: 0, top: 0, height: "100%", width: `${threshold}%`, 
                 background: colors.primary, borderRadius: "3px" 
               }}></div>
               <div style={{
                 position: "absolute", left: `${threshold}%`, top: "50%", transform: "translate(-50%, -50%)",
                 width: "16px", height: "16px", background: colors.primary, borderRadius: "50%", cursor: "grab",
                 border: "2px solid white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
               }} 
               onMouseDown={(e) => {
                 // Simple mock drag logic implies user interaction
                 // In a real app we'd bind mouseMove handlers
               }}
               title="Drag to adjust"
               ></div>
             </div>
           </div>
        </div>
      </div>

      {/* FEED LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
         {items
            .filter(item => {
                if (activeTab === 'flagged') return item.status === 'flagged';
                if (activeTab === 'sources') return false; 
                return true; 
            })
            .map((item) => (
           <div key={item.id} style={{ 
             background: colors.surface, borderRadius: "16px", border: `1px solid ${colors.border}`,
             padding: "20px", display: "flex", gap: "20px",
             position: "relative", overflow: "hidden"
           }}>
             {/* Left Status Line */}
             <div style={{ 
               position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
               background: item.status === 'approved' ? "#22c55e" : item.status === 'rejected' ? "#ef4444" : "#eab308"
             }}></div>

             {/* Icon */}
             <div>
                <StatusBadge status={item.status} />
             </div>

             {/* Content */}
             <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  {getStatusLabel(item.status)}
                  <span style={{ fontSize: "12px", color: colors.textSecondary }}>{item.time}</span>
                </div>
                
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: colors.text, margin: "0 0 4px 0" }}>{item.title}</h3>
                <div style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: "12px" }}>Source: {item.source}</div>

                {/* AI Reasoning Box */}
                <div style={{ 
                  background: isDarkMode ? "rgba(255,255,255,0.03)" : "#f8fafc", 
                  padding: "10px 16px", borderRadius: "8px",
                  display: "flex", alignItems: "center", gap: "8px",
                  fontSize: "13px", color: colors.text, fontStyle: "italic"
                }}>
                   <Brain size={14} color={colors.primary} />
                   {item.reason}
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "12px", fontSize: "12px", color: colors.textSecondary }}>
                   <span>Category: {item.category}</span>
                   <span>•</span>
                   <span>Confidence: {item.confidence}%</span>
                </div>
             </div>

             {/* Actions */}
             <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                {item.status === 'flagged' ? (
                    <>
                        <button 
                            onClick={() => handleAction(item.id, 'approved')}
                            style={{ 
                                background: "#22c55e", color: "white", 
                                border: "none", borderRadius: "8px", 
                                padding: "8px 16px", fontSize: "13px", fontWeight: "600",
                                display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                                boxShadow: "0 2px 4px rgba(34, 197, 94, 0.3)"
                            }}
                        >
                            <CheckCircle size={14} /> Approve
                        </button>
                        <button 
                             onClick={() => handleAction(item.id, 'rejected')}
                             style={{ 
                                background: "transparent", color: "#ef4444", 
                                border: "1px solid #ef4444", borderRadius: "8px", 
                                padding: "8px 16px", fontSize: "13px", fontWeight: "600",
                                display: "flex", alignItems: "center", gap: "6px", cursor: "pointer"
                            }}
                        >
                            <XCircle size={14} /> Reject
                        </button>
                    </>
                ) : (
                    <button style={{ background: "transparent", border: "none", color: colors.textSecondary, cursor: "pointer", height: "fit-content" }}>
                        <MoreHorizontal size={20} />
                    </button>
                )}
             </div>
           </div>
         ))}
      </div>

    </div>
  );
}
