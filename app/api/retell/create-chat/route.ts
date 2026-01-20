import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const apiKey = process.env.RETELL_API_KEY
    const agentId = process.env.RETELL_AGENT_ID

    if (!apiKey || !agentId) {
      return NextResponse.json(
        { error: 'Retell API key or Agent ID not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.retellai.com/create-chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ agent_id: agentId })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Retell API error:', error)
      return NextResponse.json(
        { error: 'Failed to create chat session' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ chat_id: data.chat_id })
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
