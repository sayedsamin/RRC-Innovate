import { useState, useRef, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Send, User, Bot, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { useKMS } from '../context/KMSContext';

export const Route = createFileRoute('/ask')({
  component: AskPage,
});

function AskPage() {
  const { colors, articles } = useKMS();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Hello! I'm your AI Knowledge Consultant. Ask me anything about our internal docs, strategies, or tools.",
      citations: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAIResponse = (query) => {
    setIsTyping(true);
    
    // 1. Keyword Extraction (Mock)
    const keywords = query.toLowerCase().split(' ').filter(w => w.length > 3);
    
    // 2. Retrieval (Find relevant articles)
    const relevantArticles = articles.filter(a => {
        const text = (a.title + a.summary + a.tags.join(' ')).toLowerCase();
        return keywords.some(k => text.includes(k));
    }).slice(0, 3); // Top 3

    // 3. Synthesis (Mock Template)
    setTimeout(() => {
        let responseContent = "";
        
        if (relevantArticles.length === 0) {
            responseContent = "I couldn't find specific documents matching your query in our Knowledge Base. However, I can suggest looking into general 'Strategy' or 'Tools' categories.";
        } else {
            const titles = relevantArticles.map(a => `**${a.title}**`).join(', ');
            responseContent = `Based on **${relevantArticles.length} sources** from our knowledge base (${titles}), here is a synthesized answer:\n\n`;
            
            // Mock answer generation based on first article's category
            const mainCategory = relevantArticles[0].category;
            if (mainCategory === 'business' || mainCategory === 'trends') {
                responseContent += "Strategically, this involves balancing operational efficiency with long-term ROI. The documents suggest a **phased adoption approach** to mitigate risk while capturing early value.\n\nKey considerations include:\n*   **Vendor Lock-in**: carefully evaluate multi-cloud dependencies.\n*   **Cost**: Shift from CapEx to OpEx models where possible.";
            } else if (mainCategory === 'tools' || mainCategory === 'skills') {
                responseContent += "Technically, the recommended approach is to leverages existing frameworks rather than building from scratch. \n\nSteps to proceed:\n1.  **Audit**: Review current tool usage.\n2.  **Pilot**: Start with a non-critical workload.\n3.  **Scale**: Roll out to the wider team once stability is proven.";
            } else {
                responseContent += "The internal guidance suggests prioritizing this initiative. It aligns with our Q1 goals for digital transformation and knowledge sharing.";
            }
        }

        const newMessage = {
            id: messages.length + 2,
            role: 'assistant',
            content: responseContent,
            citations: relevantArticles
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
    }, 1500); // 1.5s simulated delay
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');
    
    simulateAIResponse(query);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", height: "calc(100vh - 40px)", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "20px", borderBottom: `1px solid ${colors.border}`, paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: colors.text, display: "flex", alignItems: "center", gap: "12px", margin: 0 }}>
            <Sparkles className="text-primary" size={28} color={colors.primary} /> 
            Ask KMS
        </h1>
        <p style={{ color: colors.textSecondary, margin: "4px 0 0 40px" }}>
            Conversational search powered by your knowledge base.
        </p>
      </div>

      {/* Chat Area */}
      <div style={{ 
          flex: 1, 
          overflowY: "auto", 
          paddingRight: "10px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px",
          marginBottom: "20px"
      }}>
        {messages.map((msg) => (
            <div key={msg.id} style={{ 
                display: "flex", 
                gap: "16px", 
                flexDirection: msg.role === 'user' ? "row-reverse" : "row",
                alignItems: "flex-start"
            }}>
                {/* Avatar */}
                <div style={{ 
                    width: "36px", height: "36px", borderRadius: "50%", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: msg.role === 'user' ? colors.secondary : colors.primary,
                    color: "white", flexShrink: 0
                }}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Message Bubble container */}
                <div style={{ maxWidth: "70%" }}>
                    <div style={{ 
                        padding: "16px", 
                        borderRadius: "16px",
                        borderTopLeftRadius: msg.role === 'assistant' ? "4px" : "16px",
                        borderTopRightRadius: msg.role === 'user' ? "4px" : "16px",
                        background: msg.role === 'user' ? colors.primary : colors.surface,
                        border: msg.role === 'assistant' ? `1px solid ${colors.border}` : "none",
                        color: msg.role === 'user' ? "white" : colors.text,
                        boxShadow: msg.role === 'assistant' ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                        lineHeight: "1.6"
                    }}>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                             {/* Simple parser for **bold** */}
                             {msg.content.split('**').map((part, i) => 
                                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                             )}
                        </div>
                    </div>

                    {/* Citations (Only for assistant) */}
                    {msg.citations && msg.citations.length > 0 && (
                        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "700", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>Sources Used</span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {msg.citations.map(citation => (
                                    <Link 
                                        key={citation.id} 
                                        to={`/article/${citation.id}`}
                                        style={{ 
                                            textDecoration: "none",
                                            background: "rgba(255,255,255,0.5)",
                                            border: `1px solid ${colors.border}`,
                                            borderRadius: "8px",
                                            padding: "8px 12px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            maxWidth: "300px",
                                            transition: "all 0.2s"
                                        }}
                                        className="hover:border-primary" // Tailwind utility requiring config or direct style hover handling
                                    >
                                        <BookOpen size={14} color={colors.primary} />
                                        <div style={{ overflow: "hidden" }}>
                                            <div style={{ fontSize: "12px", fontWeight: "600", color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {citation.title}
                                            </div>
                                        </div>
                                        <ArrowRight size={12} color={colors.textSecondary} style={{ marginLeft: "auto" }} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ))}

        {isTyping && (
             <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ 
                    width: "36px", height: "36px", borderRadius: "50%", 
                    background: colors.primary, color: "white", 
                    display: "flex", alignItems: "center", justifyContent: "center" 
                }}>
                    <Bot size={18} />
                </div>
                <div style={{ 
                    padding: "16px", background: colors.surface, borderRadius: "16px", 
                    borderTopLeftRadius: "4px", border: `1px solid ${colors.border}`,
                    display: "flex", alignItems: "center", gap: "4px"
                }}>
                    <span style={{ width: "6px", height: "6px", background: colors.textSecondary, borderRadius: "50%", animation: "bounce 1s infinite" }}></span>
                    <span style={{ width: "6px", height: "6px", background: colors.textSecondary, borderRadius: "50%", animation: "bounce 1s infinite 0.2s" }}></span>
                    <span style={{ width: "6px", height: "6px", background: colors.textSecondary, borderRadius: "50%", animation: "bounce 1s infinite 0.4s" }}></span>
                </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ position: "relative" }}>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your knowledge base..."
            style={{
                width: "100%",
                padding: "18px 60px 18px 24px",
                borderRadius: "16px",
                border: `2px solid ${colors.border}`,
                background: colors.surface,
                color: colors.text,
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
        />
        <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: input.trim() ? colors.primary : colors.border,
                color: "white",
                border: "none",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
                transition: "all 0.2s"
            }}
        >
            <Send size={18} />
        </button>
      </form>
      
      <style>{`
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
