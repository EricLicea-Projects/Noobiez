import { useEffect, useState } from "react";
import axios from "axios";
import { SpecialistData } from "../types/specialistTypes";

const useFetchSpecialist = () => {
  const [data, setData] = useState<SpecialistData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get<SpecialistData>(
          `http://3.95.247.155:8000/noobiez/specialist`
        );
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const statusCode = err.response?.status;
          const errorMessage =
            statusCode === 422
              ? "Invalid Specialist Request"
              : `Error: ${err.message}`;
          if (isMounted) setError(errorMessage);
        } else {
          if (isMounted) setError("An unexpected error occurred.");
        }
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};

export default useFetchSpecialist;
