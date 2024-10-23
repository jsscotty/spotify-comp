import React from 'react';
import { User } from 'lucide-react';
import type { SpotifyUser } from '../types/spotify';

interface UserProfileProps {
  user: SpotifyUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      {user.images[0] ? (
        <img
          src={user.images[0].url}
          alt={user.display_name}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <User className="w-12 h-12 text-gray-400" />
      )}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {user.display_name}
        </h2>
        <p className="text-sm text-gray-500">Spotify User</p>
      </div>
    </div>
  );
}