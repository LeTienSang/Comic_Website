import React from 'react';
import { Link } from 'react-router-dom';

const ComicCard = ({
  imageUrl,
  title,
  chapter,
  timeAgo = null,
  comicId,
  // Props cho tooltip
  author = '',
  status = '',
  genres = [],
  rating = '',
  description = ''
}) => {
  return (
    <div className="relative group">
      <Link
        to= {`/comic/${comicId}`}
        className="block relative rounded-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] w-full aspect-[2/3] min-h-[180px] sm:min-h-[220px] md:min-h-[260px] bg-white border border-gray-200"
      >
        <div className="relative w-full h-full rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10">
            {timeAgo && (
              <span className="px-2 py-0.5 sm:px-2 sm:py-1 bg-purple-950 text-yellow-300 text-[9px] sm:text-xs font-bold rounded uppercase tracking-wide shadow-lg backdrop-blur-sm border border-white/20">
                {timeAgo}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10 bg-gradient-to-t from-black/90 to-transparent">
            <h3 className="text-white font-bold text-xs sm:text-sm leading-tight mb-1 line-clamp-2 drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-100 text-[10px] sm:text-xs font-medium drop-shadow-md">
                {chapter}
              </p>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </Link>

      {/* Floating Tooltip - Compact version */}
      <div className="absolute left-full top-0 ml-3 w-64 bg-white border border-gray-200 rounded-lg shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] pointer-events-none
                      xl:left-full xl:top-0 xl:ml-3 xl:w-64
                      lg:left-full lg:top-0 lg:ml-2 lg:w-56
                      md:left-0 md:top-full md:mt-2 md:ml-0 md:w-full
                      sm:left-0 sm:top-full sm:mt-2 sm:ml-0 sm:w-full">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-bold text-base text-purple-950 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Author & Status in one line */}
          {(author || status) && (
            <div className="flex items-center justify-between text-xs">
              {author && <span className="text-yellow-600 font-medium truncate">{author}</span>}
              {status && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {status}
                </span>
              )}
            </div>
          )}

          {/* Genres - compact */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
              {genres.length > 3 && (
                <span className="text-gray-400 text-xs">+{genres.length - 3}</span>
              )}
            </div>
          )}

          {/* Chapter & Rating */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-600">Ch. {chapter}</span>
            {rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-xs font-bold text-gray-800">{rating}</span>
              </div>
            )}
          </div>

          {/* Description - shortened */}
          {description && (
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 pt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicCard;