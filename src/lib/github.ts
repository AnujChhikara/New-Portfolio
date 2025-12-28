export interface GithubPR {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  merged_at: string | null;
  user: {
    login: string;
    avatar_url: string;
  };
  repository_url: string;
  pull_request: {
    merged_at: string | null;
    html_url: string;
  };
}

export async function getRecentPRs(username: string): Promise<GithubPR[]> {
  try {
    // Search for PRs authored by the user
    // Sort by created date, desc
    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&sort=created&order=desc&per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching GitHub PRs:", error);
    return [];
  }
}
