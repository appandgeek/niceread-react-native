import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="login" component={Login} title="Login" initial />
        <Scene key="signUp" component={Signup} title="Signup" />
        <Scene
          key="forgotPassword"
          component={ForgotPassword}
          title="ForgotPassword"
        />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
