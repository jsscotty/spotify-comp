export interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
}

export interface TopTrack {
  id: string;
  name: string;
  artist: string;
  image?: string;
}

export interface TopArtist {
  id: string;
  name: string;
  image?: string;
  genres: string[];
}

export interface UserTopItems {
  tracks: TopTrack[];
  artists: TopArtist[];
}

export interface ComparisonResult {
  commonArtists: TopArtist[];
  commonTracks: TopTrack[];
  matchPercentage: number;
  myTopItems: UserTopItems;
}</content>