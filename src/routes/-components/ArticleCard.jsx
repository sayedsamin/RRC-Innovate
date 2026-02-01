import React from "react";
import { FileText, Lock, ExternalLink, Tag, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { Link, useNavigate } from '@tanstack/react-router';
import { useKMS } from "../../context/KMSContext";

const ArticleCard = ({ article }) => {
  const { colors, categories } = useKMS();
  const navigate = useNavigate();
  
  const category = categories.find((c) => c.id === article.category);
  const Icon = category?.icon || FileText;

  // Helper to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div 
      className="article-card" 
      onClick={() => navigate({ to: `/article/${article.id}` })}
      style={{ 
        background: colors.surface, 
        border: `2px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        marginBottom: "16px"
      }}
      onMouseEnter={(e) => {
         e.currentTarget.style.transform = "translateY(-2px)";
         e.currentTarget.style.borderColor = colors.primary;
      }}
      onMouseLeave={(e) => {
         e.currentTarget.style.transform = "translateY(0)";
         e.currentTarget.style.borderColor = colors.border;
      }}
    >
      <div className="article-header" style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <div 
          className="article-icon" 
          style={{ 
            width: "48px", height: "48px", borderRadius: "10px", 
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-white)", backgroundColor: category?.color || "var(--color-text-tertiary)",
            flexShrink: 0
          }}
        >
          <Icon size={24} />
        </div>
        <div className="article-meta" style={{ flex: 1 }}>
          <h3 style={{ fontSize: "18px", color: colors.text, margin: "0 0 8px 0", fontWeight: "700", lineHeight: "1.3" }}>
            <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>
              {article.title}
            </Link>
            {article.restricted && <Lock size={16} style={{ marginLeft: "8px", color: "var(--color-yellow-lock)", verticalAlign: "text-bottom" }} />}
          </h3>
          <div className="article-info" style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", color: colors.textSecondary }}>
            <span>{article.source}</span>
            <span>•</span>
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span style={{ 
               padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase",
               background: article.priority === 'high' ? 'var(--color-priority-high-bg)' : 'var(--color-priority-medium-bg)',
               color: article.priority === 'high' ? 'var(--color-priority-high-text)' : 'var(--color-priority-medium-text)'
            }}>
               {article.priority}
            </span>
            {article.url && (
              <>
                <span>•</span>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: "flex", alignItems: "center", gap: "4px", color: colors.primary, textDecoration: "none", fontWeight: "500" }}
                >
                  <ExternalLink size={12} /> Source
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      
      <p style={{ lineHeight: "1.6", marginBottom: "20px", color: colors.text, fontSize: "15px" }}>
        {article.summary}
      </p>

      <div className="article-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="tags" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ 
              display: "flex", alignItems: "center", gap: "4px", padding: "4px 12px",
              background: "var(--color-tag-bg)", border: "1px solid var(--color-tag-border)",
              borderRadius: "20px", fontSize: "12px", color: colors.text, fontWeight: "500"
            }}>
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
        <div className="article-stats" style={{ display: "flex", gap: "20px", alignItems: "center", fontSize: "14px", color: colors.textSecondary }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><ThumbsUp size={16} /> {article.upvotes}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><ThumbsDown size={16} /> {article.downvotes || 0}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MessageCircle size={16} /> {article.comments?.length || 0}</div>
          <span>{article.views} views</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;