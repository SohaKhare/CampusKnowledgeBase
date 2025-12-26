"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-[#cdd6f4]">
      Signing you in...
    </div>
  );
}
