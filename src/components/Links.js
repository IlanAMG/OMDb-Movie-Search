import React from "react";

export const Links = ({currentUser, active, handleClick}) => (
  <nav>
    {["search", "favorites"].map(link => {
      const isDisabled = !currentUser && link === "favorites" 
      //eslint-disable-next-line
      return  <a 
                onClick={() => !currentUser ? null : handleClick(link)} 
                className={`${isDisabled ? "disabled ": "hover"} ${active === link && 'active'} `}
              >
              {link.toUpperCase()}
            </a>;
    })}
  </nav>
);