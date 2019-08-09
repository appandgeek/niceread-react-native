import React, { Component } from "react";
import { View, Text } from "react-native";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import Logo from "../Common/Logo/Logo";
class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: ""
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleRepeatPassword = text => {
    this.setState({ repeatPassword: text });
  };
  signup = (email, password) => {
    // alert("email: " + email + " password: " + password);
  };

  render() {
    return (
      <View>
        <Logo titleText={"NiceReads"} subTitleText={"Meet your next favor"} />
        <Input placeholder={"Email Address"} />
        <Button buttonText={"Submit"} />
      </View>
    );
  }
}

export default ForgotPassword;
