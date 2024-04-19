import { useState } from "react";
import axios from "axios";

export const usePlayerSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlayer = async (riotId: string) => {
    setIsLoading(true);
    setError(null);
    const [gameName, tagLine] = riotId.split("#");
    const apiUrl = `http://localhost:8000/noobiez/player`;

    try {
      const response = await axios.get(apiUrl, {
        params: {
          gameName: gameName,
          tagLine: tagLine,
        },
      });
      return response.data;
    } catch (error) {
      setError("Failed to fetch player data");
      console.error("Axios error:", error.response);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, searchPlayer };
};
