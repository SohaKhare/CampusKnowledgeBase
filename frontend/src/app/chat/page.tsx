'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first session or create a default one
    router.push('/chat/1');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#1a73e8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your study session...</p>
      </div>
    </div>
  );
}
