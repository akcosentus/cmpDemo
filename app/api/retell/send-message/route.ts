import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { chat_id, content } = await req.json()
    const apiKey = process.env.RETELL_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Retell API key not configured' },
        { status: 500 }
      )
    }

    if (!chat_id || !content) {
      return NextResponse.json(
        { error: 'chat_id and content are required' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.retellai.com/create-chat-completion', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id,
        content
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Retell API error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ messages: data.messages })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
