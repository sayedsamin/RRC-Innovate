import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2, Sparkles, Lock, BookOpen } from 'lucide-react';
import { useKMS } from '../../context/KMSContext';

export default function LearningPathSidebar({ learningPath }) {
  const { colors, userPreferences } = useKMS();
  const [visibleItems, setVisibleItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(true);

  // Combine all user context tags for matching
  const userKnownTags = [
    ...userPreferences.currentWork,
    ...userPreferences.learningGoals,
    ...userPreferences.tools
  ].map(t => t.toLowerCase());

  useEffect(() => {
    if (!learningPath) return;

    setIsGenerating(true);
    setVisibleItems([]);

    // Simulate AI generation streaming
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= learningPath.length) {
        clearInterval(interval);
        setIsGenerating(false);
        return;
      }
      
      setVisibleItems(prev => [...prev, learningPath[currentIndex]]);
      currentIndex++;
    }, 800); // Add a new item every 800ms

    return () => clearInterval(interval);
  }, [learningPath]);

  const isCompleted = (item) => {
    // Check if any of the item's matchTags exist in user's known tags
    if (!item || !item.matchTags) return false;
    return item.matchTags.some(tag => userKnownTags.includes(tag.toLowerCase()));
  };

  return (
    <div style={{ 
        background: colors.surface, 
        borderLeft: `1px solid ${colors.border}`, 
        height: "100%", 
        padding: "24px",
        minHeight: "calc(100vh - 80px)", // rough approx
        position: "relative"
    }}>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
        <Sparkles size={20} color={colors.accent} />
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.text, margin: 0 }}>
            Your Learning Path
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
        {/* Connecting Line */}
        <div style={{ 
            position: "absolute", left: "11px", top: "12px", bottom: "24px", 
            width: "2px", background: `linear-gradient(to bottom, ${colors.primary} 0%, ${colors.border} 100%)`, 
            zIndex: 0 
        }} />

        {visibleItems.map((item, index) => {
            if (!item) return null; // Safe guard against undefined items
            const completed = isCompleted(item);
            return (
                <div key={index} style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1, animation: "fadeIn 0.5s ease-out" }}>
                    <div style={{ 
                        width: "24px", height: "24px", borderRadius: "50%", 
                        background: completed ? colors.primary : colors.surface,
                        border: `2px solid ${completed ? colors.primary : colors.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0
                    }}>
                        {completed ? (
                            <CheckCircle2 size={14} color="white" />
                        ) : (
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: index === visibleItems.length - 1 && isGenerating ? colors.accent : "transparent" }} />
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ 
                            fontSize: "15px", fontWeight: "600", color: completed ? colors.textSecondary : colors.text, 
                            margin: "0 0 4px 0", textDecoration: completed ? "line-through" : "none" 
                        }}>
                            {item.title}
                        </h4>
                        <div style={{ display: "flex", gap: "6px" }}>
                             <span style={{ fontSize: "11px", textTransform: "uppercase", color: colors.textTertiary, background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: "4px" }}>
                                {item.type}
                             </span>
                             {completed && (
                                <span style={{ fontSize: "11px", color: colors.primary, fontWeight: "500" }}>
                                    Skipped (Known)
                                </span>
                             )}
                        </div>
                    </div>
                </div>
            );
        })}

        {isGenerating && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingLeft: "4px", opacity: 0.7 }}>
                 <Loader2 size={16} className="animate-spin" color={colors.accent} />
                 <span style={{ fontSize: "13px", color: colors.textSecondary, fontStyle: "italic" }}>Generating next module...</span>
            </div>
        )}
      </div>

      {!isGenerating && visibleItems.length > 0 && (
          <div style={{ marginTop: "32px", padding: "16px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "8px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              <p style={{ fontSize: "14px", color: "#15803d", margin: 0, fontWeight: "500", textAlign: "center" }}>
                   path generated for your profile!
              </p>
          </div>
      )}

      {/* CSS Animation defined inline for simplicity */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
