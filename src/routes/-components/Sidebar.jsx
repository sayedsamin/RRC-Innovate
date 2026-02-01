import React from 'react';
import { Link } from '@tanstack/react-router';
import { 
  Brain, 
  BarChart3, 
  Search, 
  Users, 
  TrendingUp, 
  FileText, 
  Settings, 
  Sun, 
  Moon,
  MessageCircle
} from 'lucide-react';

import logo from '../../assets/logo.jpeg';

export const Sidebar = ({ 
  isDarkMode, 
  setIsDarkMode, 
  colors, 
  currentUser, 
  setCurrentUser, 
  roles,
  setShowIngestionModal,
  setShowCustomizationModal 
}) => {

  // Styling helpers
  const sidebarStyle = {
    width: "260px", 
    background: "var(--color-sidebar-bg)",
    borderRight: `1px solid ${colors.border}`, 
    display: "flex", 
    flexDirection: "column", 
    padding: "24px",
    height: "100vh", 
    position: "sticky", 
    top: 0, 
    left: 0,
    transition: "all 0.3s ease",
    zIndex: 10
  };

  const navLinkStyle = {
    display: "flex", 
    alignItems: "center", 
    gap: "12px", 
    padding: "10px 12px", 
    background: "transparent",
    border: "none",
    color: colors.textSecondary,
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    marginBottom: "4px",
    transition: "all 0.2s"
  };

  // TanStack Router active state props
  const activeLinkProps = {
    style: {
      background: "var(--color-nav-active-bg)",
      color: "var(--color-nav-active-text)",
      fontWeight: 700
    }
  };

  const actionBtnStyle = (bgColor) => ({
    marginTop: "8px",
    background: bgColor,
    color: "var(--color-white)",
    fontWeight: "600",
    borderRadius: "8px",
    padding: "12px 20px",
    border: "none",
    cursor: "pointer",
    display: "flex", 
    alignItems: "center", 
    gap: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    fontSize: "13px"
  });

  return (
    <nav className="sidebar" style={sidebarStyle}>
      {/* --- LOGO & THEME TOGGLE --- */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", color: colors.primary, fontSize: "24px", fontWeight: "800" }}>
          <img src={logo} alt="AI KMS Logo" style={{ width: "32px", height: "32px", borderRadius: "6px", objectFit: "cover" }} />
          <span>AI KMS</span>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: `1px solid ${colors.textSecondary}`, borderRadius: "8px",
            cursor: "pointer", color: colors.text
          }}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* --- ROLE SWITCHER --- */}
      <div style={{ 
        background: "var(--color-role-switcher-bg)", 
        padding: "16px", borderRadius: "8px", marginBottom: "24px", border: `1px solid ${colors.border}` 
      }}>
        <label style={{ display: "block", fontSize: "11px", color: colors.textTertiary, marginBottom: "8px", textTransform: "uppercase", fontWeight: "600" }}>
          Current Role:
        </label>
        <select
          value={currentUser.role}
          onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
          style={{
            width: "100%", padding: "8px 12px", background: colors.surface,
            border: `1px solid ${colors.border}`, borderRadius: "6px",
            color: colors.text, fontSize: "14px", cursor: "pointer"
          }}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>

      {/* --- NAVIGATION LINKS --- */}
      <div className="nav-links" style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        <Link to="/" style={navLinkStyle} activeProps={activeLinkProps}>
          <BarChart3 size={20} /> Dashboard
        </Link>
        <Link to="/browse" style={navLinkStyle} activeProps={activeLinkProps}>
          <Search size={20} /> Browse Contents
        </Link>
        <Link to="/roles" style={navLinkStyle} activeProps={activeLinkProps}>
          <Users size={20} /> By Role
        </Link>
        <Link to="/ai-picks" style={navLinkStyle} activeProps={activeLinkProps}>
          <TrendingUp size={20} /> AI Picks
        </Link>
        <Link to="/digest" style={navLinkStyle} activeProps={activeLinkProps}>
          <FileText size={20} /> Smart Digest
        </Link>
        <Link to="/ask" style={navLinkStyle} activeProps={activeLinkProps}>
          <MessageCircle size={20} /> Ask KMS
        </Link>
        
        {/* --- ACTION BUTTONS --- */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link 
            to="/assessment" 
            style={{ 
                ...actionBtnStyle(colors.secondary), 
                textDecoration: "none", 
                justifyContent: "center" 
            }}
          >
            <Brain size={20} /> Content Assessment
          </Link>
          
          <button 
            onClick={() => setShowCustomizationModal(true)} 
            style={actionBtnStyle(colors.warning)}
          >
            <Settings size={20} /> Manage Content
          </button>
        </div>
      </div>
    </nav>
  );
};