import React from "react";
import "./App.scss";
import Header from "./Component/Header/Header";
import data from "./JSON/data.json";

function App() {
  return (
    <div className="app">
      <Header data={data} />
    </div>
  );
}

export default App;
