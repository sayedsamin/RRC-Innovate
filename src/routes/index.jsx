import { createFileRoute } from '@tanstack/react-router';
import { useKMS } from '../context/KMSContext';
import AnalyticsDashboard from './-components/AnalyticsDashboard';
import SkillsSection from './-components/SkillsSection';
import ArticleCard from './-components/ArticleCard';

export const Route = createFileRoute('/')({
  component: DashboardView,
});

function DashboardView() {
  const { stats, articles, categories, colors } = useKMS();

  return (
    <div className="dashboard-view" style={{ maxWidth: "1400px", margin: "0 auto" }}>
      
      {/* 1. Advanced Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* 2. Feature Component */}
      <div className="categories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = articles.filter((a) => a.category === cat.id).length;
          return (
            <div key={cat.id} style={{ 
                background: colors.surface, border: `2px solid ${colors.border}`, 
                borderRadius: "12px", padding: "28px", textAlign: "center", cursor: "pointer" 
            }}>
              <div style={{ 
                  width: "64px", height: "64px", borderRadius: "16px", 
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                  backgroundColor: cat.color, color: "var(--color-white)"
              }}>
                <Icon size={28} />
              </div>
              <h3 style={{ fontSize: "18px", marginBottom: "8px", color: colors.text, fontWeight: "700" }}>{cat.name}</h3>
              <div style={{ color: colors.textSecondary, fontSize: "14px" }}>{count} items</div>
            </div>
          );
        })}
      </div>

      {/* 3. Feature Component */}
      <SkillsSection colors={colors} />

      {/* 4. Article List */}

    </div>
  );
}