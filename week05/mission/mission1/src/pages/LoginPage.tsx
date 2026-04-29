import { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/"); // 토큰이 있으면 로그인 페이지 접근 불가
    }
  }, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSummit = async () => {
    console.log("전송 데이터:", values);
    await login(values);
  };

  // 버튼 활성화 로직 수정: 에러가 없고, 필수 값이 모두 입력되었을 때만 활성화
  const isDisabled = useMemo(() => {
    // 1. 에러 객체에 실제 에러 메시지(글자)가 하나라도 있는지 확인
    const hasError = Object.values(errors || {}).some(
      (error) => error && error.length > 0,
    );

    // 2. 입력값이 비어있는지 확인
    const isMissingValue = !values.email || !values.password;

    return hasError || isMissingValue;
  }, [errors, values]);

  // 디버깅을 위한 콘솔 로그 (버튼이 안 눌릴 때 범인을 찾기 위함)
  console.log(
    "검증 상태 - 에러있음:",
    Object.values(errors || {}).some((e) => e.length > 0),
    "값비어있음:",
    !values.email || !values.password,
  );

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        {/* 이메일 입력창 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps("email")}
            id="email" // 브라우저 경고 해결을 위한 id 추가
            name="email" // 브라우저 경고 해결을 위한 name 추가
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type="email"
            placeholder="이메일을 입력해주세요."
          />
          {errors?.email && touched?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 입력창 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps("password")}
            id="password" // 브라우저 경고 해결을 위한 id 추가
            name="password" // 브라우저 경고 해결을 위한 name 추가
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          {errors?.password && touched?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSummit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          로그인 버튼
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
