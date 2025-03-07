import React, { useState, useEffect, useMemo } from 'react';

export default function HomeContent() {
  const [news, setNews] = useState([]);
  const facts = useMemo(() => [
    "BMW was founded in 1916 as a manufacturer of aircraft engines.",
    "The BMW logo represents a spinning propeller, reflecting the company's aviation heritage.",
    "BMW's first car, the BMW 3/15, was introduced in 1927.",
    "BMW’s flagship model, the 7 Series, was first introduced in 1977.",
    "BMW is one of the largest manufacturers of luxury vehicles in the world."
  ], []);
  const [randomFact, setRandomFact] = useState('');

  useEffect(() => {
    setNews([
      { id: 1, title: "BMW's Electric Future: What’s Next?", date: "March 6, 2025", description: "BMW is shifting focus to electric vehicles in the coming years. Here’s what you need to know." },
      { id: 2, title: "The New BMW M5: Performance Meets Luxury", date: "March 5, 2025", description: "The BMW M5 has been redesigned to offer an even more thrilling driving experience with its powerful engine." },
      { id: 3, title: "BMW iX: The Future of Sustainable Luxury", date: "March 4, 2025", description: "BMW’s new iX electric SUV promises to redefine luxury electric vehicles with cutting-edge technology." }
    ]);
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  }, [facts]);

  const handleNewFact = () => {
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  };

  return (
    <div className="home-content overflow-y-auto px-4 sm:px-6 py-6">
      <section className="news mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">BMW News</h2>
        <div className="space-y-4">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="news-item bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No news available at the moment.</p>
          )}
        </div>
      </section>

      <section className="bmw-facts">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interesting BMW Fact</h2>
        <div className="fact-item bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
          <p className="text-gray-700">{randomFact}</p>
        </div>
        <button 
          onClick={handleNewFact}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Show Another Fact
        </button>
      </section>
    </div>
  );
}
