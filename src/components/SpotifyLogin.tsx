import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyLoginProps {
  onLogin: () => void;
  loading: boolean;
}

export function SpotifyLogin({ onLogin, loading }: SpotifyLoginProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <Music className="w-20 h-20 text-green-500" />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Music Taste Match</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Connect with Spotify to discover your music taste and compare it with friends
        </p>
      </div>
      <button
        onClick={onLogin}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-4 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
      >
        <Music className="w-6 h-6" />
        Connect with Spotify
      </button>
    </div>
  );}