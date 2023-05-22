import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, searchTerm }) => {
  const transformMatch = (reQuery) => (part, index) =>
    part.match(reQuery) ? (
      <span
        key={part + index}
        data-testid="search-result-highlight"
        className="search-result__highlight"
      >
        {part}
      </span>
    ) : (
      part
    );

  const highlightMatch = (text, query) => {
    const reQuery = new RegExp(`(${query})`, 'gi');
    return text.split(reQuery).map(transformMatch(reQuery));
  };

  return (
    <ul className="search-results" data-testid="search-results">
      {results.map((result, index) => (
        <li
          data-testid="search-result"
          className="search-result"
          key={result.searchterm + index}
        >
          {highlightMatch(result.searchterm, searchTerm)}{' '}
          <span className="search-result__nr">({result.nrResults})</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
