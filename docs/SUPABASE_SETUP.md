# 🚀 Supabase Integration Setup Guide

This guide will walk you through setting up Supabase for the Maxsoft application tracking system.

## 📋 **Prerequisites**

- [Supabase Account](https://supabase.com) (Free tier works perfectly)
- [Resend Account](https://resend.com) for email notifications
- Your existing Maxsoft project

## 🔧 **Step 1: Create Supabase Project**

1. **Go to [Supabase Dashboard](https://app.supabase.com)**
2. **Click "New Project"**
3. **Choose your organization**
4. **Fill in project details:**
   - Name: `maxsoft-applications`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
5. **Click "Create new project"**
6. **Wait for setup to complete (2-3 minutes)**

## 🔑 **Step 2: Get API Keys**

1. **In your Supabase project dashboard, go to Settings → API**
2. **Copy these values:**
   - Project URL (e.g., `https://abcdefghijklmnop.supabase.co`)
   - Anon public key (starts with `eyJ...`)
   - Service role key (starts with `eyJ...`)

## 📧 **Step 3: Set Up Resend**

1. **Go to [Resend Dashboard](https://resend.com)**
2. **Create account and verify your domain**
3. **Go to API Keys → Create API Key**
4. **Copy the API key**

## ⚙️ **Step 4: Update Environment Variables**

1. **Open your `.env.local` file**
2. **Replace the placeholder values:**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here

# Admin Email for Notifications
ADMIN_EMAIL=info@maxsoft.ch
```

## 🗄️ **Step 5: Set Up Database**

1. **In Supabase Dashboard, go to SQL Editor**
2. **Copy the contents of `supabase-setup.sql`**
3. **Paste and run the SQL script**
4. **Verify the table was created in Database → Tables**

## 🗂️ **Step 6: Set Up Storage**

1. **Go to Storage in Supabase Dashboard**
2. **Verify the `applications` bucket was created**
3. **Check that policies are set correctly**

## 🧪 **Step 7: Test the Integration**

1. **Restart your Next.js development server**
2. **Go to a job listing page**
3. **Click "Apply Now"**
4. **Fill out and submit the application form**
5. **Check Supabase Dashboard → Database → Tables → job_applications**
6. **Check your email for confirmation**

## 🔍 **Step 8: Verify Everything Works**

### ✅ **Check Database:**
- Applications appear in `job_applications` table
- File URLs are stored correctly
- Status updates work

### ✅ **Check Storage:**
- Resume files are uploaded to `applications` bucket
- Additional documents are stored
- Files are accessible via public URLs

### ✅ **Check Emails:**
- Candidate receives confirmation email
- Admin receives notification email
- Emails are properly formatted

## 🚨 **Troubleshooting**

### **"Supabase client not initialized"**
- Check your environment variables
- Ensure `.env.local` is loaded
- Restart your development server

### **"Storage bucket not found"**
- Run the SQL setup script again
- Check Storage → Buckets in Supabase
- Verify bucket policies

### **"Permission denied"**
- Check RLS policies in Supabase
- Ensure service role key is correct
- Verify table permissions

### **"Email sending failed"**
- Check Resend API key
- Verify domain verification
- Check email templates

## 📊 **What's Now Working**

### ✅ **Sanity CMS (Content Management):**
- Job listings creation and management
- Company content (team, partners, testimonials)
- Blog posts and marketing content

### ✅ **Supabase (Application Tracking):**
- Job application submissions
- File uploads (resumes, documents)
- Application status tracking
- Internal notes and communications

### ✅ **Resend (Email Notifications):**
- Application confirmations to candidates
- Notifications to recruiters
- Professional email delivery

## 🎯 **Next Steps**

1. **Test the complete flow**
2. **Customize email templates if needed**
3. **Set up admin dashboard (coming next)**
4. **Configure additional email notifications**
5. **Add application analytics**

## 🔗 **Useful Links**

- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 📞 **Need Help?**

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify all environment variables are set
3. Check the browser console for errors
4. Ensure all dependencies are installed

---

**🎉 Congratulations! Your Supabase integration is now set up and ready to handle job applications!**
