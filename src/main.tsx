import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import "./index.css";
import Portfolio from "./pages/Portfolio.tsx";
import WebDesign from "./pages/galleries/WebDesign.tsx";
import Photography from "./pages/galleries/Photography.tsx";
import DigitalArt from "./pages/galleries/DigitalArt.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/web-design" element={<WebDesign />} />
          <Route path="portfolio/photography" element={<Photography />} />
          <Route path="portfolio/digital-art" element={<DigitalArt />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
