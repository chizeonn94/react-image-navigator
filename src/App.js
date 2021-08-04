import React, { Component } from "react";

import "./App.css";
import Routes from "./routes";

import { CookiesProvider } from "react-cookie";

class App extends Component {
  render() {
    return (
      <div style={{ height: "100%", backgroundColor: "#ffffff" }}>
        <CookiesProvider>
          <Routes />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
