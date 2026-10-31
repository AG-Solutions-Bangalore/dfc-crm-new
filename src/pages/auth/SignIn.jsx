import React from "react";
import { LoginCard } from "../../components/auth";
import AuthPageShell from "../../components/auth/AuthPageShell";

const SignIn = () => {
  return (
    <AuthPageShell>
      <LoginCard className="max-w-none rounded-2xl border border-slate-200 shadow-[0_24px_70px_-35px_rgba(10,29,61,0.35)]" />
    </AuthPageShell>
  );
};

export default SignIn;
