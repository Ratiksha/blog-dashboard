import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";
import Navbar from "./components/Navbar";

const Dashboard = lazy(() => import('./pages/Dashboard'))
const ViewBlogPage = lazy(() => import('./components/ViewBlogPage'))

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts/:id" element={<ViewBlogPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
