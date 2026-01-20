import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          message: 'I\'m currently in demo mode. To enable full AI functionality, please add your OpenAI API key to the environment variables.' 
        },
        { status: 200 }
      )
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for ClaimsManager, a healthcare claims management system. You help users with questions about claims processing, billing, reports, and general healthcare administration tasks. Be concise, professional, and helpful.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.'

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { message: 'I apologize, but I encountered an error processing your request. Please try again.' },
      { status: 500 }
    )
  }
}
