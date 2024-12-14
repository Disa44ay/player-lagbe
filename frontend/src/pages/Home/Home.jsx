import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = ({ setShowLogin, isLoggedIn }) => {
  return (
    <div className="home">
      <Header setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} />
      {/* Additional content can go here */}
    </div>
  );
};

export default Home;
