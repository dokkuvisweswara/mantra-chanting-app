"use client";

import React from "react";
import ContentSlider from "@/components/rows/ContentSlider";
import { MOCK_CONTENTS } from "@/lib/mockData";

export default function MoviePage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="pt-8">
        <ContentSlider title="Popular Movies" contents={MOCK_CONTENTS} />
        <ContentSlider title="New Releases" contents={MOCK_CONTENTS} />
        <ContentSlider title="Trending Now" contents={MOCK_CONTENTS} />
      </div>
    </div>
  );
}
