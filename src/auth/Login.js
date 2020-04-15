import React, { useState, useEffect } from "react";
import ResetForm from "./ResetForm";
import { Input } from "./Input";
import { signIn } from '../firebase/Auth';

const Login = () => {

  const [isValid, setIsValid] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [identifiants, setIdentifiants] = useState({
    email: "",
    psw: ""
  })

  const handleClick = () => {
    const signupEl = document.getElementById('signup')
    signupEl.scrollIntoView({
      behavior: "smooth"
    })
  }

  const expand = async () => {
    if (!isExpanded) {
      await setIsExpanded(!isExpanded)
      const resetmdp = document.getElementById('reset-form')
      resetmdp.scrollIntoView({
        behavior: "smooth"
      })
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  const submit = () => {
    signIn(identifiants)
      .then(() => window.location.reload())
      .catch(err => setFeedback(err.message))
  }

  useEffect(() => {
    setIsValid(identifiants.email.length > 0 && identifiants.psw.length > 0)
  }, [identifiants])

  return (
    <div className="col-sm-10 offset-1" id="login">
      <h2>Login</h2>
      <form onSubmit={e => e.preventDefault()}><hr />
        <small className="crimson">{feedback}</small>
        <br />
        <Input
          classNames="form-control login-form"
          label="email"
          value={identifiants.email}
          type="email"
          action={e => {
            setIdentifiants({ ...identifiants, email: e.target.value })
          }}
        />
        <Input
          classNames="form-control login-form"
          label="password"
          value={identifiants.psw}
          type="password"
          action={e => {
            setIdentifiants({ ...identifiants, psw: e.target.value })
          }}
        />

        <div>
          <div className="buttons">
            <button
              type="button"
              className="btn btn-link violet text-left"
              onClick={expand}>
              reset password
            </button>
            <button
              type="button"
              className="btn btn-link text-right violet"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleClick}>
              create new account
            </button>
          </div>
          <button
            onClick={submit}
            type="submit"
            disabled={!isValid}
            className="btn btn-primary bg-violet btn-sm white float-right"
          >
            Submit
          </button>
        </div>
      </form>
      <br />
      <br />
      {isExpanded &&
        <ResetForm
          classNames="form-control"
          property="email"
        />
      }

    </div>
  );
};

export default Login;