import { useEffect } from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import DetailedServices from "./components/Detailedservices";
import Plans from "./components/Plans";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import SupportMaintenance from "./components/SupportMaintenance";
import Chatbot from "./components/Chatbot";

function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sc-reveal:not(.visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollReveal />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <DetailedServices />
              <Plans />
              <Portfolio />
              <Footer />
            </>
          }
        />
        <Route
          path="/soporte"
          element={<><SupportMaintenance /><Footer /></>}
        />
      </Routes>
      {/* Chatbot flota en todas las páginas */}
      <Chatbot />
    </Router>
  );
}