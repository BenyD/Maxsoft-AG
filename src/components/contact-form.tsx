'use client'

import { AnimationWrapper } from '@/components/animation-wrapper'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import { useState } from 'react'
import { z } from 'zod'

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Der Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, 'Die Nachricht muss mindestens 10 Zeichen lang sein'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm({
  serviceCategories,
}: {
  serviceCategories: ServiceCategory[]
}) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setValidationErrors({})

    try {
      // Validate form data with Zod
      const validatedData = contactFormSchema.parse(formData)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {}
        // @ts-expect-error - ZodError has errors property but TypeScript strict mode doesn't recognize it
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setValidationErrors(errors)
        setSubmitStatus('error')
      } else {
        console.error('Contact form submission error:', error)
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <AnimationWrapper animation="slideUp" delay={0.1}>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Kontaktformular
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Füllen Sie das Formular aus und wir melden uns innerhalb von 24
              Stunden bei Ihnen.
            </p>
          </div>
        </AnimationWrapper>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
                >
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Geben Sie Ihren vollständigen Namen ein"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
                >
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slideUp" delay={0.4}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
                >
                  Unternehmen
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Geben Sie Ihren Unternehmensnamen ein"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
                >
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Geben Sie Ihre Telefonnummer ein"
                />
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slideUp" delay={0.6}>
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
              >
                Gewünschter Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Wählen Sie einen Service</option>
                {serviceCategories && serviceCategories.length > 0 ? (
                  serviceCategories.map((category) => (
                    <option key={category._id} value={category.slug}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="general">Allgemeine Anfrage</option>
                )}
              </select>
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slideUp" delay={0.7}>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-lg/[1.6] font-medium text-gray-700"
              >
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.message
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-blue-500 focus:ring-2 focus:ring-blue-500'
                }`}
                placeholder="Erzählen Sie uns von Ihrem Projekt, Ihren Anforderungen oder stellen Sie uns Ihre Fragen..."
              />
              {validationErrors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.message}
                </p>
              )}
            </div>
          </AnimationWrapper>

          <AnimationWrapper animation="slideUp" delay={0.8}>
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 sm:w-auto"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </Button>
            </div>
          </AnimationWrapper>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <AnimationWrapper animation="scaleIn" delay={0.2}>
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-lg/[1.6] text-green-800">
                  Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir
                  melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            </AnimationWrapper>
          )}

          {submitStatus === 'error' && (
            <AnimationWrapper animation="scaleIn" delay={0.2}>
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-lg/[1.6] text-red-800">
                  Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler
                  aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren
                  Sie uns direkt unter info@maxsoft.ch
                </p>
              </div>
            </AnimationWrapper>
          )}
        </form>
      </Container>
    </div>
  )
}
