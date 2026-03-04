export interface LocalizedString {
  default: string;
  eng?: string;
  spa?: string;
  [key: string]: string | undefined;
}

export interface SectionData {
  // the API contains arbitrary filters like contentprovider, objecttype, genre, etc.
  [key: string]: string | string[] | Record<string, any> | undefined;
}

export type DisplayType =
  | "LANDSCAPE"
  | "PORTRAIT"
  | "GRID"
  | "CAROUSEL"
  | "LIST";

export interface DeckingSection {
  title: LocalizedString;
  description: LocalizedString;
  itemType?: string;
  posterType?: string;
  country?: string[];
  region?: string[];
  status: string;
  sectionData: SectionData | object[]; // sometimes it's array of ids for ITEMLIST
  displayType: DisplayType;
  minCellWidth: string;
  previewEnabled: string;
  sectionType: string;
  listType?: string;
  userTypes?: string[];
  profileTypes?: string[];
  seeAll?: boolean;
  seeAllLink?: string | null;
  [key: string]: any; // allow extra properties
}

export interface DeckingScreen {
  iddeckingscreen: string;
  screenType: string;
  title: LocalizedString;
  id: string;
  status: string;
  profileTypes: string[];
  userTypes: string[];
  description: LocalizedString;
  sections: DeckingSection[];
  screenPosition?: string;
  displayAppLogo?: string;
  menuIcon?: string | null;
  [key: string]: any;
}

export interface DeckingConfig {
  screens: DeckingScreen[];
  // the server may include top‑level flags such as whether decking is
  // enabled; keep the type open so consumers can cast if necessary.
  featureEnabled?: {
    isDeckingEnabled?: boolean;
    [key: string]: any;
  };

  [key: string]: any;
}
