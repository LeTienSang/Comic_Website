import React, { useEffect, useState } from 'react';
import ComicCard from '../common/ComicCard';
import { getLastestUpdatedComic } from '../../services/comic';
import { useNavigate } from 'react-router-dom';

const RecentlyUpdates = () => {
  const navigate = useNavigate();
  const [recentComics, setRecentComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestComics = async () => {
      try {
        setLoading(true);
        const data = await getLastestUpdatedComic();
        setRecentComics(data);
        console.log('Fetched recent comics:', data);
      } catch (err) {
        console.error('Error fetching latest comics:', err);
        setError('Failed to load recent comics.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestComics();
  }, []);

  const handleComicClick = (comic) => {
    console.log('Navigating to comic:', comic);
    navigate(`/comic/${comic.id}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div>
      <h2 className="text-sm font-bold rounded mb-6 text-yellow-300 bg-purple-950 px-4 py-2">
        Recently Updates
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {recentComics.map((comic) => (
          <ComicCard
            key={comic.id}
            imageUrl={comic.cover_image ? comic.cover_image : '/banners/trending.jpg'}
            title={comic.title}
            author={comic.author || 'Unknown'}
            genres={comic.genre ? comic.genre.split(',') : []}
            rating={comic.read_count ?? 0}
            description={comic.description || ''}
            comicId= {comic.id}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyUpdates;
