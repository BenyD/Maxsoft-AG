# GitHub Setup and Workflow

## Overview
This document outlines how our GitHub repository is configured and the development workflow we follow.

## Repository Structure
Our project follows a standard Next.js application structure with the following key directories:

- `/src` - Main application source code
- `/public` - Static assets and public files
- `/supabase` - Database migrations and setup
- `/docs` - Project documentation
- `/sanity` - Sanity CMS configuration

## Branch Strategy
We use a simplified Git flow approach:

- `main` - Production-ready code
- `develop` - Development branch for features
- Feature branches - `feature/feature-name`
- Hotfix branches - `hotfix/issue-description`

## Development Workflow

### 1. Starting a New Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/feature-name
```

### 2. Making Changes
- Write your code
- Follow our coding standards (ESLint + Prettier)
- Test your changes locally

### 3. Committing Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

### 4. Pushing and Creating PR
```bash
git push origin feature/feature-name
# Create Pull Request on GitHub
```

## Code Quality Tools

### ESLint Configuration
We use ESLint with Next.js configuration for code quality:
```bash
npm run lint
```

### Prettier Configuration
Automatic code formatting with Prettier:
```bash
# Prettier is configured to run on save in most editors
# Manual formatting:
npx prettier --write .
```

### TypeScript
Full TypeScript support with strict configuration:
```bash
npm run typegen  # Generate Sanity types
```

## Dependencies Management

### Adding New Dependencies
```bash
npm install package-name
npm install -D package-name  # For dev dependencies
```

### Updating Dependencies
```bash
npm update
npm audit fix  # Security updates
```

## Environment Variables
We use environment variables for sensitive configuration. Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-10

# Other services
RESEND_API_KEY=your_resend_key
```

## Deployment
Our application is automatically deployed to Vercel when changes are pushed to the main branch. See the [Vercel Deployment](./vercel-deployment.md) documentation for more details.

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Run `npm run typegen` to regenerate Sanity types
2. **Linting Errors**: Run `npm run lint` to check for issues
3. **Build Failures**: Check environment variables and dependencies

### Getting Help
- Check existing issues on GitHub
- Review our coding standards
- Ask in team discussions
