import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import type { JobApplicationUpdate } from '@/lib/database.types'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    const {
      status,
      priority,
      rating,
      assignedTo,
      internalNotes,
      interviewSchedule,
      communications
    } = body

    const supabase = createAdminClient()

    // Prepare update data
    const updateData: JobApplicationUpdate = {
      updated_at: new Date().toISOString()
    }

    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (rating !== undefined) updateData.rating = rating
    if (assignedTo !== undefined) updateData.assigned_to = assignedTo
    if (internalNotes !== undefined) updateData.internal_notes = internalNotes
    if (interviewSchedule !== undefined) updateData.interview_schedule = interviewSchedule
    if (communications !== undefined) updateData.communications = communications

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
          { status: 400 }
        )
      }
      
      console.error('Error updating application:', error)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      application,
      message: 'Application updated successfully'
    })

  } catch (error) {
    console.error('Application update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
