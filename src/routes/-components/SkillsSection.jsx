import React from "react";

const SkillsSection = ({ colors }) => {
  return (
    <div style={{ marginTop: "40px", marginBottom: "40px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: colors.text }}>
        💡 Skills to Build
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        
        {/* Card 1 */}
        <div style={{ background: colors.surface, border: `2px solid ${colors.border}`, borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎯</div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", color: colors.text, marginBottom: "8px" }}>Prompt Engineering</h4>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: "12px" }}>5 articles • Beginner to Advanced</p>
          <div style={{ height: "8px", background: colors.border, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: colors.accent, width: "40%" }}></div>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: colors.surface, border: `2px solid ${colors.border}`, borderRadius: "12px", padding: "20px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", color: colors.text, marginBottom: "8px" }}>AI Security & Ethics</h4>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: "12px" }}>3 articles • Intermediate</p>
          <div style={{ height: "8px", background: colors.border, borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: colors.warning, width: "20%" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsSection;