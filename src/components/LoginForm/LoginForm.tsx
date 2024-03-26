import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import logo from "../../assets/logo.svg";
import google from "../../assets/google.svg";
import git from "../../assets/git.svg";
import { LuEye } from "react-icons/lu";
import { IoEyeOffOutline } from "react-icons/io5";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoginStore } from "../../store/store";
import { ILogin } from "../../types";

const loginSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Too short. Must be more than 8 symbols" }),
});
type loginSchemaSchemaType = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [inputType, setInputType] = useState(true);
  const [passClass, setPassClass] = useState("hidden");
  const navigate = useNavigate();


  const { isLoading, login, error, errorData, setIsToken } = useLoginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const toggleInputType = () => {
    setInputType(!inputType);
  };
  const showPassField = () => {
    setPassClass("flex");
  };
  
  const onSubmit = async (data:ILogin) => {
      const res =   await login(data);
      if(res){
        setIsToken(true);
        navigate('/dashboard');
      }
      
        
        
       
     
   
   
  };


  return (
    <div className="max-w-400 mx-auto flex flex-col items-center ">
      <img src={logo} className="block mb-20" alt="logo" />
      <h2 className="text-gray-900 font-bold text-3xl mb-10">
        Log in to your account
      </h2>
      <div className="flex w-full gap-4 mb-8">
        <button className="flex gap-3 h-12 grow basis-1/2 items-center justify-center border border-gray-300 rounded-md">
          <img src={google} className="block" alt="google" />
          <span>Google</span>
        </button>
     
        <button className="flex gap-3 h-12 grow basis-1/2 items-center justify-center border border-gray-300 rounded-md">
          <img src={git} className="block" alt="git" />
          <span>Github</span>
        </button>
      </div>
         <p className="custom-before text-base text-grey w-full block relative text-center mb-8">OR</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
       <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Work email"
          className="input"
          onFocus={showPassField}
          {...register("email")}
        />
        {errors.email && <p className="w-full mt-2 text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <div className={`w-full ${passClass} flex-col mb-7 relative`}>
          <input
            type={inputType ? "password" : "text"}
            placeholder="Password"
            className="input mb-4"
            {...register("password")}
          />
          {errors.password && <p className="w-full text-sm text-red-400">{errors.password.message}</p>}

          <div
            className="cursor-pointer absolute top-4 right-4"
            onClick={toggleInputType}
          >
            {inputType ? (
              <LuEye color="#67717B" />
            ) : (
              <IoEyeOffOutline color="#67717B" />
            )}
          </div>

          <Link
            to="/forgot-password"
            className="font-medium text-blue-light text-right"
          >
            Forgot your password?
          </Link>
        </div>
        <button disabled={isLoading} className="blue-btn ">
          Log in to Qencode
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{errorData}</p>}
        <p className="text-xs mt-5">Is your company new to Qencode? <span className="text-blue-light cursor-pointer">Sign up</span></p>
      </form>
    </div>
  );
};
