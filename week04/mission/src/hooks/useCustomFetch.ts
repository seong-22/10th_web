import { useState, useEffect } from "react";
import axios from "axios";

const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });

        setData(response.data); //데이터 저장
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (url) {
      //해당 정보 들어올 때만 함수 실행
      fetchData();
    }
  }, [url]); // url이 바뀔 때마다 다시 실행

  return { data, isPending, isError }; //세가지 값 반환
};

export default useCustomFetch;
