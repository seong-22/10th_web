import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";

const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSummit = async () => {};

  const isDisabled = //버튼 활성화 막기(오류있는경우에)
    Object.values(errors || {}).some((error) => error.length > 0) || //오류있으면 트루
    Object.values(values).some((value) => value === ""); //값이 하나라도 빈칸이면 트루

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 ">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-grey-300"}`}
          type={"email"}
          placeholder={"이메일을 입력해주세요."}
        />
        {errors?.email &&
          touched?.email && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)이메일 칸 선택했을때(초기에는 안 뜸)
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-grey-300"}`}
          type={"password"}
          placeholder={"비밀번호를 입력해주세요."}
        />
        {errors?.password &&
          touched?.password && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)비밀번호 칸 선택했을때(초기에는 안 뜸)
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        <button
          type="button"
          onClick={handleSummit}
          disabled={isDisabled}
          className={
            "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          }
        >
          로그인 버튼
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
