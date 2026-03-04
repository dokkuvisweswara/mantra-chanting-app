"use client";

import React from "react";
import Image from "next/image";
import { useCounterStore } from "../../store/useCounterStore";

export default function Home() {
  const { value, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div> Hello Next js</div>
        <div className="flex items-center space-x-4">
          <button
            aria-label="decrement"
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span className="text-xl font-bold">{value}</span>
          <button
            aria-label="increment"
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            +
          </button>
          <button
            aria-label="reset"
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}
