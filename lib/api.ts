import { Content, ContentResponse } from "@/types/content";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

export async function fetchContents(): Promise<Content[]> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/content/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ContentResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch contents:", error);
    return [];
  }
}

export async function fetchContentById(id: string): Promise<Content | null> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return null;
  }
}

export async function fetchContentsByGenre(
  genre: string
): Promise<Content[]> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(
      `${API_BASE_URL}/content/genre/${genre}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ContentResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch contents by genre:", error);
    return [];
  }
}
