import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SearchBar.module.css";
import { useSearch } from "@api/search/search.api";
import SearchItem from "../SearchItem/SearchItem";
import { useDebounce } from "@hooks/debounce/useDebounce";

function SearchBar({ setSearchProducts }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const searchBarRef = useRef();
  const { mutateAsync: search } = useSearch();
  const navigate = useNavigate();
  const debounceTimeout = 500;
  const searchSize = 6;

  const debouncedSearch = useDebounce((query) => {
    if (query) {
      search({ query, size: searchSize }).then((res) => {
        setResults(res);
      });
    } else {
      setResults([]);
    }
  }, debounceTimeout);

  const getSearchResults = (query, size) => {
    if (query) {
      search({ query, size }).then((res) => {
        setResults(res);
      });
    } else {
      setResults([]);
    }
  };

  function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  useEffect(() => {
    getSearchResults(debouncedQuery, searchSize);
  }, [debouncedQuery, search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClick() {
    inputRef.current.focus();
  }

  async function handleSearch() {
    const res = await search({
      query: debouncedQuery,
      size: 20,
    });
    setSearchProducts(res);
    navigate("/search");
    setQuery("");
    setDebouncedQuery("");
  }

  function handleItemClick() {
    setResults([]);
    setQuery("");
  }

  return (
    <div>
      <div
        className={styles.searchBar}
        onClick={handleClick}
        id="searchBar"
        ref={searchBarRef}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e)}
          className={styles.input}
          placeholder="Search for essentials, groceries, and more..."
          id="input"
        ></input>
        <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
        <div className={styles.results}>
          {results?.map((result) => (
            <SearchItem
              key={result.id}
              {...result}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
