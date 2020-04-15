import React from "react";
import { Forms } from '../auth/Forms'

export const Modal = ({ currentUser }) => (
  <div
    className="modal fade"
    id="modal"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className={`modal-dialog ${currentUser ? 'modal-sm' : 'modal-lg'}`} role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className={`modal-body ${!currentUser && 'forms'}`}>
          <Forms currentUser={currentUser} />
        </div>
      </div>
    </div>
  </div>
);