"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { registerUser } from "@/utils/backend-utils";
import Link from "next/link";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

const LABEL_STYLES =
  "font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm";
const INPUT_STYLES =
  "border-border ring-offset-primary placeholder:text-muted-foreground focus:none flex h-10 w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border bg-primary px-4 py-2";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const res = await registerUser({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      if (res.status === "error") {
        setError(res.error);
      } else {
        router.push("/chat");
      }
    },
    [firstName, lastName, userName, email, password, router],
  );

  return (
    <div className="w-full h-full">
      <main className="flex w-full h-full mx-auto flex-1 flex-col justify-center gap-5 px-8 sm:max-w-md">
        <header className="flex cursor-pointer flex-col items-center hover:opacity-50 text-4xl font-bold tracking-wide">
          <Link href="/">SQL ChatBot</Link>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>
            <p className={LABEL_STYLES}>
              First Name<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              className={INPUT_STYLES}
              placeholder="Jacek"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            <p className={LABEL_STYLES}>Last Name</p>
            <input
              type="text"
              className={INPUT_STYLES}
              placeholder="Baczkowski"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <p className={LABEL_STYLES}>
              User Name<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              className={INPUT_STYLES}
              placeholder="jacekbaczkowski"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label>
            <p className={LABEL_STYLES}>
              Email<span className="text-red-600">*</span>
            </p>
            <input
              type="email"
              className={INPUT_STYLES}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <p className={LABEL_STYLES}>
              Password<span className="text-red-600">*</span>
            </p>
            <input
              type="password"
              className={INPUT_STYLES}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="text-red-600 text-xs text-center">{error}</p>
          ) : (
            <div />
          )}
          <PrimaryButton isLink={false}>Sign Up</PrimaryButton>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
