export interface Database {
  public: {
    Tables: {
      job_applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          job_listing_id: string
          candidate_name: string
          candidate_email: string
          candidate_phone: string | null
          candidate_linkedin: string | null
          candidate_github: string | null
          candidate_location: string | null
          cover_letter: string | null
          resume_url: string
          additional_documents: string[] | null
          skills: string[]
          experience_years: number | null
          current_company: string | null
          current_position: string | null
          expected_salary: number | null
          notice_period: string | null
          status:
            | 'new'
            | 'reviewing'
            | 'shortlisted'
            | 'interviewing'
            | 'offered'
            | 'hired'
            | 'rejected'
            | 'withdrawn'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          rating: number | null
          assigned_to: string | null
          internal_notes: string | null
          interview_schedule:
            | {
                date: string
                time: string
                type: 'phone' | 'video' | 'onsite'
                interviewer: string
                notes: string
              }[]
            | null
          communications:
            | {
                date: string
                type: 'email' | 'phone' | 'note'
                content: string
                sender: string
              }[]
            | null
          source: string | null
          gdpr_consent: boolean
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          job_listing_id: string
          candidate_name: string
          candidate_email: string
          candidate_phone?: string | null
          candidate_linkedin?: string | null
          candidate_github?: string | null
          candidate_location?: string | null
          cover_letter?: string | null
          resume_url: string
          additional_documents?: string[] | null
          skills: string[]
          experience_years?: number | null
          current_company?: string | null
          current_position?: string | null
          expected_salary?: number | null
          notice_period?: string | null
          status?:
            | 'new'
            | 'reviewing'
            | 'shortlisted'
            | 'interviewing'
            | 'offered'
            | 'hired'
            | 'rejected'
            | 'withdrawn'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          rating?: number | null
          assigned_to?: string | null
          internal_notes?: string | null
          interview_schedule?:
            | {
                date: string
                time: string
                type: 'phone' | 'video' | 'onsite'
                interviewer: string
                notes: string
              }[]
            | null
          communications?:
            | {
                date: string
                type: 'email' | 'phone' | 'note'
                content: string
                sender: string
              }[]
            | null
          source?: string | null
          gdpr_consent: boolean
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          job_listing_id?: string
          candidate_name?: string
          candidate_email?: string
          candidate_phone?: string | null
          candidate_linkedin?: string | null
          candidate_github?: string | null
          candidate_location?: string | null
          cover_letter?: string | null
          resume_url?: string
          additional_documents?: string[] | null
          skills?: string[]
          experience_years?: number | null
          current_company?: string | null
          current_position?: string | null
          expected_salary?: number | null
          notice_period?: string | null
          status?:
            | 'new'
            | 'reviewing'
            | 'shortlisted'
            | 'interviewing'
            | 'offered'
            | 'hired'
            | 'rejected'
            | 'withdrawn'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          rating?: number | null
          assigned_to?: string | null
          internal_notes?: string | null
          interview_schedule?:
            | {
                date: string
                time: string
                type: 'phone' | 'video' | 'onsite'
                interviewer: string
                notes: string
              }[]
            | null
          communications?:
            | {
                date: string
                type: 'email' | 'phone' | 'note'
                content: string
                sender: string
              }[]
            | null
          source?: string | null
          gdpr_consent?: boolean
          tags?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type JobApplication =
  Database['public']['Tables']['job_applications']['Row']
export type JobApplicationInsert =
  Database['public']['Tables']['job_applications']['Insert']
export type JobApplicationUpdate =
  Database['public']['Tables']['job_applications']['Update']
