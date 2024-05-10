import { useState, useEffect } from "react";
import axios from "axios";
import { Match } from "../types/matchTypes"; // Adjust the import path as necessary

const useFetchMatches = (puuid: string | undefined) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puuid) {
      setError("No player UUID provided");
      return;
    }

    const fetchMatches = async () => {
      setIsLoading(true);
      const apiUrl = `http://3.95.247.155:8000/noobiez/matches`;

      try {
        const response = await axios.get<Match[]>(apiUrl, {
          params: {
            puuid: puuid,
          },
        });
        setMatches(response.data);
      } catch (error: any) {
        setError(
          error.message || "An error occurred while fetching the matches"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [puuid]);

  return { matches, isLoading, error };
};

export default useFetchMatches;
