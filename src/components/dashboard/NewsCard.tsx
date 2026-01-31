"use client";

import { useState } from "react";
import { 
    ExternalLink, 
    Globe, 
    FileText, 
    Github, 
    TrendingUp, 
    AlertCircle, 
    Rocket, 
    Ghost, 
    MessageSquare, 
    Send 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface NewsItem {
  id: string;
  type: string;
  title: string;
  source: string;
  timestamp: string;
  snippet: string;
  relevance: string;
  link: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'paper': return <FileText className="h-4 w-4 text-red-500" />;
    case 'repo': return <Github className="h-4 w-4 text-gray-900 dark:text-gray-100" />;
    case 'news': return <Globe className="h-4 w-4 text-blue-500" />;
    case 'report': return <TrendingUp className="h-4 w-4 text-green-500" />;
    default: return <AlertCircle className="h-4 w-4 text-orange-500" />;
  }
};

export function NewsCard({ item }: { item: NewsItem }) {
  // Use a deterministic "random" number based on ID to avoid hydration mismatch
  const initialVotes = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 50 + 10;
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { user: "Sarah Chen", text: "This is exactly what we needed for the Q3 pipeline.", time: "10m ago", avatar: "SC" },
    { user: "AI Bot", text: "Related: Check out the new v2.1 documentation.", time: "1h ago", avatar: "AI" }
  ]);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
      setVotes(type === 'up' ? votes - 1 : votes + 1);
    } else {
      if (userVote === 'up') setVotes(votes - 1);
      if (userVote === 'down') setVotes(votes + 1);
      
      setUserVote(type);
      setVotes(prev => type === 'up' ? prev + 1 : prev - 1);
    }
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, {
        user: "You",
        text: commentText,
        time: "Just now",
        avatar: "ME"
    }]);
    setCommentText("");
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 p-5 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      {/* Background Gradient Hint */}
      {userVote === 'up' && <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl -z-10 rounded-full pointer-events-none" />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {getTypeIcon(item.type)}
          <span>{item.source}</span>
          <span className="text-muted-foreground/30">•</span>
          <span>{item.timestamp}</span>
        </div>
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-full"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.snippet}</p>
      </div>

      <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs font-medium text-primary flex items-start gap-2">
            <span className="shrink-0 pt-0.5">💡</span>
            <span><span className="font-bold">AI Insight:</span> {item.relevance}</span>
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t mt-2">
        <div className="flex items-center gap-2">
            
            {/* Boost Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote('up')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    userVote === 'up' 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
                <Rocket className={`h-3.5 w-3.5 ${userVote === 'up' && "animate-pulse"}`} />
                <span>Boost {userVote === 'up' ? votes : votes}</span>
            </motion.button>

            {/* Mute Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote('down')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    userVote === 'down'
                    ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 border border-red-200 dark:border-red-800"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
                <Ghost className="h-3.5 w-3.5" />
                <span>Noise</span>
            </motion.button>

        </div>

        <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs gap-2 ${showComments ? "bg-muted" : ""}`}
            onClick={() => setShowComments(!showComments)}
        >
            <MessageSquare className="h-3.5 w-3.5" />
            Discuss ({comments.length})
        </Button>
      </div>

      {/* Comment Section using AnimatePresence for smooth expand/collapse */}
      <AnimatePresence>
        {showComments && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
            >
                <div className="pt-4 space-y-4">
                    <div className="space-y-3 pl-2 border-l-2 border-muted">
                        {comments.map((comment, i) => (
                            <div key={i} className="flex gap-3 text-sm">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{comment.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-xs">{comment.user}</span>
                                        <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                                    </div>
                                    <p className="text-muted-foreground mt-0.5">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Add your thoughts..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                            className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button size="icon" className="h-8 w-8 rounded-full" onClick={handlePostComment}>
                            <Send className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
