# 🚀 Company Page Dynamic Setup Guide

## Overview
The company page has been transformed from static content to a fully dynamic system managed through Sanity CMS. This allows your content team to manage team members, partners, and job listings without any code changes.

## ✨ What's Now Dynamic

### 1. **Team Members** 👥
- **Photos**: Upload new profile photos through Sanity
- **Names & Titles**: Update job titles and names
- **LinkedIn Links**: Add/remove LinkedIn profile URLs
- **Departments**: Organize by department (Engineering, Design, etc.)
- **Order**: Control display order
- **Active/Inactive**: Show/hide team members

### 2. **Technology Partners** 🔧
- **Company Logos**: Upload new partner logos
- **Company Names**: Update partner company names
- **Partnership Descriptions**: Edit partnership details
- **Partnership Types**: Categorize by type (Cloud, Security, etc.)
- **Order**: Control display order
- **Active/Inactive**: Show/hide partners

### 3. **Industry Partners** 🏢
- **Company Logos**: Upload new partner logos
- **Company Names**: Update partner company names
- **Industry Descriptions**: Edit partnership details
- **Industry Types**: Categorize by industry (Finance, Healthcare, etc.)
- **Order**: Control display order
- **Active/Inactive**: Show/hide partners

### 4. **Job Categories** 📋
- **Category Names**: Create new job categories
- **Category Colors**: Choose from predefined color schemes
- **Order**: Control display order
- **Active/Inactive**: Show/hide categories

### 5. **Job Listings** 💼
- **Job Titles**: Create new job positions
- **Full Job Content**: Requirements, responsibilities, benefits
- **Job Details**: Location, employment type, salary
- **Individual Job Pages**: Each job gets its own `/careers/[job-slug]` page
- **Order**: Control display order within categories
- **Active/Inactive**: Show/hide jobs
- **Featured Jobs**: Highlight important positions

## 🎯 What Remains Static

- **Hero Section**: Company images grid, main headline, mission statement
- **Company Metrics**: "The Numbers" section (Projects, Satisfaction, etc.)
- **Main Team Photo**: Large company/team image
- **Testimonial**: Client quote and photo
- **Page Layout**: Design, styling, responsive behavior
- **Navigation**: Navbar, footer structure

## 🛠️ How to Use Sanity Studio

### Accessing Sanity Studio
1. Go to `/studio` on your site
2. Log in with your Sanity credentials
3. You'll see the new document types in the left sidebar

### Managing Team Members
1. **Create New Team Member**:
   - Click "Team Member" → "Create new"
   - Fill in: Name, Title, Upload Photo, LinkedIn URL (optional)
   - Set Department and Order
   - Save

2. **Edit Existing Team Member**:
   - Click on any team member
   - Update any field
   - Save changes

3. **Reorder Team Members**:
   - Set the "Order" field (lower numbers appear first)
   - Save to see changes

### Managing Partners
1. **Technology Partners**:
   - Click "Technology Partner" → "Create new"
   - Fill in: Company Name, Upload Logo, Description
   - Choose Partnership Type
   - Set Order and save

2. **Industry Partners**:
   - Click "Industry Partner" → "Create new"
   - Fill in: Company Name, Upload Logo, Description
   - Choose Industry Type
   - Set Order and save

### Managing Job Categories
1. **Create New Category**:
   - Click "Job Category" → "Create new"
   - Fill in: Name, Description (optional)
   - Choose Color scheme
   - Set Order and save

2. **Available Colors**:
   - Default Gray (`bg-gray-50`)
   - Light Blue (`bg-blue-50`)
   - Light Green (`bg-green-50`)
   - Light Purple (`bg-purple-50`)
   - Light Orange (`bg-orange-50`)

### Managing Job Listings
1. **Create New Job**:
   - Click "Job Listing" → "Create new"
   - Fill in: Title, Category, Location, Employment Type
   - Add Requirements (array of strings)
   - Add Responsibilities (array of strings)
   - Add Benefits (optional, array of strings)
   - Add About Company and How to Apply text
   - Set Order and save

2. **Job URLs**:
   - Each job automatically gets a URL like `/careers/senior-software-engineer`
   - The slug is auto-generated from the job title
   - Jobs are grouped by category on both company page and careers page

## 🌐 New Pages Created

### 1. **Careers Page** (`/careers`)
- Lists all job categories and positions
- Clean, organized layout
- Links to individual job pages
- Mobile-responsive design

### 2. **Individual Job Pages** (`/careers/[job-slug]`)
- Full job details and requirements
- Professional layout matching site design
- "Apply Now" button (currently links to contact page)
- Back to careers navigation

## 🔗 Navigation Updates

- **Navbar**: Added "Careers" link
- **Footer**: Updated careers link to point to actual page
- **Company Page**: "View listing" buttons now link to individual job pages

## 📱 Mobile Responsiveness

All new components are fully mobile-responsive:
- Team member grid adapts to screen size
- Partner logos scale appropriately
- Job listings table becomes cards on mobile
- Careers page works perfectly on all devices

## 🚀 Benefits of This System

1. **No Code Changes Needed**: Content team can update everything
2. **Scalable**: Add unlimited team members, partners, and jobs
3. **Professional**: Individual job pages look enterprise-grade
4. **SEO Friendly**: Each job gets its own URL and metadata
5. **Maintainable**: Easy to keep content fresh and current
6. **Flexible**: Show/hide content, reorder items, customize everything

## 🔮 Future Enhancements

The system is designed to easily support:
- **Application System**: Replace "Apply Now" button with actual application forms
- **Job Search**: Add search and filtering capabilities
- **Email Notifications**: Alert team when new applications arrive
- **Analytics**: Track job page views and applications
- **Multi-language**: Support for German/French content

## 🎉 Getting Started

1. **Upload Initial Content**:
   - Add your current team members with photos
   - Upload partner logos
   - Create job categories (Engineering, Consulting, etc.)
   - Add sample job listings

2. **Test the System**:
   - Visit `/careers` to see the careers page
   - Click on job listings to see individual pages
   - Test mobile responsiveness

3. **Customize**:
   - Adjust colors, order, and content
   - Add more categories and job types
   - Upload new team photos and partner logos

## 📞 Support

If you need help setting up content or have questions about the system:
- Check the Sanity Studio documentation
- Review the schema definitions in `/src/sanity/schemaTypes/`
- Contact the development team for technical assistance

---

**🎯 The company page is now a powerful, dynamic content management system that grows with your business!**
