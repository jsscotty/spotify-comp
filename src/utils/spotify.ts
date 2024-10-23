import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import type { TopTrack, TopArtist, UserTopItems } from '../types/spotify';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173';
const SCOPES = [
  'user-top-read',
  'user-read-private',
  'user-read-email'
];

if (!CLIENT_ID) {
  throw new Error('Missing Spotify Client ID in environment variables');
}

export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);

export async function getUserTopItems(): Promise<UserTopItems> {
  try {
    const [tracksResponse, artistsResponse] = await Promise.all([
      spotifyApi.currentUser.topItems('tracks', { limit: 50, time_range: 'medium_term' }),
      spotifyApi.currentUser.topItems('artists', { limit: 50, time_range: 'medium_term' })
    ]);

    const tracks: TopTrack[] = tracksResponse.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      image: track.album.images[0]?.url
    }));

    const artists: TopArtist[] = artistsResponse.items.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url,
      genres: artist.genres || []
    }));

    return { tracks, artists };
  } catch (error) {
    console.error('Error fetching top items:', error);
    throw new Error('Failed to fetch top items from Spotify');
  }
}

export async function compareWithFriend(friendData: UserTopItems) {
  const myData = await getUserTopItems();

  const commonTracks = myData.tracks.filter(track1 =>
    friendData.tracks.some(track2 => track1.id === track2.id)
  );

  const commonArtists = myData.artists.filter(artist1 =>
    friendData.artists.some(artist2 => artist1.id === artist2.id)
  );

  const totalItems = myData.tracks.length + myData.artists.length;
  const commonItems = commonTracks.length + commonArtists.length;
  const matchPercentage = Math.round((commonItems / totalItems) * 100);

  return {
    commonArtists,
    commonTracks,
    matchPercentage,
    myTopItems: myData
  };
}