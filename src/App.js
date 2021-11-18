import React from "react";
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Router,
  Routes,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SiteList from "./Pages/SiteList/SiteList";
import TaskCreate from "./Pages/TaskCreate/TaskCreate";

const App = () => {
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
