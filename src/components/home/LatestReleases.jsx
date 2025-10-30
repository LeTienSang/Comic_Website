import React, { useState, useEffect } from 'react';
import ComicCard from '../common/ComicCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getComics } from '../../services/comic'; // 🟢 dùng service gọi API

const LatestReleases = () => {
  const [comics, setComics] = useState([]);

  // 🟢 Fetch danh sách comic từ backend
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await getComics();
        console.log("Fetched comics:", res);
        setComics(res); // nếu API trả về mảng comic
      } catch (error) {
        console.error("Error fetching comics:", error.response?.data || error.message);
      }
    };
    fetchComics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-purple-950">
        Latest Releases
      </h2>

      <div className="relative overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 24 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 28 },
          }}
          className="!pb-8 !overflow-visible"
        >
          {comics.length > 0 ? (
            comics.map((comic) => (
              <SwiperSlide key={comic.id} className="!overflow-visible">
                <ComicCard
                  imageUrl={comic.cover_image || '/default-comic.jpg'}
                  title={comic.title}
                  chapter={comic.latest_chapter || 'N/A'}
                  timeAgo={comic.created_at ? new Date(comic.created_at).toLocaleDateString() : ''}
                  author={comic.author}
                  status={comic.status || 'Ongoing'}
                  genres={comic.genres || []}
                  rating={comic.rating || 'N/A'}
                  description={comic.description}
                  comicId={comic.id}
                />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No comics available</p>
          )}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-purple-950/80 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-300 hover:bg-yellow-300/90 hover:text-purple-950 transition-all duration-300 shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-purple-950/80 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-300 hover:bg-yellow-300/90 hover:text-purple-950 transition-all duration-300 shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LatestReleases;
