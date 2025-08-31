'use client'

import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/text'
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { useEffect, useState } from 'react'

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

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
  onSubmit: (data: JobApplicationFormState) => Promise<void>
  onCancel: () => void
}

export function JobApplicationForm({
  jobId,
  jobTitle,
  onSubmit,
  onCancel,
}: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [formData, setFormData] = useState<Partial<JobApplicationFormState>>({
    jobListingId: jobId,
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateLinkedin: '',
    candidateGithub: '',
    candidateLocation: '',
    coverLetter: '',
    resume: null,
    additionalDocuments: [],
    skills: [],
    experienceYears: null,
    currentCompany: '',
    currentPosition: '',
    expectedSalary: null,
    noticePeriod: '',
    gdprConsent: false,
  })

  const handleInputChange = (
    field: string,
    value: string | boolean | string[] | number | null,
  ) => {
    setFormData((prev: Partial<JobApplicationFormState>) => ({
      ...prev,
      [field]: value,
    }))
  }

  const [skillsInput, setSkillsInput] = useState('')

  // Initialize skillsInput when formData.skills changes
  useEffect(() => {
    if (formData.skills && formData.skills.length > 0) {
      setSkillsInput(formData.skills.join(', '))
    }
  }, [formData.skills])

  const handleSkillsChange = (skillsText: string) => {
    setSkillsInput(skillsText)
  }

  const handleSkillsBlur = () => {
    const skills = skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
    handleInputChange('skills', skills)
  }

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.resume || !formData.gdprConsent) {
      setAlertMessage(
        'Bitte fülle alle erforderlichen Felder aus und akzeptiere die Datenschutzerklärung.',
      )
      setShowAlert(true)
      return
    }

    setIsSubmitting(true)
    try {
      // Create FormData for file upload
      const submitFormData = new FormData()

      // Add all form fields with correct names
      submitFormData.append('jobListingId', formData.jobListingId || '')
      submitFormData.append('candidateName', formData.candidateName || '')
      submitFormData.append('candidateEmail', formData.candidateEmail || '')
      submitFormData.append('candidatePhone', formData.candidatePhone || '')
      submitFormData.append(
        'candidateLinkedin',
        formData.candidateLinkedin || '',
      )
      submitFormData.append('candidateGithub', formData.candidateGithub || '')
      submitFormData.append(
        'candidateLocation',
        formData.candidateLocation || '',
      )
      submitFormData.append('coverLetter', formData.coverLetter || '')
      submitFormData.append('jobTitle', jobTitle)

      // Add skills
      if (formData.skills && formData.skills.length > 0) {
        submitFormData.append('skills', formData.skills.join(', '))
      }

      // Add professional details
      if (formData.experienceYears) {
        submitFormData.append(
          'experienceYears',
          formData.experienceYears.toString(),
        )
      }
      if (formData.currentCompany) {
        submitFormData.append('currentCompany', formData.currentCompany)
      }
      if (formData.currentPosition) {
        submitFormData.append('currentPosition', formData.currentPosition)
      }
      if (formData.expectedSalary) {
        submitFormData.append(
          'expectedSalary',
          formData.expectedSalary.toString(),
        )
      }
      if (formData.noticePeriod) {
        submitFormData.append('noticePeriod', formData.noticePeriod)
      }

      // Add GDPR consent
      submitFormData.append('gdprConsent', formData.gdprConsent.toString())

      // Add files
      if (formData.resume) {
        submitFormData.append('resume', formData.resume)
      }

      // Add additional documents if any
      if (
        formData.additionalDocuments &&
        formData.additionalDocuments.length > 0
      ) {
        formData.additionalDocuments
          .filter((doc): doc is File => doc !== null)
          .forEach((doc) => {
            submitFormData.append('additionalDocuments', doc)
          })
      }

      // Submit to API
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        body: submitFormData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 'Fehler beim Einreichen der Bewerbung',
        )
      }

      // Call the onSubmit callback with the result
      await onSubmit(formData as JobApplicationFormState)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert(
        `Es gab einen Fehler beim Einreichen deiner Bewerbung: ${error instanceof Error ? error.message : 'Bitte versuche es erneut.'}`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
          <div className="border-b border-gray-200 px-8 py-6">
            <Heading as="h2" className="text-2xl">
              Bewerbung für {jobTitle}
            </Heading>
            <p className="mt-2 text-gray-600">
              Fülle das Formular unten aus, um deine Bewerbung einzureichen.
              Alle mit * markierten Felder sind erforderlich.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <Subheading className="mb-4">
                  Persönliche Informationen
                </Subheading>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vollständiger Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.candidateName || ''}
                      onChange={(e) =>
                        handleInputChange('candidateName', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.candidateEmail || ''}
                      onChange={(e) =>
                        handleInputChange('candidateEmail', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.candidatePhone || ''}
                      onChange={(e) =>
                        handleInputChange('candidatePhone', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn-Profil
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/deinprofil"
                      value={formData.candidateLinkedin || ''}
                      onChange={(e) =>
                        handleInputChange('candidateLinkedin', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      GitHub-Profil
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/deinbenutzername"
                      value={formData.candidateGithub || ''}
                      onChange={(e) =>
                        handleInputChange('candidateGithub', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Aktueller Standort
                    </label>
                    <input
                      type="text"
                      placeholder="Stadt, Land"
                      value={formData.candidateLocation || ''}
                      onChange={(e) =>
                        handleInputChange('candidateLocation', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <Subheading className="mb-4">Bewerbungsdetails</Subheading>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Motivationsschreiben *
                    </label>
                    <p className="text-sm text-gray-500">
                      Erzähle uns, warum du an dieser Position interessiert bist
                      und was dich zu einer guten Besetzung macht.
                    </p>
                    <textarea
                      required
                      rows={6}
                      minLength={100}
                      maxLength={2000}
                      value={formData.coverLetter || ''}
                      onChange={(e) =>
                        handleInputChange('coverLetter', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                      placeholder="Ich bin begeistert, mich für diese Position zu bewerben, weil..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.coverLetter?.length || 0}/2000 Zeichen
                      (Mindestlänge 100)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Jahre der Berufserfahrung
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={formData.experienceYears?.toString() || ''}
                      onChange={(e) =>
                        handleInputChange(
                          'experienceYears',
                          parseInt(e.target.value) || null,
                        )
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                      placeholder="z.B. 5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Wichtige Fähigkeiten
                    </label>
                    <p className="text-sm text-gray-500">
                      Liste deine wichtigsten technischen und sozialen
                      Fähigkeiten auf, getrennt durch Kommas.
                    </p>
                    <input
                      type="text"
                      value={skillsInput || formData.skills?.join(', ') || ''}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      onBlur={handleSkillsBlur}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                      placeholder="JavaScript, React, Node.js, Projektmanagement, Kommunikation"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Erwartetes Gehalt (CHF)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.expectedSalary?.toString() || ''}
                        onChange={(e) =>
                          handleInputChange(
                            'expectedSalary',
                            parseInt(e.target.value) || null,
                          )
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                        placeholder="z.B. 80000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Kündigungsfrist
                      </label>
                      <input
                        type="text"
                        value={formData.noticePeriod || ''}
                        onChange={(e) =>
                          handleInputChange('noticePeriod', e.target.value)
                        }
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                        placeholder="z.B. 2 Wochen, 1 Monat, sofort"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Aktuelles Unternehmen
                    </label>
                    <input
                      type="text"
                      value={formData.currentCompany || ''}
                      onChange={(e) =>
                        handleInputChange('currentCompany', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                      placeholder="z.B. Maxsoft AG"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Aktuelle Position
                    </label>
                    <input
                      type="text"
                      value={formData.currentPosition || ''}
                      onChange={(e) =>
                        handleInputChange('currentPosition', e.target.value)
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#01A2EE] focus:ring-1 focus:ring-[#01A2EE] focus:outline-none"
                      placeholder="z.B. Senior Software Engineer"
                    />
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div>
                <Subheading className="mb-4">Dokumente</Subheading>
                <div className="space-y-6">
                  {/* Resume Upload */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Lebenslauf/CV *
                    </label>
                    <p className="mb-3 text-sm text-gray-500">
                      Lade deinen Lebenslauf im PDF-, DOC- oder DOCX-Format hoch
                      (max. 10MB).
                    </p>

                    {formData.resume ? (
                      <div className="relative rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-8 w-8 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-800">
                                {formData.resume.name}
                              </p>
                              <p className="text-xs text-green-600">
                                {(formData.resume.size / 1024 / 1024).toFixed(
                                  2,
                                )}{' '}
                                MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleFileChange('resume', null)}
                            className="rounded-full p-1 text-green-600 hover:bg-green-100"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-[#01A2EE] hover:bg-blue-50">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="mt-4">
                          <label
                            htmlFor="resume-upload"
                            className="cursor-pointer"
                          >
                            <span className="text-sm font-medium text-[#01A2EE] hover:text-[#01A2EE]/80">
                              Klicke zum Hochladen
                            </span>
                            <span className="text-gray-500">
                              {' '}
                              oder ziehe und lasse los
                            </span>
                          </label>
                          <input
                            id="resume-upload"
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              handleFileChange(
                                'resume',
                                e.target.files?.[0] || null,
                              )
                            }
                            className="sr-only"
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          PDF, DOC oder DOCX bis zu 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Documents */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Zusätzliche Dokumente
                    </label>
                    <p className="mb-3 text-sm text-gray-500">
                      Lade zusätzliche Dateien wie Portfolio, Zertifikate oder
                      Referenzen hoch (optional, max. 10MB pro Datei).
                    </p>

                    <div className="space-y-3">
                      {formData.additionalDocuments?.map(
                        (doc: File | null, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            {doc ? (
                              <div className="relative flex-1 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                      <svg
                                        className="h-6 w-6 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-blue-800">
                                        {doc.name}
                                      </p>
                                      <p className="text-xs text-blue-600">
                                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newDocs =
                                        formData.additionalDocuments?.filter(
                                          (_, i) => i !== index,
                                        ) || []
                                      setFormData((prev) => ({
                                        ...prev,
                                        additionalDocuments: newDocs,
                                      }))
                                    }}
                                    className="rounded-full p-1 text-blue-600 hover:bg-blue-100"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="relative flex-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-3 transition-colors hover:border-[#01A2EE] hover:bg-blue-50">
                                <div className="flex items-center justify-center">
                                  <label
                                    htmlFor={`doc-upload-${index}`}
                                    className="cursor-pointer text-center"
                                  >
                                    <svg
                                      className="mx-auto h-6 w-6 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M12 4v16m8-8H4"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <span className="mt-1 block text-xs text-[#01A2EE] hover:text-[#01A2EE]/80">
                                      Klicke zum Hochladen
                                    </span>
                                  </label>
                                  <input
                                    id={`doc-upload-${index}`}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      const newDocs = [
                                        ...(formData.additionalDocuments || []),
                                      ]
                                      newDocs[index] =
                                        e.target.files?.[0] || null
                                      setFormData((prev) => ({
                                        ...prev,
                                        additionalDocuments: newDocs,
                                      }))
                                    }}
                                    className="sr-only"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ),
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const newDocs = [
                            ...(formData.additionalDocuments || []),
                            null,
                          ]
                          setFormData((prev) => ({
                            ...prev,
                            additionalDocuments: newDocs,
                          }))
                        }}
                        className="inline-flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-[#01A2EE] hover:bg-gray-50"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>Dokument hinzufügen</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* GDPR Consent */}
              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.gdprConsent || false}
                    onChange={(e) =>
                      handleInputChange('gdprConsent', e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#01A2EE] focus:ring-[#01A2EE]"
                  />
                  <div className="ml-3">
                    <label className="text-sm text-gray-700">
                      Ich stimme der Verarbeitung meiner personenbezogenen Daten
                      für Rekrutierungszwecke zu. *
                    </label>
                    <p className="text-xs text-gray-500">
                      Durch das Aktivieren dieser Checkbox stimmst du zu, dass
                      Maxsoft AG deine personenbezogenen Daten gemäß unserer{' '}
                      <a
                        href="/cookies"
                        className="text-[#01A2EE] hover:underline"
                      >
                        Datenschutzerklärung
                      </a>{' '}
                      verarbeiten darf. Deine Daten werden ausschließlich für
                      Rekrutierungszwecke verwendet und nach Abschluss des
                      Rekrutierungsprozesses gelöscht, es sei denn, du wirst
                      eingestellt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-6 py-2"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting || !formData.gdprConsent || !formData.resume
                }
                className="px-6 py-2"
              >
                {isSubmitting ? 'Wird eingereicht...' : 'Bewerbung einreichen'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Alert Dialog */}
      <Alert open={showAlert} onClose={() => setShowAlert(false)}>
        <AlertTitle>Fehler bei der Formularvalidierung</AlertTitle>
        <AlertDescription>{alertMessage}</AlertDescription>
        <AlertActions>
          <Button onClick={() => setShowAlert(false)} className="px-4 py-2">
            OK
          </Button>
        </AlertActions>
      </Alert>
    </div>
  )
}
