import { useEffect } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { useState } from "react";
import { type ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();

  const [data, setData] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);

  useEffect(() => {
    const getDate = async () => {
      if (!accessToken) return; // 토큰 없으면 요청 안 보냄

      const response = await getMyInfo(accessToken);
      setData(response);
    };

    getDate();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log(data.data?.name);
  return (
    <div>
      <h1>{data.data?.name}님 환영합니다.</h1>
      <img src={data.data?.avatar as string} alt={"구글 로고"} />
      <h1>{data.data?.email}</h1>
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
