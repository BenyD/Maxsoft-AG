# ATS System (Applicant Tracking System) Guide

## Overview

Our Applicant Tracking System (ATS) is a comprehensive solution for managing job applications, candidate data, and the entire recruitment workflow. Built with Next.js, Supabase, and integrated with Sanity CMS, it provides a modern, efficient way to handle the hiring process.

## System Architecture

### Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Database**: Supabase (PostgreSQL)
- **CMS**: Sanity for job listings and content
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Styling**: Tailwind CSS with shadcn/ui components

### Data Flow

```
Job Listings (Sanity) → Website Display → Application Form → Supabase Database → Admin Panel
```

## Core Components

### 1. Job Application Form

The primary interface for candidates to submit applications.

#### Location

`src/components/job-application-form.tsx`

#### Features

- **Comprehensive Data Collection**: Captures all necessary candidate information
- **File Upload**: Resume and additional document support
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Works on all device sizes
- **GDPR Compliance**: Built-in consent management

#### Form Fields

```typescript
interface JobApplicationFormState {
  jobListingId: string
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  candidateLinkedin: string
  candidateGithub: string
  candidateLocation: string
  coverLetter: string
  resume: File | null
  additionalDocuments: (File | null)[]
  skills: string[]
  experienceYears: number | null
  currentCompany: string
  currentPosition: string
  expectedSalary: number | null
  noticePeriod: string
  gdprConsent: boolean
}
```

#### Usage

```typescript
<JobApplicationForm
  jobId="job-123"
  jobTitle="Senior Developer"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
/>
```

### 2. Database Schema

Comprehensive database structure for storing application data.

#### Main Table: `job_applications`

```sql
CREATE TABLE public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Job Reference
    job_listing_id TEXT NOT NULL,

    -- Candidate Information
    candidate_name TEXT NOT NULL,
    candidate_email TEXT NOT NULL,
    candidate_phone TEXT,
    candidate_linkedin TEXT,
    candidate_github TEXT,
    candidate_location TEXT,

    -- Application Content
    cover_letter TEXT,
    resume_url TEXT NOT NULL,
    additional_documents TEXT[],

    -- Professional Details
    skills TEXT[] NOT NULL DEFAULT '{}',
    experience_years INTEGER,
    current_company TEXT,
    current_position TEXT,
    expected_salary INTEGER,
    notice_period TEXT,

    -- Application Status
    status TEXT NOT NULL DEFAULT 'new',
    priority TEXT NOT NULL DEFAULT 'medium',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),

    -- Assignment & Notes
    assigned_to TEXT,
    internal_notes TEXT,

    -- Interview & Communication
    interview_schedule JSONB,
    communications JSONB,

    -- Metadata
    source TEXT DEFAULT 'website',
    gdpr_consent BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] DEFAULT '{}'
);
```

#### Database Features

- **UUID Primary Keys**: Secure, unique identifiers
- **Automatic Timestamps**: Creation and update tracking
- **Array Fields**: Skills and tags as arrays
- **JSONB Fields**: Flexible interview and communication data
- **Constraints**: Data validation at database level

### 3. Admin Panel

Comprehensive dashboard for managing applications and recruitment process.

#### Dashboard (`/admin/dashboard`)

- **Statistics Overview**: Total, pending, and monthly applications
- **Recent Applications**: Latest submissions with quick access
- **Quick Actions**: Common administrative tasks

#### Applications Management (`/admin/applications`)

- **List View**: All applications with filtering and search
- **Detail View**: Complete application information
- **Status Management**: Update application status and priority
- **Bulk Operations**: Process multiple applications

#### Components

- `AdminStats`: Key metrics display
- `RecentApplications`: Latest applications overview
- `ApplicationsTable`: Data table with filtering
- `ApplicationFilters`: Advanced search and filtering
- `StatusBadge`: Visual status indicators
- `StatusUpdateModal`: Status change interface

### 4. API Endpoints

RESTful API for application management.

#### GET `/api/applications`

Fetch applications with filtering and pagination.

**Query Parameters:**

- `status`: Application status filter
- `jobId`: Job listing filter
- `search`: Text search
- `page`: Page number
- `limit`: Items per page

**Response:**

```json
{
  "applications": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### PUT `/api/applications/[id]`

Update application status and details.

#### POST `/api/applications`

Create new application (if needed for external submissions).

## Application Workflow

### 1. Job Posting

1. **Content Creation**: Job listing created in Sanity Studio
2. **Website Display**: Job appears on careers page
3. **Application Form**: Candidates can apply directly

### 2. Application Submission

1. **Form Completion**: Candidate fills out application form
2. **File Upload**: Resume and documents uploaded to Supabase Storage
3. **Data Storage**: Application data saved to database
4. **Confirmation**: Candidate receives confirmation

### 3. Application Processing

1. **Status Tracking**: Application marked as 'new'
2. **Initial Review**: Admin reviews and updates status
3. **Shortlisting**: Promising candidates marked as 'shortlisted'
4. **Interview Process**: Status updated through interview stages
5. **Final Decision**: Status set to 'offered', 'hired', or 'rejected'

### 4. Communication Management

- **Interview Scheduling**: Track interview dates and times
- **Communication Log**: Record all candidate interactions
- **Status Updates**: Keep candidates informed of progress
- **Feedback Collection**: Gather interview feedback

## Status Management

### Application Statuses

```typescript
const applicationStatuses = [
  'new', // New application received
  'reviewing', // Under initial review
  'shortlisted', // Selected for interview
  'interviewing', // In interview process
  'offered', // Job offer made
  'hired', // Successfully hired
  'rejected', // Application rejected
  'withdrawn', // Candidate withdrew
]
```

### Priority Levels

```typescript
const priorityLevels = [
  'low', // Low priority
  'medium', // Medium priority (default)
  'high', // High priority
  'urgent', // Urgent priority
]
```

### Status Transitions

- **Automatic**: Some statuses trigger automatic actions
- **Manual**: Admins can update statuses as needed
- **Validation**: Status changes are validated
- **History**: All status changes are tracked

## File Management

### Storage System

- **Supabase Storage**: Secure file storage
- **Bucket**: 'applications' bucket for all files
- **Access Control**: Secure access policies
- **CDN**: Fast global file delivery

### File Types Supported

- **Resumes**: PDF, DOC, DOCX
- **Additional Documents**: Various formats
- **Images**: Profile pictures, portfolios
- **Other**: Any relevant file type

### File Organization

```
applications/
├── resumes/
│   ├── candidate-1-resume.pdf
│   └── candidate-2-resume.pdf
├── documents/
│   ├── portfolio-1.pdf
│   └── references-1.pdf
└── profiles/
    └── candidate-1-photo.jpg
```

## Search and Filtering

### Search Capabilities

- **Text Search**: Search by candidate name or email
- **Status Filter**: Filter by application status
- **Job Filter**: Filter by specific job listing
- **Date Filter**: Filter by application date
- **Skills Filter**: Filter by required skills

### Advanced Filtering

```typescript
// Example filter implementation
const filteredApplications = applications.filter((app) => {
  if (statusFilter && app.status !== statusFilter) return false
  if (jobFilter && app.job_listing_id !== jobFilter) return false
  if (searchFilter) {
    const searchLower = searchFilter.toLowerCase()
    return (
      app.candidate_name.toLowerCase().includes(searchLower) ||
      app.candidate_email.toLowerCase().includes(searchLower)
    )
  }
  return true
})
```

## Reporting and Analytics

### Dashboard Metrics

- **Application Volume**: Total applications over time
- **Status Distribution**: Breakdown by application status
- **Response Times**: Time to first response
- **Success Rates**: Conversion rates by stage
- **Source Analysis**: Where applications come from

### Export Capabilities

- **CSV Export**: Download application data
- **Filtered Reports**: Export specific subsets
- **Custom Date Ranges**: Flexible reporting periods
- **Formatted Data**: Clean, structured exports

## Security and Compliance

### Data Protection

- **GDPR Compliance**: Built-in consent management
- **Data Encryption**: Secure data transmission and storage
- **Access Control**: Role-based permissions
- **Audit Logging**: Track all data access and changes

### Privacy Features

- **Consent Management**: Explicit consent collection
- **Data Retention**: Configurable retention policies
- **Right to Erasure**: Support for data deletion requests
- **Data Portability**: Export candidate data

### Security Measures

- **Row Level Security**: Database-level access control
- **API Authentication**: Secure API endpoints
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Parameterized queries

## Integration Capabilities

### Sanity CMS Integration

- **Job Listings**: Manage job postings in Sanity
- **Content Synchronization**: Real-time content updates
- **Rich Content**: Rich text job descriptions
- **Media Management**: Job-related images and files

### External Integrations

- **Email Services**: Integration with email providers
- **Calendar Systems**: Interview scheduling
- **HR Systems**: Export to HR platforms
- **Job Boards**: Syndicate job listings

### API Integration

- **RESTful API**: Standard HTTP endpoints
- **Webhook Support**: Real-time notifications
- **Authentication**: Secure API access
- **Rate Limiting**: API usage controls

## Performance Optimization

### Database Optimization

- **Indexes**: Strategic database indexing
- **Query Optimization**: Efficient data retrieval
- **Connection Pooling**: Optimized database connections
- **Caching**: Application-level caching

### Frontend Performance

- **Component Optimization**: Efficient React components
- **Lazy Loading**: On-demand data loading
- **Image Optimization**: Optimized image delivery
- **Bundle Optimization**: Minimal JavaScript bundles

### Scalability

- **Horizontal Scaling**: Support for multiple instances
- **Load Balancing**: Distribute traffic efficiently
- **CDN Integration**: Global content delivery
- **Database Scaling**: Vertical and horizontal scaling

## Monitoring and Maintenance

### System Monitoring

- **Performance Metrics**: Response times and throughput
- **Error Tracking**: Monitor for system errors
- **Usage Analytics**: Track system usage patterns
- **Health Checks**: System health monitoring

### Maintenance Tasks

- **Data Cleanup**: Remove old applications
- **Performance Tuning**: Optimize database queries
- **Security Updates**: Regular security patches
- **Backup Management**: Regular data backups

### Troubleshooting

- **Common Issues**: Known problems and solutions
- **Debug Tools**: Development and debugging utilities
- **Log Analysis**: Comprehensive logging system
- **Support Resources**: Documentation and help

## Future Enhancements

### Planned Features

- **AI-powered Screening**: Automated candidate evaluation
- **Advanced Analytics**: Predictive hiring insights
- **Mobile App**: Native mobile application
- **Interview Scheduling**: Automated scheduling system
- **Candidate Portal**: Self-service candidate portal

### Technology Upgrades

- **Real-time Updates**: WebSocket integration
- **Advanced Search**: Full-text search capabilities
- **Machine Learning**: Predictive analytics
- **Blockchain**: Secure credential verification

## Best Practices

### Development

1. **Code Quality**: Follow coding standards
2. **Testing**: Comprehensive test coverage
3. **Documentation**: Keep documentation updated
4. **Code Review**: Peer review process

### Operations

1. **Monitoring**: Proactive system monitoring
2. **Backup**: Regular data backups
3. **Security**: Regular security audits
4. **Updates**: Keep systems updated

### User Experience

1. **Intuitive Interface**: Easy-to-use admin panel
2. **Responsive Design**: Mobile-friendly interface
3. **Performance**: Fast response times
4. **Accessibility**: Inclusive design principles

## Support and Resources

### Documentation

- **User Guides**: Step-by-step instructions
- **API Reference**: Complete API documentation
- **Troubleshooting**: Common issues and solutions
- **Best Practices**: Recommended approaches

### Community

- **Developer Forums**: Community support
- **Code Examples**: Sample implementations
- **Tutorials**: Learning resources
- **Contributions**: Open source contributions

### Professional Support

- **Technical Support**: Expert assistance
- **Training**: User training programs
- **Consulting**: Implementation guidance
- **Custom Development**: Tailored solutions
