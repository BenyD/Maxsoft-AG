-- Supabase Database Setup for Maxsoft Application Tracking System
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
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
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'interviewing', 'offered', 'hired', 'rejected', 'withdrawn')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
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

-- Add candidate_github field to existing tables (if they don't have it)
ALTER TABLE public.job_applications ADD COLUMN IF NOT EXISTS candidate_github TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_applications_job_listing_id ON public.job_applications(job_listing_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_candidate_email ON public.job_applications(candidate_email);
CREATE INDEX IF NOT EXISTS idx_job_applications_priority ON public.job_applications(priority);

-- Create storage bucket for applications
INSERT INTO storage.buckets (id, name, public) 
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for applications bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'applications');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'applications' AND auth.role() = 'authenticated');
CREATE POLICY "Service role can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'applications' AND auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON public.job_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow service role full access
CREATE POLICY "Service role full access" ON public.job_applications
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read their own applications (if needed)
CREATE POLICY "Users can view own applications" ON public.job_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample data (optional)
-- INSERT INTO public.job_applications (
--     job_listing_id,
--     candidate_name,
--     candidate_email,
--     resume_url,
--     skills,
--     gdpr_consent
-- ) VALUES (
--     'sample-job-123',
--     'John Doe',
--     'john.doe@example.com',
--     'https://example.com/resume.pdf',
--     ARRAY['JavaScript', 'React', 'Node.js'],
--     true
-- );
