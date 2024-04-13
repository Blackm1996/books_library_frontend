import React from "react";
import { connect, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../assets/Api/axios";
import Swal from "sweetalert2";

const schema = yup
  .object({
    name: yup.string().required("يجب ادخال الإسم"),
    email: yup.string().required("يجب ادخال اسم المستخدم"),
    password: yup.string().required("يجب ادخال كلمة المرور"),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "يجب أن تتطابق مع كلمة السر"),
  })
  .required();

function AddUser({Close}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: 2020,
    },
  });
  // check if user logged in
  const role = useSelector((state) => {
    return state.auth.role;
  });
  const roleOptions = [
    { value: 2020, label: "مستخدم" },
    { value: 2006, label: "ادمن" },
  ];

  const registerUser = (data) => {
    console.log("data", data);
    api
      .post("register", data)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "تمت العملية بنجاح",
            text: "تم اضافة مستخدم جديد بنجاح",
            icon: "success",
            confirmButtonText: "حسناً",
          })
          .then(()=>{
            Close();
          });
        }
      })
      .catch((error) => {
        console.log("err", error.response);
        const response = error.response;
        if (response.status === 422) {
          Swal.fire({
            title: "خطأ في المعلومات",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "حسناً",
          });
        } else {
          Swal.fire({
            title: "خطأ",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "حسناً",
          });
        }
        /*Swal.fire({
          title: "خطأ",
          text: "لقد حصل خطأ ما, يرجى النأكد من اتصالك بالانترنت و المحاولة مجدداً",
          icon: "error",
          confirmButtonText: "حسناً",
        });*/
      });
  };

  return (
    <section>
      <div className="container mx-auto" dir="rtl">
        <div
          className="p-12 bg-secondary flex flex-col items-center w-[95%] md:w-[500px] 
         top-2/4 left-2/4 border-solid border-4 border-accent
        md:translate-x-[-60%]"
        >
          <h2 className="text-3xl font-medium pb-4 text-neutral">
            تسجيل مستخدم جديد
          </h2>
          <form onSubmit={handleSubmit(registerUser)}>
            <input
              className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
              focus:border-solid focus:border-2 focus:border-accent"
              placeholder="الإسم"
              label="الإسم"
              {...register("name")}
            />
            <p className="text-red-600">{errors.name?.message}</p>
            <input
              className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
              focus:border-solid focus:border-2 focus:border-accent"
              placeholder="اسم المستخدم"
              label="اسم المستخدم"
              {...register("email")}
            />
            <p className="text-red-600">{errors.username?.message}</p>
            <input
              className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
              focus:border-solid focus:border-2 focus:border-accent"
              placeholder="Password"
              label="كلمة المرور"
              type="password"
              {...register("password")}
            />
            <p className="text-red-600">{errors.password?.message}</p>
            <input
              className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
              focus:border-solid focus:border-2 focus:border-accent"
              placeholder="Password"
              label="تأكيد كلمة المرور"
              type="password"
              {...register("password_confirmation")}
            />
            <p className="text-red-600">{errors.cpass?.message}</p>
              <select
                className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
              focus:border-solid focus:border-2 focus:border-accent"
                {...register("role")}
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

            <button
              className="py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
              type="submit"
            >
              اضافة مستخدم جديد
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(AddUser);
