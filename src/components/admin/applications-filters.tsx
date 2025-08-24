'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface ApplicationsFiltersProps {
  currentStatus: string
  currentSearch: string
}

export function ApplicationsFilters({ currentStatus, currentSearch }: ApplicationsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentSearch)
  const [status, setStatus] = useState(currentStatus)

  useEffect(() => {
    setSearch(currentSearch)
    setStatus(currentStatus)
  }, [currentSearch, currentStatus])

  const updateFilters = (newSearch: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (newSearch) {
      params.set('search', newSearch)
    } else {
      params.delete('search')
    }
    
    if (newStatus && newStatus !== 'all') {
      params.set('status', newStatus)
    } else {
      params.delete('status')
    }
    
    params.delete('page') // Reset to first page when filters change
    router.push(`/admin/applications?${params.toString()}`)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters(search, status)
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    updateFilters(search, newStatus)
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('all')
    router.push('/admin/applications')
  }

  const hasActiveFilters = currentSearch || (currentStatus && currentStatus !== 'all')

  return (
    <div className="space-y-4">
      {/* Search and Status Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10 pr-12"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <Select
            id="status-filter"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Active Filters:</span>
            {currentSearch && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: &quot;{currentSearch}&quot;
                <button
                  onClick={() => {
                    setSearch('')
                    updateFilters('', status)
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 transition-colors duration-200"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentStatus && currentStatus !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                <button
                  onClick={() => {
                    setStatus('all')
                    updateFilters(search, 'all')
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 transition-colors duration-200"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}
