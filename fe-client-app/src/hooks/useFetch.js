import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Fetch request failed");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetch request failed");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
