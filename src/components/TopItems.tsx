import React from 'react';
import { Music2, Users2, Share2 } from 'lucide-react';
import type { UserTopItems } from '../types/spotify';

interface TopItemsProps {
  items: UserTopItems;
  onShare: () => void;
}

export function TopItems({ items, onShare }: TopItemsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Top Music</h2>
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          Share Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Music2 className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold">Top Tracks</h3>
          </div>
          <ul className="space-y-3">
            {items.tracks.slice(0, 5).map((track) => (
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Users2 className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold">Top Artists</h3>
          </div>
          <ul className="space-y-3">
            {items.artists.slice(0, 5).map((artist) => (
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
      </div>
    </div>
  );
}