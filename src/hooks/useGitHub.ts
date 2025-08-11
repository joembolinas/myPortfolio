// Custom React hooks for GitHub API data fetching
// Provides loading states, error handling, and data caching

import { useState, useEffect, useCallback } from 'react';
import { githubAPI, GitHubUser, GitHubRepo, GitHubStats } from '@/services/githubAPI';

// Hook for user profile data
export const useGitHubUser = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await githubAPI.getUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};

// Hook for repositories data with filtering options
export const useGitHubRepos = (options?: {
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
}) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const reposData = await githubAPI.getRepositories(options);
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, refetch: fetchRepos };
};

// Hook for GitHub statistics and analytics
export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await githubAPI.getStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

// Hook for portfolio-specific repositories
export const usePortfolioRepos = () => {
  const [portfolioRepos, setPortfolioRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const reposData = await githubAPI.getPortfolioRepos();
      setPortfolioRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio repositories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioRepos();
  }, [fetchPortfolioRepos]);

  return { portfolioRepos, loading, error, refetch: fetchPortfolioRepos };
};

// Hook for recent commit activity
export const useRecentActivity = (repoName?: string) => {
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (repoName) {
        // Fetch commits from specific repository
        const commits = await githubAPI.getRepoCommits(repoName);
        setActivity(commits);
      } else {
        // Fetch general stats for activity overview
        const stats = await githubAPI.getStats();
        setActivity(stats.recentActivity);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent activity');
    } finally {
      setLoading(false);
    }
  }, [repoName]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return { activity, loading, error, refetch: fetchActivity };
};

// Combined hook for all GitHub data
export const useAllGitHubData = () => {
  const userResult = useGitHubUser();
  const statsResult = useGitHubStats();
  const portfolioReposResult = usePortfolioRepos();

  const loading = userResult.loading || statsResult.loading || portfolioReposResult.loading;
  const error = userResult.error || statsResult.error || portfolioReposResult.error;

  const refetchAll = useCallback(() => {
    userResult.refetch();
    statsResult.refetch();
    portfolioReposResult.refetch();
  }, [userResult.refetch, statsResult.refetch, portfolioReposResult.refetch]);

  return {
    user: userResult.user,
    stats: statsResult.stats,
    portfolioRepos: portfolioReposResult.portfolioRepos,
    loading,
    error,
    refetch: refetchAll,
  };
};
