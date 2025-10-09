import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  // bạn truyền vào {...register("fullName")} nên kiểu đúng là UseFormRegisterReturn
  register: UseFormRegisterReturn;
};

export default function FormInput({ label, type = "text", placeholder, error, register }: Props) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: error ? "1px solid #e11d48" : "1px solid #d1d5db",
          outline: "none",
        }}
      />
      {error && <p style={{ color: "#e11d48", fontSize: 13, marginTop: 6 }}>{error.message?.toString()}</p>}
    </div>
  );
}
