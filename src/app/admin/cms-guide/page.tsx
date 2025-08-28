import { Heading } from '@/components/text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import {
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  CogIcon,
  ComputerDesktopIcon,
  CubeIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

export default function CMSGuidePage() {
  return (
    <div className="space-y-8">
      <div>
        <Heading as="h1" className="mb-4">
          Sanity CMS Implementation Guide
        </Heading>
        <p className="max-w-4xl text-lg text-gray-600">
          This guide explains how to use Sanity CMS to manage content for the
          Maxsoft website. Learn about the content structure, how to add/edit
          content, and the technical implementation.
        </p>
      </div>

      <Divider />

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CodeBracketIcon className="h-5 w-5" />
            Quick Access to Sanity Studio
          </CardTitle>
          <CardDescription>
            Access the content management interface to add and edit content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>
              <a
                href="/studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Open Sanity Studio
                <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button>
              <a
                href="https://www.sanity.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Sanity Documentation
                <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            Content Types Overview
          </CardTitle>
          <CardDescription>
            The main content types available in the CMS and their purpose
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CubeIcon className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Competencies</span>
              </div>
              <p className="text-sm text-gray-600">
                Core business competencies and expertise areas
              </p>
              <Badge color="blue">New</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ComputerDesktopIcon className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Technologies</span>
              </div>
              <p className="text-sm text-gray-600">
                Technology stack and tools used
              </p>
              <Badge color="green">New</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CogIcon className="h-5 w-5 text-purple-600" />
                <span className="font-semibold">Services</span>
              </div>
              <p className="text-sm text-gray-600">
                Service offerings and solutions
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">Testimonials</span>
              </div>
              <p className="text-sm text-gray-600">
                Customer feedback and reviews
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold">Team Members</span>
              </div>
              <p className="text-sm text-gray-600">
                Staff profiles and team information
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BuildingOfficeIcon className="h-5 w-5 text-red-600" />
                <span className="font-semibold">Partners</span>
              </div>
              <p className="text-sm text-gray-600">
                Technology and industry partners
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Content Types - Competencies & Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CubeIcon className="h-5 w-5" />
            New: Competencies & Technologies
          </CardTitle>
          <CardDescription>
            Recently added content types for managing business competencies and
            technology stack
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-2 font-semibold">Competencies Structure</h4>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
              <div>
                <strong>Title:</strong> Main competency name (e.g.,
                &quot;Microsoft Cloud&quot;)
              </div>
              <div>
                <strong>Eyebrow:</strong> Category/subheading (e.g.,
                &quot;Cloud-Reise&quot;)
              </div>
              <div>
                <strong>Description:</strong> Detailed explanation of the
                competency
              </div>
              <div>
                <strong>Image:</strong> Visual representation (required)
              </div>
              <div>
                <strong>Order:</strong> Display sequence (lower numbers appear
                first)
              </div>
              <div>
                <strong>Active:</strong> Toggle to show/hide the competency
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Technologies Structure</h4>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
              <div>
                <strong>Title:</strong> Technology name (e.g., &quot;Microsoft
                Azure&quot;)
              </div>
              <div>
                <strong>Eyebrow:</strong> Category (e.g.,
                &quot;Cloud-Plattform&quot;)
              </div>
              <div>
                <strong>Description:</strong> Technology description and use
                cases
              </div>
              <div>
                <strong>Image:</strong> Technology logo or screenshot (required)
              </div>
              <div>
                <strong>Order:</strong> Display sequence (lower numbers appear
                first)
              </div>
              <div>
                <strong>Active:</strong> Toggle to show/hide the technology
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <h5 className="mb-2 font-semibold text-blue-900">💡 Pro Tips</h5>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>
                • Use high-quality images (recommended: 800x600px or larger)
              </li>
              <li>
                • Keep descriptions concise but informative (2-3 sentences)
              </li>
              <li>
                • Use consistent eyebrow categories for better organization
              </li>
              <li>
                • Set order numbers with gaps (10, 20, 30) for easy reordering
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* How to Add Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            How to Add Content
          </CardTitle>
          <CardDescription>
            Step-by-step guide to adding new content in Sanity Studio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                1
              </div>
              <div>
                <h4 className="font-semibold">Access Sanity Studio</h4>
                <p className="text-sm text-gray-600">
                  Navigate to{' '}
                  <code className="rounded bg-gray-100 px-1">/studio</code> in
                  your browser
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                2
              </div>
              <div>
                <h4 className="font-semibold">Select Content Type</h4>
                <p className="text-sm text-gray-600">
                  Choose the appropriate document type from the left sidebar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                3
              </div>
              <div>
                <h4 className="font-semibold">Fill Required Fields</h4>
                <p className="text-sm text-gray-600">
                  Complete all required fields marked with validation rules
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                4
              </div>
              <div>
                <h4 className="font-semibold">Upload Images</h4>
                <p className="text-sm text-gray-600">
                  Use the image field to upload and configure images with alt
                  text
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                5
              </div>
              <div>
                <h4 className="font-semibold">Publish & Order</h4>
                <p className="text-sm text-gray-600">
                  Set the order number and ensure the item is marked as active
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Implementation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CodeBracketIcon className="h-5 w-5" />
            Technical Implementation
          </CardTitle>
          <CardDescription>
            How the CMS integration works behind the scenes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold">Architecture Overview</h4>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
              <div>
                <strong>Frontend:</strong> Next.js 15 with App Router
              </div>
              <div>
                <strong>CMS:</strong> Sanity v3 with GROQ queries
              </div>
              <div>
                <strong>Styling:</strong> Tailwind CSS with custom components
              </div>
              <div>
                <strong>Images:</strong> Sanity Image URL builder for
                optimization
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Data Flow</h4>
            <div className="space-y-2 text-sm">
              <div>
                1. <strong>Sanity Studio:</strong> Content editors add/edit
                content
              </div>
              <div>
                2. <strong>GROQ Queries:</strong> Fetch structured data from
                Sanity
              </div>
              <div>
                3. <strong>TypeScript Types:</strong> Ensure type safety across
                the application
              </div>
              <div>
                4. <strong>React Components:</strong> Render content with
                consistent styling
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Key Files</h4>
            <div className="space-y-1 rounded-lg bg-gray-50 p-4 text-sm">
              <div>
                <code>src/sanity/schemaTypes/</code> - Content structure
                definitions
              </div>
              <div>
                <code>src/sanity/queries.ts</code> - Data fetching queries
              </div>
              <div>
                <code>src/sanity/types/</code> - TypeScript type definitions
              </div>
              <div>
                <code>src/components/cms-bento-grid.tsx</code> - Dynamic content
                rendering
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AcademicCapIcon className="h-5 w-5" />
            Best Practices & Guidelines
          </CardTitle>
          <CardDescription>
            Recommendations for maintaining content quality and consistency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Content Guidelines</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Keep titles concise and descriptive</li>
                <li>
                  • Use consistent terminology across similar content types
                </li>
                <li>
                  • Ensure all images have meaningful alt text for accessibility
                </li>
                <li>• Review content before publishing to maintain quality</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Image Guidelines</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Use high-resolution images (minimum 800x600px)</li>
                <li>• Optimize file sizes for web performance</li>
                <li>• Maintain consistent aspect ratios when possible</li>
                <li>• Use descriptive file names for better organization</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Organization Tips</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Use order numbers with gaps for easy reordering</li>
                <li>
                  • Group related content with consistent eyebrow categories
                </li>
                <li>• Regularly review and update inactive content</li>
                <li>• Test content changes on staging before production</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CogIcon className="h-5 w-5" />
            Troubleshooting & Support
          </CardTitle>
          <CardDescription>
            Common issues and how to resolve them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Common Issues</h4>
              <div className="space-y-3">
                <div className="rounded-lg bg-yellow-50 p-3">
                  <h5 className="font-semibold text-yellow-800">
                    Content Not Appearing
                  </h5>
                  <p className="text-sm text-yellow-700">
                    Check if the item is marked as &quot;Active&quot; and has a
                    valid order number
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-3">
                  <h5 className="font-semibold text-yellow-800">
                    Images Not Loading
                  </h5>
                  <p className="text-sm text-yellow-700">
                    Ensure images are properly uploaded and have alt text
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-3">
                  <h5 className="font-semibold text-yellow-800">
                    Layout Issues
                  </h5>
                  <p className="text-sm text-yellow-700">
                    Verify that required fields are completed and validation
                    passes
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Getting Help</h4>
              <div className="flex gap-4">
                <Button>
                  <a
                    href="https://www.sanity.io/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Sanity Documentation
                  </a>
                </Button>
                <Button>
                  <a
                    href="/contact"
                    target="_blank"
                    className="flex items-center"
                  >
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
