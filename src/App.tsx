import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeScreen from './components/screens/HomeScreen';
import DataIngestionScreen from './components/screens/DataIngestionScreen';
import ScoreboardScreen from './components/screens/ScoreboardScreen';
import CompanyDetailsScreen from './components/screens/CompanyDetailsScreen';
import AlertsScreen from './components/screens/AlertsScreen';
import AnalyticsScreen from './components/screens/AnalyticsScreen';
import type { Company } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const totalScreens = 6;

  const handleNavigate = (screen: number) => {
    if (screen >= 0 && screen < totalScreens) {
      setCurrentScreen(screen);
    }
  };

  const handleHome = () => {
    setCurrentScreen(0);
    setSelectedCompany(null);
  };

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleBackToScoreboard = () => {
    setCurrentScreen(2); // Scoreboard screen
    setSelectedCompany(null);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 0:
        return <HomeScreen onNavigate={handleNavigate} />;
      case 1:
        return <DataIngestionScreen />;
      case 2:
        return (
          <ScoreboardScreen 
            onSelectCompany={handleSelectCompany}
            onNavigate={handleNavigate}
          />
        );
      case 3:
        return (
          <CompanyDetailsScreen 
            company={selectedCompany}
            onBack={handleBackToScoreboard}
          />
        );
      case 4:
        return <AlertsScreen />;
      case 5:
        return <AnalyticsScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onNavigate={handleNavigate}
        onHome={handleHome}
      />
      {renderCurrentScreen()}
    </div>
  );
}

export default App;