import React, { useState, useEffect } from 'react';
import { SpotifyLogin } from './components/SpotifyLogin';
import { ComparisonResult } from './components/ComparisonResult';
import { UserProfile } from './components/UserProfile';
import { TopItems } from './components/TopItems';
import { spotifyApi, getUserTopItems, compareWithFriend } from './utils/spotify';
import type { SpotifyUser, ComparisonResult as ComparisonResultType, UserTopItems } from './types/spotify';

function App() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [topItems, setTopItems] = useState<UserTopItems | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (await spotifyApi.authenticate()) {
          handleLogin();
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const profile = await spotifyApi.currentUser.profile();
      const userTopItems = await getUserTopItems();
      
      setUser({
        id: profile.id,
        display_name: profile.display_name,
        images: profile.images
      });
      setTopItems(userTopItems);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to login with Spotify. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async (friendData: UserTopItems) => {
    try {
      setLoading(true);
      setError(null);
      const result = await compareWithFriend(friendData);
      setComparisonResult(result);
    } catch (err) {
      setError('Failed to compare music tastes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setComparisonResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {!user ? (
          <SpotifyLogin onLogin={() => spotifyApi.authenticate()} loading={loading} />
        ) : (
          <>
            <UserProfile user={user} />
            
            {topItems && !comparisonResult && (
              <TopItems 
                items={topItems} 
                onShare={() => {
                  // Share functionality to be implemented
                  console.log('Share functionality to be implemented');
                }}
              />
            )}

            {comparisonResult && (
              <ComparisonResult
                result={comparisonResult}
                user={user}
                onReset={handleReset}
              />
            )}
          </>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md border border-red-300">
            {error}
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-700">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
