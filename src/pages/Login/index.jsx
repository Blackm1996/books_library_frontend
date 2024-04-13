import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { login } from "../../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../assets/Api/axios";
import Swal from "sweetalert2";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // check if user logged in
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    const data = {
      email: username,
      password: password,
    };
    console.log("data", data);
    api
      .post("login", data)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          const userId = response.data.user.id;
          const role = response.data.user.role;
          const name = response.data.user.name;
          console.log("logged in role", role);
          props.login(userId, name, role);
          localStorage.clear();
          localStorage.setItem("isLoggedIn", isLoggedIn);
          localStorage.setItem("userId", userId);
          localStorage.setItem("name", name);
          localStorage.setItem("role", role);
          localStorage.setItem("token", response.data.authorisation.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("err", error);
        Swal.fire({
          title: "خطأ",
          text: "لقد حصل خطأ ما, يرجى النأكد من اتصالك بالانترنت و المحاولة مجدداً",
          icon: "error",
          confirmButtonText: "حسناً",
        });
      });

    /*const userId = 2;
    const role = "SuperAdmin";
    props.login(userId,role);
    localStorage.clear();
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    navigate("/");*/
  };

  return (
    <section>
      <div className="container mx-auto" dir="rtl">
        <div
          className="p-12 bg-secondary flex flex-col items-center w-[95%] md:w-[500px] 
        absolute top-2/4 left-2/4 border-solid border-4 border-accent
        translate-x-[-50%] translate-y-[-50%]"
        >
          <h2 className="text-3xl font-medium pb-4 text-neutral-50">
            تسجيل الدخول
          </h2>
          <input
            className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300 mb-4
            focus:border-solid focus:border-2 focus:border-accent"
            placeholder="اسم المستخدم"
            label="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full h-12 outline-none  bg-primary-200 px-4 text-primary-Active placeholder:text-primary-300
            focus:border-solid focus:border-2 focus:border-accent"
            placeholder="كلمة المرور"
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="py-4 px-8 rounded-lg font-semibold mt-8 bg-primary-Button text-white hover:bg-primary-Hover active:bg-primary-Active"
            onClick={handleLogin}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
    name: state.auth.name,
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userId, name, role) => dispatch(login({ userId, name, role })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
