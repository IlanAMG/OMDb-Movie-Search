import React from "react";
import { Result } from './index'

export const Results = ({ movies, favorites, isSearching, active, toggleFavorite }) => {
  const results = active === 'search' ? movies : favorites

  if (active === "favorites"  && favorites.length <= 0) {
    return <p>No Favorites in the list :(</p>;
  }
  if (active === 'search' && !isSearching) {
    return <p>No results :(</p>;
  }
  return results.map(result => {
    return <Result toggleFavorite={toggleFavorite} result={result}/>;
  });
};