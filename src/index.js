import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//使用react router需要在最主頁引用react-router-dom module的BrowserRouter
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/*BrowserRouter for router setup*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
