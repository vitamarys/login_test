import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import logo from "../../assets/logo.svg";
import { useForgotStore } from "../../store/store";
import { Link } from "react-router-dom";


const emailSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }).email(),
});

type emailSchemaType = z.infer<typeof emailSchema>;


function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<emailSchemaType>({
    defaultValues: {
      email: "",
    },

    mode: "onTouched",
    resolver: zodResolver(emailSchema),
  });

  
  const { resetPassword, error, errorData, successMsg, success } = useForgotStore();

  const onSubmit = handleSubmit(async(data)=>{
    const { email } = data;
    await resetPassword(email)
    
  })  
  return (
    <div className="max-w-400 mx-auto flex flex-col items-center ">
      <img src={logo} className="block mb-20" alt="logo" />
      <h2 className="text-gray-900 font-bold text-3xl mb-10">
        Forgot Password?{" "}
      </h2>
 
      <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
        <div className="mb-6 w-full">
        <input
          type="text"
          placeholder="Enter your email"
          className="input"
          {...register("email")}
        />
        {errors.email && <p className="w-full mt-2 text-sm text-red-400">{errors.email.message}</p>}
        </div>
        <button className="blue-btn">
            Send
        </button>
        <Link className="rounded-lg py-3 border border-gray-300 text-base text-center font-medium mt-5 w-full cursor-pointer duration-300 hover:opacity-75 disabled:opacity-75" to="/login">Cancel</Link>

        {success && <p className="mt-3 text-sm">{successMsg}</p>}
        {error && <p className="mt-3 text-sm text-red-400">{errorData}</p>}

      </form>
    </div>
  );
}

export default ForgotPassword;
