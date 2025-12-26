import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export const dynamic = "force-dynamic";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-[#cdd6f4]">
          Signing you in...
        </div>
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
