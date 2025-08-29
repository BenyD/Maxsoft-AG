# Admin Panel Usage Guide

## Overview
Our admin panel (`/admin`) is a comprehensive dashboard for managing job applications, viewing statistics, and overseeing the recruitment process. This document explains how to use the admin panel effectively.

## Access and Authentication

### Accessing the Admin Panel
- Navigate to `/admin` in your application
- The panel automatically redirects to `/admin/dashboard`
- Access is restricted to authenticated users with admin privileges

### Security
- Uses Supabase service role for database access
- Protected routes ensure only authorized users can access
- All sensitive operations are performed server-side

## Dashboard Overview

### Main Dashboard (`/admin/dashboard`)
The dashboard provides a comprehensive overview of recruitment activities:

#### Key Statistics
- **Total Applications**: Count of all job applications
- **Pending Applications**: Applications awaiting review
- **Monthly Applications**: Applications received this month

#### Recent Applications
- Shows the 5 most recent job applications
- Displays candidate name, job title, and application date
- Quick access to application details

### Dashboard Components

#### AdminStats Component
```typescript
<AdminStats
  totalApplications={totalApplications}
  pendingApplications={pendingApplications}
  monthlyApplications={monthlyApplications}
/>
```

#### RecentApplications Component
```typescript
<RecentApplications
  applications={enhancedRecentApplications}
  jobListingsMap={jobListingsMap}
/>
```

## Applications Management

### Applications List (`/admin/applications`)
Comprehensive view of all job applications with advanced filtering and management capabilities.

#### Features
- **Pagination**: 20 applications per page
- **Search**: Search by candidate name or email
- **Filtering**: Filter by status, job listing, and other criteria
- **Sorting**: Sort by creation date (newest first)

#### Filter Options
```typescript
// Available filters
const filters = {
  status: ['all', 'new', 'reviewing', 'shortlisted', 'interviewing', 'offered', 'hired', 'rejected', 'withdrawn'],
  jobId: 'specific-job-listing-id',
  search: 'candidate-name-or-email'
}
```

#### API Endpoints
```typescript
// GET /api/applications
// Query parameters:
// - status: application status filter
// - jobId: specific job listing filter
// - search: text search
// - page: page number for pagination
// - limit: items per page
```

### Application Details (`/admin/applications/[id]`)
Detailed view of individual job applications with full candidate information.

#### Information Displayed
- **Candidate Details**: Name, email, phone, LinkedIn, GitHub, location
- **Professional Information**: Current company, position, experience years
- **Application Content**: Cover letter, resume, additional documents
- **Skills**: Technical skills and competencies
- **Status Management**: Current status and priority
- **Internal Notes**: Admin notes and comments
- **Interview Schedule**: Scheduled interviews and communications

#### Status Management
```typescript
// Available statuses
const statuses = [
  'new',           // New application
  'reviewing',     // Under review
  'shortlisted',   // Shortlisted for interview
  'interviewing',  // In interview process
  'offered',       // Job offer made
  'hired',         // Successfully hired
  'rejected',      // Application rejected
  'withdrawn'      // Candidate withdrew
]
```

#### Priority Levels
```typescript
// Priority options
const priorities = [
  'low',      // Low priority
  'medium',   // Medium priority (default)
  'high',     // High priority
  'urgent'    // Urgent priority
]
```

## Components and Features

### AdminSidebar
Navigation component providing access to different admin sections:
- Dashboard
- Applications
- CMS Guide
- Settings (if implemented)

### ApplicationsTable
Data table component with:
- Sortable columns
- Bulk actions
- Export functionality
- Real-time updates

### ApplicationFilters
Advanced filtering component:
- Status dropdown
- Job listing selector
- Search input
- Date range picker

### StatusBadge
Visual status indicator with color coding:
- Green: Active/positive statuses
- Yellow: Pending/review statuses
- Red: Rejected/negative statuses
- Blue: Neutral statuses

### StatusUpdateModal
Modal for updating application status:
- Status selection
- Priority adjustment
- Internal notes
- Assignment to team members

## Data Management

### Database Operations
All admin operations use the Supabase admin client:

```typescript
import { createAdminClient } from '@/lib/supabase'

const supabase = createAdminClient()

// Fetch applications
const { data: applications } = await supabase
  .from('job_applications')
  .select('*')
  .order('created_at', { ascending: false })

// Update application status
const { error } = await supabase
  .from('job_applications')
  .update({ status: 'reviewing' })
  .eq('id', applicationId)
```

### Data Relationships
Applications are linked to job listings from Sanity CMS:
- `job_listing_id` references Sanity job listing
- Job details are fetched and displayed alongside applications
- Real-time synchronization between systems

## Workflow Management

### Application Review Process
1. **New Application**: Application received and marked as 'new'
2. **Initial Review**: Admin reviews and marks as 'reviewing'
3. **Shortlisting**: Promising candidates marked as 'shortlisted'
4. **Interview Process**: Status updated to 'interviewing'
5. **Final Decision**: Status set to 'offered', 'hired', or 'rejected'

### Assignment and Collaboration
- Applications can be assigned to specific team members
- Internal notes for team communication
- Interview scheduling and coordination
- Communication tracking with candidates

## Reporting and Analytics

### Dashboard Metrics
- Application volume trends
- Status distribution
- Response time metrics
- Success rates by job category

### Export and Reporting
- CSV export of application data
- Filtered reports by status, date, or job listing
- Performance analytics for recruitment process

## Security and Permissions

### Access Control
- Role-based access control
- IP restrictions (if configured)
- Session management
- Audit logging

### Data Protection
- GDPR compliance features
- Secure data handling
- Encrypted communications
- Regular security audits

## Customization

### Adding New Features
The admin panel is built with modular components that can be easily extended:

```typescript
// Example: Adding a new filter
export function CustomFilter({ onFilterChange }: { onFilterChange: (filter: any) => void }) {
  return (
    <div className="filter-container">
      {/* Custom filter UI */}
    </div>
  )
}
```

### Styling and Theming
- Uses Tailwind CSS for styling
- Consistent design system
- Responsive design for all devices
- Dark/light mode support (if implemented)

## Troubleshooting

### Common Issues

1. **Access Denied**
   - Check user authentication
   - Verify admin privileges
   - Check IP restrictions

2. **Data Not Loading**
   - Verify Supabase connection
   - Check environment variables
   - Review database permissions

3. **Performance Issues**
   - Implement pagination for large datasets
   - Optimize database queries
   - Use proper indexing

### Debugging
- Check browser console for errors
- Review network requests
- Verify API responses
- Check Supabase logs

## Best Practices

### 1. Data Management
- Regularly review and update application statuses
- Use consistent naming conventions
- Implement proper data validation
- Regular data cleanup and archiving

### 2. User Experience
- Provide clear status indicators
- Implement intuitive navigation
- Use consistent UI patterns
- Provide helpful error messages

### 3. Performance
- Implement proper pagination
- Use efficient database queries
- Optimize component rendering
- Implement proper caching strategies

### 4. Security
- Regular access reviews
- Monitor for suspicious activities
- Implement proper logging
- Regular security updates

## API Reference

### Endpoints

#### GET /api/applications
Fetch applications with filtering and pagination.

**Query Parameters:**
- `status`: Application status filter
- `jobId`: Job listing ID filter
- `search`: Text search query
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

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

#### PUT /api/applications/[id]
Update application status and details.

**Request Body:**
```json
{
  "status": "reviewing",
  "priority": "high",
  "internal_notes": "Promising candidate",
  "assigned_to": "admin@company.com"
}
```

## Future Enhancements

### Planned Features
- Advanced analytics dashboard
- Email integration for candidate communication
- Interview scheduling system
- Performance metrics and reporting
- Mobile app for admin access
- Integration with HR systems

### Customization Options
- Custom workflow configurations
- Role-based dashboards
- Advanced reporting tools
- API integrations with third-party services
