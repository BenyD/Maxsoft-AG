# Maxsoft Documentation

Welcome to the comprehensive documentation for the Maxsoft project. This documentation covers all aspects of our system architecture, development workflow, and operational procedures.

## 📚 Documentation Index

### 🚀 Development & Deployment

- **[GitHub Setup](./github-setup.md)** - Repository structure, workflow, and development practices
- **[Vercel Deployment](./vercel-deployment.md)** - Deployment configuration and management

### 🗄️ Backend & Database

- **[Supabase Usage](./supabase-usage.md)** - Database setup, operations, and best practices
- **[Sanity CMS Usage](./sanity-cms-usage.md)** - Content management system guide

### 🎛️ Admin & Management

- **[Admin Panel Usage](./admin-panel-usage.md)** - How to use the admin dashboard
- **[Sanity Studio Usage](./studio-usage.md)** - Content editing and management interface

### 💼 Business Systems

- **[ATS System](./ats-system.md)** - Applicant Tracking System comprehensive guide

## 🏗️ System Architecture Overview

Our system is built with a modern, scalable architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │   Backend      │    │   External     │
│   (Next.js)    │◄──►│   (Supabase)   │◄──►│   (Sanity CMS) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin Panel  │    │   File Storage  │    │   Content      │
│   (/admin)     │    │   (Supabase)    │    │   Management   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start Guide

### 1. Development Environment Setup

```bash
# Clone the repository
git clone <repository-url>
cd maxsoft

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### 2. Key URLs

- **Main Application**: `http://localhost:3000`
- **Admin Panel**: `http://localhost:3000/admin`
- **Sanity Studio**: `http://localhost:3000/studio`
- **API Endpoints**: `http://localhost:3000/api/*`

### 3. Essential Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typegen      # Generate Sanity types

# Database
supabase start       # Start local Supabase
supabase db push     # Push migrations
```

## 🔧 Technology Stack

| Component        | Technology               | Purpose                       |
| ---------------- | ------------------------ | ----------------------------- |
| **Frontend**     | Next.js 15 + React 19    | Modern web application        |
| **Database**     | Supabase (PostgreSQL)    | Data storage & authentication |
| **CMS**          | Sanity                   | Content management            |
| **Styling**      | Tailwind CSS + shadcn/ui | UI components & styling       |
| **Deployment**   | Vercel                   | Hosting & CI/CD               |
| **File Storage** | Supabase Storage         | Document & media storage      |

## 📋 Prerequisites

Before working with this system, ensure you have:

- **Node.js** 18+ and npm
- **Git** for version control
- **Supabase CLI** for database management
- **Sanity CLI** for CMS management
- **Modern browser** for development

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-10

# Email Service
RESEND_API_KEY=your_resend_key
```

## 🎯 Key Features

### 🏢 Company Website

- Modern, responsive design
- SEO optimized
- Fast loading times
- Mobile-first approach

### 💼 Job Application System

- Comprehensive application forms
- File upload support
- GDPR compliance
- Admin management panel

### 📝 Content Management

- Headless CMS with Sanity
- Rich text editing
- Image optimization
- Real-time collaboration

### 🔐 Admin Dashboard

- Application tracking
- Status management
- Analytics and reporting
- User management

## 📖 Learning Path

### For Developers

1. Start with [GitHub Setup](./github-setup.md)
2. Learn [Supabase Usage](./supabase-usage.md)
3. Understand [Sanity CMS](./sanity-cms-usage.md)
4. Explore the [ATS System](./ats-system.md)

### For Content Managers

1. Begin with [Sanity Studio Usage](./studio-usage.md)
2. Learn [Admin Panel Usage](./admin-panel-usage.md)
3. Understand content workflows

### For DevOps

1. Review [Vercel Deployment](./vercel-deployment.md)
2. Understand [Supabase Usage](./supabase-usage.md)
3. Learn deployment procedures

## 🐛 Troubleshooting

### Common Issues

#### Development Issues

- **Port conflicts**: Check if port 3000 is available
- **Environment variables**: Verify `.env.local` configuration
- **Dependencies**: Run `npm install` and clear cache

#### Database Issues

- **Connection errors**: Check Supabase credentials
- **Migration failures**: Verify database schema
- **Permission errors**: Check RLS policies

#### CMS Issues

- **Content not loading**: Verify Sanity configuration
- **Image uploads**: Check storage permissions
- **Type errors**: Run `npm run typegen`

### Getting Help

1. Check this documentation first
2. Review error logs and console output
3. Check GitHub issues
4. Contact the development team

## 🔄 Maintenance

### Regular Tasks

- **Daily**: Monitor application logs and errors
- **Weekly**: Review application statistics and performance
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and update documentation

### Backup Procedures

- **Database**: Automated daily backups via Supabase
- **Content**: Sanity provides automatic content backup
- **Code**: Git repository with multiple branches
- **Files**: Supabase Storage with redundancy

## 🚀 Deployment

### Production Deployment

1. Push changes to `main` branch
2. Vercel automatically builds and deploys
3. Verify deployment success
4. Monitor for any issues

### Staging Deployment

1. Create feature branch
2. Deploy to staging environment
3. Test thoroughly
4. Merge to main when ready

## 📈 Performance

### Optimization Strategies

- **Images**: Automatic optimization and WebP conversion
- **Code**: Tree shaking and code splitting
- **Database**: Strategic indexing and query optimization
- **CDN**: Global content delivery network

### Monitoring

- **Vercel Analytics**: Performance and user experience
- **Supabase Dashboard**: Database performance metrics
- **Custom Logging**: Application-specific metrics

## 🔒 Security

### Security Measures

- **Authentication**: Supabase Auth with role-based access
- **Data Protection**: Row-level security policies
- **Input Validation**: Comprehensive data validation
- **HTTPS**: Secure communication throughout

### Compliance

- **GDPR**: Built-in consent management
- **Data Privacy**: Secure data handling practices
- **Audit Logging**: Comprehensive access tracking

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `develop`
2. Make changes and test thoroughly
3. Create pull request with description
4. Code review and approval process
5. Merge and deploy

### Documentation Updates

- Keep documentation current with code changes
- Add examples and use cases
- Update troubleshooting sections
- Review and improve existing content

## 📞 Support

### Internal Support

- **Development Team**: Technical questions and issues
- **Project Manager**: Feature requests and priorities
- **DevOps Team**: Deployment and infrastructure

### External Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Sanity Documentation**: https://www.sanity.io/docs
- **Vercel Documentation**: https://vercel.com/docs

## 📝 Changelog

### Recent Updates

- **v1.0.0**: Initial system deployment
- **v1.1.0**: Admin panel enhancements
- **v1.2.0**: Performance optimizations
- **v1.3.0**: Additional content types

### Upcoming Features

- Advanced analytics dashboard
- Mobile application
- AI-powered candidate screening
- Enhanced reporting capabilities

---

**Last Updated**: January 2025  
**Version**: 1.3.0  
**Maintainer**: Maxsoft Development Team

For questions or suggestions about this documentation, please contact the development team or create an issue in the repository.
