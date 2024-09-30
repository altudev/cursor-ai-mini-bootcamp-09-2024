import React from 'react';
import { useTheme } from './components/ThemeProvider';
import ThemeSelector from './components/ThemeSelector';
import StoryList from './components/StoryList';

function App() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <header className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Story App</a>
        </div>
        <div className="flex-none">
          <ThemeSelector />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <StoryList />
      </main>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2024 - All rights reserved by Story App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
