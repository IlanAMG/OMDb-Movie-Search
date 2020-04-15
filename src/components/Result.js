import React from "react";
import { FavoriteBtn } from './index'

export const Result = ({ result, toggleFavorite, active }) => {
  return (
    <article className="movie d-flex">
      <div className="p-4 movie d-flex flex-fill">
        {result.poster ? 
          <div
          className="p-1 poster"
          style={{
            backgroundImage: `url(${result.poster})`,
            backgroundSize: "cover"
          }}
        ></div>
        :
        <div
          className="p-1 poster"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL +
              `/placeholder.png`}`,
            backgroundSize: "cover"
          }}
        ></div>
        }
        <div className="p-4">
          <h2>
            {/* eslint-disable-next-line */}
            <a target="_blank" href="#">
              {result.title}
            </a>
            <span>({result.year})</span>
          </h2>
          <p>{result.imdb}</p>
        </div>
      </div>
      <FavoriteBtn active={active} toggleFavorite={toggleFavorite} flex="p-1" result={result}/>
    </article>
  );
};