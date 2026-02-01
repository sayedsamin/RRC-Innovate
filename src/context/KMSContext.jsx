import { createContext, useContext, useState, useMemo, useEffect } from 'react';
// Icon imports moved to data/categories.js

import { userData } from '../../data/user';
import { categories as initialCategories } from '../../data/categories';
import { sampleArticles as initialArticles } from '../../data/sampleArticles';
import { roles as initialRoles } from '../../data/roles';

const KMSContext = createContext();

export function KMSProvider({ children }) {
  const [user, setUser] = useState(userData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showIngestionModal, setShowIngestionModal] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);

  /* 
   * Synchronize isDarkMode state with the DOM 
   * so CSS variables can switch automatically.
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // User Preferences for AI Picks
  const [userPreferences, setUserPreferences] = useState({
    currentWork: [],
    learningGoals: [],
    tools: []
  });

  const updateUserPreferences = (newPrefs) => {
    setUserPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const colors = useMemo(() => {
    return {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",
        textTertiary: "var(--color-text-tertiary)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        cyan: "var(--color-cyan)",
    };
  }, []);

  const categories = useMemo(() => initialCategories, []);
  
  // In a real app, you might fetch this affects or useState
  const articles = initialArticles;

  const stats = useMemo(() => {
    return {
      totalArticles: articles.length,
      thisWeek: articles.filter((a) => {
        if (!a.date) return false;
        const date = new Date(a.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo; // Mock 'now' as 2026-01-31 or just rely on system date which is 2026-01-31
      }).length,
      highPriority: articles.filter((a) => a.priority === "high").length,
      totalEngagement: articles.reduce(
        (sum, a) => sum + (a.upvotes || 0) + (a.comments?.length || 0),
        0
      ),
    };
  }, [articles]);

  const roles = initialRoles;

  const value = {
    user,
    setUser,
    currentUser: user,
    setCurrentUser: setUser,
    isDarkMode,
    setIsDarkMode,
    showIngestionModal,
    setShowIngestionModal,
    showCustomizationModal,
    setShowCustomizationModal,
    stats,
    articles,
    categories,
    roles,
    colors,
    userPreferences,
    updateUserPreferences
  };

  return <KMSContext.Provider value={value}>{children}</KMSContext.Provider>;
}

export function useKMS() {
  const context = useContext(KMSContext);
  if (context === undefined) {
    throw new Error('useKMS must be used within a KMSProvider');
  }
  return context;
}