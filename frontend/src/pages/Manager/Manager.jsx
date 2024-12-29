import React from "react";
import "./Manager.css";
import TeamRecruitmentForm from "../../components/TeamRecruitmentform/Teamrecruitmentform";
import { AuthContextProvider } from "../../Context/AuthContext";
import ManagerForm from "../../components/ManagerForm/ManagerForm";

const Manager = () => {
  return (
    <div>
      <AuthContextProvider>
        <ManagerForm/>
        <TeamRecruitmentForm />
      </AuthContextProvider>
    </div>
  );
};

export default Manager;
