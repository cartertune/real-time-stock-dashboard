import React, { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Input from "../../components/Input";
import './login.css'

function Login() {
  const { signIn, session } = useAuth();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = useCallback(() => {
    // log button clicks

    // TODO: Handle Errors
    signIn(email, password)
  }, [email, password, signIn])

  //TODO: On "enter key event", signIN

  if (session) {
    return <Navigate to={'/'} />
  }

  return <div className="login-page">
    <div className="left">
      <div className="sign-in-form">
        <h3>Sign In</h3>
        <Input value={email} onChange={setEmail} label="Email" type="email" />
        <Input value={password} onChange={setPassword} label="Password" type="password" />
        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
    <div className="right">
      <img src="https://ei.marketwatch.com/Multimedia/2018/01/16/Photos/ZH/MW-GB791_1987_20180116114150_ZH.jpg?uuid=26b11c5a-fadc-11e7-a961-9c8e992d421e" alt="" className="background-img" />
      {/* <img src="" alt="" className="logo" /> */}
      <img src="./stockbase-logo.png" className="stockbase-logo" alt="logo" />
      <div className="subtitle">
        <h2 className="primary">More gains.</h2>
        <h2 className="secondary_text">Less research.</h2>
      </div>
    </div>
  </div>
}

export default Login;