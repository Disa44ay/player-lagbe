import React, { useEffect, useState } from "react";
import "./RecruitmentList.css";
import axios from "axios";
import { toast } from "react-toastify";

const RecruitmentList = ({ url }) => {
  const [recruitments, setRecruitments] = useState([]);

  const fetchRecruitments = async () => {
    try {
      const response = await axios.get(`${url}/api/recruitment/list`);
      if (response.data.success) {
        setRecruitments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching recruitments");
    }
  };

  const removeRecruitment = async (recruitmentId) => {
    try {
      const response = await axios.post(`${url}/api/recruitment/remove`, {
        id: recruitmentId,
      });
      if (response.data.success) {
        toast.success(response.data.message); // Notify only on removal
        fetchRecruitments(); // Refresh the list
      } else {
        toast.error("Failed to remove recruitment");
      }
    } catch (error) {
      toast.error("Error removing recruitment");
    }
  };

  useEffect(() => {
    fetchRecruitments();
  }, []);

  return (
    <div className="recruitment-list-container">
      <p>All Recruitment Info</p>
      <div className="recruitment-table">
        <div className="recruitment-table-header">
          <b>Venue</b>
          <b>Date</b>
          <b>Time</b>
          <b>Slot Fee</b>
          <b>Contact</b>
          <b>Type</b>
          <b>Action</b>
        </div>
        {recruitments.map((recruitment, index) => (
          <div key={index} className="recruitment-table-row">
            <p>{recruitment.venue}</p>
            <p>{new Date(recruitment.date).toLocaleDateString()}</p>
            <p>{recruitment.time}</p>
            <p>{recruitment.slotFee}</p>
            <p>{recruitment.contact}</p>
            <p>
              {recruitment.isTeamRecruitment
                ? `Team (${recruitment.teamOf} members)`
                : `Solo (${recruitment.players} players)`}
            </p>
            <p
              onClick={() => removeRecruitment(recruitment._id)}
              className="cursor-remove"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentList;
