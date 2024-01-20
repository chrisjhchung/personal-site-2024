import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:slug", element: <BlogPost /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {route.element}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

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
        <LayoutGroup>
          <AnimatedRoutes />
        </LayoutGroup>
      </KBarProvider>
    </Router>
  );
}

export default App;
