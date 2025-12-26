"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-[#cdd6f4]">
      Signing you in...
    </div>
  );
}
