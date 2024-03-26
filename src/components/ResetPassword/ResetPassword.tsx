import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore, useResetPassStore } from "../../store/store";

import logo from "../../assets/logo.svg";
import { LuEye } from "react-icons/lu";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Too short. Must be more than 8 symbols" }),
    password_confirm: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirm;
    },
    {
      message: "Passwords must match!",
      path: ["password_confirm"],
    }
  );
type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const secret = searchParams.get("secret");
  const token = searchParams.get("token");

  const [inputType, setInputType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordSchemaType>({
    defaultValues: {
      password: "",
      password_confirm: "",
    },

    mode: "onSubmit",
    resolver: zodResolver(resetPasswordSchema),
  });
  const { isLoading, error, errorData, setPassword, success } = useResetPassStore();

  const onSubmit = handleSubmit(async (data) => {
    const sendData = { ...data, secret, token };
    await setPassword(sendData);
  });
  const toggleInputType = () => {
    setInputType(!inputType);
  };
  return (
    <div className="max-w-400 mx-auto flex flex-col items-center ">
      <img src={logo} className="block mb-20" alt="logo" />
      <h2 className="text-gray-900 font-bold text-3xl mb-10">
        Log in to your account
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
        <label
          className="w-full text-left text-sm font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className={`w-full flex flex-col mb-6 relative`}>
          <input
            type={inputType ? "password" : "text"}
            placeholder="Password"
            id="password"
            className="input"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}

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
        </div>
        <label
          className="w-full text-left text-sm font-medium mb-2"
          htmlFor="password_confirm"
        >
          Confirm Password
        </label>

        <div className={`w-full flex flex-col mb-7 relative`}>
          <input
            type={inputType ? "password" : "text"}
            placeholder="Password"
            className="input"
            {...register("password_confirm")}
          />
          {errors.password_confirm && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password_confirm.message}
            </p>
          )}

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
        </div>
        <button disabled={isLoading} className="blue-btn ">
          Reset Password
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{errorData}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
