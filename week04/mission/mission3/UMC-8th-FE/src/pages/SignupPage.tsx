import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    //에러 메세지 정의
    email: z.string().email({ message: "올바르지 않은 이메일 형식" }),

    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다" })
      .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다" }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다" })
      .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다" }),

    name: z.string().min(1, { message: "이름은 최소 1자 이상이어야 합니다" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordCheck"], // 에러가 발생할 필드 지정
  });

type FormField = z.infer<typeof schema>; // 아래에서 사용할 useForm의 타입 정의 -> 타입 추론 받을 수 있게

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const { passwordCheck, ...rest } = data; //passwordCheck는 서버로 보낼 필요 없으니까 rest에 나머지 값들 담기

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div>
      <input //이메일
        {...register("email")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email ? "border-red-500 bg-red-200" : "border-grey-300"}`}
        type={"email"}
        placeholder={"이메일을 입력해주세요."}
      />
      {errors.email && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)이메일 칸 선택했을때(초기에는 안 뜸)
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input //비밀번호
        {...register("password")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password ? "border-red-500 bg-red-200" : "border-grey-300"}`}
        type={"password"}
        placeholder={"비밀번호를 입력해주세요."}
      />
      {errors.password && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)비밀번호 칸 선택했을때(초기에는 안 뜸)
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input //비밀번호 검사
        {...register("passwordCheck")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-grey-300"}`}
        type={"password"}
        placeholder={"비밀번호를 다시 입력해주세요."}
      />
      {errors.passwordCheck && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)비밀번호 재입력 칸 선택했을때(초기에는 안 뜸)
        <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>
      )}

      <input //이름
        {...register("name")}
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors?.name ? "border-red-500 bg-red-200" : "border-grey-300"}`}
        type={"name"}
        placeholder={"이름을 입력해주세요."}
      />
      {errors.name && ( //경고메세지 뜨는 경우: 1) 에러 존재시 2)이름 칸 선택했을때(초기에는 안 뜸)
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <button //버튼클릭
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={
          "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        }
      >
        회원가입 버튼
      </button>
    </div>
  );
};

export default SignupPage;
