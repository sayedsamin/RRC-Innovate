const KnowledgeManagementSystem = () => {
  // Theme Toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [activeView, setActiveView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    role: "consultant",
    canManageCategories: true,
    accessLevel: "standard", // 'standard', 'elevated', 'admin'
    organization: "TechCorp",
    industry: "technology", // healthcare, finance, retail, education, manufacturing, etc.
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleDetail, setShowArticleDetail] = useState(false);
  const [showIngestionModal, setShowIngestionModal] = useState(false);
  const [showAIActivityModal, setShowAIActivityModal] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your AI KMS assistant. I can help you find articles, explain recommendations, or answer questions about the knowledge base.",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [systemConfig, setSystemConfig] = useState({
    aiConfidenceThreshold: 0.85,
    autoApprovalEnabled: true,
    duplicateDetectionEnabled: true,
    contentFreshnessCheck: true,
    industryFocus: "technology",
    customCategories: [],
    whitelistedSources: [],
    blacklistedKeywords: [],
    contentRetentionDays: 365,
    enableAIRecommendations: true,
    enableSmartDigest: true,
    enableSkillMapping: true,
  });
  const [ingestionSources, setIngestionSources] = useState([
    {
      id: 1,
      name: "Anthropic Blog",
      type: "rss",
      url: "https://anthropic.com/rss",
      enabled: true,
      lastSync: "2 min ago",
      itemsProcessed: 1547,
      autoApproved: 1489,
      autoRejected: 43,
      flagged: 15,
    },
    {
      id: 2,
      name: "OpenAI Research",
      type: "rss",
      url: "https://openai.com/research/rss",
      enabled: true,
      lastSync: "5 min ago",
      itemsProcessed: 892,
      autoApproved: 856,
      autoRejected: 28,
      flagged: 8,
    },
    {
      id: 3,
      name: "arXiv AI Papers",
      type: "rss",
      url: "https://arxiv.org/rss/cs.AI",
      enabled: true,
      lastSync: "1 min ago",
      itemsProcessed: 3421,
      autoApproved: 3201,
      autoRejected: 198,
      flagged: 22,
    },
    {
      id: 4,
      name: "TechCrunch AI",
      type: "web",
      url: "https://techcrunch.com/category/ai",
      enabled: true,
      lastSync: "8 min ago",
      itemsProcessed: 567,
      autoApproved: 534,
      autoRejected: 29,
      flagged: 4,
    },
    {
      id: 5,
      name: "MIT Technology Review",
      type: "rss",
      url: "https://technologyreview.com/ai/rss",
      enabled: true,
      lastSync: "3 min ago",
      itemsProcessed: 234,
      autoApproved: 221,
      autoRejected: 11,
      flagged: 2,
    },
    {
      id: 6,
      name: "Google AI Blog",
      type: "rss",
      url: "https://ai.googleblog.com/rss",
      enabled: true,
      lastSync: "6 min ago",
      itemsProcessed: 445,
      autoApproved: 423,
      autoRejected: 18,
      flagged: 4,
    },
    {
      id: 7,
      name: "Microsoft Research",
      type: "web",
      url: "https://microsoft.com/research/ai",
      enabled: true,
      lastSync: "4 min ago",
      itemsProcessed: 678,
      autoApproved: 651,
      autoRejected: 23,
      flagged: 4,
    },
    {
      id: 8,
      name: "AI Weekly Newsletter",
      type: "email",
      url: "AI Weekly <ai@weekly.com>",
      enabled: false,
      lastSync: "2 days ago",
      itemsProcessed: 156,
      autoApproved: 149,
      autoRejected: 6,
      flagged: 1,
    },
  ]);
  const [aiActivity, setAiActivity] = useState([
    {
      id: 1,
      action: "Auto-Approved",
      title: "Scaling Laws for Neural Language Models",
      source: "arXiv AI Papers",
      category: "fundamentals",
      confidence: 0.96,
      reason: "High-quality research, clear relevance",
      timestamp: "30 seconds ago",
    },
    {
      id: 2,
      action: "Auto-Rejected",
      title: "Top 10 AI Memes This Week",
      source: "TechCrunch AI",
      confidence: 0.98,
      reason: "Low information value, entertainment content",
      timestamp: "1 minute ago",
    },
    {
      id: 3,
      action: "Auto-Approved",
      title: "GDPR Compliance for AI Systems in Europe",
      source: "MIT Technology Review",
      category: "skills",
      confidence: 0.94,
      reason: "Regulatory guidance, high priority",
      timestamp: "2 minutes ago",
    },
    {
      id: 4,
      action: "Duplicate Merged",
      title: "Introduction to Large Language Models",
      existing: "Understanding Large Language Models: A Practical Guide",
      confidence: 0.99,
      reason: "95% content overlap detected",
      timestamp: "3 minutes ago",
    },
    {
      id: 5,
      action: "Auto-Rejected",
      title: "Buy AI Stocks Now! Investment Tips",
      source: "Random Blog",
      confidence: 0.99,
      reason: "Promotional content, unreliable source",
      timestamp: "4 minutes ago",
    },
    {
      id: 6,
      action: "Auto-Approved",
      title: "Retrieval-Augmented Generation Best Practices",
      source: "Anthropic Blog",
      category: "tools",
      confidence: 0.97,
      reason: "Authoritative source, practical value",
      timestamp: "5 minutes ago",
    },
    {
      id: 7,
      action: "Updated",
      title: "AI Ethics Framework for Organizations",
      reason: "New version published, content refreshed",
      timestamp: "6 minutes ago",
    },
    {
      id: 8,
      action: "Flagged for Review",
      title: "Controversial AI Surveillance Implementation",
      source: "TechCrunch AI",
      confidence: 0.72,
      reason: "Conflicting information, ethical concerns",
      timestamp: "7 minutes ago",
    },
  ]);
  const [flaggedContent, setFlaggedContent] = useState([
    {
      id: 201,
      title: "Controversial AI Surveillance Implementation in Major City",
      source: "TechCrunch AI",
      detectedCategory: "industry",
      detectedPriority: "high",
      detectedTags: ["Surveillance", "Ethics", "Controversy"],
      summary:
        "New AI surveillance system raises privacy concerns among civil liberties groups.",
      confidence: 0.72,
      flagReason:
        "Conflicting information with existing content, ethical concerns require human judgment",
      aiGenerated: true,
      conflicts: ["AI Ethics Framework for Organizations"],
    },
    {
      id: 202,
      title: "Unverified Claims About AGI Timeline",
      source: "Unknown Blog",
      detectedCategory: "trends",
      detectedPriority: "medium",
      detectedTags: ["AGI", "Predictions", "Timeline"],
      summary:
        "Anonymous industry insider claims AGI will be achieved within 6 months.",
      confidence: 0.45,
      flagReason:
        "Low confidence (45%), unreliable source, extraordinary claims",
      aiGenerated: true,
      conflicts: [],
    },
  ]);
  const [aiStats, setAiStats] = useState({
    processing: true,
    itemsProcessedToday: 1247,
    autoApproved: 1189,
    autoRejected: 43,
    flaggedForReview: 15,
    duplicatesDetected: 28,
    contentUpdated: 12,
    avgProcessingTime: "1.2s",
    confidenceThreshold: 0.85,
  });

  // Theme Colors
  const colors = isDarkMode
    ? {
        bg: "#0B1120",
        surface: "#1A2332",
        border: "#2D3748",
        text: "#FFFFFF",
        textSecondary: "#E2E8F0",
        textTertiary: "#94A3B8",
        primary: "#60A5FA",
        secondary: "#A78BFA",
        accent: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",
        cyan: "#22D3EE",
      }
    : {
        bg: "#FAFBFC",
        bgSecondary: "#F5F7FA",
        surface: "#FFFFFF",
        border: "#E2E8F0",
        text: "#1A202C",
        textSecondary: "#4A5568",
        textTertiary: "#718096",
        primary: "#3B82F6",
        primaryLight: "#EFF6FF",
        secondary: "#8B5CF6",
        accent: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        cyan: "#06B6D4",
      };

  const categories = [
    {
      id: "fundamentals",
      name: "AI Fundamentals",
      icon: Brain,
      color: colors.primary,
      restricted: false,
    },
    {
      id: "industry",
      name: "AI by Industry",
      icon: TrendingUp,
      color: colors.cyan,
      restricted: false,
    },
    {
      id: "disciplines",
      name: "Professional Disciplines",
      icon: Award,
      color: colors.accent,
      restricted: false,
    },
    {
      id: "business",
      name: "Business Functions",
      icon: Users,
      color: colors.warning,
      restricted: true,
      requiresRole: ["executive", "finance", "hr"],
    },
    {
      id: "skills",
      name: "AI & Human Skills",
      icon: BookOpen,
      color: colors.accent,
      restricted: false,
    },
    {
      id: "tools",
      name: "Productivity Tools",
      icon: Settings,
      color: colors.secondary,
      restricted: true,
      requiresRole: ["consultant", "it", "executive"],
    },
    {
      id: "trends",
      name: "Community & Trends",
      icon: Video,
      color: colors.secondary,
      restricted: true,
      requiresRole: ["consultant", "executive", "it"],
    },
  ];

  const roles = [
    {
      id: "executive",
      name: "Executive",
      description: "Strategic insights & business impact",
    },
    {
      id: "consultant",
      name: "Consultant",
      description: "Client-ready materials & playbooks",
    },
    {
      id: "finance",
      name: "Finance",
      description: "ROI models & cost-benefit analysis",
    },
    {
      id: "hr",
      name: "HR & Talent",
      description: "Skill pathways & onboarding",
    },
    {
      id: "sales",
      name: "Sales & BD",
      description: "Market intelligence & proposals",
    },
    {
      id: "it",
      name: "IT & Security",
      description: "Technical docs & compliance",
    },
    {
      id: "employee",
      name: "All Employees",
      description: "Practical AI knowledge",
    },
  ];

 

  useEffect(() => {
    setArticles(sampleArticles);
  }, []);

  const hasAccess = (article) => {
    if (!article.restricted) return true;
    if (!article.restrictedRoles) return true;
    return article.restrictedRoles.includes(currentUser.role);
  };

  const handleVote = (articleId, voteType) => {
    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            upvotes: voteType === "up" ? article.upvotes + 1 : article.upvotes,
            downvotes:
              voteType === "down" ? article.downvotes + 1 : article.downvotes,
          };
        }
        return article;
      })
    );
  };

  const handleAddComment = (articleId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: commentText,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };

    setArticles(
      articles.map((article) => {
        if (article.id === articleId) {
          return {
            ...article,
            comments: [...article.comments, newComment],
          };
        }
        return article;
      })
    );
  };

  const handleApproveContent = (contentId) => {
    const content = flaggedContent.find((c) => c.id === contentId);
    if (!content) return;

    const newArticle = {
      id: articles.length + 1,
      title: content.title,
      category: content.detectedCategory,
      roles: ["all"],
      type: "article",
      source: content.source,
      date: new Date().toISOString().split("T")[0],
      priority: content.detectedPriority,
      tags: content.detectedTags,
      summary: content.summary,
      status: "active",
      views: 0,

      upvotes: 0,
      downvotes: 0,
      restricted: false,
      comments: [],
      aiGenerated: true,
    };

    setArticles([newArticle, ...articles]);
    setFlaggedContent(flaggedContent.filter((c) => c.id !== contentId));
    setAiStats({
      ...aiStats,
      flaggedForReview: aiStats.flaggedForReview - 1,
      autoApproved: aiStats.autoApproved + 1,
    });
  };

  const handleRejectContent = (contentId) => {
    setFlaggedContent(flaggedContent.filter((c) => c.id !== contentId));
    setAiStats({
      ...aiStats,
      flaggedForReview: aiStats.flaggedForReview - 1,
      autoRejected: aiStats.autoRejected + 1,
    });
  };

  const filteredArticles = articles.filter((article) => {
    if (!hasAccess(article)) return false;

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesRole =
      selectedRole === "all" ||
      article.roles.includes(selectedRole) ||
      article.roles.includes("all");
    return matchesSearch && matchesCategory && matchesRole;
  });

  const getDashboardStats = () => {
    return {
      totalArticles: articles.length,
      thisWeek: articles.filter((a) => {
        const date = new Date(a.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo;
      }).length,
      highPriority: articles.filter((a) => a.priority === "high").length,
      totalEngagement: articles.reduce(
        (sum, a) => sum + a.upvotes + a.comments.length,
        0
      ),
    };
  };

  const stats = getDashboardStats();

  const RecommendationsView = () => {
    const userRecommendations = [
      {
        id: 1,
        title: "Recommended: AI Governance Framework Update",
        reason:
          "Based on your role as consultant and recent views on compliance topics",
        article: articles[3],
        confidence: 0.94,
        relevanceFactors: [
          "Role match",
          "Topic interest",
          "Trending in your org",
        ],
      },
      {
        id: 2,
        title: "Trending in Technology Sector",
        reason: "High engagement from users in similar roles",
        article: articles[0],
        confidence: 0.89,
        relevanceFactors: [
          "Industry trend",
          "High engagement",
          "Skill building",
        ],
      },
      {
        id: 3,
        title: "Gap Detected: Cloud Security",
        reason:
          "Your colleagues are discussing this but you haven't reviewed recent updates",
        article: articles[10],
        confidence: 0.87,
        relevanceFactors: [
          "Knowledge gap",
          "Team discussion",
          "Strategic priority",
        ],
      },
    ];

    return (
      <div className="recommendations-view">
        <div className="recommendations-header">
          <h2>AI-Powered Recommendations</h2>
          <p>
            Personalized content based on your role, interests, and
            organizational needs
          </p>
        </div>
        <div className="recommendations-list">
          {userRecommendations.map((rec) => (
            <div key={rec.id} className="recommendation-card">
              <div className="recommendation-header">
                <div className="recommendation-badge">
                  <Brain size={16} />
                  {(rec.confidence * 100).toFixed(0)}% Match
                </div>
              </div>
              <h3>{rec.title}</h3>
              <p className="recommendation-reason">{rec.reason}</p>
              <div className="relevance-factors">
                {rec.relevanceFactors.map((factor) => (
                  <span key={factor} className="factor-tag">
                    {factor}
                  </span>
                ))}
              </div>
              {rec.article && <ArticleCard article={rec.article} />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SmartDigestView = () => {
    return (
      <div className="digest-view">
        <div className="digest-header">
          <h2>Smart Daily Digest</h2>
          <p>AI-curated summary of what matters to you today</p>
          <button className="digest-export-btn">
            <Download size={18} />
            Export as Email
          </button>
        </div>

        <div className="digest-sections">
          <div className="digest-section">
            <h3>🔥 Trending Now (3)</h3>
            <p className="section-desc">
              High engagement content from the past 24 hours
            </p>
            <div className="digest-items">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="digest-item">
                  <div className="digest-item-header">
                    <h4>{article.title}</h4>
                    <span className="digest-engagement">
                      <ThumbsUp size={14} />
                      {article.upvotes}
                    </span>
                  </div>
                  <p>{article.summary.substring(0, 120)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div className="digest-section">
            <h3>📌 Must Read (2)</h3>
            <p className="section-desc">
              Critical updates for your role and industry
            </p>
            <div className="digest-items">
              {articles
                .filter((a) => a.priority === "high")
                .slice(0, 2)
                .map((article) => (
                  <div key={article.id} className="digest-item priority">
                    <div className="digest-item-header">
                      <h4>{article.title}</h4>
                      <span className="priority-badge">High Priority</span>
                    </div>
                    <p>{article.summary.substring(0, 120)}...</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="digest-section">
            <h3>🎯 Relevant for You</h3>
            <p className="section-desc">
              Personalized content matching your role and interests
            </p>
            <div className="digest-items">
              {articles
                .filter(
                  (a) =>
                    a.roles.includes(currentUser.role) ||
                    a.roles.includes("all")
                )
                .slice(0, 3)
                .map((article) => (
                  <div key={article.id} className="digest-item relevance">
                    <div className="digest-item-header">
                      <h4>{article.title}</h4>
                      <span
                        className="relevance-badge"
                        style={{
                          padding: "4px 12px",
                          background: colors.primaryLight,
                          color: colors.primary,
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <p>{article.summary.substring(0, 120)}...</p>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 8px",
                          background: isDarkMode
                            ? colors.borderHover
                            : colors.bgSecondary,
                          border: `1px solid ${colors.accent}`,
                          borderRadius: "4px",
                          fontSize: "11px",
                          color: colors.accent,
                          fontWeight: "500",
                        }}
                      >
                        ✓ Matches your {currentUser.role} role
                      </span>
                      <span
                        style={{
                          padding: "4px 8px",
                          background: isDarkMode
                            ? colors.borderHover
                            : colors.bgSecondary,
                          border: `1px solid ${colors.info}`,
                          borderRadius: "4px",
                          fontSize: "11px",
                          color: colors.info,
                          fontWeight: "500",
                        }}
                      >
                        ✓ Trending in organization
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CustomizationModal = () => {
    const industries = [
      "Technology",
      "Healthcare",
      "Finance",
      "Retail",
      "Education",
      "Manufacturing",
      "Legal",
      "Energy",
    ];

    return (
      <div
        className="modal-overlay"
        onClick={() => setShowCustomizationModal(false)}
      >
        <div
          className="customization-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>System Customization</h2>
            <button
              onClick={() => setShowCustomizationModal(false)}
              className="close-btn"
            >
              <X size={20} />
            </button>
          </div>

          <div className="customization-content">
            <div className="customization-section">
              <h3>Industry Configuration</h3>
              <p>
                Optimize AI classification and recommendations for your industry
              </p>
              <select
                value={systemConfig.industryFocus}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    industryFocus: e.target.value,
                  })
                }
                className="industry-select"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind.toLowerCase()}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="customization-section">
              <h3>AI Engine Settings</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.autoApprovalEnabled}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          autoApprovalEnabled: e.target.checked,
                        })
                      }
                    />
                    <span>Enable Auto-Approval</span>
                  </label>
                  <p className="setting-desc">
                    AI automatically approves high-confidence content
                  </p>
                </div>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.duplicateDetectionEnabled}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          duplicateDetectionEnabled: e.target.checked,
                        })
                      }
                    />
                    <span>Duplicate Detection</span>
                  </label>
                  <p className="setting-desc">
                    Merge similar content automatically
                  </p>
                </div>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.contentFreshnessCheck}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          contentFreshnessCheck: e.target.checked,
                        })
                      }
                    />
                    <span>Content Freshness Check</span>
                  </label>
                  <p className="setting-desc">
                    Flag outdated content for review
                  </p>
                </div>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.enableAIRecommendations}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          enableAIRecommendations: e.target.checked,
                        })
                      }
                    />
                    <span>AI Recommendations</span>
                  </label>
                  <p className="setting-desc">
                    Personalized content suggestions
                  </p>
                </div>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.enableSmartDigest}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          enableSmartDigest: e.target.checked,
                        })
                      }
                    />
                    <span>Smart Daily Digest</span>
                  </label>
                  <p className="setting-desc">AI-curated daily summaries</p>
                </div>
                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={systemConfig.enableSkillMapping}
                      onChange={(e) =>
                        setSystemConfig({
                          ...systemConfig,
                          enableSkillMapping: e.target.checked,
                        })
                      }
                    />
                    <span>Skill Path Mapping</span>
                  </label>
                  <p className="setting-desc">
                    Track learning progress and suggest paths
                  </p>
                </div>
              </div>
            </div>

            <div className="customization-section">
              <h3>Content Retention</h3>
              <label>Keep content for (days):</label>
              <input
                type="number"
                value={systemConfig.contentRetentionDays}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    contentRetentionDays: parseInt(e.target.value),
                  })
                }
                className="retention-input"
              />
            </div>

            <div className="customization-section">
              <h3>White-Label Options</h3>
              <p className="white-label-note">
                📋 Multi-tenant ready • 🎨 Fully brandable • 🌐 Industry
                templates • 📊 Custom analytics
              </p>
              <div className="white-label-features">
                <div className="feature-badge">Custom Categories</div>
                <div className="feature-badge">Role Templates</div>
                <div className="feature-badge">Source Whitelisting</div>
                <div className="feature-badge">API Integration</div>
                <div className="feature-badge">SSO Support</div>
                <div className="feature-badge">Advanced Analytics</div>
              </div>
            </div>

            <button className="save-config-btn">
              <CheckCircle size={18} />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AIIngestionModal = () => {
    const [activeTab, setActiveTab] = useState("activity");

    return (
      <div
        className="modal-overlay"
        onClick={() => setShowIngestionModal(false)}
      >
        <div
          className="ingestion-modal-large"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="header-content">
              <h2>AI Knowledge Engine</h2>
              <div className="ai-status">
                <div className="status-indicator active"></div>
                <span>Actively Processing</span>
              </div>
            </div>
            <button
              onClick={() => setShowIngestionModal(false)}
              className="close-btn"
            >
              <X size={20} />
            </button>
          </div>

          <div className="ai-stats-bar">
            <div className="ai-stat">
              <div className="stat-label">Processed Today</div>
              <div className="stat-value">{aiStats.itemsProcessedToday}</div>
            </div>
            <div className="ai-stat">
              <div className="stat-label">Auto-Approved</div>
              <div className="stat-value success">{aiStats.autoApproved}</div>
            </div>
            <div className="ai-stat">
              <div className="stat-label">Auto-Rejected</div>
              <div className="stat-value danger">{aiStats.autoRejected}</div>
            </div>
            <div className="ai-stat">
              <div className="stat-label">Flagged</div>
              <div className="stat-value warning">
                {aiStats.flaggedForReview}
              </div>
            </div>
            <div className="ai-stat">
              <div className="stat-label">Duplicates</div>
              <div className="stat-value">{aiStats.duplicatesDetected}</div>
            </div>
            <div className="ai-stat">
              <div className="stat-label">Avg Time</div>
              <div className="stat-value">{aiStats.avgProcessingTime}</div>
            </div>
          </div>

          <div className="ingestion-tabs">
            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => setActiveTab("activity")}
            >
              <TrendingUp size={18} />
              Live Activity
            </button>
            <button
              className={activeTab === "flagged" ? "active" : ""}
              onClick={() => setActiveTab("flagged")}
            >
              <AlertCircle size={18} />
              Flagged for Review ({flaggedContent.length})
            </button>
            <button
              className={activeTab === "sources" ? "active" : ""}
              onClick={() => setActiveTab("sources")}
            >
              <Settings size={18} />
              Sources ({ingestionSources.length})
            </button>
          </div>

          <div className="ingestion-content">
            {activeTab === "activity" && (
              <div className="activity-view">
                <div className="activity-header">
                  <p>
                    Real-time AI decisions. The system autonomously approves
                    high-confidence content, rejects low-quality items, and
                    flags edge cases for human review.
                  </p>
                  <div className="confidence-setting">
                    <label>
                      Auto-Approval Threshold:{" "}
                      {(aiStats.confidenceThreshold * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      min="70"
                      max="95"
                      value={aiStats.confidenceThreshold * 100}
                      onChange={(e) =>
                        setAiStats({
                          ...aiStats,
                          confidenceThreshold: e.target.value / 100,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="activity-stream">
                  {aiActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className={`activity-item ${activity.action
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      <div className="activity-icon">
                        {activity.action === "Auto-Approved" && (
                          <CheckCircle size={20} />
                        )}
                        {activity.action === "Auto-Rejected" && <X size={20} />}
                        {activity.action === "Flagged for Review" && (
                          <AlertCircle size={20} />
                        )}
                        {activity.action === "Duplicate Merged" && (
                          <FileText size={20} />
                        )}
                        {activity.action === "Updated" && (
                          <Download size={20} />
                        )}
                      </div>
                      <div className="activity-content">
                        <div className="activity-header-row">
                          <div className="activity-action">
                            {activity.action}
                          </div>
                          <div className="activity-timestamp">
                            {activity.timestamp}
                          </div>
                        </div>
                        <div className="activity-title">{activity.title}</div>
                        {activity.source && (
                          <div className="activity-source">
                            Source: {activity.source}
                          </div>
                        )}
                        {activity.existing && (
                          <div className="activity-existing">
                            Merged with: {activity.existing}
                          </div>
                        )}
                        <div className="activity-reason">
                          <Brain size={14} />
                          {activity.reason}
                        </div>
                        {activity.category && (
                          <div className="activity-meta">
                            Category:{" "}
                            {
                              categories.find((c) => c.id === activity.category)
                                ?.name
                            }{" "}
                            • Confidence:{" "}
                            {(activity.confidence * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "flagged" && (
              <div className="flagged-view">
                <div className="flagged-header">
                  <p>
                    Content flagged by AI for human review due to low
                    confidence, conflicting information, or sensitive topics.
                  </p>
                </div>
                {flaggedContent.length === 0 ? (
                  <div className="empty-state">
                    <CheckCircle size={48} />
                    <h3>No Flagged Content</h3>
                    <p>
                      All incoming content is being processed autonomously by
                      AI.
                    </p>
                  </div>
                ) : (
                  <div className="flagged-list">
                    {flaggedContent.map((content) => (
                      <div key={content.id} className="flagged-item">
                        <div className="flagged-main">
                          <div className="flagged-title-row">
                            <h4>{content.title}</h4>
                            <div className="confidence-badge low">
                              {(content.confidence * 100).toFixed(0)}%
                              confidence
                            </div>
                          </div>
                          <p className="flagged-summary">{content.summary}</p>
                          <div className="flagged-flag-reason">
                            <AlertCircle size={16} />
                            <strong>Flag Reason:</strong> {content.flagReason}
                          </div>
                          {content.conflicts.length > 0 && (
                            <div className="flagged-conflicts">
                              <strong>Conflicts with:</strong>
                              {content.conflicts.map((conflict) => (
                                <span key={conflict} className="conflict-tag">
                                  {conflict}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flagged-meta">
                            <span className="flagged-source">
                              Source: {content.source}
                            </span>
                          </div>
                          <div className="flagged-classification">
                            <div className="classification-item">
                              <label>AI Suggested:</label>
                              <span className="classification-value">
                                {
                                  categories.find(
                                    (c) => c.id === content.detectedCategory
                                  )?.name
                                }
                              </span>
                              <span className="separator">•</span>
                              <span
                                className={`priority priority-${content.detectedPriority}`}
                              >
                                {content.detectedPriority}
                              </span>
                            </div>
                            <div className="classification-item">
                              <label>Tags:</label>
                              <div className="flagged-tags">
                                {content.detectedTags.map((tag) => (
                                  <span key={tag} className="tag">
                                    <Tag size={10} />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flagged-actions">
                          <button
                            className="approve-btn"
                            onClick={() => handleApproveContent(content.id)}
                          >
                            <CheckCircle size={18} />
                            Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => handleRejectContent(content.id)}
                          >
                            <X size={18} />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "sources" && (
              <div className="sources-list">
                <div className="sources-header">
                  <p>
                    AI continuously monitors these sources, automatically
                    classifying and filtering content.
                  </p>
                  <button className="add-source-btn">
                    <Plus size={18} />
                    Add Source
                  </button>
                </div>
                {ingestionSources.map((source) => (
                  <div key={source.id} className="source-item">
                    <div className="source-info">
                      <div className="source-header">
                        <h4>{source.name}</h4>
                        <span
                          className={`source-status ${
                            source.enabled ? "enabled" : "disabled"
                          }`}
                        >
                          {source.enabled ? "● Active" : "○ Inactive"}
                        </span>
                      </div>
                      <div className="source-details">
                        <span className="source-type">
                          {source.type.toUpperCase()}
                        </span>
                        <span className="separator">•</span>
                        <span className="source-url">{source.url}</span>
                      </div>
                      <div className="source-stats-detailed">
                        <div className="source-stat-item">
                          <span className="stat-num">
                            {source.itemsProcessed}
                          </span>
                          <span className="stat-label">Total</span>
                        </div>
                        <div className="source-stat-item success">
                          <span className="stat-num">
                            {source.autoApproved}
                          </span>
                          <span className="stat-label">Approved</span>
                        </div>
                        <div className="source-stat-item danger">
                          <span className="stat-num">
                            {source.autoRejected}
                          </span>
                          <span className="stat-label">Rejected</span>
                        </div>
                        <div className="source-stat-item warning">
                          <span className="stat-num">{source.flagged}</span>
                          <span className="stat-label">Flagged</span>
                        </div>
                        <div className="source-stat-item">
                          <span className="stat-text">
                            Last: {source.lastSync}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="source-actions">
                      <button className="action-btn">
                        {source.enabled ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                      <button className="action-btn sync-btn">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AddContentModal = () => {
    const [newContent, setNewContent] = useState({
      title: "",
      category: "fundamentals",
      type: "article",
      source: "",
      url: "",
      summary: "",
      tags: "",
      priority: "medium",
      restricted: false,
      restrictedRoles: [],
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const article = {
        id: articles.length + 1,
        ...newContent,
        roles:
          newContent.restrictedRoles.length > 0
            ? newContent.restrictedRoles
            : ["all"],
        date: new Date().toISOString().split("T")[0],
        status: "active",
        views: 0,

        upvotes: 0,
        downvotes: 0,
        tags: newContent.tags.split(",").map((t) => t.trim()),
        comments: [],
      };

      setTimeout(() => {
        setArticles([article, ...articles]);
        setShowAddModal(false);
        setLoading(false);
        setNewContent({
          title: "",
          category: "fundamentals",
          type: "article",
          source: "",
          url: "",
          summary: "",
          tags: "",
          priority: "medium",
          restricted: false,
          restrictedRoles: [],
        });
      }, 500);
    };

    const toggleRestrictedRole = (roleId) => {
      setNewContent((prev) => ({
        ...prev,
        restrictedRoles: prev.restrictedRoles.includes(roleId)
          ? prev.restrictedRoles.filter((r) => r !== roleId)
          : [...prev.restrictedRoles, roleId],
      }));
    };

    return (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add New Content</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="close-btn"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newContent.title}
                onChange={(e) =>
                  setNewContent({ ...newContent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newContent.category}
                  onChange={(e) =>
                    setNewContent({ ...newContent, category: e.target.value })
                  }
                >
                  {categories.map((cat) => {
                    const canAssign =
                      !cat.restricted || currentUser.canManageCategories;
                    return (
                      <option key={cat.id} value={cat.id} disabled={!canAssign}>
                        {cat.name} {cat.restricted && !canAssign ? "🔒" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newContent.type}
                  onChange={(e) =>
                    setNewContent({ ...newContent, type: e.target.value })
                  }
                >
                  <option value="article">Article</option>
                  <option value="report">Report</option>
                  <option value="guide">Guide</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="video">Video</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="case-study">Case Study</option>
                  <option value="whitepaper">Whitepaper</option>
                  <option value="checklist">Checklist</option>
                  <option value="framework">Framework</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                value={newContent.source}
                onChange={(e) =>
                  setNewContent({ ...newContent, source: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>URL (optional)</label>
              <input
                type="url"
                value={newContent.url}
                onChange={(e) =>
                  setNewContent({ ...newContent, url: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea
                value={newContent.summary}
                onChange={(e) =>
                  setNewContent({ ...newContent, summary: e.target.value })
                }
                rows={3}
                required
              />
            </div>
            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                value={newContent.tags}
                onChange={(e) =>
                  setNewContent({ ...newContent, tags: e.target.value })
                }
                placeholder="AI, Machine Learning, Tutorial"
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newContent.priority}
                onChange={(e) =>
                  setNewContent({ ...newContent, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newContent.restricted}
                  onChange={(e) =>
                    setNewContent({
                      ...newContent,
                      restricted: e.target.checked,
                    })
                  }
                />
                <span>Restrict access to specific roles</span>
              </label>
            </div>
            {newContent.restricted && (
              <div className="form-group">
                <label>Select Roles with Access</label>
                <div className="role-checkboxes">
                  {roles.map((role) => (
                    <label key={role.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newContent.restrictedRoles.includes(role.id)}
                        onChange={() => toggleRestrictedRole(role.id)}
                      />
                      <span>{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Content"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalArticles}</div>
            <div className="stat-label">Total Articles</div>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.cyan})`,
            }}
          >
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.thisWeek}</div>
            <div className="stat-label">Added This Week</div>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
            }}
          >
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            }}
          >
            <MessageCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalEngagement}</div>
            <div className="stat-label">Total Engagement</div>
          </div>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = articles.filter((a) => a.category === cat.id).length;
          return (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveView("browse");
              }}
            >
              <div
                className="category-icon"
                style={{ backgroundColor: cat.color }}
              >
                <Icon size={28} />
              </div>
              <h3>{cat.name}</h3>
              <div className="category-count">{count} items</div>
            </div>
          );
        })}
      </div>

      <div
        className="skills-section"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "20px",
            color: colors.text,
          }}
        >
          💡 Skills to Build
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: colors.textSecondary,
            marginBottom: "20px",
          }}
        >
          Recommended learning paths based on industry trends
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎯</div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              Prompt Engineering
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginBottom: "12px",
              }}
            >
              5 articles • Beginner to Advanced
            </p>
            <div
              style={{
                height: "8px",
                background: colors.border,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: colors.accent,
                  width: "40%",
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              AI Security & Ethics
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginBottom: "12px",
              }}
            >
              3 articles • Intermediate
            </p>
            <div
              style={{
                height: "8px",
                background: colors.border,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: colors.warning,
                  width: "20%",
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚡</div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              RAG Implementation
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginBottom: "12px",
              }}
            >
              4 articles • Advanced
            </p>
            <div
              style={{
                height: "8px",
                background: colors.border,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: colors.secondary,
                  width: "10%",
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="your-stats-section" style={{ marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "20px",
            color: colors.text,
          }}
        >
          📊 Your Stats
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: colors.primary,
                marginBottom: "8px",
              }}
            >
              12
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                fontWeight: "500",
              }}
            >
              Articles Read This Week
            </div>
          </div>
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: colors.accent,
                marginBottom: "8px",
              }}
            >
              8
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                fontWeight: "500",
              }}
            >
              Comments Posted
            </div>
          </div>
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: colors.warning,
                marginBottom: "8px",
              }}
            >
              45
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                fontWeight: "500",
              }}
            >
              Upvotes Given
            </div>
          </div>
          <div
            style={{
              background: colors.surface,
              border: `2px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: colors.secondary,
                marginBottom: "8px",
              }}
            >
              3
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                fontWeight: "500",
              }}
            >
              Skills Advanced
            </div>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recently Added</h2>
        <div className="articles-list">
          {articles.slice(0, 5).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );

  const ArticleDetail = ({ article, onClose }) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmitComment = () => {
      handleAddComment(article.id, commentText);
      setCommentText("");
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="article-detail-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{article.title}</h2>
            <button onClick={onClose} className="close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="article-detail-content">
            <div className="detail-meta">
              <span className="detail-source">{article.source}</span>
              <span className="separator">•</span>
              <span className="detail-date">
                {new Date(article.date).toLocaleDateString()}
              </span>
              <span className="separator">•</span>
              <span className={`priority priority-${article.priority}`}>
                {article.priority}
              </span>
              {article.restricted && (
                <>
                  <span className="separator">•</span>
                  <span className="restricted-badge">
                    <Lock size={12} />
                    Restricted
                  </span>
                </>
              )}
            </div>

            <div className="detail-summary">
              <p>{article.summary}</p>
            </div>

            <div className="detail-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="vote-section">
              <button
                className="vote-btn upvote"
                onClick={() => handleVote(article.id, "up")}
              >
                <ThumbsUp size={18} />
                <span>{article.upvotes}</span>
              </button>
              <button
                className="vote-btn downvote"
                onClick={() => handleVote(article.id, "down")}
              >
                <ThumbsDown size={18} />
                <span>{article.downvotes}</span>
              </button>
              <div className="vote-stats">
                <Eye size={16} />
                <span>{article.views} views</span>
              </div>
            </div>

            <div className="comments-section">
              <h3>
                <MessageCircle size={20} />
                Comments ({article.comments.length})
              </h3>

              <div className="comment-input">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                />
                <button
                  className="comment-submit"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                >
                  <Send size={18} />
                  Post Comment
                </button>
              </div>

              <div className="comments-list">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        {comment.userName.charAt(0)}
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">{comment.userName}</div>
                        <div className="comment-date">
                          {new Date(comment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button className="like-btn">
                        <ThumbsUp size={14} />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ArticleCard = ({ article }) => {
    const category = categories.find((c) => c.id === article.category);
    const Icon = category?.icon || FileText;

    return (
      <div
        className="article-card"
        onClick={() => {
          setSelectedArticle(article);
          setShowArticleDetail(true);
        }}
      >
        <div className="article-header">
          <div
            className="article-icon"
            style={{ backgroundColor: category?.color || "#ccc" }}
          >
            <Icon size={20} />
          </div>
          <div className="article-meta">
            <h3>
              {article.title}
              {article.restricted && (
                <Lock
                  size={14}
                  style={{ marginLeft: "8px", color: "#FFD700" }}
                />
              )}
            </h3>
            <div className="article-info">
              <span className="source">{article.source}</span>
              <span className="separator">•</span>
              <span className="date">
                {new Date(article.date).toLocaleDateString()}
              </span>
              <span className="separator">•</span>
              <span className={`priority priority-${article.priority}`}>
                {article.priority}
              </span>
              {article.url && (
                <>
                  <span className="separator">•</span>
                  <a
                    href={
                      article.url ||
                      `https://${article.source
                        .toLowerCase()
                        .replace(/\s+/g, "")}.com`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: colors.primary,
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "13px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    <ExternalLink size={12} />
                    Source
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="article-summary">{article.summary}</p>
        <div className="article-footer">
          <div className="tags">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
          <div className="article-stats">
            <div className="vote-display">
              <ThumbsUp size={14} />
              <span>{article.upvotes}</span>
            </div>
            <div className="vote-display">
              <ThumbsDown size={14} />
              <span>{article.downvotes}</span>
            </div>
            <div className="comment-display">
              <MessageCircle size={14} />
              <span>{article.comments.length}</span>
            </div>
            <span className="views">{article.views} views</span>
          </div>
        </div>
      </div>
    );
  };

  const BrowseView = () => (
    <div className="browse-view">
      <div className="browse-header">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search articles, tags, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="filter-btn"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {filterOpen && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="reset-btn"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedRole("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="results-info">
        Showing {filteredArticles.length} of {articles.length} articles
      </div>

      <div className="articles-list">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );

  const RolesView = () => (
    <div className="roles-view">
      <h2>Role-Based Content</h2>
      <p className="roles-description">
        Select your role to see curated content relevant to your needs and
        responsibilities.
      </p>
      <div className="roles-grid">
        {roles.map((role) => {
          const roleArticles = articles.filter(
            (a) => a.roles.includes(role.id) || a.roles.includes("all")
          );
          return (
            <div
              key={role.id}
              className="role-card"
              onClick={() => {
                setSelectedRole(role.id);
                setActiveView("browse");
              }}
            >
              <h3>{role.name}</h3>
              <p>{role.description}</p>
              <div className="role-stats">
                <span>{roleArticles.length} articles</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="kms-container">
      <nav className="sidebar">
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Brain size={32} />
            <span>AI KMS</span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle"
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid currentColor",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "8px",
              transition: "all 0.2s",
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="user-role-switcher">
          <label>Current Role:</label>
          <select
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="nav-links">
          <button
            className={activeView === "dashboard" ? "active" : ""}
            onClick={() => setActiveView("dashboard")}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button
            className={activeView === "browse" ? "active" : ""}
            onClick={() => setActiveView("browse")}
          >
            <Search size={20} />
            Browse
          </button>
          <button
            className={activeView === "roles" ? "active" : ""}
            onClick={() => setActiveView("roles")}
          >
            <Users size={20} />
            By Role
          </button>
          <button
            className={activeView === "recommendations" ? "active" : ""}
            onClick={() => setActiveView("recommendations")}
          >
            <TrendingUp size={20} />
            AI Picks
          </button>
          <button
            className={activeView === "digest" ? "active" : ""}
            onClick={() => setActiveView("digest")}
          >
            <FileText size={20} />
            Smart Digest
          </button>
          <button
            onClick={() => setShowIngestionModal(true)}
            className="ingestion-btn"
          >
            <Brain size={20} />
            Content Assessment
          </button>
          <button
            onClick={() => {
              setShowAddModal(true);
              setShowCustomizationModal(false);
            }}
            className="customize-btn"
          >
            <Settings size={20} />
            Manage Content
          </button>
        </div>
      </nav>

      <main className="main-content">
        <header className="top-bar">
          <h1>
            {activeView === "dashboard" && "Dashboard"}
            {activeView === "browse" && "Browse Knowledge"}
            {activeView === "roles" && "Role-Based Content"}
          </h1>
          <div className="user-actions">
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-avatar">
              <Users size={20} />
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "browse" && <BrowseView />}
          {activeView === "roles" && <RolesView />}
          {activeView === "recommendations" && <RecommendationsView />}
          {activeView === "digest" && <SmartDigestView />}
        </div>
      </main>

      {showAddModal && <AddContentModal />}
      {showIngestionModal && <AIIngestionModal />}
      {showCustomizationModal && <CustomizationModal />}
      {showArticleDetail && selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setShowArticleDetail(false)}
        />
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .kms-container {
          display: flex;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter",
            sans-serif;
          background: ${colors.bg};
          color: ${colors.text};
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .sidebar {
          position: relative;
          z-index: 1;
          width: 260px;
          background: ${isDarkMode ? "#141B28" : "#F9FAFB"};
          border-right: 1px solid ${colors.border};
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .logo {
          display: flex;
          alignitems: center;
          gap: 12px;
          marginbottom: 24px;
          color: ${colors.primary};
          fontsize: 24px;
          fontweight: 800;
          position: relative;
          z-index: 1;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        .nav-links button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: ${colors.textSecondary};
          cursor: pointer;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-links button:hover {
          background: ${isDarkMode ? "#1F2937" : "#E5E7EB"};
          color: ${colors.primary};
        }

        .nav-links button.active {
          background: ${isDarkMode ? "#1E3A8A" : "#DBEAFE"};
          color: ${isDarkMode ? "#60A5FA" : "#1E40AF"};
          font-weight: 700;
        }

        .add-content-btn {
          margin-top: 16px;
          background: ${colors.primary} !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 8px;
          padding: 12px 20px;
          box-shadow: 0 1px 3px
            ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};
        }

        .ingestion-btn {
          margin-top: 8px;
          background: ${colors.secondary} !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 8px;
          padding: 12px 20px;
          box-shadow: 0 1px 3px
            ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};
        }

        .customize-btn {
          margin-top: 8px;
          background: ${colors.warning} !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 8px;
          padding: 12px 20px;
          box-shadow: 0 1px 3px
            ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"};
        }

        .ingestion-modal-large {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 1100px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px ${isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.1)"};
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: ${isDarkMode
            ? "rgba(52, 211, 153, 0.1)"
            : "rgba(16, 185, 129, 0.1)"};
          border: 1px solid ${colors.accent};
          border-radius: 6px;
          font-size: 13px;
          color: ${colors.accent};
          font-weight: 600;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${colors.accent};
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .ai-stats-bar {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          padding: 20px 24px;
          background: ${isDarkMode ? colors.border : "#F8FAFC"};
          border-bottom: 1px solid ${colors.border};
        }

        .ai-stat {
          text-align: center;
        }

        .ai-stat .stat-label {
          font-size: 11px;
          color: ${colors.textTertiary};
          text-transform: uppercase;
          margin-bottom: 6px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .ai-stat .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: ${colors.text};
        }

        .ai-stat .stat-value.success {
          color: ${colors.accent};
        }

        .ai-stat .stat-value.danger {
          color: ${colors.danger};
        }

        .ai-stat .stat-value.warning {
          color: ${colors.warning};
        }

        .activity-view,
        .flagged-view {
          height: 100%;
        }

        .activity-header {
          margin-bottom: 24px;
        }

        .activity-header p {
          color: ${colors.textSecondary};
          font-size: 14px;
          margin-bottom: 16px;
        }

        .confidence-setting {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: transperant;
          padding: 16px;
          border-radius: 8px;
        }

        .confidence-setting label {
          color: ${colors.text};
          font-size: 13px;
          font-weight: 600;
        }

        .confidence-setting input[type="range"] {
          width: 100%;
          height: 6px;
          background: rgba(172, 186, 196, 0.2);
          border-radius: 3px;
          outline: none;
        }

        .confidence-setting input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: colors.secondary;
          border-radius: 50%;
          cursor: pointer;
        }

        .activity-stream {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 500px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          background: transperant;
          border: 1px solid ${colors.border};
          border-left: 3px solid rgba(172, 186, 196, 0.2);
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s;
        }

        .activity-item.auto-approved {
          border-left-color: #22c55e;
        }

        .activity-item.auto-rejected {
          border-left-color: #ef4444;
        }

        .activity-item.flagged-for-review {
          border-left-color: #f59e0b;
        }

        .activity-item.duplicate-merged {
          border-left-color: #e1d9bc;
        }

        .activity-item.updated {
          border-left-color: ${colors.textSecondary};
        }

        .activity-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #30364f;
        }

        .auto-approved .activity-icon {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .auto-rejected .activity-icon {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .flagged-for-review .activity-icon {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
        }

        .duplicate-merged .activity-icon {
          color: #e1d9bc;
          background: rgba(0, 212, 255, 0.1);
        }

        .updated .activity-icon {
          color: ${colors.textSecondary};
          background: rgba(168, 85, 247, 0.1);
        }

        .activity-content {
          flex: 1;
        }

        .activity-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .activity-action {
          font-size: 13px;
          font-weight: 600;
          color: ${colors.textSecondary};
          text-transform: uppercase;
        }

        .activity-timestamp {
          font-size: 12px;
          color: ${colors.textTertiary};
        }

        .activity-title {
          color: ${colors.text};
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .activity-source,
        .activity-existing {
          font-size: 13px;
          color: ${colors.textSecondary};
          margin-bottom: 6px;
        }

        .activity-reason {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-style: italic;
          margin-top: 8px;
          padding: 8px;
          background: rgba(168, 85, 247, 0.05);
          border-radius: 6px;
        }

        .activity-meta {
          font-size: 12px;
          color: ${colors.textTertiary};
          margin-top: 6px;
        }

        .flagged-header {
          margin-bottom: 24px;
        }

        .flagged-header p {
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: ${colors.textSecondary};
          text-align: center;
        }

        .empty-state svg {
          color: #22c55e;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          color: ${colors.text};
          margin-bottom: 8px;
        }

        .flagged-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .flagged-item {
          background: transperant;
          border: 1px solid ${colors.border};
          border-left: 3px solid #f59e0b;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          gap: 16px;
        }

        .flagged-main {
          flex: 1;
        }

        .flagged-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .flagged-title-row h4 {
          color: ${colors.text};
          font-size: 16px;
          margin: 0;
          flex: 1;
        }

        .confidence-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .confidence-badge.low {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .flagged-summary {
          line-height: 1.6;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .flagged-flag-reason {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;

          font-size: 13px;
          margin-bottom: 12px;
        }

        .flagged-flag-reason strong {
          color: #f59e0b;
        }

        .flagged-conflicts {
          margin-top: 12px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          font-size: 13px;
          color: #ef4444;
        }

        .conflict-tag {
          display: inline-block;
          margin: 4px 4px 0 0;
          padding: 4px 8px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 4px;
          font-size: 12px;
        }

        .flagged-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: ${colors.textSecondary};
          margin-bottom: 12px;
        }

        .flagged-source {
        }

        .flagged-classification {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .flagged-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .flagged-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 120px;
        }

        .source-stats-detailed {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 8px;
        }

        .source-stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .source-stat-item .stat-num {
          font-size: 16px;
          font-weight: 600;
          color: ${colors.text};
        }

        .source-stat-item.success .stat-num {
          color: #22c55e;
        }

        .source-stat-item.danger .stat-num {
          color: #ef4444;
        }

        .source-stat-item.warning .stat-num {
          color: #f59e0b;
        }

        .source-stat-item .stat-label {
          font-size: 10px;
          color: ${colors.textTertiary};
          text-transform: uppercase;
        }

        .source-stat-item .stat-text {
          font-size: 11px;
          color: ${colors.textSecondary};
        }

        .ingestion-modal {
          background: #30364f;
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .ingestion-tabs {
          display: flex;
          gap: 8px;
          padding: 16px 24px 0;
          border-bottom: 1px solid rgba(172, 186, 196, 0.2);
        }

        .ingestion-tabs button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }

        .ingestion-tabs button:hover {
          color: #e1d9bc;
        }

        .ingestion-tabs button.active {
          color: #e1d9bc;
          border-bottom-color: #e1d9bc;
        }

        .ingestion-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .sources-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .sources-header p {
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .add-source-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: colors.accent;
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-source-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .source-item {
          background: transperant;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .source-info {
          flex: 1;
        }

        .source-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .source-header h4 {
          color: ${colors.text};
          font-size: 16px;
          margin: 0;
        }

        .source-status {
          font-size: 12px;
          font-weight: 600;
        }

        .source-status.enabled {
          color: #22c55e;
        }

        .source-status.disabled {
          color: ${colors.textSecondary};
        }

        .source-details {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 13px;
          color: ${colors.textSecondary};
          margin-bottom: 6px;
        }

        .source-type {
          background: rgba(0, 212, 255, 0.2);

          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .source-url {
          color: ${colors.textSecondary};
        }

        .source-stats {
          color: ${colors.textTertiary};
          font-size: 12px;
        }

        .source-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px;
          background: transparent;
          border: 1px solid ${colors.border};
          border-radius: 6px;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(0, 212, 255, 0.1);
          border-color: #e1d9bc;
          color: #e1d9bc;
        }

        .sync-btn:hover {
          background: rgba(168, 85, 247, 0.1);
          border-color: ${colors.textSecondary};
          color: ${colors.textSecondary};
        }

        .pending-header {
          margin-bottom: 24px;
        }

        .pending-header p {
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .pending-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pending-item {
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          padding: 20px;
          display: flex;
          gap: 16px;
        }

        .pending-main {
          flex: 1;
        }

        .pending-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .pending-title-row h4 {
          color: ${colors.text};
          font-size: 16px;
          margin: 0;
          flex: 1;
        }

        .ai-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: colors.secondary;
          border-radius: 6px;
          color: ${colors.text};
          font-size: 11px;
          font-weight: 600;
        }

        .pending-summary {
          color: #e1d9bc;
          line-height: 1.6;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .pending-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: ${colors.textSecondary};
          margin-bottom: 16px;
        }

        .pending-source {
          color: #e1d9bc;
        }

        .pending-classification {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .classification-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .classification-item label {
          color: ${colors.textTertiary};
          font-size: 12px;
          min-width: 80px;
          font-weight: 600;
        }

        .classification-value {
          color: ${colors.text};
          font-size: 14px;
        }

        .pending-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pending-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 120px;
        }

        .approve-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .approve-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        }

        .reject-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.textSecondary};
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reject-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .top-bar {
          background: ${colors.surface};
          border-bottom: 2px solid ${colors.border};
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 1px 3px
            ${isDarkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.08)"};
        }

        .top-bar h1 {
          font-size: 28px;
          font-weight: 800;
          color: ${colors.text};
          letter-spacing: -0.02em;
        }

        .user-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .icon-btn {
          background: transparent;
          border: 1px solid ${colors.border};
          padding: 8px;
          border-radius: 8px;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: rgba(0, 212, 255, 0.1);
          border-color: #e1d9bc;
          color: #e1d9bc;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: colors.accent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.text};
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 32px;
          background: ${isDarkMode ? "#0D1117" : "#F3F4F6"};
          position: relative;
          z-index: 1;
        }

        .dashboard {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: ${colors.surface};
          border: 2px solid ${colors.border};
          border-radius: 12px;
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 1;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: ${colors.primary};
          box-shadow: 0 8px 24px
            ${isDarkMode
              ? "rgba(96, 165, 250, 0.3)"
              : "rgba(59, 130, 246, 0.2)"};
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.text};
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: ${colors.text};
        }

        .stat-label {
          font-size: 14px;
          color: ${colors.textSecondary};
          margin-top: 4px;
          font-weight: 600;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .category-card {
          background: ${colors.surface};
          border: 2px solid ${colors.border};
          border-radius: 12px;
          padding: 28px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: ${colors.primary};
          box-shadow: 0 8px 24px
            ${isDarkMode
              ? "rgba(96, 165, 250, 0.3)"
              : "rgba(59, 130, 246, 0.2)"};
        }

        .category-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #ffffff;
        }

        .category-card h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: ${colors.text};
          font-weight: 700;
        }

        .category-count {
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .recent-section h2 {
          font-size: 24px;
          margin-bottom: 24px;
          color: ${colors.text};
        }

        .articles-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .article-card {
          background: ${colors.surface};
          border: 2px solid ${colors.border};
          border-radius: 12px;
          padding: 24px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .article-card:hover {
          border-color: ${colors.primary};
          box-shadow: 0 4px 16px
            ${isDarkMode
              ? "rgba(96, 165, 250, 0.3)"
              : "rgba(59, 130, 246, 0.2)"};
          transform: translateY(-2px);
        }

        .article-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .article-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.text};
          flex-shrink: 0;
        }

        .article-meta {
          flex: 1;
        }

        .article-meta h3 {
          font-size: 18px;
          color: ${colors.text};
          margin-bottom: 8px;
          font-weight: 700;
        }

        .article-info {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 13px;
          color: ${colors.textSecondary};
        }

        .separator {
          color: #4a4a5e;
        }

        .priority {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .priority-high {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .priority-medium {
          background: rgba(251, 146, 60, 0.2);
          color: #fb923c;
        }

        .priority-low {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .article-summary {
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 6px;
          font-size: 12px;
        }

        .article-stats {
          display: flex;
          gap: 16px;
          align-items: center;
          font-size: 13px;
          color: ${colors.textSecondary};
        }

        .vote-display {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .comment-display {
          display: flex;
          align-items: center;
          gap: 4px;
          color: ${colors.textSecondary};
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ffd700;
        }

        .user-role-switcher {
          background: ${isDarkMode ? colors.border : "#F1F5F9"};
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid ${colors.border};
        }

        .user-role-switcher label {
          display: block;
          font-size: 11px;
          color: ${colors.textTertiary};
          margin-bottom: 8px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .user-role-switcher select {
          width: 100%;
          padding: 8px 12px;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 6px;
          color: ${colors.text};
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-role-switcher select:hover {
          border-color: ${colors.primary};
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: ${colors.text};
          padding: 8px 0;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .role-checkboxes {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 8px;
        }

        .restricted-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: rgba(255, 215, 0, 0.2);
          border-radius: 4px;
          font-size: 11px;
          color: #ffd700;
          font-weight: 600;
        }

        .article-detail-modal {
          background: #30364f;
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .article-detail-content {
          padding: 24px;
        }

        .detail-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 13px;
          color: ${colors.textSecondary};
          margin-bottom: 20px;
        }

        .detail-source {
          color: #e1d9bc;
          font-weight: 600;
        }

        .detail-summary {
          margin-bottom: 24px;
        }

        .detail-summary p {
          color: ${colors.text};
          line-height: 1.8;
          font-size: 16px;
        }

        .detail-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .vote-section {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 20px 0;
          border-top: 1px solid rgba(172, 186, 196, 0.2);
          border-bottom: 1px solid rgba(172, 186, 196, 0.2);
          margin-bottom: 24px;
        }

        .vote-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 600;
        }

        .vote-btn.upvote:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
          color: #22c55e;
        }

        .vote-btn.downvote:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }

        .vote-stats {
          display: flex;
          align-items: center;
          gap: 6px;
          color: ${colors.textSecondary};
          margin-left: auto;
        }

        .comments-section {
          margin-top: 32px;
        }

        .comments-section h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${colors.text};
          margin-bottom: 20px;
        }

        .comment-input {
          margin-bottom: 24px;
        }

        .comment-input textarea {
          width: 100%;
          padding: 12px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          font-family: inherit;
          margin-bottom: 12px;
          resize: vertical;
        }

        .comment-submit {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: colors.accent;
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .comment-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .comment-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .comment {
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          padding: 16px;
        }

        .comment-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .comment-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: colors.accent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.text};
          font-weight: 600;
          flex-shrink: 0;
        }

        .comment-meta {
          flex: 1;
        }

        .comment-author {
          color: ${colors.text};
          font-weight: 600;
          font-size: 14px;
        }

        .comment-date {
          color: ${colors.textSecondary};
          font-size: 12px;
          margin-top: 2px;
        }

        .comment-text {
          color: ${colors.text};
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .comment-actions {
          display: flex;
          gap: 8px;
        }

        .like-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          background: transparent;
          border: 1px solid ${colors.border};
          border-radius: 6px;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
        }

        .like-btn:hover {
          background: rgba(0, 212, 255, 0.1);
          border-color: #e1d9bc;
          color: #e1d9bc;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ffd700;
        }

        .browse-view {
          max-width: 1400px;
          margin: 0 auto;
        }

        .browse-header {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          padding: 12px 20px;
          color: ${colors.textSecondary};
        }

        .search-bar input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: ${colors.text};
          font-size: 15px;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          padding: 12px 24px;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          color: ${colors.text};
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #e1d9bc;
          background: rgba(0, 212, 255, 0.1);
        }

        .filters-panel {
          background: #30364f;
          border: 1px solid ${colors.border};
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-group {
          flex: 1;
          min-width: 200px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 8px;
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .filter-group select {
          width: 100%;
          padding: 10px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          cursor: pointer;
        }

        .reset-btn {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-end;
        }

        .reset-btn:hover {
          border-color: #e1d9bc;
          color: #e1d9bc;
        }

        .results-info {
          color: ${colors.textSecondary};
          margin-bottom: 16px;
          font-size: 14px;
        }

        .roles-view {
          max-width: 1400px;
          margin: 0 auto;
        }

        .roles-view h2 {
          font-size: 32px;
          margin-bottom: 12px;
          color: ${colors.text};
        }

        .roles-description {
          color: ${colors.textSecondary};
          margin-bottom: 32px;
          font-size: 16px;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .role-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: 28px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .role-card:hover {
          transform: translateY(-4px);
          border-color: #e1d9bc;
          box-shadow: 0 8px 24px rgba(0, 212, 255, 0.2);
        }

        .role-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: ${colors.text};
        }

        .role-card p {
          color: ${colors.textSecondary};
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .role-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 14px;
          font-weight: 600;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #30364f;
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;

          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(172, 186, 196, 0.2);
        }

        .modal-header h2 {
          font-size: 24px;
          color: ${colors.text};
        }

        .close-btn {
          background: transparent;
          border: none;
          color: ${colors.textSecondary};
          cursor: pointer;
          padding: 4px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          color: #e1d9bc;
        }

        form {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: ${colors.textSecondary};
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          font-family: inherit;
        }

        .form-group textarea {
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: colors.accent;
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .recommendations-view,
        .digest-view {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .recommendations-header,
        .digest-header {
          margin-bottom: 32px;
        }

        .recommendations-header h2,
        .digest-header h2 {
          font-size: 32px;
          color: ${colors.text};
          margin-bottom: 8px;
        }

        .recommendations-header p,
        .digest-header p {
          color: ${colors.textSecondary};
          font-size: 16px;
        }

        .digest-export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: colors.accent;
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 16px;
        }

        .digest-export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .recommendation-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-left: 3px solid #acbac4;
          border-radius: 12px;
          padding: 24px;
        }

        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .recommendation-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: colors.secondary;
          border-radius: 6px;
          color: ${colors.text};
          font-size: 12px;
          font-weight: 600;
        }

        .recommendation-card h3 {
          color: ${colors.text};
          font-size: 20px;
          margin-bottom: 12px;
        }

        .recommendation-reason {
          font-style: italic;
          margin-bottom: 16px;
        }

        .relevance-factors {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .factor-tag {
          padding: 4px 12px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 6px;
          font-size: 12px;
        }

        .digest-sections {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .digest-section {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: 28px;
        }

        .digest-section h3 {
          font-size: 22px;
          color: ${colors.text};
          margin-bottom: 8px;
        }

        .section-desc {
          color: ${colors.textSecondary};
          font-size: 14px;
          margin-bottom: 20px;
        }

        .digest-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .digest-item {
          padding: 16px;
          background: transperant;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          transition: all 0.2s;
        }

        .digest-item:hover {
          border-color: #e1d9bc;
        }

        .digest-item.priority {
          border-left: 3px solid #ef4444;
        }

        .digest-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .digest-item h4 {
          color: ${colors.text};
          font-size: 16px;
          margin: 0;
        }

        .digest-engagement {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #22c55e;
          font-size: 13px;
        }

        .priority-badge {
          padding: 4px 10px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 4px;
          font-size: 11px;
          color: #ef4444;
          font-weight: 600;
        }

        .digest-item p {
          color: ${colors.textSecondary};
          font-size: 14px;
          line-height: 1.6;
        }

        .skill-recommendations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .skill-card {
          padding: 20px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          text-align: center;
        }

        .skill-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .skill-card h4 {
          color: ${colors.text};
          font-size: 16px;
          margin-bottom: 8px;
        }

        .skill-card p {
          color: ${colors.textSecondary};
          font-size: 13px;
          margin-bottom: 12px;
        }

        .skill-progress {
          height: 6px;
          background: rgba(172, 186, 196, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: colors.accent;
          transition: width 0.3s;
        }

        .user-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .user-stat {
          padding: 20px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: #e1d9bc;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: ${colors.textSecondary};
        }

        .customization-modal {
          background: #30364f;
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .customization-content {
          padding: 24px;
        }

        .customization-section {
          margin-bottom: 32px;
        }

        .customization-section h3 {
          font-size: 20px;
          color: ${colors.text};
          margin-bottom: 12px;
        }

        .customization-section p {
          color: ${colors.textSecondary};
          margin-bottom: 16px;
        }

        .industry-select {
          width: 100%;
          padding: 12px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: 15px;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .setting-item {
          padding: 16px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
        }

        .setting-desc {
          color: ${colors.textTertiary};
          font-size: 12px;
          margin-top: 8px;
        }

        .retention-input {
          width: 150px;
          padding: 10px;
          background: #3a4058;
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: 14px;
        }

        .white-label-note {
          color: #e1d9bc;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .white-label-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .feature-badge {
          padding: 8px 16px;
          background: colors.accent;
          border-radius: 6px;
          color: ${colors.text};
          font-size: 13px;
          font-weight: 600;
        }

        .save-config-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border: none;
          border-radius: 8px;
          color: ${colors.text};
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 16px;
        }

        .save-config-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        }
      `}</style>
    </div>
  );
};

export default KnowledgeManagementSystem;
