import "./styles.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Field = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("メールアドレスの形式ではありません。")
    .required("入力必須の項目です。"),
  password: yup
    .string()
    .min(8, "8文字以上入力してください。")
    .max(32, "32文字以下を入力してください。")
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Field>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Field> = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register("password")} type="password" />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
