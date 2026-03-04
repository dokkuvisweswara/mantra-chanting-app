"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook up authentication logic
    console.log("submit", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Or continue with
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log("google login")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.35 11.1h-9.17v2.92h5.26c-.23 1.37-1.49 4.01-5.26 4.01-3.16 0-5.73-2.61-5.73-5.83s2.57-5.83 5.73-5.83c1.8 0 3.01.77 3.7 1.44l2.54-2.45C17.33 3.28 15.42 2.4 12.18 2.4 6.71 2.4 2.4 6.79 2.4 12.3s4.31 9.9 9.78 9.9c5.66 0 9.4-3.97 9.4-9.55 0-.64-.07-1.12-.23-1.55z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log("facebook login")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3 .9 0 2 .1 2 .1v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.6l-.4 3h-2.2v7A10 10 0 0022 12z"
                  fill="#1877F2"
                />
              </svg>
              Facebook
            </button>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log("linkedin login")}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.98 3.5a2.5 2.5 0 11-.01 5.001 2.5 2.5 0 01.01-5zm.02 7H.5v13h4.5v-13zm7.5 0h-4.5v13h4.5v-7c0-1.9 2.3-2.05 2.3 0v7h4.5v-8.5c0-4.5-5.3-4.3-6.8-2.1v-.1z"
                  fill="#0A66C2"
                />
              </svg>
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
