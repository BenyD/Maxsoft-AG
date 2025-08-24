export interface JobApplication {
  _id: string
  _type: 'jobApplication'
  applicationId: string
  jobListing: {
    _ref: string
    _type: 'reference'
  }
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location?: string
    linkedinProfile?: string
    portfolioWebsite?: string
  }
  coverLetter: string
  experience?: string
  skills?: string[]
  expectedSalary?: string
  availabilityDate?: string
  workAuthorization: string
  resume: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'file'
  }
  additionalDocuments?: Array<{
    document: {
      asset: {
        _ref: string
        _type: 'reference'
      }
      _type: 'file'
    }
    description?: string
  }>
  status: string
  priority: string
  rating?: number
  internalNotes?: Array<{
    note: string
    author: string
    timestamp: string
    isPrivate: boolean
  }>
  interviews?: Array<{
    type: string
    scheduledDate?: string
    interviewer?: string
    location?: string
    notes?: string
    completed: boolean
  }>
  communications?: Array<{
    type: string
    direction: string
    subject?: string
    content?: string
    timestamp: string
    followUpRequired: boolean
  }>
  source: string
  gdprConsent: boolean
  submittedAt: string
  lastUpdated: string
  assignedTo?: string
}

// Expanded interface for queries with populated job listing
export interface JobApplicationExpanded
  extends Omit<JobApplication, 'jobListing'> {
  jobListing: {
    _id: string
    title: string
    slug: string
    category: {
      _id: string
      name: string
      color: string
    }
    location: string
    employmentType: string
  }
}

// Interface for application form submission
export interface JobApplicationFormData {
  jobListingId: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location?: string
    linkedinProfile?: string
    portfolioWebsite?: string
  }
  coverLetter: string
  experience?: string
  skills?: string[]
  expectedSalary?: string
  availabilityDate?: string
  workAuthorization: string
  resume: File
  additionalDocuments?: Array<{
    file: File
    description?: string
  }>
  gdprConsent: boolean
}

// Interface for form state (allows null files during editing)
export interface JobApplicationFormState {
  jobListingId: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location?: string
    linkedinProfile?: string
    portfolioWebsite?: string
  }
  coverLetter: string
  experience?: string
  skills?: string[]
  expectedSalary?: string
  availabilityDate?: string
  workAuthorization: string
  resume: File | null
  additionalDocuments?: Array<{
    file: File | null
    description?: string
  }>
  gdprConsent: boolean
}

// Interface for application status updates
export interface ApplicationStatusUpdate {
  applicationId: string
  status: string
  priority?: string
  rating?: number
  assignedTo?: string
  note?: {
    content: string
    author: string
    isPrivate: boolean
  }
}

// Interface for interview scheduling
export interface InterviewSchedule {
  applicationId: string
  interview: {
    type: string
    scheduledDate: string
    interviewer: string
    location: string
    notes?: string
  }
}

// Interface for communication logging
export interface CommunicationLog {
  applicationId: string
  communication: {
    type: string
    direction: string
    subject?: string
    content: string
    followUpRequired?: boolean
  }
}
