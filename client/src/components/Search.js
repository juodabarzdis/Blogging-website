import React, { useState } from "react";

const Search = (props) => {
  const setKeyword = props.setKeyword;
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(search);
  };

  return (
    <div className="filter">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          //   onBlur={(e) => {
          //     if (props.keyword === "") {
          //       setRefresh(!refresh);
          //     }
          //   }}
        />
        <button className="search-button">Search</button>
      </form>
    </div>
  );
};

export default Search;
