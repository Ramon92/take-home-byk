import { useEffect, useState } from 'react';
import { fetch } from 'whatwg-fetch';

function useSearchResults(searchTerm) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchTerms = async () => {
      const response = await fetch(`/search?q=${searchTerm}`);
      const data = await response.json();
      return await data.suggestions;
    };

    const filterResults = (suggestion) =>
      suggestion.searchterm.toLowerCase().includes(searchTerm);

    if (searchTerm.length >= 2) {
      fetchSearchTerms()
        .then((suggestions) => suggestions.filter(filterResults))
        .then((results) => setSearchResults(results));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return searchResults;
}

export default useSearchResults;
