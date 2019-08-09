import React from "react";
import PropTypes from "prop-types";
import { Text, Platform, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ""
};
tabIcon = title => {
  return title === "Home"
    ? Platform.OS === "ios"
      ? "ios-home"
      : "md-home"
    : title === "Discover"
    ? Platform.OS === "ios"
      ? "ios-compass"
      : "md-compass"
    : title === "My books"
    ? Platform.OS === "ios"
      ? "ios-book"
      : "md-book"
    : "";
};

isIconFocused = focused => {
  return focused ? "#000" : "#CFD8DC";
};

const TabIcon = props => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Icon
      name={this.tabIcon(props.title)}
      color={this.isIconFocused(props.focused)}
      size={25}
      style={{
        textAlign: "center"
      }}
    />
    <Text
      style={{
        color: this.isIconFocused(props.focused),
        textAlign: "center"
      }}
    >
      {props.title}
    </Text>
  </View>
);

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
