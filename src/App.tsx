import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { KBarProvider, KBarPortal } from "kbar";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import CommandInput from "./components/CommandInput/CommandInput";
import NavigationBar from "./components/NavigationBar/NavigationBar";

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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </KBarProvider>
    </Router>
  );
}

export default App;
