import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { signUp, sendEmailVerification } from '../firebase/Auth';

const SignUp = () => {

    const [isValid, setIsValid] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [identifiants, setIdentifiants] = useState({
        email: "",
        psw: ""
    })

    const MESSAGE_CREATE = 'Account successfully created'

    useEffect(() => {
        setIsValid(identifiants.email.length > 0 && identifiants.psw.length > 0)
    }, [identifiants])

    useEffect(() => {
        if (feedback !== MESSAGE_CREATE) {
            return
        }
        const timer = setTimeout(() => {
            //jquery car c'est la doc bootstrap pour fermer une modal
            window.jQuery('#modal').modal('hide')
            setFeedback('')
        }, 1200)
        return () => {
            clearTimeout(timer)
        }
    }, [feedback])

    return (
        <div>
            <div className="col-sm-10 offset-1" id="signup">
                <h2>Sign Up</h2>
                <form onSubmit={e => {
                    e.preventDefault()
                    signUp(identifiants)
                        .then(resolve => {
                            if (resolve) {
                                setFeedback(MESSAGE_CREATE)
                                setIdentifiants({
                                    email: "",
                                    psw: ""
                                })
                                sendEmailVerification()
                            }
                        })
                        .catch(err => {
                            setFeedback(err.message)
                        })
                }}>
                    <hr />
                    <small className={feedback === MESSAGE_CREATE ? 'green' : 'crimson'}>{feedback}</small>
                    <div class="form-group">
                        <Input
                            classNames="form-control signup-form"
                            value={identifiants.email}
                            label="email"
                            type="email"
                            action={e => {
                                setIdentifiants({ ...identifiants, email: e.target.value })
                            }}
                        >
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
              </small>
                        </Input>
                        <Input
                            classNames="form-control signup-form"
                            value={identifiants.psw}
                            label="password"
                            type="password"
                            action={e => {
                                setIdentifiants({ ...identifiants, psw: e.target.value })
                            }}
                        >
                            <small className="form-text text-muted">
                                Choose a complex and secure password
              </small>
                        </Input>
                    </div>

                    <br />
                    <button
                        disabled={!isValid}
                        type="submit"
                        className="btn btn-primary btn-sm white bg-violet float-right"
                    >
                        Submit
          </button>
                </form>
            </div>
        </div>
    );
};
export default SignUp;