import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { Instructions } from "../Instructions/Instructions";
import { RidesGridSubmit } from "../RidesGridSubmit/RidesGridSubmit";
import { React, useState } from "react";
import { ConfirmCard } from "../ConfirmCard/ConfirmCard";


export const App = () => {
  const [confirmedData, setConfirmedData] = useState({});

  return (
    <div className="mainWrapper">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Instructions />
                <RidesGridSubmit setConData={setConfirmedData} />
              </div>
            }
          />
          <Route
            path="/Confirmation"
            element={<ConfirmCard confData={confirmedData} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
