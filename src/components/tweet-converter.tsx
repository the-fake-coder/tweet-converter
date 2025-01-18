'use client';

import { useState } from 'react';
import { RippleButton } from './ui/ripple-button';

export function TweetConverter() {
  const [inputText, setInputText] = useState('');
  const [tweet, setTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const convertToTweet = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert text');
      }

      setTweet(data.tweet);
    } catch (error) {
      console.error('Error converting to tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="input-text"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Your Text
        </label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full min-h-[100px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
          placeholder="Paste your text here..."
        />
      </div>

      <RippleButton
        onClick={convertToTweet}
        disabled={isLoading || !inputText.trim()}
        className={`w-full py-3 ${
          isLoading || !inputText.trim()
            ? 'border-blue-300 text-blue-300'
            : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
        }`}
        rippleColor="#60A5FA"
      >
        {isLoading ? 'Converting...' : 'Convert to Tweet'}
      </RippleButton>

      {tweet && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Generated Tweet
          </label>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 min-h-[60px]">
            {tweet}
          </div>
        </div>
      )}
    </div>
  );
} 