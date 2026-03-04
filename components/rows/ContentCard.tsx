"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Content } from "@/types/content";

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  // Get portrait poster for display
  const portraitPoster = content.poster.find(
    (p) => p.postertype === "PORTRAIT"
  );
  const posterUrl =
    portraitPoster?.filelist[0]?.filename || "/placeholder.jpg";

  return (
    <Link href={`/movie/${content.objectid}`}>
      <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full">
        <div className="relative w-full aspect-[9/13.5]">
          <Image
            src={posterUrl}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
            {content.title}
          </h3>
          <p className="text-gray-200 text-xs line-clamp-2">
            {content.shortdescription}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-yellow-400 text-xs font-semibold">
              {content.pgrating}
            </span>
            <span className="text-gray-300 text-xs">{content.genre}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
