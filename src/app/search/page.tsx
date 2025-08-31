import { Container } from '@/components/container'
import { Heading } from '@/components/text'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Suspense } from 'react'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

function SearchResults({ query }: { query: string }) {
  // This is a placeholder implementation
  // In a real app, you would search through your content here
  const mockResults = [
    {
      title: 'IT-Beratung',
      description: 'Professionelle IT-Beratung für Unternehmen',
      url: '/services',
      category: 'Dienstleistungen',
    },
    {
      title: 'Cloud-Lösungen',
      description: 'Moderne Cloud-Infrastruktur und -Services',
      url: '/services/category/cloud',
      category: 'Dienstleistungen',
    },
    {
      title: 'Über uns',
      description: 'Lernen Sie das Maxsoft Team kennen',
      url: '/company',
      category: 'Unternehmen',
    },
  ]

  const filteredResults = mockResults.filter(
    (result) =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase()),
  )

  if (filteredResults.length === 0) {
    return (
      <div className="py-12 text-center">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Keine Ergebnisse gefunden
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Versuchen Sie es mit anderen Suchbegriffen.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        {filteredResults.length} Ergebnis
        {filteredResults.length !== 1 ? 'se' : ''} für &ldquo;{query}&rdquo;
      </p>
      <div className="space-y-4">
        {filteredResults.map((result, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  <a
                    href={result.url}
                    className="transition-colors hover:text-blue-600"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {result.description}
                </p>
                <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {result.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Heading as="h1" className="mb-4 text-4xl font-bold text-gray-900">
            Suchergebnisse
          </Heading>
          {query && (
            <p className="text-lg text-gray-600">
              Suche nach:{' '}
              <span className="font-medium text-gray-900">
                &ldquo;{query}&rdquo;
              </span>
            </p>
          )}
        </div>

        {query ? (
          <Suspense
            fallback={
              <div className="py-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="mt-2 text-sm text-gray-600">Suche läuft...</p>
              </div>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="py-12 text-center">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Geben Sie einen Suchbegriff ein
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Verwenden Sie die Suchleiste in der Navigation, um nach Inhalten
              zu suchen.
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
