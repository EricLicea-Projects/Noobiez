import { useEffect, useState } from "react";
import axios from "axios";
import { LiveData } from "../types/liveTypes";

const useFetchLiveData = (puuid: string | undefined) => {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<LiveData>(
          `http://3.95.247.155:8000/riotAPI/liveGame/`,
          { params: { puuid } }
        );
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const statusCode = err.response?.status;
          if (statusCode === 422) {
            setError("Invalid PUUID. Unable to process request.");
          } else {
            setError(`Error: ${err.message}`);
          }
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [puuid]);

  return { data, loading, error };
};

export default useFetchLiveData;
