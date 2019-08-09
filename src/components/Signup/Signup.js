import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import Logo from "../Common/Logo/Logo";
import { Actions } from "react-native-router-flux";
class Signup extends Component {
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
    const { accountStyle, linkContainer } = styles;
    return (
      <View>
        <Logo titleText={"NiceReads"} subTitleText={"Meet your next favor"} />
        <Input placeholder={"Email Address"} />
        <Input placeholder={"Password"} secureTextEntry />
        <Input placeholder={"Repeat Password"} secureTextEntry />
        <Button buttonText={"Signup"} />
        <View style={linkContainer}>
          <View>
            <Text style={accountStyle}> Dont Have an account yet</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => Actions.login()}>
              <Text style={accountStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
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
export default Signup;
