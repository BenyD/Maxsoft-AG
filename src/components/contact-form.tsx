'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import type { ServiceCategory } from '@/sanity/types/serviceCategory'
import { useState } from 'react'
import { z } from 'zod'

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
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
        <Subheading>Form</Subheading>
        <Heading as="h3" className="mt-2">
          Get in touch with us
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Let&apos;s discuss your IT needs and discover how our cutting-edge
          solutions can drive innovation and growth for your organization.
        </Lead>

        <div className="mt-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name *
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
                  placeholder="Enter your full name"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address *
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
                  placeholder="Enter your email address"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Service of Interest
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                {serviceCategories && serviceCategories.length > 0 ? (
                  serviceCategories.map((category) => (
                    <option key={category._id} value={category.slug}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="general">General Inquiry</option>
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Message *
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
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Tell us about your project, requirements, or any questions you have..."
              />
              {validationErrors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  Thank you! Your message has been sent successfully. We&apos;ll
                  get back to you within 24 hours.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">
                  Sorry, there was an error sending your message. Please try
                  again or contact us directly at info@maxsoft.ch
                </p>
              </div>
            )}
          </form>
        </div>
      </Container>
    </div>
  )
}
