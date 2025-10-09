import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // thêm type ở đây
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AGE_OPTIONS = ["18-24", "25-34", "35-44", "45+"] as const;
const GENDER_OPTIONS = ["male", "female", "other"] as const;

const schema = z
  .object({
    fullName: z.string().min(2, "Tên phải ≥ 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ≥ 6 ký tự"),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu ≥ 6 ký tự"),

    // map "" -> undefined để ép chọn option
    age: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.enum(AGE_OPTIONS)
    ),
    gender: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.enum(GENDER_OPTIONS)
    ),

    // đồng ý điều khoản
    agree: z.boolean().refine((v) => v === true, {
      message: "Bạn phải đồng ý điều khoản",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp",
  });

// ✨ thay dòng cũ: type FormValues = z.infer<typeof schema>;
type FormValues = z.input<typeof schema>;


export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",        // ✅ để "" (input), preprocess sẽ map -> undefined
      gender: "",     // ✅ để "" (input)
      agree: false,
    },
  });
  

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("FORM:", data);
    alert("Đăng ký thành công!");
    reset();
  };
  return (
    <div className="wrapper">
      <div className="card form-card">
        <h2 className="title">Sign up</h2>
  
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
          <div className="field">
            <label>Full name</label>
            <input {...register("fullName")} placeholder="e.g. Le Tan Vy" />
            <p className="error">{errors.fullName?.message}</p>
          </div>
  
          <div className="field">
            <label>Email</label>
            <input type="email" {...register("email")} placeholder="you@example.com" />
            <p className="error">{errors.email?.message}</p>
          </div>
  
          <div className="grid-2">
            <div className="field">
              <label>Password</label>
              <input type="password" {...register("password")} placeholder="••••••••" />
              <p className="error">{errors.password?.message}</p>
            </div>
  
            <div className="field">
              <label>Confirm password</label>
              <input type="password" {...register("confirmPassword")} placeholder="••••••••" />
              <p className="error">{errors.confirmPassword?.message}</p>
            </div>
          </div>
  
          <div className="grid-2">
            <div className="field">
              <label>Age</label>
              <select {...register("age")}>
                <option value="">— Select age —</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
              <p className="error">{errors.age?.message}</p>
            </div>
  
            <div className="field">
              <label>Gender</label>
              <select {...register("gender")}>
                <option value="">— Select gender —</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
              <p className="error">{errors.gender?.message}</p>
            </div>
          </div>
  
          <label className="checkbox">
            <input type="checkbox" {...register("agree")} />
            <span>I agree to terms</span>
          </label>
          <p className="error">{errors.agree?.message}</p>
  
          <button type="submit" className="btn-primary">Create account</button>
        </form>
      </div>
    </div>
  );  
}
