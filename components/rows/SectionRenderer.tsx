"use client";

import React from "react";
import ContentSlider from "./ContentSlider";
import { MOCK_CONTENTS } from "@/lib/mockData";
import type { DeckingSection } from "@/types/decking";

interface SectionRendererProps {
  section: DeckingSection;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  // Get the title in the user's language, fallback to default
  const title = section.title.default || section.title.eng || "Section";

  // For now, use mock content for all sections
  // In production, you'd fetch content based on section.sectionData filters
  const contentToRender = MOCK_CONTENTS;

  switch (section.sectionType) {
    case "ITEMLIST":
    case "TOPRECOMMENDED":
    case "USERRECOMMENDED":
    case "FILTER":
      // Render as a carousel/slider
      if (section.listType === "CAROUSEL" || section.displayType === "LANDSCAPE") {
        return <ContentSlider title={title} contents={contentToRender} />;
      }
      // Render as a grid for GRID listType
      if (section.listType === "GRID") {
        return (
          <div className="px-4 py-8 dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {contentToRender.slice(0, 12).map((item, idx) => {
                const posterUrl =
                  item.poster && item.poster.length > 0
                    ? item.poster[0].filelist?.[0]?.filename || "/placeholder.jpg"
                    : "/placeholder.jpg";
                return (
                  <div
                    key={idx}
                    className="rounded overflow-hidden cursor-pointer hover:opacity-75 transition"
                  >
                    <img
                      src={posterUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                    <p className="text-sm mt-2 dark:text-gray-300 truncate">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      // Default to list
      return <ContentSlider title={title} contents={contentToRender} />;

    case "EPG":
      // TV Guide / Electronic Program Guide
      return (
        <div className="px-4 py-8 dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">{title}</h2>
          <p className="dark:text-gray-400">EPG viewer coming soon...</p>
        </div>
      );

    default:
      // For unknown section types, still render the title so nothing looks broken
      // In production you'd implement proper handling for each type
      return (
        <div className="px-4 py-8 dark:bg-gray-900 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-bold mb-2 dark:text-white">{title}</h2>
          <p className="dark:text-gray-400 text-sm">
            ({section.sectionType} - {section.listType || "no type"})
          </p>
        </div>
      );
  }
}
