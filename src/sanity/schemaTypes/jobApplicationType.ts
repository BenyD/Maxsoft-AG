import { defineField, defineType } from 'sanity'

export const jobApplicationType = defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    // Application Identification
    defineField({
      name: 'applicationId',
      title: 'Application ID',
      type: 'string',
      readOnly: true,
      description: 'Auto-generated unique application ID',
    }),

    // Job Reference
    defineField({
      name: 'jobListing',
      title: 'Job Position',
      type: 'reference',
      to: [{ type: 'jobListing' }],
      validation: (Rule) => Rule.required(),
    }),

    // Applicant Personal Information
    defineField({
      name: 'personalInfo',
      title: 'Personal Information',
      type: 'object',
      fields: [
        defineField({
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'email',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'location',
          title: 'Current Location',
          type: 'string',
          description: 'City, Country',
        }),
        defineField({
          name: 'linkedinProfile',
          title: 'LinkedIn Profile',
          type: 'url',
        }),
        defineField({
          name: 'portfolioWebsite',
          title: 'Portfolio/Website',
          type: 'url',
        }),
      ],
    }),

    // Application Content
    defineField({
      name: 'coverLetter',
      title: 'Cover Letter',
      type: 'text',
      rows: 8,
      description: 'Why are you interested in this position?',
      validation: (Rule) => Rule.required().min(100).max(2000),
    }),

    defineField({
      name: 'experience',
      title: 'Relevant Experience',
      type: 'text',
      rows: 6,
      description: 'Describe your relevant work experience',
    }),

    defineField({
      name: 'skills',
      title: 'Key Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List your key technical and soft skills',
    }),

    defineField({
      name: 'expectedSalary',
      title: 'Expected Salary',
      type: 'string',
      description: 'e.g., CHF 80,000 - 100,000 or Negotiable',
    }),

    defineField({
      name: 'availabilityDate',
      title: 'Available Start Date',
      type: 'date',
    }),

    defineField({
      name: 'workAuthorization',
      title: 'Work Authorization in Switzerland',
      type: 'string',
      options: {
        list: [
          { title: 'Swiss Citizen', value: 'swiss-citizen' },
          { title: 'EU/EFTA Citizen', value: 'eu-efta' },
          { title: 'Work Permit (B/C)', value: 'work-permit' },
          { title: 'Need Sponsorship', value: 'need-sponsorship' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // File Attachments
    defineField({
      name: 'resume',
      title: 'Resume/CV',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'additionalDocuments',
      title: 'Additional Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'document',
              title: 'Document',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'e.g., Portfolio, Certificates, References',
            }),
          ],
        },
      ],
    }),

    // Application Status & Tracking
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: '📥 New Application', value: 'new' },
          { title: '👀 Under Review', value: 'under-review' },
          { title: '📞 Phone Screening', value: 'phone-screening' },
          { title: '🎯 Technical Interview', value: 'technical-interview' },
          { title: '👥 Final Interview', value: 'final-interview' },
          { title: '✅ Offer Extended', value: 'offer-extended' },
          { title: '🎉 Hired', value: 'hired' },
          { title: '❌ Rejected', value: 'rejected' },
          { title: '⏸️ On Hold', value: 'on-hold' },
          { title: '🚫 Withdrawn', value: 'withdrawn' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          { title: '🔥 High', value: 'high' },
          { title: '📋 Normal', value: 'normal' },
          { title: '📝 Low', value: 'low' },
        ],
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'rating',
      title: 'Application Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Rate this application from 1-5 stars',
    }),

    // Internal Notes & Communication
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'note',
              title: 'Note',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
            }),
            defineField({
              name: 'timestamp',
              title: 'Timestamp',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            }),
            defineField({
              name: 'isPrivate',
              title: 'Private Note',
              type: 'boolean',
              initialValue: true,
              description: 'Private notes are not visible to the candidate',
            }),
          ],
        },
      ],
    }),

    // Interview Scheduling
    defineField({
      name: 'interviews',
      title: 'Interview Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Interview Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Phone Screening', value: 'phone-screening' },
                  { title: 'Video Call', value: 'video-call' },
                  { title: 'Technical Interview', value: 'technical' },
                  { title: 'Cultural Fit', value: 'cultural-fit' },
                  { title: 'Final Interview', value: 'final' },
                  { title: 'Meet the Team', value: 'team-meeting' },
                ],
              },
            }),
            defineField({
              name: 'scheduledDate',
              title: 'Scheduled Date & Time',
              type: 'datetime',
            }),
            defineField({
              name: 'interviewer',
              title: 'Interviewer(s)',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Location/Platform',
              type: 'string',
              description: 'Office address or video call platform',
            }),
            defineField({
              name: 'notes',
              title: 'Interview Notes',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'completed',
              title: 'Completed',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),

    // Communication Log
    defineField({
      name: 'communications',
      title: 'Communication History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Communication Type',
              type: 'string',
              options: {
                list: [
                  { title: '📧 Email', value: 'email' },
                  { title: '📞 Phone Call', value: 'phone' },
                  { title: '💬 SMS', value: 'sms' },
                  { title: '🎥 Video Call', value: 'video' },
                  { title: '📝 Note', value: 'note' },
                ],
              },
            }),
            defineField({
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Outgoing (to candidate)', value: 'outgoing' },
                  { title: 'Incoming (from candidate)', value: 'incoming' },
                ],
              },
            }),
            defineField({
              name: 'subject',
              title: 'Subject/Topic',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content/Summary',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'timestamp',
              title: 'Date & Time',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
            }),
            defineField({
              name: 'followUpRequired',
              title: 'Follow-up Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),

    // Metadata
    defineField({
      name: 'source',
      title: 'Application Source',
      type: 'string',
      options: {
        list: [
          { title: 'Company Website', value: 'website' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Job Board', value: 'job-board' },
          { title: 'Referral', value: 'referral' },
          { title: 'Direct Contact', value: 'direct' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'website',
    }),

    defineField({
      name: 'gdprConsent',
      title: 'GDPR Consent',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      description: 'Candidate has given consent for data processing',
    }),

    defineField({
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'assignedTo',
      title: 'Assigned Recruiter/HR',
      type: 'string',
      description: 'Who is handling this application',
    }),
  ],

  preview: {
    select: {
      title: 'personalInfo.firstName',
      subtitle: 'personalInfo.lastName',
      description: 'jobListing.title',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, description, status } = selection
      return {
        title: `${title} ${subtitle}`,
        subtitle: description,
        media: status === 'new' ? '📥' : status === 'hired' ? '🎉' : '📋',
      }
    },
  },

  orderings: [
    {
      title: 'Submission Date (Newest First)',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Priority',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Last Name',
      name: 'lastNameAsc',
      by: [{ field: 'personalInfo.lastName', direction: 'asc' }],
    },
  ],
})
