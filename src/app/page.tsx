import { TweetConverter } from '../components/tweet-converter';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Text to Tweet Converter
        </h1>
        <TweetConverter />
      </div>
    </main>
  );
}
