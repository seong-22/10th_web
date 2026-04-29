import { useEffect, useState } from "react";

interface UseFormPRops<T> {
  initialValues: T; //여기로 이메인, 비밀번호 들어옴 = 초기화
  validate: (values: T) => Record<keyof T, string>; //여기에서 유효성 검사
}

function useForm<T>({ initialValues, validate }: UseFormPRops<T>) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  //사용자가 입력값 변경시 실행되는 함수
  const handleChange = (name: keyof T, value: string) => {
    setValues({
      //값 설정해줌
      ...values, //원본 유지(복사)
      [name]: value,
    });
  };

  //사용자가 입력값에서 포커스 벗어났을 때
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일, 패스워드, 속성 가져오기
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return {
      value,
      onChange,
      onBlur,
    };
  };

  //값 변겨될 때마다 유효성 검사 실행
  useEffect(() => {
    const newErrors = validate(values);

    setErrors(newErrors); //유효성 검사 결과 업데이트
  }, [validate, values]); //값이 변경될 때마다 새롭게 유효성 검사

  return { values, errors, touched, getInputProps }; //인자 전부 리턴
}

export default useForm;
