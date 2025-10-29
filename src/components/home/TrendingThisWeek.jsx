import TrendingThisWeekCard from "./TrendingThisWeekCard";

const TrendingThisWeek = () => {
  const trending = [
    {
      id: 1,
      image: "/banners/trending.jpg",
      status: "Ongoing",
      title: "Comic Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      genre: ["Academy", "Action"],
      rating: 9.3,
      type: "Manga",
    },
    {
      id: 2,
      image: "/banners/trending.jpg",
      status: "Ongoing",
      title: "Comic Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      genre: ["Action", "Adventure"],
      rating: 9.8,
      type: "Manhua",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-purple-950">Trending This Week</h2>
      {trending.map((item) => (
        <TrendingThisWeekCard
          key={item.id}
          id={item.id}
          image={item.image}
          status={item.status}
          title={item.title}
          description={item.description}
          genre={item.genre}
          rating={item.rating}
          type={item.type}
        />
      ))}
    </div>
  );
}

export default TrendingThisWeek;