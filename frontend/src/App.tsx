import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { KBarProvider, KBarPortal } from "kbar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import CommandInput from "./components/CommandInput/CommandInput";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Blog from "./pages/Blog/Blog";
import React from "react";
import BlogPost from "./pages/BlogPost/BlogPost";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";

function App() {
  return (
    <Router>
      <KBarProvider>
        <NavigationBar />
        <KBarPortal>
          <div className="kbarBackground">
            <div className="kbar">
              <CommandInput />
            </div>
          </div>
        </KBarPortal>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </KBarProvider>
    </Router>
  );
}

export default App;
