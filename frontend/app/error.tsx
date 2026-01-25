'use client';

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,

}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>

      <div className=" flex justify-center items-center flex-row gap-5">

        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Retry
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
