import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SiteList from "./Pages/SiteList/SiteList";
import ReactGA from "react-ga4";

const App = () => {
  ReactGA.initialize([
    {
      trackingId: "G-MCFB4HGKGF",
    },
  ]);
  ReactGA.send({ hitType: "pageview", page: "/" });

  return (
    <div className="App">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no,maximum-scale=1"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteList />} />
          {/* <Route path="/" element={<TaskCreate />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
