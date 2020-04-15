import React from "react";

export const SearchForm = ({ query, onTextChange }) => {
  return (
    <form className="search" onSubmit={e => console.log(`searching query`)}>
      <div>
        <input
          type="text"
          id="title"
          placeholder="Search movie title..."
          defaultValue=""
          value={query}
          onChange={e => onTextChange(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <p className="error"></p>
    </form>
  );
};