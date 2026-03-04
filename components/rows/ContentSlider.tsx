"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContentCard from "./ContentCard";
import { Content } from "@/types/content";

interface ContentSliderProps {
  title: string;
  contents: Content[];
}

export default function ContentSlider({ title, contents }: ContentSliderProps) {
  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: `.${title.replace(/\s+/g, "-")}-next`,
            prevEl: `.${title.replace(/\s+/g, "-")}-prev`,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="relative"
        >
          {contents.map((content) => (
            <SwiperSlide key={content.objectid}>
              <ContentCard content={content} />
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div
            className={`${title.replace(/\s+/g, "-")}-prev absolute left-0 top-1/3 -translate-y-1/2 -translate-x-12 z-10 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden lg:block`}
          >
            <svg
              className="w-8 h-8"
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
          </div>
          <div
            className={`${title.replace(/\s+/g, "-")}-next absolute right-0 top-1/3 -translate-y-1/2 translate-x-12 z-10 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden lg:block`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
