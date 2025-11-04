import PopularToday from "../components/home/PopularToday";
import TrendingThisWeek from "../components/home/TrendingThisWeek";
import LatestReleases from "../components/home/LatestReleases";
import RecentlyUpdates from "../components/home/RecentlyUpdates";
import MostPopular from "../components/home/MostPopular";


export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 bg-gray-100 pb-4 pt-8">
      {/* Top Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div id="popular-today">
          <PopularToday />
        </div>
        <div id="trending-this-week">
          <TrendingThisWeek />
        </div>
      </div> */}
      <div className="grid grid-cols-1 gap-6">
        <div id="popular-today">
          <PopularToday />
        </div>
      </div>

      {/* Latest Releases */}
      <div id="latest-releases" className="mt-4">
        <LatestReleases />
      </div>

      {/* Recently Updates & Most Popular Section */}
      <div className="grid grid-cols-1 gap-8">
        {/* Recently Updates - 2/3 width */}
        <div id="recently-updates" className="xl:col-span-2">
          <RecentlyUpdates />
        </div>

        {/* Most Popular - 1/3 width */}
        {/* <div id="most-popular" className="xl:col-span-1">
          <MostPopular />
        </div> */}
      </div>
    </div>
  );
}
