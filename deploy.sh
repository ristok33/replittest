#!/bin/bash

# Initialize git if not already initialized
if [ ! -d .git ]; then
  git init
  git branch -M main
fi

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote if not exists
if ! git remote | grep -q origin; then
  git remote add origin "https://github.com/${GITHUB_REPOSITORY}.git"
fi

# Push to GitHub
git push -u origin main
