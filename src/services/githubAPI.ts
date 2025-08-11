// GitHub API service for fetching live portfolio data
// Provides methods for authentication, data fetching, and caching

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  visibility: 'public' | 'private';
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: Record<string, number>;
  recentActivity: GitHubCommit[];
}

class GitHubAPIService {
  private baseURL = 'https://api.github.com';
  private username = 'joembolinas';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Simple cache mechanism for API responses
  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data as T;
    }
    return null;
  }

  private setCached<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Generic API request with error handling
  private async apiRequest<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    const cached = this.getCached<T>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  // Fetch user profile information
  async getUser(): Promise<GitHubUser> {
    return this.apiRequest<GitHubUser>(`/users/${this.username}`);
  }

  // Fetch user repositories with optional filtering
  async getRepositories(options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    type?: 'all' | 'owner' | 'member';
  } = {}): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: (options.per_page || 30).toString(),
      type: options.type || 'owner',
    });

    return this.apiRequest<GitHubRepo[]>(`/users/${this.username}/repos?${params}`);
  }

  // Fetch commits from a specific repository
  async getRepoCommits(repoName: string, limit: number = 10): Promise<GitHubCommit[]> {
    const params = new URLSearchParams({
      per_page: limit.toString(),
      author: this.username,
    });

    return this.apiRequest<GitHubCommit[]>(`/repos/${this.username}/${repoName}/commits?${params}`);
  }

  // Get aggregated statistics across all repositories
  async getStats(): Promise<GitHubStats> {
    try {
      const [user, repos] = await Promise.all([
        this.getUser(),
        this.getRepositories({ per_page: 100 })
      ]);

      const languageStats: Record<string, number> = {};
      let totalStars = 0;
      let totalForks = 0;

      // Aggregate repository statistics
      repos.forEach(repo => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
      });

      // Fetch recent commits from top repositories
      const topRepos = repos
        .filter(repo => repo.pushed_at)
        .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        .slice(0, 5);

      const recentActivity: GitHubCommit[] = [];
      
      for (const repo of topRepos) {
        try {
          const commits = await this.getRepoCommits(repo.name, 3);
          recentActivity.push(...commits);
        } catch (error) {
          console.warn(`Failed to fetch commits for ${repo.name}:`, error);
        }
      }

      // Sort recent activity by date
      recentActivity.sort((a, b) => 
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
      );

      return {
        totalCommits: recentActivity.length, // This is a simplified count
        totalRepos: user.public_repos,
        totalStars,
        totalForks,
        languageStats,
        recentActivity: recentActivity.slice(0, 10)
      };
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
      throw error;
    }
  }

  // Get filtered repositories for portfolio display
  async getPortfolioRepos(): Promise<GitHubRepo[]> {
    const repos = await this.getRepositories({ sort: 'updated', per_page: 20 });
    
    // Filter for portfolio-relevant repositories
    return repos.filter(repo => 
      repo.description && 
      !repo.name.includes('config') &&
      !repo.name.includes('dotfiles') &&
      repo.size > 100 // Filter out very small repos
    ).slice(0, 6); // Show top 6 for portfolio
  }

  // Clear cache manually if needed
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const githubAPI = new GitHubAPIService();
