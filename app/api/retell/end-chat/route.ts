import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { chat_id } = await req.json()
    const apiKey = process.env.RETELL_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Retell API key not configured' },
        { status: 500 }
      )
    }

    if (!chat_id) {
      return NextResponse.json(
        { error: 'chat_id is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`https://api.retellai.com/end-chat/${chat_id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Retell API error:', error)
      return NextResponse.json(
        { error: 'Failed to end chat' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error ending chat:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
