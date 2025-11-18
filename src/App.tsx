import "./style.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Plans from "./components/Plans";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Footer";

import WebServices from "./components/WebServices";
import MobileApps from "./components/MobileApps";
import DesktopSystems from "./components/DesktopSystems";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>

        {/* 🔹 Landing principal */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Plans />
              <Portfolio />
              <Contact />
            </>
          }
        />

        {/* 🔹 Servicios individuales */}
        <Route path="/web" element={<WebServices />} />
        <Route path="/apps" element={<MobileApps />} />
        <Route path="/sistemas" element={<DesktopSystems />} />
      </Routes>
    </Router>
  );
}
