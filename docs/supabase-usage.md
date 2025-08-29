# Supabase Usage Guide

## Overview
We use Supabase as our primary database and authentication service. This document explains how Supabase is integrated into our application and how to use it effectively.

## Architecture

### Database Structure
Our main table is `job_applications` which stores all job application data with the following structure:

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

### Storage Buckets
- `applications` - For storing resumes and additional documents

## Client Setup

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Client Configuration
```typescript
// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client (for server components)
export const createServerComponentClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Admin client for server-side operations (use with caution)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createBrowserClient(supabaseUrl, serviceRoleKey)
}
```

## Usage Patterns

### 1. Client-Side Operations
```typescript
'use client'
import { createClientComponentClient } from '@/lib/supabase'

export function MyComponent() {
  const supabase = createClientComponentClient()
  
  const handleSubmit = async (data: any) => {
    const { data: result, error } = await supabase
      .from('job_applications')
      .insert([data])
    
    if (error) {
      console.error('Error:', error)
      return
    }
    
    // Handle success
  }
}
```

### 2. Server-Side Operations
```typescript
import { createServerComponentClient } from '@/lib/supabase'

export default async function ServerComponent() {
  const supabase = createServerComponentClient()
  
  const { data: applications } = await supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)
  
  return <div>{/* Render applications */}</div>
}
```

### 3. Admin Operations (API Routes)
```typescript
// src/app/api/applications/route.ts
import { createAdminClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const supabase = createAdminClient()
  
  const { data: applications, error } = await supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ applications })
}
```

## Database Operations

### Inserting Data
```typescript
const { data, error } = await supabase
  .from('job_applications')
  .insert([{
    job_listing_id: 'job-123',
    candidate_name: 'John Doe',
    candidate_email: 'john@example.com',
    resume_url: 'https://example.com/resume.pdf',
    skills: ['JavaScript', 'React', 'Node.js'],
    gdpr_consent: true
  }])
```

### Querying Data
```typescript
// Basic select
const { data } = await supabase
  .from('job_applications')
  .select('*')

// Filtered select
const { data } = await supabase
  .from('job_applications')
  .select('*')
  .eq('status', 'pending')
  .gte('created_at', '2024-01-01')

// Complex queries
const { data } = await supabase
  .from('job_applications')
  .select('*')
  .or(`candidate_name.ilike.%${search}%,candidate_email.ilike.%${search}%`)
  .order('created_at', { ascending: false })
  .range(0, 19)
```

### Updating Data
```typescript
const { data, error } = await supabase
  .from('job_applications')
  .update({ status: 'reviewing' })
  .eq('id', applicationId)
```

### Deleting Data
```typescript
const { error } = await supabase
  .from('job_applications')
  .delete()
  .eq('id', applicationId)
```

## Row Level Security (RLS)

### Policies
Our database has RLS enabled with the following policies:

```sql
-- Service role full access
CREATE POLICY "Service role full access" ON public.job_applications
    FOR ALL USING (auth.role() = 'service_role');

-- Users can view own applications (if needed)
CREATE POLICY "Users can view own applications" ON public.job_applications
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Authentication
```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  // Handle unauthenticated user
  return
}

// Get user session
const { data: { session } } = await supabase.auth.getSession()
```

## File Storage

### Uploading Files
```typescript
const { data, error } = await supabase.storage
  .from('applications')
  .upload(`resumes/${fileName}`, file)
```

### Downloading Files
```typescript
const { data } = await supabase.storage
  .from('applications')
  .download('resumes/filename.pdf')
```

### Getting Public URLs
```typescript
const { data } = supabase.storage
  .from('applications')
  .getPublicUrl('resumes/filename.pdf')
```

## Real-time Subscriptions

### Subscribing to Changes
```typescript
const subscription = supabase
  .channel('job_applications')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'job_applications' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
```

### Unsubscribing
```typescript
subscription.unsubscribe()
```

## Error Handling

### Best Practices
```typescript
const { data, error } = await supabase
  .from('job_applications')
  .select('*')

if (error) {
  console.error('Database error:', error)
  
  // Handle specific error types
  if (error.code === 'PGRST116') {
    // Handle not found
  } else if (error.code === '23505') {
    // Handle unique constraint violation
  }
  
  return
}

// Use data safely
if (data) {
  // Process data
}
```

## Performance Optimization

### Indexes
We have several indexes for better performance:
```sql
CREATE INDEX idx_job_applications_job_listing_id ON public.job_applications(job_listing_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);
CREATE INDEX idx_job_applications_candidate_email ON public.job_applications(candidate_email);
CREATE INDEX idx_job_applications_priority ON public.job_applications(priority);
```

### Query Optimization
- Use specific column selection instead of `select('*')`
- Implement pagination with `range()`
- Use appropriate filters to reduce data transfer

## Migration Management

### Running Migrations
```bash
# Apply migrations
supabase db push

# Reset database
supabase db reset

# Generate migration from schema changes
supabase db diff
```

### Migration Files
Our migrations are stored in `/supabase/migrations/` and can be applied using the Supabase CLI.

## Monitoring and Debugging

### Logs
```bash
# View real-time logs
supabase logs

# View specific service logs
supabase logs --service db
```

### Dashboard
- Use Supabase dashboard for visual database management
- Monitor query performance
- Check authentication logs

## Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use RLS policies** to control data access
3. **Validate input data** before database operations
4. **Use prepared statements** (handled automatically by Supabase)
5. **Regular security audits** of your database policies

## Troubleshooting

### Common Issues

1. **Connection Errors**
   - Check environment variables
   - Verify Supabase project is active
   - Check network connectivity

2. **Permission Errors**
   - Verify RLS policies
   - Check user authentication status
   - Ensure proper role permissions

3. **Performance Issues**
   - Check query execution plans
   - Verify indexes are being used
   - Monitor query response times

### Getting Help
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com/)
