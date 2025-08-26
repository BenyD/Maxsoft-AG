'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog } from '@headlessui/react'
import { EnvelopeIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Application {
  id: string
  candidate_name: string
  candidate_email: string
  status: string
  priority: string
  rating?: number | null
  created_at: string
  job_listings?: {
    title: string
    category: string
  }
}

interface StatusUpdateModalProps {
  application: Application
  isOpen: boolean
  onClose: () => void
}

export function StatusUpdateModal({
  application,
  isOpen,
  onClose,
}: StatusUpdateModalProps) {
  const [status, setStatus] = useState(application.status)
  const [priority, setPriority] = useState(application.priority || 'medium')
  const [rating, setRating] = useState(application.rating || 0)
  const [notes, setNotes] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')
  const [sendEmail, setSendEmail] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statusOptions = [
    {
      value: 'new',
      label: 'New',
      description: 'Application just received',
    },
    {
      value: 'pending',
      label: 'Pending Review',
      description: 'Application received, awaiting review',
    },
    {
      value: 'reviewing',
      label: 'Under Review',
      description: 'Application is currently being reviewed',
    },
    {
      value: 'shortlisted',
      label: 'Shortlisted',
      description: 'Candidate has been shortlisted for next round',
    },
    {
      value: 'interviewing',
      label: 'Interviewing',
      description: 'Candidate is in interview process',
    },
    {
      value: 'offered',
      label: 'Offer Made',
      description: 'Job offer has been made to candidate',
    },
    {
      value: 'hired',
      label: 'Hired',
      description: 'Candidate has been hired',
    },
    {
      value: 'rejected',
      label: 'Rejected',
      description: 'Application has been rejected',
    },
    {
      value: 'withdrawn',
      label: 'Withdrawn',
      description: 'Candidate has withdrawn their application',
    },
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const updateData: {
        status: string
        priority: string
        rating: number
        internal_notes: string
        updated_at: string
        interview_schedule?: {
          date: string
          time: string
          scheduled_at: string
        }
      } = {
        status,
        priority,
        rating,
        internal_notes: notes,
        updated_at: new Date().toISOString(),
      }

      // Add interview schedule if status is interview_scheduled
      if (status === 'interview_scheduled' && interviewDate && interviewTime) {
        updateData.interview_schedule = {
          date: interviewDate,
          time: interviewTime,
          scheduled_at: new Date().toISOString(),
        }
      }

      // Update application in Supabase
      const response = await fetch(
        `/api/applications/${application.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update application')
      }

      // Send email if requested
      if (sendEmail) {
        await fetch('/api/applications/send-status-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            applicationId: application.id,
            newStatus: status,
            interviewDate:
              status === 'interview_scheduled' ? interviewDate : undefined,
            interviewTime:
              status === 'interview_scheduled' ? interviewTime : undefined,
          }),
        })
      }

      // Close modal and refresh
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Error updating application:', error)
      setError('Failed to update application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getEmailTemplate = () => {
    switch (status) {
      case 'shortlisted':
        return {
          subject: 'Congratulations! You have been shortlisted',
          preview:
            'We are pleased to inform you that your application has been shortlisted...',
        }
      case 'interview_scheduled':
        return {
          subject: 'Interview Scheduled - Next Steps',
          preview: `Your interview has been scheduled for ${interviewDate} at ${interviewTime}...`,
        }
      case 'accepted':
        return {
          subject: 'Welcome to Maxsoft AG!',
          preview: 'We are delighted to offer you the position...',
        }
      case 'rejected':
        return {
          subject: 'Application Update',
          preview: 'Thank you for your interest in the position...',
        }
      default:
        return {
          subject: 'Application Status Update',
          preview: 'Your application status has been updated...',
        }
    }
  }

  const emailTemplate = getEmailTemplate()

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Update Application Status
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            {/* Error Display */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800" onClose={onClose}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Application Info */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-medium text-gray-900">
                Application Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Candidate:</span>
                  <p className="font-medium">{application.candidate_name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Position:</span>
                  <p className="font-medium">
                    {application.job_listings?.title || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{application.candidate_email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Current Status:</span>
                  <p className="font-medium">
                    {application.status
                      .split('_')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(' ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {
                    statusOptions.find((opt) => opt.value === status)
                      ?.description
                  }
                </p>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(rating === star ? 0 : star)}
                      className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <StarIcon className="h-5 w-5" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {rating > 0 ? `${rating}/5` : 'Not rated'}
                  </span>
                </div>
              </div>

              {/* Interview Schedule */}
              {status === 'interview_scheduled' && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Interview Date & Time
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      required
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                    <input
                      type="time"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      required
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Internal Notes */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Internal Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any internal notes about this application..."
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
              />
            </div>

            {/* Email Options */}
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#01A2EE] focus:ring-[#01A2EE]"
                />
                <label
                  htmlFor="sendEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Send email notification to candidate
                </label>
              </div>

              {sendEmail && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3">
                  <div className="flex items-start space-x-3">
                    <EnvelopeIcon className="mt-0.5 h-5 w-5 text-blue-400" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Email Preview</p>
                      <p className="mt-1 text-blue-800">
                        <strong>Subject:</strong> {emailTemplate.subject}
                      </p>
                      <p className="mt-1 text-blue-800">
                        <strong>Preview:</strong> {emailTemplate.preview}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end space-x-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[#01A2EE] focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-md bg-[#01A2EE] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#01A2EE]/90 focus:ring-2 focus:ring-[#01A2EE] focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Application'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
