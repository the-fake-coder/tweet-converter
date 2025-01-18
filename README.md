# Tweet Converter

A modern web application that converts any text into tweet-friendly format using OpenAI's GPT-4. The app generates tweets that are casual, conversational, and witty while maintaining intelligence and relatability.

## Features

- Convert any text into tweet format
- Clean, modern UI with dark mode support
- Secure API handling with server-side OpenAI integration
- Responsive design using Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- Server-side API routes

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd tweet-converter
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Deployment

This application can be easily deployed to Vercel or any other Next.js-compatible hosting platform. Make sure to set up the environment variables in your hosting platform's settings.

## License

MIT
