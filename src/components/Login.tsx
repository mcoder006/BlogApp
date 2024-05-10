import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
// import service from "../services/configure"
// import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form"
import authService from "../services/auth"
import { login as authLogin } from "../store/AuthSlice"

// interface FormData {
//   email: string;
//   password: string;
// }


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const [error, setError] = useState<string>("");

    const loginData = async (data: any) => {
      setError("");

      try {
        const session = await authService.login(data);

        if (session) {
          const userData = await authService.getCurrentUser();

          if (userData) dispatch(authLogin(userData));
          navigate("/");
        }
      } catch (error) {
        // setError(error);
        throw error;
      }
    };


  return (
    <div className="flex items-center justify-center w-full mt-44">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="flex justify-center mb-2">
          <span className="inline-block w-full max-w-[100px]">Logo</span>
        </div>
        <h2 className="text-2xl font-bold text-center capitalize cursor-pointer">
          Sign in to Your Account
        </h2>
        <p className="mt-2 text-base text-center text-black/60">
          Don&apos;t have any account ? &nbsp;
          <Link
            to={"/signup"}
            className="font-medium transition-all duration-200 text-slate-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-center text-red-500">{error}</p>}

        <form
          className="flex flex-col mt-2"
          onSubmit={handleSubmit(loginData)}
        >
          <label className="mb-8">
            Email :
            <input
              placeholder="Enter Your Email"
              type="email"
              className="w-1/2 p-2 ml-10 border-none rounded outline-none"
              required
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
          </label>
          <label>
            Password :
            <input
              className="w-1/2 p-2 ml-3 border-none rounded outline-none"
              required
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                
              })}
            />
          </label>
          <input
            type="submit"
            className="block p-2 px-4 mx-auto mt-4 bg-green-500 rounded cursor-pointer w-fit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}

export default Login