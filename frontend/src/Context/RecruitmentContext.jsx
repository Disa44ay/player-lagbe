import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecruitmentContext = createContext(null);

export const RecruitmentContextProvider = ({ children }) => {
  const [recruitmentInfo, setRecruitmentInfo] = useState([]);
  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://player-lagbe-backend.onrender.com";

  // Fetch recruitment and available games data
  const fetchRecruitmentData = async () => {
    try {
      const response = await axios.get(`${url}/api/recruitment/list`);
      console.log(response.data);  // Check the structure of the response

      // If availableGames are part of the response data
      if (response.data.success) {
        setAvailableGames(response.data.data); // Assuming availableGames is within 'data'
        setRecruitmentInfo([]); // If recruitmentInfo is not relevant here
      } else {
        setAvailableGames([]);  // Handle case where no games available
      }
    } catch (error) {
      console.error("Error fetching recruitment data:", error);
      setError("Error fetching data");
      setAvailableGames([]);  // Default to empty list if error occurs
      setRecruitmentInfo([]);  // Default to empty list if error occurs
    } finally {
      setLoading(false);  // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  return (
    <RecruitmentContext.Provider value={{ recruitmentInfo, availableGames, loading, error }}>
      {children}
    </RecruitmentContext.Provider>
  );
};
