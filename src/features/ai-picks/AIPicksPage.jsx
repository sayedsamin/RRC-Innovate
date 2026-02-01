import { useMemo, useState } from 'react';
import { useKMS } from '../../context/KMSContext';
import PreferencesForm from './PreferencesForm';
import ArticleCard from '../../routes/-components/ArticleCard';

export default function AIPicksPage() {
  const { userPreferences, colors, articles } = useKMS();

  const hasPreferences = 
    userPreferences.currentWork.length > 0 || 
    userPreferences.learningGoals.length > 0 || 
    userPreferences.tools.length > 0;

  // Move hooks to top level before any early returns
  const [timeBudget, setTimeBudget] = useState('5min');

  const curatedContent = useMemo(() => {
    if (!articles) return [];
    
    return articles.map(article => {
        let score = 0;
        let reasons = [];
        const searchableText = (article.title + " " + article.summary + " " + article.tags.join(" ")).toLowerCase();

        // Helper to check matches and build specific reasons
        const checkMatches = (list, type, weight) => {
            list.forEach(item => {
                if (searchableText.includes(item.toLowerCase())) {
                    score += weight;
                    
                    // Generate specific "dramatic" reasons based on type
                    let reason = "";
                    const itemProper = item.charAt(0).toUpperCase() + item.slice(1);
                    
                    if (type === "work") {
                        if (item.toLowerCase().includes("cost optimization") || item.toLowerCase().includes("finops")) {
                             reason = `Because you have worked 50+ hours on ${itemProper}`;
                        } else {
                             reason = `Because you are currently working on ${itemProper}`;
                        }
                    } else if (type === "goal") {
                        reason = `Because you are learning ${itemProper}`;
                    } else if (type === "tool") {
                        reason = `Because you actively use ${itemProper}`;
                    }
                    
                    reasons.push(reason); 
                }
            });
        };

        checkMatches(userPreferences.currentWork, "work", 3);
        checkMatches(userPreferences.learningGoals, "goal", 2);
        checkMatches(userPreferences.tools, "tool", 2);

        // Boost high priority
        if (article.priority === 'high') score += 1;

        if (score > 0) {
            // Dedupe reasons
            const uniqueReasons = [...new Set(reasons)];
            // Use the first reason as the primary "Drama" hook
            const reasonText = uniqueReasons[0];
            return { ...article, score, reasonText };
        }
        return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  }, [articles, userPreferences]);

  const displayedContent = useMemo(() => {
      if (timeBudget === '5min') return curatedContent.slice(0, 3);
      if (timeBudget === '15min') return curatedContent.slice(0, 6);
      return curatedContent;
  }, [curatedContent, timeBudget]);

  if (!hasPreferences) {
    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: colors.text, marginBottom: "32px", textAlign: "center" }}>AI Picks</h1>
        <PreferencesForm />
      </div>
    );
  }

  const renderTags = (title, items, colorTheme) => (
     <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "14px", fontWeight: "600", color: colors.textSecondary, display: "block", marginBottom: "8px", textTransform: "uppercase" }}>{title}</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {items.map((item, i) => (
                <span key={i} style={{ 
                    padding: "6px 14px", 
                    background: colorTheme.bg,
                    color: colorTheme.text,
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "500"
                }}>
                    {item}
                </span>
            ))}
        </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800", color: colors.text, marginBottom: "32px" }}>AI Curation for You</h1>
      
      <div style={{ 
          background: colors.surface, 
          borderRadius: "12px", 
          padding: "24px", 
          marginBottom: "32px",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Your Context
            <button style={{ 
                fontSize: "13px", color: colors.primary, background: "transparent", border: "none", cursor: "pointer", fontWeight: "600" 
            }} onClick={() => window.location.reload()}>
                Edit
            </button>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {renderTags("Working on", userPreferences.currentWork, { bg: "rgba(37, 99, 235, 0.1)", text: colors.primary })}
            {renderTags("Learning", userPreferences.learningGoals, { bg: "rgba(34, 197, 94, 0.1)", text: "#16a34a" })}
            {renderTags("Using", userPreferences.tools, { bg: "rgba(124, 58, 237, 0.1)", text: colors.accent })}
        </div>
      </div>

      {/* Time Budget Selector */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: colors.text }}>
            How much time do you have?
        </h3>
        <div style={{ display: "flex", background: colors.surface, padding: "4px", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
            {[
                { id: '5min', label: '⚡ Quick Update (5m)', count: 3 },
                { id: '15min', label: '☕ Coffee Break (15m)', count: 6 },
                { id: 'all', label: '🧠 Deep Dive', count: curatedContent.length }
            ].map(option => (
                <button
                    key={option.id}
                    onClick={() => setTimeBudget(option.id)}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "none",
                        background: timeBudget === option.id ? colors.primary : "transparent",
                        color: timeBudget === option.id ? "white" : colors.textSecondary,
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                >
                    {option.label}
                </button>
            ))}
        </div>
      </div>
      
      <div style={{ marginBottom: "16px", fontSize: "14px", color: colors.textSecondary }}>
        Showing top <strong style={{ color: colors.text }}>{displayedContent.length}</strong> matches for your profile.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {displayedContent.length > 0 ? (
            displayedContent.map((article) => (
                <div key={article.id} style={{ position: "relative" }}>
                    {/* Relevance Badge */}
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",
                        color: "white",
                        padding: "6px 16px",
                        borderRadius: "20px 20px 20px 0",
                        fontSize: "12px",
                        fontWeight: "600",
                        marginBottom: "-12px",
                        marginLeft: "12px",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }}>
                        <span role="img" aria-label="sparkles">✨</span> {article.reasonText}
                    </div>
                    
                    {/* Reuse ArticleCard but wrap it or assume it handles its own styles */}
                    <div style={{ transform: "scale(1)" }}> {/* Wrapper to separate from badge */}
                        <ArticleCard article={article} />
                    </div>
                </div>
            ))
        ) : (
            <div style={{ 
                textAlign: "center", 
                padding: "80px 20px", 
                color: colors.textSecondary,
                background: colors.surface,
                borderRadius: "12px",
                border: `1px dashed ${colors.border}`
            }}>
                <p style={{ fontSize: "18px", fontWeight: "500" }}>No specific recommendations found.</p>
                <p style={{ fontSize: "14px", marginTop: "8px", color: colors.textTertiary }}>Try adding more topics to your profile.</p>
            </div>
        )}
      </div>
    </div>
  );
}
