# Maxsoft AG - IT Consultancy Website

A modern, professional website for Maxsoft AG, a leading IT consultancy company based in Switzerland. Built with Next.js 15, TypeScript, Tailwind CSS, and Sanity CMS.

## 🏗️ Project Overview

Maxsoft AG is a full-stack web application that showcases IT consultancy services, company information, career opportunities, and thought leadership content. The platform includes:

- **Professional Landing Page** - Company overview and service highlights
- **Services Management** - IT service offerings with categorized display
- **Content Management** - Blog and company content via Sanity CMS
- **Career Portal** - Job listings and application system
- **Admin Panel** - Application tracking and management system
- **Responsive Design** - Optimized for all devices and screen sizes

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (React 19) with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **TypeScript**: Full type safety throughout the application
- **CMS**: Sanity for content management
- **Database**: Supabase for authentication and job applications
- **UI Components**: Headless UI, Heroicons, Framer Motion
- **Email**: Resend for notifications and communications

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel for application management
│   ├── api/               # API routes for applications and emails
│   ├── blog/              # Blog system with Sanity CMS
│   ├── careers/           # Job listings and applications
│   ├── company/           # Company information pages
│   ├── contact/           # Contact forms and information
│   ├── services/          # IT services showcase
│   └── studio/            # Embedded Sanity Studio
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── ui/                # Base UI components
│   └── ...                # Feature-specific components
├── lib/                   # Utility functions and configurations
├── sanity/                # Sanity CMS configuration and schemas
└── styles/                # Global styles and Tailwind configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (for CMS)
- Supabase account (for database)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd maxsoft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your configuration:

   ```env
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Sanity Setup**

   ```bash
   npm create sanity@latest -- --env=.env.local --create-project "Maxsoft AG" --dataset production
   ```

   When asked "Would you like to add configuration files for a Sanity project in this Next.js folder?", choose "n".

5. **Optional: Import demo data**

   ```bash
   npx sanity@latest dataset import seed.tar.gz
   ```

6. **Run development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Sanity Studio

Access the CMS at [http://localhost:3000/studio](http://localhost:3000/studio) to manage:

- Blog posts and articles
- Service categories and offerings
- Team member information
- Testimonials and client feedback
- Job listings and career opportunities

### Service Categories

The system includes 20 predefined Heroicons for service categories:

- Computer & Hardware (ComputerDesktopIcon, DevicePhoneMobileIcon)
- Cloud & Infrastructure (CloudIcon, GlobeAltIcon, CircleStackIcon)
- Security & Compliance (ShieldCheckIcon, DocumentCheckIcon, EyeIcon)
- Development & Technology (CodeBracketIcon, CpuChipIcon, ArrowPathIcon)
- Business & Consulting (ChartBarIcon, LightBulbIcon, BuildingOfficeIcon)
- Digital Transformation (RocketLaunchIcon, ClipboardDocumentListIcon, UsersIcon)
- Global & Performance (MapIcon, BoltIcon)

## 🔐 Admin Features

- **Application Tracking**: Monitor job applications and their status
- **Email Notifications**: Automated status update emails via Resend
- **Dashboard**: Overview of applications and system statistics
- **Protected Routes**: Secure admin access with Supabase authentication

## 🎨 Design System

- **Color Palette**: Professional blue (#01A2EE) with supporting colors
- **Typography**: Switzer font family for modern, readable text
- **Components**: Consistent UI components with Tailwind CSS
- **Animations**: Smooth interactions with Framer Motion
- **Responsive**: Mobile-first design approach

## 📱 Features

- **SEO Optimized**: Meta tags, structured data, and RSS feeds
- **Performance**: Next.js optimization and image handling
- **Accessibility**: Screen reader friendly and keyboard navigation
- **International**: Multi-language support ready
- **Analytics**: Ready for Google Analytics integration

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Ensure all environment variables are set in your production environment.

## 📚 Documentation

- [Icon System](./docs/ICON_SYSTEM.md) - Service category icon management
- [Application Tracking System](./docs/APPLICATION_TRACKING_SYSTEM.md) - Job application workflow
- [Company Page Setup](./docs/COMPANY_PAGE_SETUP.md) - Company information management
- [Contact Setup](./docs/CONTACT_SETUP.md) - Contact form configuration
- [Supabase Setup](./docs/SUPABASE_SETUP.md) - Database and authentication setup
- [Testimonials Setup](./docs/TESTIMONIALS_SETUP.md) - Client feedback management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Maxsoft AG. All rights reserved.

## 🆘 Support

For technical support or questions about the Maxsoft AG website:

- Check the documentation in the `docs/` folder
- Review the component examples in `src/components/`
- Contact the development team

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Heroicons](https://heroicons.com)
- [Framer Motion](https://www.framer.com/motion/)
