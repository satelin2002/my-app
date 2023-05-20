import Link from "next/link";

import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign in to your account",
  description: "Sign in to your account to get started.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1
          className={cn(
            "mt-6 text-3xl font-extrabold leading-9 tracking-tight text-center text-gray-900",
            poppins.className
          )}
        >
          soup<span className="text-rose-500">.</span>site
        </h1>
      </div>

      <div className="w-full max-w-md mx-auto mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-6 py-10 bg-white shadow-lg rounded-xl sm:rounded-xl sm:px-12">
          <h2
            className={cn(
              "text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
              poppins.className
            )}
          >
            Sign In
          </h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
