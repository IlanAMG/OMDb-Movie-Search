import React from "react";

export const Header = ({ currentUser }) => {
  return (
    <header>
      <span>
        OMDb Movie Search <i className="fas fa-video video"></i>
      </span>
      { currentUser ? 
        <button className='btn btn-link login' data-toggle='modal' data-target='#modal'><i class="fas fa-user fa-2x"></i></button>
        :
        <button className='btn btn-link login' data-toggle='modal' data-target='#modal'><i class="fas fa-sign-in-alt"></i>&nbsp;Login</button>
      }
    </header>
  );
};