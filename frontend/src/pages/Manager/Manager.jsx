import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for Toast notifications
import "./Manager.css";
import TeamRecruitmentForm from "../../components/TeamRecruitmentform/TeamRecruitmentForm.jsx"
import { AuthContextProvider } from "../../Context/AuthContext";
import ManagerForm from "../../components/ManagerForm/ManagerForm.jsx";

const Manager = () => {
  return (
    <div>
      <AuthContextProvider>
        <ManagerForm />
        <TeamRecruitmentForm />
      </AuthContextProvider>
      {/* Add ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Manager;
