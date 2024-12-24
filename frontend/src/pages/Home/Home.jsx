import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import RecruitmentForm from "../../components/Recruitmentform/RecruitmentForm";
import AvailableGames from "../../components/AvailableGames/AvailableGames";

const Home = ({ setShowLogin, isLoggedIn }) => {
  return (
    <div className="home">
      <Header setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} />
      <RecruitmentForm/>
      <AvailableGames/>
    </div>
  );
};

export default Home;
