import React from "react";
import "./Manager.css";
import TeamRecruitmentForm from "../../components/TeamRecruitmentform/Teamrecruitmentform";
import { AuthContextProvider } from "../../Context/AuthContext";

const Manager = () => {
  return (
    <div>
      <AuthContextProvider>
        <TeamRecruitmentForm />
      </AuthContextProvider>
    </div>
  );
};

export default Manager;
