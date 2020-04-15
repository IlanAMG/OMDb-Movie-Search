import React from "react";
import Login from "./Login";
import SignUp from './SignUp';
import { Logout } from './Logout';

export const Forms = ({currentUser}) => {
  return (
    <>
      {
        currentUser ?
        <Logout />
        :
        <div>
          <Login  />
          <SignUp />
        </div>
      }
    </>
  );
};
 