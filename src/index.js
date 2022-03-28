import React from "react";
import ReactDOM from "react-dom";
import "./component/styles/global.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
  (_) => {
    console.log("ReactDOM connected Successfully");
  }
);
