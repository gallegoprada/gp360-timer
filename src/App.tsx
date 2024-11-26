import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import FightSetup from "./pages/FightSetupPage";
import TabataSetup from "./pages/TabataSetupPage";
import TabataTimer from "./pages/TabataTimerPage";
import FightTimer from "./pages/FightTimerPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fight" element={<FightSetup />} />
        <Route path="/tabata" element={<TabataSetup />} />
        <Route path="/tabataTimer" element={<TabataTimer />} />
        <Route path="/fightTimer" element={<FightTimer />} />
      </Routes>
    </Router>
  );
};

export default App;
