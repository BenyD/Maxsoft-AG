import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const jobId = searchParams.get('jobId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const supabase = createAdminClient()

    // Build query
    let query = supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (jobId) {
      query = query.eq('job_listing_id', jobId)
    }

    if (search) {
      query = query.or(`candidate_name.ilike.%${search}%,candidate_email.ilike.%${search}%`)
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('job_applications')
      .select('*', { count: 'exact', head: true })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: applications, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      applications: applications || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Applications fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
