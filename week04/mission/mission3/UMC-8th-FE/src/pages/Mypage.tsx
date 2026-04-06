import { useEffect } from "react";
import { getMyInfo } from "../apis/auth.ts";

const MyPage = () => {
  useEffect(() => {
    const getDate = async () => {
      const response = await getMyInfo();
      console.log(response);
    };
    getDate();
  }, []);

  return <div>my page</div>;
};

export default MyPage;
