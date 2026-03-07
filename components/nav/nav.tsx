"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { fetchDeckingConfig } from "@/lib/decking";
import { slugify } from "@/lib/slugify";
import type { DeckingScreen } from "@/types/decking";
import Image from "next/image";
import yogaPose from "../../public/yoga-pose.png";

// default links shown while config is loading
const defaultLinks = [
  // { href: "/home", label: "Home" },
  // { href: "/watchlist", label: "Watchlist" },
  { href: "/mantra", label: "Mantra" },
  { href: "/songs", label: "Songs" },
  { href: "/login", label: "Login" },
];

// Get localized title based on current language
function getLocalizedTitle(
  title: { default: string; eng?: string; spa?: string; fre?: string; mal?: string; [key: string]: any },
  language: string
): string {
  const lang = language?.toLowerCase() || "en";

  if (lang === "en" || lang === "eng") {
    return (title.eng || title.default || "").toLowerCase();
  } else if (lang === "es" || lang === "spa") {
    return (title.spa || title.es || title.default || "").toLowerCase();
  } else if (lang === "fr" || lang === "fre") {
    return (title.fre || title.default || "").toLowerCase();
  } else if (lang === "mal") {
    return (title.mal || title.default || "").toLowerCase();
  }

  return (title.default || "").toLowerCase();
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (e.g., "/en/movie" -> "en", "/es/series" -> "es")
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentLocale = pathSegments[0] || "en";

  const [links, setLinks] = useState(defaultLinks);
  const [moreLinks, setMoreLinks] = useState<{ href: string; label: string }[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);

  // Set up locale-aware default links on mount
  useEffect(() => {
    const localizedDefaults = [
      // { href: `/${currentLocale}/`, label: "Home" },
      // { href: `/${currentLocale}/watchlist`, label: "Watchlist" },
      // { href: `/${currentLocale}/movie`, label: "Movie" },
      { href: `/${currentLocale}/mantra`, label: "Mantra" },
      { href: `/${currentLocale}/songs`, label: "Songs" },
      { href: `/${currentLocale}/login`, label: "Login" },
    ];
    setLinks(localizedDefaults);
  }, [currentLocale]);

  function computeMenuLists(cfg: { screens: DeckingScreen[] }) {
    // the Vue version stored an "appConfig" separately, but all of the
    // information we need is already in the payload we download.  to keep
    // the logic faithful we still look for a feature flag and a fallback
    // array, although in our sample config the flag is not present.
    let menuItemsList: DeckingScreen[] = [];
    const appConfig: any = cfg; // mimic Vue's `this.appConfig`

    if (
      appConfig.featureEnabled &&
      appConfig.featureEnabled.isDeckingEnabled
    ) {
      menuItemsList = cfg.screens;
    } else {
      // fallback if someone has stored screens on appConfig itself
      menuItemsList = appConfig.screens || [];
    }

    // read profile details and login state from localStorage just like the
    // original code
    let subscriberProfileDetails: any = null;
    const storedProfile = localStorage.getItem("subscriberProfileDetails");
    if (storedProfile) {
      try {
        subscriberProfileDetails = JSON.parse(storedProfile);
      } catch {}
    }
    const isKidsMode = subscriberProfileDetails?.kidsmode === "YES";
    const isLoggedIn = !!localStorage.getItem("subscriberid");

    const menuListArr: DeckingScreen[] = [];
    const moreItemArr: DeckingScreen[] = [];

    menuItemsList.forEach((menu) => {
      const profileTypes: string[] = menu.profileTypes || [];
      const screenPosition = (menu.screenPosition || "").toUpperCase();
      const isTopMenu = screenPosition === "TOP";
      const isMoreMenu = screenPosition === "MORE";
      const status = menu.status === "ACTIVE";

      // if the screen should only be shown when the user is authenticated,
      // skip it when not logged in.  the Vue snippet had a comment but not
      // the implementation, so this is a reasonable addition.
      if (!isLoggedIn && (menu.requireLogin || menu.userTypes?.includes("SUBSCRIBED") )) {
        return;
      }

      if (isKidsMode) {
        if (
          isTopMenu &&
          status &&
          (profileTypes.includes("KIDS") || profileTypes.includes("ALL"))
        ) {
          menuListArr.push(menu);
        } else if (
          isMoreMenu &&
          status &&
          (profileTypes.includes("KIDS") || profileTypes.includes("ALL"))
        ) {
          moreItemArr.push(menu);
        }
      } else {
        if (
          isTopMenu &&
          status &&
          (profileTypes.includes("ADULT") ||
            profileTypes.includes("MASTER") ||
            profileTypes.includes("ALL"))
        ) {
          menuListArr.push(menu);
        } else if (
          isMoreMenu &&
          status &&
          (profileTypes.includes("ADULT") ||
            profileTypes.includes("MASTER") ||
            profileTypes.includes("ALL"))
        ) {
          moreItemArr.push(menu);
        }
      }
    });

    return { menuListArr, moreItemArr };
  }

  // convert DeckingScreen objects into simple link objects used by JSX
  // now with locale prefix and localized title
  function screenToLink(screen: DeckingScreen) {
    const screenSlug = slugify(screen.id);
    const localizedLabel = getLocalizedTitle(screen.title, currentLocale);

    // Special case for home screen
    if (screenSlug === "home") {
      return {
        href: `/${currentLocale}/`,
        label: localizedLabel || "Home",
      };
    }

    return {
      href: `/${currentLocale}/${screenSlug}`,
      label: localizedLabel || screen.id,
    };
  }

  // close dropdown if user clicks outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("li")) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    // if we already have a configuration cached in localStorage, use it
    // immediately while the network request is in flight
    const cached = localStorage.getItem("appDeckingConfig");
    if (cached) {
      try {
        const cfg = JSON.parse(cached) as { screens: DeckingScreen[] };
        // const { menuListArr, moreItemArr } = computeMenuLists(cfg);
        // if (menuListArr.length) setLinks(menuListArr.map(screenToLink));
        // if (moreItemArr.length) setMoreLinks(moreItemArr.map(screenToLink));
      } catch {
        /* ignore malformed cache */
      }
    }

    // async function init() {
    //   try {
    //     const cfg = await fetchDeckingConfig();
    //     localStorage.setItem("appDeckingConfig", JSON.stringify(cfg));
    //     const { menuListArr, moreItemArr } = computeMenuLists(cfg);
    //     if (menuListArr.length) setLinks(menuListArr.map(screenToLink));
    //     if (moreItemArr.length) setMoreLinks(moreItemArr.map(screenToLink));
    //   } catch (err) {
    //     console.warn("failed to load decking config", err);
    //     // if the network call failed we already tried the cache above
    //   }
    // }
    // init();
  }, []);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-start">
        <div className="text-xl font-bold relative w-8 h-8 mr-2">
        <Image
          src={yogaPose}
          alt="Content Poster"
          fill
        />
        </div>
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
           Mantra Life
        </div>
        </div>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {moreLinks.length > 0 && (
            <li className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                More
              </button>
              {moreOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded z-50">
                  {moreLinks.map((link) => (
                    <li key={link.href} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Link
                        href={link.href}
                        className="block text-gray-700 dark:text-gray-200"
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
