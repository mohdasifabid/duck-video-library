import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { VideoProvider } from "./useVideo";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "./utilities/authProvider";
import { Provider } from "react-redux";
import {store} from "./features.js/store"
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> 
    <VideoProvider>
      <Router>
        <Provider store={store}>
      <App />
      </Provider>
      </Router>
    </VideoProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
