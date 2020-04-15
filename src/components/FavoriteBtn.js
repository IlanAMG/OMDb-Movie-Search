import React from "react";
import { write, remove } from '../firebase/Database';

export const FavoriteBtn = ({ result, toggleFavorite}) => {

  return (
    <button 
      className={result.isFavorite ? 'favorite' : 'not-favorite'}
      onClick={() => {
        result.isFavorite ? remove(result) : write(result)
        toggleFavorite()
        }}>

      {
        result.isFavorite ? 
          <><i className="fas fa-star"></i> <span>&nbsp;Remove</span></>
        :
          <><i className="far fa-star"></i> <span>&nbsp;Add Favorites</span></>
      }
    </button>
  );
};