#!/bin/bash

# 🏷️ GitHub Repository Topics Setup Script
# This script sets the repository topics/tags for the myPortfolio project

set -e

# Repository information
REPO_OWNER="joembolinas"
REPO_NAME="myPortfolio"

# Topics to add (from the issue requirements)
TOPICS="portfolio,career-transition,react,typescript,tailwind-css,framer-motion,performance-optimization,accessibility,responsive-design,frontend-development,web-development,lighthouse,seo-optimized"

echo "🏷️ Setting repository topics for ${REPO_OWNER}/${REPO_NAME}..."
echo "Topics to add: ${TOPICS}"
echo ""

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ You are not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

# Set the repository topics
echo "🔄 Adding topics to repository..."
if gh repo edit "${REPO_OWNER}/${REPO_NAME}" --add-topic "${TOPICS}"; then
    echo "✅ Repository topics successfully added!"
    echo ""
    echo "🔍 Verifying topics..."
    gh repo view "${REPO_OWNER}/${REPO_NAME}" --json repositoryTopics -q '.repositoryTopics[].name' | sort
else
    echo "❌ Failed to add repository topics."
    echo "Please check your permissions and try again."
    exit 1
fi

echo ""
echo "🎉 Repository topics setup complete!"
echo "You can view them at: https://github.com/${REPO_OWNER}/${REPO_NAME}"