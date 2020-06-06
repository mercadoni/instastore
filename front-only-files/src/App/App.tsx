import React from "react";
import Home from "containers/home";
import { ThemeProvider } from "styled-components";
import { theme } from "themes/theme";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home></Home>
      </div>
    </ThemeProvider>
  );
};

export default App;
