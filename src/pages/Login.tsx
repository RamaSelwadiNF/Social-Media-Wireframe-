import React from "react";
import { LoginForm } from "../components/login-form";

export default function Login(): React.JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent overflow-hidden pb-[4vh]">
      {/* 2-Column Card Container */}
      <div className="flex w-full max-w-[840px] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-xl">
        {/* Left Visual / Gradient Banner (hidden on mobile, visible on desktop/tablet) */}
        <div className="relative hidden flex-1 min-h-[460px] flex-col justify-end bg-gradient-to-br from-[#f5f5f4] via-[#b43e8f] to-[#c2e6ff] md:flex">
          <div className="bg-gradient-to-t from-black/65 to-transparent p-8 text-white">
            <h3 className="mb-1.5 text-xl font-bold tracking-tight text-white">
              Connect with friends
            </h3>
            <p className="m-0 text-sm leading-relaxed text-slate-100">
              Share moments and explore the community feed on Loop.
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="flex flex-[1.25] flex-col justify-center p-8 sm:p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}