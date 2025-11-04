import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { getTopComic } from "../../services/comic";
import Container from "../layout/Container";

const PopularToday = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchTopComics = async () => {
      try {
        const data = await getTopComic();
        setComics(data);
      } catch (error) {
        console.error("Failed to load top comics:", error);
      }
    };
    fetchTopComics();
  }, []);

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4 text-purple-950">Popular Today</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {comics.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to={`/comic/${item.id}`}
              className="relative flex text-white rounded-lg overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-[1.01]"
            >
              {/* Ảnh nền mờ */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    item.cover_image
                      ? `${item.cover_image}`
                      : "/banners/trending.jpg"
                  })`,
                  filter: "blur(16px)",
                  transform: "scale(1.1)",
                }}
              ></div>

              {/* Lớp phủ tối */}
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

              {/* Ảnh chính */}
              <img
                src={
                  item.cover_image
                    ? `${item.cover_image}`
                    : "/banners/trending.jpg"
                }
                alt={item.title}
                className="relative z-10 object-cover h-50 w-auto flex-shrink-0 overflow-hidden rounded-lg items-center my-auto ml-4"
              />

              {/* Nội dung */}
              <div className="relative z-10 p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold truncate line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-yellow-300 text-sm">
                    {item.genre || "Unknown genre"}
                  </p>
                  <p className="text-sm mt-2 font-semibold">Description</p>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {item.description || "No description available."}
                  </p>
                  <p className="text-sm mt-2">
                    <b>Author:</b> {item.author || "N/A"}
                  </p>
                  <p className="text-sm">
                    <b>Read Count:</b> {item.read_count}
                  </p>
                </div>

                {/* Rating hoặc Read count */}
                <div className="ml-auto bg-yellow-300 text-purple-950 font-bold px-2 py-1 rounded-full relative z-10">
                  {item.read_count} reads
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default PopularToday;
