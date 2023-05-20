"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [signInClicked, setSignInClicked] = useState(false);
  const [signInGoogleClicked, setSignInGoogleClicked] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setSignInClicked(true);
    const emailCheckResponse = await fetch("/api/users/" + email, {
      method: "HEAD",
    });

    if (!emailCheckResponse?.ok) {
      setEmail("");
      setAccountExists(true);
      setSignInClicked(false);
      return;
    }

    const signInResponse = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/welcome",
    });
    setSignInClicked(false);

    if (signInResponse?.ok && !signInResponse?.error) {
      setEmail("");
      return toast({
        title: "Check your email",
        description:
          "We sent you a login link. Be sure to check your spam too.",
      });
    } else {
      return toast({
        title: "Error sending email - try again?",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              required
              value={email}
              autoCorrect="off"
              onChange={(e) => {
                setAccountExists(false);
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="text-lg">
          <button
            className={cn(buttonVariants(), "w-full")}
            disabled={signInClicked || signInGoogleClicked}
          >
            {signInClicked && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Continue with email
          </button>
        </div>
      </form>

      <div>
        <div className="relative mt-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-normal leading-6">
            <span className="px-6 text-gray-900 bg-white">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 mt-4">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setSignInGoogleClicked(true);
            signIn("google");
          }}
          disabled={signInGoogleClicked || signInClicked}
        >
          {signInGoogleClicked ? (
            <Icons.spinner className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Icons.google className="w-5 h-5 mr-2" />
          )}
          Google
        </button>
      </div>

      {accountExists ? (
        <p className="text-sm font-medium text-center text-red-500">
          This email is already registered.&nbsp;
          <Link href="/login" className="font-semibold text-red-600">
            Log in&nbsp;
          </Link>
          instead?
        </p>
      ) : (
        <p className="text-sm font-medium text-center text-gray-600">
          Already registered?&nbsp;
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>
          &nbsp;to your account.
        </p>
      )}
    </>
  );
}
