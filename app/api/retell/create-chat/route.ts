import { NextResponse } from 'next/server'

const RETELL_API_KEY = process.env.RETELL_API_KEY
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID

export async function POST() {
  try {
    // Validate API key and Agent ID
    if (!RETELL_API_KEY) {
      console.error('[CHAT] RETELL_API_KEY not configured')
      return NextResponse.json(
        { error: 'Chat service not configured - API key missing' },
        { status: 500 }
      )
    }

    if (!RETELL_AGENT_ID) {
      console.error('[CHAT] RETELL_AGENT_ID not configured')
      return NextResponse.json(
        { error: 'Chat service not configured - Agent ID missing' },
        { status: 500 }
      )
    }

    // Call Retell API to create a chat session
    console.log(`[RETELL] Creating chat session with agent: ${RETELL_AGENT_ID}`)
    
    const retellResponse = await fetch('https://api.retellai.com/create-chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: RETELL_AGENT_ID
      })
    })

    console.log(`[RETELL] Response status: ${retellResponse.status}`)

    if (!retellResponse.ok) {
      const errorText = await retellResponse.text()
      console.error(`[RETELL] API error: ${retellResponse.status} ${retellResponse.statusText}`)
      console.error(`[RETELL] Error body:`, errorText)
      return NextResponse.json(
        { error: 'Failed to initialize chat. Please try again later.' },
        { status: 500 }
      )
    }

    const data = await retellResponse.json()
    console.log(`[RETELL] Chat session created successfully with ID: ${data.chat_id}`)

    // Return the chat ID and session info
    return NextResponse.json({
      chatId: data.chat_id,
      agentId: data.agent_id,
      chatStatus: data.chat_status
    })
  } catch (error: any) {
    console.error('[CHAT] Unexpected error in create-chat:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
