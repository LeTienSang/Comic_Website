import React, { useState } from 'react';

const MostPopular = () => {
  const [activeTab, setActiveTab] = useState('Monthly');
  
  const popularData = {
    Monthly: [
      { id: 1, title: 'Solo Leveling', chapter: 'Chapter 179', views: '12.5M' },
      { id: 2, title: 'Tower of God', chapter: 'Chapter 588', views: '8.3M' },
      { id: 3, title: 'One Piece', chapter: 'Chapter 1095', views: '15.2M' },
      { id: 4, title: 'Attack on Titan', chapter: 'Chapter 139', views: '9.7M' },
      { id: 5, title: 'Demon Slayer', chapter: 'Chapter 205', views: '11.1M' },
      { id: 6, title: 'Jujutsu Kaisen', chapter: 'Chapter 237', views: '7.8M' },
      { id: 7, title: 'Chainsaw Man', chapter: 'Chapter 147', views: '6.9M' },
      { id: 8, title: 'My Hero Academia', chapter: 'Chapter 405', views: '8.5M' },
    ],
    Yearly: [
      { id: 1, title: 'One Piece', chapter: 'Chapter 1095', views: '180M' },
      { id: 2, title: 'Solo Leveling', chapter: 'Chapter 179', views: '150M' },
      { id: 3, title: 'Attack on Titan', chapter: 'Chapter 139', views: '120M' },
      { id: 4, title: 'Demon Slayer', chapter: 'Chapter 205', views: '135M' },
      { id: 5, title: 'Tower of God', chapter: 'Chapter 588', views: '95M' },
      { id: 6, title: 'Jujutsu Kaisen', chapter: 'Chapter 237', views: '89M' },
      { id: 7, title: 'My Hero Academia', chapter: 'Chapter 405', views: '98M' },
      { id: 8, title: 'Chainsaw Man', chapter: 'Chapter 147', views: '78M' },
    ],
    Alltime: [
      { id: 1, title: 'One Piece', chapter: 'Chapter 1095', views: '2.5B' },
      { id: 2, title: 'Naruto', chapter: 'Chapter 700', views: '1.8B' },
      { id: 3, title: 'Dragon Ball', chapter: 'Chapter 519', views: '2.1B' },
      { id: 4, title: 'Attack on Titan', chapter: 'Chapter 139', views: '900M' },
      { id: 5, title: 'Demon Slayer', chapter: 'Chapter 205', views: '750M' },
      { id: 6, title: 'Bleach', chapter: 'Chapter 686', views: '1.2B' },
      { id: 7, title: 'Death Note', chapter: 'Chapter 108', views: '680M' },
      { id: 8, title: 'Fullmetal Alchemist', chapter: 'Chapter 108', views: '590M' },
    ]
  };

  const tabs = ['Monthly', 'Yearly', 'Alltime'];

  const handleItemClick = (item) => {
    console.log('Clicked popular item:', item.title);
  };

  return (
    <div className="bg-white backdrop-blur-sm rounded p-6 border border-gray-200 sticky top-6">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Most Popular
      </h2>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab
              ? 'bg-purple-950 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Popular List */}
      <div className="space-y-3">
        {popularData[activeTab].map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:translate-x-1 group"
          >
            {/* Rank Number */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-300 text-purple-950' :
              index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-orange-500 text-white' :
                  'bg-gray-600 text-white'
              }`}>
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-800 font-medium text-sm truncate group-hover:text-gray-900 transition-colors">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs">
                {item.chapter}
              </p>
            </div>

            {/* Views */}
            <div className="flex-shrink-0 text-right">
              <p className="text-xs text-gray-700 font-medium">
                {item.views}
              </p>
              <p className="text-xs text-gray-500">
                views
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopular;