import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

function NewsBoard({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true); // Start loading
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=APIKey`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        setError("Failed to fetch news articles.");
        setArticles([]);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div>
      <br />
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p>{error}</p>} {/* Show error message */}
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        !loading && !error && <p>No news available for this category.</p>
      )}
    </div>
  );
}

export default NewsBoard;
