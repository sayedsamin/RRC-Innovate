import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useKMS } from '../context/KMSContext';
import ArticleCard from './-components/ArticleCard';
import { Search, Filter, X, Check } from 'lucide-react';

export const Route = createFileRoute('/browse')({
  component: BrowsePage,
});

function BrowsePage() {
  const { articles, colors, categories } = useKMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    types: [],
    priority: []
  });

  // Dynamic filter options
  const filterOptions = useMemo(() => {
    const types = [...new Set(articles.map(a => a.type))].sort();
    // Use categories from context, but fallback to data if needed
    // The sampleArticles use IDs that might not match categories.js exactly, 
    // so let's use the IDs present in articles for robust filtering if they don't match.
    // For the UI, we try to find the category name, otherwise capitalize the ID.
    const usedCategoryIds = [...new Set(articles.map(a => a.category))].sort();
    
    return {
      types,
      categories: usedCategoryIds,
      priorities: ['high', 'medium', 'low']
    };
  }, [articles]);

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({ categories: [], types: [], priority: [] });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  // Filter articles based on search query and active filters
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Search Query
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Filter: Category
      if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(article.category)) {
        return false;
      }

      // Filter: Type
      if (activeFilters.types.length > 0 && !activeFilters.types.includes(article.type)) {
        return false;
      }

      // Filter: Priority
      if (activeFilters.priority.length > 0 && !activeFilters.priority.includes(article.priority)) {
        return false;
      }

      return true;
    });
  }, [articles, searchQuery, activeFilters]);

  // UI Helper for Filter Sections
  const FilterSection = ({ title, type, options, renderLabel }) => (
    <div style={{ marginBottom: "20px" }}>
      <h4 style={{ 
        fontSize: "13px", 
        fontWeight: "700", 
        color: colors.textSecondary, 
        marginBottom: "12px",
        textTransform: "uppercase" 
      }}>{title}</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {options.map(option => {
          const isActive = activeFilters[type].includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleFilter(type, option)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: `1px solid ${isActive ? colors.primary : colors.border}`,
                background: isActive ? colors.primary : "transparent",
                color: isActive ? "var(--color-white)" : colors.text,
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {isActive && <Check size={12} />}
              {renderLabel ? renderLabel(option) : (option.charAt(0).toUpperCase() + option.slice(1))}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
      
      {/* Search and Filter Header */}
      <div style={{ 
        display: "flex", 
        gap: "16px", 
        marginBottom: "24px",
        alignItems: "center"
      }}>
        <div style={{ 
          flex: 1, 
          position: "relative",
          display: "flex", 
          alignItems: "center"
        }}>
          <Search 
            size={20} 
            style={{ 
              position: "absolute", 
              left: "16px", 
              color: colors.textTertiary,
              pointerEvents: "none"
            }} 
          />
          <input
            type="text"
            placeholder="Search articles, tags, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 16px 16px 48px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = colors.primary}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: "absolute",
                right: "16px",
                background: "transparent",
                border: "none",
                color: colors.textTertiary,
                cursor: "pointer",
                display: "flex"
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button 
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 24px",
            height: "54px", 
            borderRadius: "12px",
            border: `1px solid ${showFilters || activeFilterCount > 0 ? colors.primary : colors.border}`,
            background: showFilters || activeFilterCount > 0 ? colors.primary : colors.surface,
            color: showFilters || activeFilterCount > 0 ? "var(--color-white)" : colors.text,
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <Filter size={18} /> Filters
          {activeFilterCount > 0 && (
            <span style={{ 
              background: "rgba(255,255,255,0.2)", 
              padding: "2px 8px", 
              borderRadius: "10px", 
              fontSize: "12px" 
            }}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div style={{ 
          background: colors.surface, 
          border: `1px solid ${colors.border}`, 
          borderRadius: "12px", 
          padding: "24px", 
          marginBottom: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: colors.text }}>Filter Content</h3>
            <button 
              onClick={clearFilters}
              style={{ 
                background: "transparent", 
                border: "none", 
                color: colors.textSecondary, 
                fontSize: "13px", 
                cursor: "pointer",
                textDecoration: "underline" 
              }}
            >
              Clear all
            </button>
          </div>

          <FilterSection 
            title="Categories" 
            type="categories" 
            options={filterOptions.categories} 
            renderLabel={(id) => {
              const cat = categories.find(c => c.id === id);
              return cat ? cat.name : (id.charAt(0).toUpperCase() + id.slice(1));
            }}
          />
          
          <FilterSection 
            title="Content Type" 
            type="types" 
            options={filterOptions.types} 
          />
          
          <FilterSection 
            title="Priority" 
            type="priority" 
            options={filterOptions.priorities} 
          />
        </div>
      )}

      {/* Results Count */}
      <div style={{ 
        marginBottom: "20px", 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        color: colors.textSecondary,
        fontSize: "14px"
      }}>
        <span>Showing {filteredArticles.length} of {articles.length} articles</span>
        {activeFilterCount > 0 && (
          <span style={{ fontSize: "13px" }}>
            Filtered by {activeFilterCount} criteria
          </span>
        )}
      </div>

      {/* Articles List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "60px", 
            color: colors.textSecondary,
            background: colors.surface,
            borderRadius: "12px",
            border: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px"
          }}>
            <Search size={48} style={{ opacity: 0.2 }} />
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600", color: colors.text, marginBottom: "4px" }}>No articles found</p>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
            {(activeFilterCount > 0 || searchQuery) && (
              <button 
                onClick={clearFilters}
                style={{
                  marginTop: "8px",
                  padding: "8px 16px",
                  background: colors.secondary,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
