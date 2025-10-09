Task 2 – Tuần 2: React Hook Form + Zod

Form đăng ký tài khoản sử dụng React Hook Form để quản lý form state và Zod để validate. Giao diện đã tối ưu UX: canh giữa, dark/light tự động, focus ring, thông báo lỗi từng field.

🧰 Tech stack

React + Vite + TypeScript

react-hook-form, @hookform/resolvers, zod

CSS thuần (responsive, dark/light)

✨ Tính năng chính

Form fields: fullName, email, password, confirmPassword, age, gender, agree.

Validate bằng Zod + hiển thị lỗi theo field.

Kiểm tra mật khẩu khớp (password vs confirm).

UI sạch, tập trung vào nhập liệu, hỗ trợ bàn phím.

✅ Luật validate (Zod)

fullName: tối thiểu 2 ký tự

email: đúng định dạng email

password: tối thiểu 6 ký tự

confirmPassword: phải trùng password

age: chọn 1 trong 18-24 | 25-34 | 35-44 | 45+

gender: chọn 1 trong male | female | other

agree: bắt buộc tích đồng ý

📂 Cấu trúc thư mục
src/
├─ components/
│  └─ FormInput.tsx        # (optional, nếu dùng component input tái sử dụng)
├─ pages/
│  └─ SignUp.tsx           # trang form + logic RHF + Zod
├─ App.tsx
├─ App.css                 # style form (wrapper/card/grid/errors/btn)
└─ main.tsx

🚀 Chạy dự án
npm i
npm run dev


Mở trình duyệt tại: http://localhost:5173

🏗️ Build
npm run build
npm run preview

🔗 Liên kết

GitHub: https://github.com/
<your-username>/task2-tuan2

(Tuỳ chọn) Vercel: https://task2-tuan2.vercel.app

Thay <your-username> và link Vercel thực tế của bạn.

🧪 Cách test nhanh

Bấm Create account khi form trống → phải hiện lỗi ở từng field.

Nhập email sai (vd: abc@) → báo lỗi email.

Nhập 2 mật khẩu không khớp → báo “Mật khẩu không khớp”.

Không tích “I agree to terms” → không cho submit.

🛠️ Scripts hữu ích
# format/lint (nếu có cài)
npm run lint
npm run format

🧯 Troubleshooting

CSS không áp dụng → kiểm tra đã import "./App.css" trong App.tsx.

TypeScript error với SubmitHandler / resolver

import type: import type { SubmitHandler } from "react-hook-form";

dùng generic: useForm<FormValues>({...})

nếu dùng z.preprocess, set type FormValues = z.input<typeof schema> và defaultValues cho age, gender là "".
