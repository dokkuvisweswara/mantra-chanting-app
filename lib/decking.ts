import { DeckingConfig } from "@/types/decking";

// Base URL for the remote decking configuration. Can be overridden via environment variable.
const DEFAULT_DECKING_URL =
  "https://dr12rtj128ew2.cloudfront.net/deckingconfig/mvshub/QfjPuaat.json";

export async function fetchDeckingConfig(
  url: string = process.env.NEXT_PUBLIC_DECKING_URL || DEFAULT_DECKING_URL
): Promise<DeckingConfig> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load decking config: ${res.status}`);
  }
  const data: DeckingConfig = await res.json();
  return data;
}

// For local development you can import a static snapshot of the configuration.
// To keep the repository lean we're not committing the entire JSON; instead
// call `fetchDeckingConfig()` or create your own mock file based on the payload.

