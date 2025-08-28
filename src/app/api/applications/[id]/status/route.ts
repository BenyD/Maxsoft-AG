import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 },
      )
    }

    const {
      status,
      priority,
      rating,
      internalNotes,
      interviewSchedule,
      updated_at,
    } = body

    const supabase = createAdminClient()

    // Prepare update data
    const updateData: {
      updated_at: string
      status?: string
      priority?: string
      rating?: number
      internal_notes?: string
      interview_schedule?: {
        date: string
        time: string
        scheduled_at: string
      }
    } = {
      updated_at: updated_at || new Date().toISOString(),
    }

    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (rating !== undefined) updateData.rating = rating
    if (internalNotes !== undefined) updateData.internal_notes = internalNotes
    if (interviewSchedule !== undefined)
      updateData.interview_schedule = interviewSchedule

    // Update application
    const { data: application, error } = await supabase
      .from('job_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 400 },
        )
      }

      console.error('Error updating application:', error)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      application,
      message: 'Application updated successfully',
    })
  } catch (error) {
    console.error('Application update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
