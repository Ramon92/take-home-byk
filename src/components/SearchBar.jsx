import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import './SearchBar.css';
import SearchResults from './SearchResults';
import useSearchResults from '../hooks/useSearchResults';

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSearchResults(searchTerm);

  return (
    <form
      className="search-form"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        data-testid="search-bar"
        className={`search-bar${isActive ? ' focus' : ''}`}
      >
        <input
          data-testid="search-input"
          id="search"
          name="search"
          className="search-bar__input"
          type="text"
          placeholder="Zoeken"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          value={searchTerm}
          autoComplete="off"
        />

        {searchTerm ? (
          <button
            data-testid="clear-button"
            className="clear-button"
            type="button"
            onClick={() => setSearchTerm('')}
          >
            <AiOutlineClose className="clear-button__icon" />
          </button>
        ) : null}
        <label htmlFor="search" aria-label="Zoeken">
          <AiOutlineSearch className="search-bar__icon" />
        </label>
      </div>
      {searchResults.length ? (
        <SearchResults searchTerm={searchTerm} results={searchResults} />
      ) : null}
    </form>
  );
};

export default SearchBar;
