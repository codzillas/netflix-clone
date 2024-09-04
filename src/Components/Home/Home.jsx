import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const pass = localStorage.getItem("pass");
  useEffect(() => {
    if (!name && !pass) {
      navigate("/signin");
      return;
    }
  }, [name, navigate, pass]);

  return (
    <div>
      <Header />
      <p>Home</p>
    </div>
  );
};

export default Home;
