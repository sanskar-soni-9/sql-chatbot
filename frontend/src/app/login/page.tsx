"use client";

import PrimaryButton from "@/components/PrimaryButton";
import { loginUser } from "@/utils/backend-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

const LABEL_STYLES =
  "font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm";
const INPUT_STYLES =
  "border-border ring-offset-primary placeholder:text-muted-foreground focus:none flex h-10 w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border bg-primary px-4 py-2";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const res = await loginUser({
        login,
        password,
      });
      if (typeof res === "string") {
        setError(res);
      } else {
        router.push("/chat");
      }
    },
    [login, password, router],
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
              Login<span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              className={INPUT_STYLES}
              placeholder="username OR email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
          <PrimaryButton isLink={false}>Login</PrimaryButton>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
