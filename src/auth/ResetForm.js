import React, {useState} from "react";
import { resetPassword } from "../firebase/Auth";

const ResetForm = props => {

    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState('')

    const reset = () => {
        resetPassword(email).then(succes => {
            if (succes) {
                setFeedback(`Password email sent to ${email}`)
                setEmail('')
                setTimeout(() => {
                    //jquery car c'est la doc bootstrap pour fermer une modal
                    window.jQuery('#modal').modal('hide')
                    setFeedback('')
                }, 2000)
            }
        }).catch(err => {
            setFeedback(err.message)
        })
    }

    return (
        <>
            <br id="reset-form" />
            <hr />
            <br />
            <div className="row">
                <h2>&nbsp; &nbsp; Reset Password</h2>
            <small>{feedback}</small>
                <div className="form-group col-sm-10">
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                </div>
                <button
                    type="button"
                    disabled={!email.length}
                    className="col-sm btn btn-light btn-sm violet btn-reset"
                    onClick={reset}
                >
                    send link
                </button>
            </div>
            <br />
            <hr />
            <br />
        </>
    );
};

export default ResetForm;