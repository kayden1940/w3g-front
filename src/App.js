import React from "react";
import {
  Router,
  BrowserRouter,
  Route,
  Routes,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SiteList from "./Pages/SiteList/SiteList";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteList  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
