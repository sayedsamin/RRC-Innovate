import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Sidebar } from './-components/Sidebar'; 
import { useKMS } from '../context/KMSContext'; 

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // Get all the state needed for the Sidebar from your Context
  const { 
    isDarkMode, setIsDarkMode, 
    colors, 
    currentUser, setCurrentUser, 
    roles,
    setShowIngestionModal, 
    setShowCustomizationModal 
  } = useKMS();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, color: colors.text }}>
      
      {/* Pass all props to Sidebar */}
      <Sidebar 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        colors={colors}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        roles={roles}
        setShowIngestionModal={setShowIngestionModal}
        setShowCustomizationModal={setShowCustomizationModal}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Your TopBar would go here */}
        
        <div style={{ padding: '32px', flex: 1 }}>
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}