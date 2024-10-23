import React from 'react';
import { Music2, Users2, ArrowLeft } from 'lucide-react';
import type { ComparisonResult as ComparisonResultType, SpotifyUser } from '../types/spotify';

interface ComparisonResultProps {
  result: ComparisonResultType;
  user: SpotifyUser;
  onReset: () => void;
}

export function ComparisonResult({ result, user, onReset }: ComparisonResultProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Profile
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-500 p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Music Match Results</h2>
          <div className="text-6xl font-bold mt-4">
            {result.matchPercentage}%
          </div>
          <p className="text-green-100 mt-2">Match Score</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold">Common Artists</h3>
            </div>
            <ul className="space-y-3">
              {result.commonArtists.map((artist) => (
                <li key={artist.id} className="flex items-center gap-3">
                  {artist.image && (
                    <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{artist.name}</p>
                    <p className="text-sm text-gray-500">
                      {artist.genres.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold">Common Tracks</h3>
            </div>
            <ul className="space-y-3">
              {result.commonTracks.map((track) => (
                <li key={track.id} className="flex items-center gap-3">
                  {track.image && (
                    <img src={track.image} alt={track.name} className="w-10 h-10 rounded" />
                  )}
                  <div>
                    <p className="font-medium">{track.name}</p>
                    <p className="text-sm text-gray-500">{track.artist}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}