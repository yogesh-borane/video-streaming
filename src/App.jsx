import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./component/pages/navbar/Navbar";
import StreamBaseRouter from "./component/Routes/StreamBaseRouter";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./api/AuthContext";
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <ToastContainer pauseOnHover theme="dark"/>
        <StreamBaseRouter/>
      </main>
    </Router>
    </AuthProvider>
  );
};

export default App;
