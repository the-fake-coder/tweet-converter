import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const TWEET_PROMPT = `You are an expert tweet writer, composing tweets to explain concepts in a casual, conversational tone that feels intelligent and relatable yet witty and playful. Avoid technical jargon unless it's necessary, and make sure to explain terms in plain English. Focus on comparisons and metaphors that make abstract ideas concrete, using simple language to connect with your audience. Write as if you're breaking it down for a curious friend. Don't use emojis.`;

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: TWEET_PROMPT },
        { role: "user", content: `Convert this text into a tweet: ${text}` }
      ],
      max_tokens: 280,
    });

    return NextResponse.json({
      tweet: response.choices[0]?.message?.content || ''
    });
  } catch (error) {
    console.error('Error converting to tweet:', error);
    return NextResponse.json(
      { error: 'Failed to convert text to tweet' },
      { status: 500 }
    );
  }
} 