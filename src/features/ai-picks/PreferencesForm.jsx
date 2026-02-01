import { useState } from 'react';
import { useKMS } from '../../context/KMSContext';
import { Plus, X, ArrowRight, Sparkles } from 'lucide-react';

export default function PreferencesForm() {
  const { updateUserPreferences, colors } = useKMS();
  
  const [currentWork, setCurrentWork] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const [tools, setTools] = useState([]);

  // Local state for inputs
  const [workInput, setWorkInput] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [toolInput, setToolInput] = useState('');

  const addItem = (list, setList, input, setInput) => {
    if (!input.trim()) return;
    if (list.includes(input.trim())) return;
    setList([...list, input.trim()]);
    setInput('');
  };

  const removeItem = (list, setList, itemToRemove) => {
    setList(list.filter(item => item !== itemToRemove));
  };

  const handleKeyDown = (e, list, setList, input, setInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(list, setList, input, setInput);
    }
  };

  // state for Jira integration
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');

  const handleConnectJira = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(r => setTimeout(r, 1500));
    setIsConnecting(false);
    setIsAnalyzing(true);
    
    // Simulate AI Analysis Steps
    const steps = [
        "Fetching active issues from Jira...",
        "Analyzing project descriptions...",
        "Extracting key technology themes...",
        "Mapping to knowledge base..."
    ];

    for (const step of steps) {
        setAnalysisStep(step);
        await new Promise(r => setTimeout(r, 800));
    }

    // Import the mock data dynamically to avoid cluttering initial load if we were real
    const { mockJiraIssues } = await import('../../../data/mockJira');

    // "AI Extraction" logic - simplified for demo
    // In a real app, this would send descriptions to an LLM
    const newWork = new Set([...currentWork]);
    const newGoals = new Set([...learningGoals]);
    const newTools = new Set([...tools]);

    mockJiraIssues.forEach(issue => {
        // Extract tags from labels and summary
        issue.labels.forEach(label => {
            if (["AWS", "Azure", "GCP", "Kubernetes", "Data Lake"].includes(label)) {
                newTools.add(label);
            } else if (["Cloud Strategy", "Migration", "FinOps", "Cost Optimization", "Data Governance"].includes(label)) {
                newWork.add(label);
            } else if (["Generative AI", "Rust", "React Native"].includes(label)) {
                newGoals.add(label); // Assuming these are learning areas or active work
            } else {
                newWork.add(label);
            }
        });
    });

    // Hardcoded "Smart" additions based on the persona description
    newTools.add("PowerPoint");
    newTools.add("Excel");
    newGoals.add("AI Ethics");

    setCurrentWork(Array.from(newWork));
    setLearningGoals(Array.from(newGoals));
    setTools(Array.from(newTools));

    setIsAnalyzing(false);
  };

  const handleSave = () => {
    updateUserPreferences({
        currentWork,
        learningGoals,
        tools
    });
  };

  const renderTagInput = (label, list, setList, input, setInput, placeholder) => (
    <div style={{ marginBottom: "24px" }}>
      <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: colors.textSecondary, marginBottom: "8px" }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
        {list.length === 0 && (
            <span style={{ fontSize: "13px", color: colors.textTertiary, fontStyle: "italic", padding: "6px 0" }}>
                No items yet. Type adding or connect data sources.
            </span>
        )}
        {list.map((item, index) => (
          <span 
            key={index} 
            style={{ 
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 14px", 
              background: "var(--color-bg)", // Using variable for consistency
              borderRadius: "20px",
              fontSize: "13px", color: colors.primary, fontWeight: "500",
              border: `1px solid ${colors.border}`,
              animation: "fadeIn 0.3s ease-out"
            }}
          >
            {item}
            <button
              onClick={() => removeItem(list, setList, item)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", padding: 0, color: colors.textSecondary }}
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, list, setList, input, setInput)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px",
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            color: colors.text,
            fontSize: "14px",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.borderColor = colors.primary}
          onBlur={(e) => e.target.style.borderColor = colors.border}
        />
        <button
            onClick={() => addItem(list, setList, input, setInput)}
            style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: colors.textSecondary,
                cursor: "pointer",
                display: "flex", alignItems: "center"
            }}
        >
            <Plus size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto", 
        padding: "32px", 
        background: colors.surface, 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: `1px solid ${colors.border}`
    }}>
      <style>
        {`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes pulse-ring {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
            }
        `}
      </style>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ 
            display: "inline-flex", alignItems: "center", justifyContent: "center", 
            padding: "12px", background: "var(--color-bg)", borderRadius: "50%", marginBottom: "16px" 
        }}>
            <Sparkles size={32} style={{ color: colors.primary }} />
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: colors.text, marginBottom: "8px" }}>Customize Your Experience</h2>
        <p style={{ color: colors.textSecondary, fontSize: "15px", marginBottom: "24px" }}>
          Tell us about your work and goals so we can curate the best content for you.
        </p>
        
        {/* Jira Connect Button */}
        <div style={{ background: colors.bg, padding: "20px", borderRadius: "12px", border: `1px dashed ${colors.border}` }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Autofill from your workflow</h3>
            
            {!isAnalyzing && !isConnecting ? (
                <button
                    onClick={handleConnectJira}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "10px 20px",
                        background: "#0052CC", // Jira Blue
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                >
                    <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png" alt="Jira" width="20" height="20" style={{ filter: "brightness(0) invert(1)" }} />
                    Connect Jira
                </button>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: colors.textSecondary }}>
                    {isConnecting ? (
                        <span style={{ fontSize: "14px" }}>Connecting to Atlassian Cloud...</span>
                    ) : (
                        <>
                            <div style={{ 
                                width: "40px", height: "40px", borderRadius: "50%", 
                                background: colors.primary, marginBottom: "12px",
                                animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                            }}>
                                <Sparkles size={20} color="white" style={{ margin: "10px" }} />
                            </div>
                            <span style={{ fontSize: "14px", fontWeight: "500", color: colors.primary }}>
                                {analysisStep}
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
      </div>

      {renderTagInput(
        "Current Projects & Focus Areas", 
        currentWork, setCurrentWork, 
        workInput, setWorkInput, 
        "e.g., Cloud Migration, FinOps..."
      )}

      {renderTagInput(
        "Learning Goals", 
        learningGoals, setLearningGoals, 
        goalInput, setGoalInput, 
        "e.g., GenAI, Compliance..."
      )}

      {renderTagInput(
        "Tools & Platforms", 
        tools, setTools, 
        toolInput, setToolInput, 
        "e.g., AWS, Azure, Jira..."
      )}

      <div style={{ marginTop: "32px", borderTop: `1px solid ${colors.border}`, paddingTop: "24px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          disabled={currentWork.length === 0 && learningGoals.length === 0 && tools.length === 0}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 24px",
            background: (currentWork.length === 0 && learningGoals.length === 0 && tools.length === 0) ? colors.textTertiary : colors.primary,
            color: "var(--color-white)",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            fontWeight: "600",
            cursor: (currentWork.length === 0 && learningGoals.length === 0 && tools.length === 0) ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          Start Curating
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
