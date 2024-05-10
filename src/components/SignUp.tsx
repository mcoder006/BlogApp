import { useState } from "react"
import { login as authLogin } from "../store/AuthSlice"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import authService from "../services/auth"

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const { register, handleSubmit } = useForm();

    const create = async (data: any) => {
        setError("");
        try {
            const userAccount = await authService.createAccount(data);
            
            if(userAccount){
                const userData = await authService.getCurrentUser();
                
                if(userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        }
        catch(error) {
            throw error;
        }
        
    }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="flex justify-center mb-2">
          <span className="inline-block w-full max-w-[100px]">Logo</span>
        </div>
        <h2 className="text-2xl font-bold text-center capitalize cursor-pointer">
          Sign in to Your Account
        </h2>
        <p className="mt-2 text-base text-center capitalize text-black/60">
          have an account ? &nbsp;
          <Link
            to={"/login"}
            className="font-medium transition-all duration-200 text-slate-500 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-center text-red-500">{error}</p>}

        <form
          className="flex flex-col p-4 space-y-4 rounded"
          onSubmit={handleSubmit(create)}
        >
          <label>
            Name :
            <input
              className="w-1/2 p-2 ml-12 border-none rounded outline-none"
              {...register("name")}
              type="text"
              required
            />
          </label>
          <label>
            Email :
            <input
              className="w-1/2 p-2 border-none rounded outline-none ml-14"
              type="email"
              required
              {...register("email")}
            />
          </label>
          <label>
            Password :
            <input
              className="w-1/2 p-2 ml-8 border-none rounded outline-none"
              type="text"
              required
              {...register("password")}
            />
          </label>
          <button
            className="block p-2 px-4 mx-auto mt-4 bg-green-500 rounded cursor-pointer w-fit"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp