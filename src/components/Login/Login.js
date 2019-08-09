import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import Logo from "../Common/Logo/Logo";
import { Actions } from "react-native-router-flux";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  forgotPassword = (email, password) => {
    Actions.signUp();
  };

  render() {
    const { forgotPasswodLinkStyle, accountStyle, linkContainer } = styles;
    return (
      <View>
        <Logo titleText={"NiceReads"} subTitleText={"Meet your next favor"} />
        <Input placeholder={"Email Address"} />
        <Input placeholder={"Password"} secureTextEntry />
        <TouchableOpacity onPress={() => Actions.forgotPassword()}>
          <Text style={forgotPasswodLinkStyle}> Forgot password?</Text>
        </TouchableOpacity>
        <Button buttonText={"Login"} />
        <View style={linkContainer}>
          <View>
            <Text style={accountStyle}> Dont Have an account yet</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => Actions.signUp()}>
              <Text style={accountStyle}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  forgotPasswodLinkStyle: {
    color: "#DE4437",
    fontSize: 14,
    textAlign: "right",
    padding: 10
  },
  accountStyle: {
    color: "#77838F",
    fontSize: 12,
    marginRight: 5
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
};
export default Login;
