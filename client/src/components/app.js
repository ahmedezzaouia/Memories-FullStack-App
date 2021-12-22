import React from "react";
import Home from "./Home/Home.js";
import Navbar from "./Navbar/Navbar";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./Auth/Auth";

const App = () => {
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
