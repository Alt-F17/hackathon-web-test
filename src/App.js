import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Registration from './pages/Registration';
import Submissions from './pages/Submissions';
import Leaderboard from './components/Leaderboard';
import CodeGolf from './components/CodeGolf';
import CodeBlitz from './components/CodeBlitz';
import TeamDashboard from './pages/TeamDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto p-4">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/register" component={Registration} />
            <Route path="/submissions" component={Submissions} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/codegolf" component={CodeGolf} />
            <Route path="/codeblitz" component={CodeBlitz} />
            <Route path="/dashboard" component={TeamDashboard} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;