import { useState } from "react";
import axios from "axios";
import { Match, MatchesApiResponse } from "../types/matchTypes"; // Ensure the path is correct

const useMatchUpdate = () => {
  const [data, setData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async (puuid: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<MatchesApiResponse>(
        `http://localhost:8000/riotAPI/matches/`,
        { params: { puuid } }
      );
      setData(response.data.matches); // Assuming the data is directly under 'matches'
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message); // Adjusted to handle possible API response structure
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchMatches };
};

export default useMatchUpdate;
