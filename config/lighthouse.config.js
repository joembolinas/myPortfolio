/**
 * Lighthouse CI Configuration
 * Performance and accessibility monitoring configuration
 */
module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:4173"],
      startServerCommand: "npm run preview",
      startServerReadyPattern: "Local:   http://localhost:4173",
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:pwa": ["warn", { minScore: 0.8 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
