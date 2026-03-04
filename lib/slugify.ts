/**
 * Convert a screen ID or title to a URL-safe slug.
 * Matches nav and screen routing consistently.
 * 
 * Examples:
 * - "Replay TV-WEB-CATCHUP" -> "replay-tv-web-catchup"
 * - "Series-WEB V2" -> "series-web-v2"
 * - "Kids-WEB" -> "kids-web"
 */
export function slugify(text: string): string {
  // convert to lower case, replace spaces & underscores with hyphens,
  // drop anything that's not alphanumeric or hyphen.  this makes the slug
  // deterministic and forgiving if the incoming path uses - vs _.
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
