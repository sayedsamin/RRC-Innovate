import { useParams, Link, useNavigate } from '@tanstack/react-router'
import { useKMS } from '../../context/KMSContext'
import { ArrowLeft, Clock, Calendar, Globe, Sparkles, Tag, Share2, Bookmark } from 'lucide-react'
import LearningPathSidebar from '../-components/LearningPathSidebar'

export const Route = createFileRoute('/article/$articleId')({
  component: ArticleDetailPage,
})

import { createFileRoute } from '@tanstack/react-router'

function ArticleDetailPage() {
  const { articleId } = useParams({ from: '/article/$articleId' })
  const { articles, colors } = useKMS()
  const navigate = useNavigate()

  const article = articles?.find(a => a.id.toString() === articleId)
  const showLearningPath = article?.learningPath && article.learningPath.length > 0;

  if (!article) {
    return (
        <div style={{ padding: "40px", textAlign: "center", color: colors.textSecondary }}>
            <h2>Article not found</h2>
            <Link to="/ai-picks" style={{ color: colors.primary, marginTop: "16px", display: "inline-block" }}>Go back</Link>
        </div>
    )
  }

  return (
    <div style={{ 
        maxWidth: showLearningPath ? "1400px" : "800px", 
        margin: "0 auto", 
        display: "grid",
        gridTemplateColumns: showLearningPath ? "1fr 350px" : "1fr",
        gap: "40px",
        minHeight: "100vh"
    }}>
      {/* Main Content Column */}
      <div style={{ padding: "40px 20px" }}>
        {/* Navigation */}
        <button 
            onClick={() => window.history.back()}
            style={{ 
                display: "flex", alignItems: "center", gap: "8px", 
                background: "transparent", border: "none", 
                color: colors.textSecondary, cursor: "pointer",
                marginBottom: "24px", fontSize: "14px", fontWeight: "500"
            }}
        >
            <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {article.tags.map(tag => (
                    <span key={tag} style={{ 
                        fontSize: "12px", px: "8px", py: "4px", 
                        background: "rgba(37, 99, 235, 0.1)", color: colors.primary,
                        padding: "4px 10px", borderRadius: "12px", fontWeight: "600"
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: colors.text, lineHeight: "1.2", marginBottom: "16px" }}>
                {article.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: colors.textSecondary, fontSize: "14px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={16} /> {article.source}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={16} /> {article.date}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={16} /> 5 min read
                </span>
            </div>
        </div>

        {/* AI Executive Brief */}
        <div style={{ 
            background: "linear-gradient(to bottom right, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))", 
            borderRadius: "16px", 
            padding: "32px", 
            border: `1px solid ${colors.border}`,
            marginBottom: "40px"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ padding: "8px", background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <Sparkles size={24} color={colors.primary} />
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: colors.text, margin: 0 }}>AI Executive Brief</h2>
            </div>
            
            <p style={{ fontSize: "18px", color: colors.text, lineHeight: "1.6", marginBottom: "24px", fontWeight: "500" }}>
                {article.summary}
            </p>

            <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: colors.textSecondary, marginBottom: "12px", fontWeight: "700" }}>
                Key Takeaways
            </h3>
            
            {article.executiveBrief ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                    <li style={{ display: "flex", alignItems: "start", gap: "10px", fontSize: "15px", color: colors.text, lineHeight: "1.6" }}>
                        <div style={{ minWidth: "6px", height: "6px", marginTop: "10px", borderRadius: "50%", background: colors.primary }} />
                        <span>
                            <strong style={{ display: "block", marginBottom: "4px", color: colors.text }}>Strategy & Impact</strong>
                            {article.executiveBrief.strategy}
                        </span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "10px", fontSize: "15px", color: colors.text, lineHeight: "1.6" }}>
                        <div style={{ minWidth: "6px", height: "6px", marginTop: "10px", borderRadius: "50%", background: colors.warning || "#F59E0B" }} />
                        <span>
                            <strong style={{ display: "block", marginBottom: "4px", color: colors.text }}>Operational Actions</strong>
                            {article.executiveBrief.operations}
                        </span>
                    </li>
                    <li style={{ display: "flex", alignItems: "start", gap: "10px", fontSize: "15px", color: colors.text, lineHeight: "1.6" }}>
                        <div style={{ minWidth: "6px", height: "6px", marginTop: "10px", borderRadius: "50%", background: colors.danger || "#EF4444" }} />
                        <span>
                            <strong style={{ display: "block", marginBottom: "4px", color: colors.text }}>Risk analysis</strong>
                            {article.executiveBrief.risk}
                        </span>
                    </li>
                </ul>
            ) : (
                <div style={{ padding: "16px", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: colors.textSecondary, fontSize: "14px", fontStyle: "italic" }}>
                    AI Analysis is currently processing for this new article. Check back in a few minutes for the Executive Brief.
                </div>
            )}
        </div>

        {/* Action Bar */}
        <div style={{ display: "flex", gap: "16px", borderTop: `1px solid ${colors.border}`, paddingTop: "24px" }}>
            <button style={{ 
                flex: 1, padding: "12px", borderRadius: "8px", 
                background: colors.primary, color: "white", border: "none", 
                fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"
            }}>
                Read Full Source <Globe size={16} />
            </button>
            <button style={{ 
                padding: "12px", borderRadius: "8px", 
                background: colors.surface, color: colors.text, border: `1px solid ${colors.border}`, 
                fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
            }}>
                <Bookmark size={18} /> Save
            </button>
            <button style={{ 
                padding: "12px", borderRadius: "8px", 
                background: colors.surface, color: colors.text, border: `1px solid ${colors.border}`, 
                fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
            }}>
                <Share2 size={18} /> Share
            </button>
        </div>
      </div>

      {/* Sidebar Column */}
      {showLearningPath && (
          <div style={{ borderLeft: `1px solid ${colors.border}`, background: colors.surface }}>
              <div style={{ position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
                  <LearningPathSidebar learningPath={article.learningPath} />
              </div>
          </div>
      )}
    </div>
  )
}
