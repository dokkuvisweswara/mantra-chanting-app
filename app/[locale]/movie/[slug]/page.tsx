"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Content } from "@/types/content";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default function ContentDetailPage({ params }: PageProps) {
  const [unwrappedParams, setParams] = React.useState<{
    locale: string;
    slug: string;
  } | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const p = await params;
      setParams(p);
    })();
  }, [params]);

  useEffect(() => {
    // In a real app, you'd fetch from your API or CMS
    // For now, we'll show a placeholder
    if (unwrappedParams?.slug) {
      setLoading(false);
      setError("Content details loading. Connect your API endpoint here.");
    }
  }, [unwrappedParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/movie"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Movies</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div>
            <div className="relative w-full aspect-[9/13.5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.jpg"
                alt="Content Poster"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {unwrappedParams?.slug || "Content Title"}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Rating:</span>
                <span className="text-yellow-400 font-semibold">+13</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Genre:</span>
                <span>Action, Drama</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Year:</span>
                <span>2024</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {error || "Content description will be displayed here."}
              </p>
              <p className="text-gray-400 text-sm italic">
                Note: Connect your API endpoint to display full content details
                by object ID.
              </p>
            </div>

            {/* Cast */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-4 rounded-lg text-center"
                  >
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
                    <p className="font-semibold text-sm">Actor {i}</p>
                    <p className="text-gray-400 text-xs">Role</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Play Button */}
            <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors mb-4 lg:mb-0">
              ▶ Play Now
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300 mb-2">Duration</h3>
            <p className="text-2xl font-bold">2h 20m</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300 mb-2">Language</h3>
            <p className="text-2xl font-bold">English</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300 mb-2">Quality</h3>
            <p className="text-2xl font-bold">4K</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-300 mb-2">Availability</h3>
            <p className="text-2xl font-bold">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
