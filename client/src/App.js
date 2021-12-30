import React from "react";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/PostDetail/PostDetail.js";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/posts" />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/search" element={<Home />} />
          <Route exact path="/posts/:id" element={<PostDetail />} />
          <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
