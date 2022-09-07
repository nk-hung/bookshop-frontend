import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  getUserInfoAsync,
  loginAsync,
  selectorAuth,
  selectorUser,
} from "../../redux/reducer/auth.reducer";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const user = selector(selectorAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    console.log("user:", user);
    navigate("/");
  }

  const handleSubmitted = async () => {
    console.log("form data:", { email, password });
    const res = await dispatch(loginAsync({ email, password })).unwrap();
    console.log("res:", res);
    if (res.token) {
      dispatch(getUserInfoAsync(res.token));
    }
  };

  return (
    <div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' onClick={handleSubmitted}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
