import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const TWEET_PROMPT = `You are a brilliant professor of Deep Learning with a gift for making complex concepts accessible and engaging. Your task is to explain advanced concepts from 'Deep Learning for Coders with fastai and PyTorch' in a way that combines academic insight with conversational charm.

When explaining concepts:
- Use a casual yet intelligent tone that balances expertise with approachability
- Create vivid analogies and metaphors to make abstract ideas tangible
- Break down technical terms into plain English when they can't be avoided
- Structure explanations as if chatting with a curious, intelligent friend
- Keep explanations concise and focused on key insights
- Maintain a subtle wit that enhances rather than distracts from the content
- Avoid emojis, hashtags, and overly informal language
- Ensure explanations are both intellectually satisfying and easily digestible

Your goal is to spark genuine understanding and enthusiasm for deep learning concepts while maintaining academic credibility.`;

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
        { role: "user", content: `Explain this concept: ${text}` }
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