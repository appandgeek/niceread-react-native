import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Platform
} from "react-native";

import { Actions } from "react-native-router-flux";
import Logo from "../Common/Logo/Logo";
import Icon from "react-native-vector-icons/Ionicons";

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };

  render() {
    const { listContainer, listIconStyle, iconTextStyle } = styles;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: -85
          }}
        >
          <View style={{ height: 50, width: 50 }}>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                marginRight: "auto"
              }}
            >
              <Icon
                name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
                color="#377DFF"
                size={22}
              />
            </View>
          </View>

          <Text style={{ flex: 1 }}> </Text>
          <TouchableOpacity
            onPress={() => {
              Actions.drawerClose();
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 30
                }}
              >
                <Icon
                  name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                  color="#377DFF"
                  size={22}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Logo titleText={"NiceReads"} subTitleText={"Meet your next favor"} />

        <TouchableOpacity
          onPress={() => {
            Actions.drawerClose();
          }}
        >
          <View style={listContainer}>
            <Icon
              name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Liked</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.pop}>
          <View style={listContainer}>
            <Icon
              name={Platform.OS === "ios" ? "ios-bookmark" : "md-bookmark"}
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Bookmarked</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.pop}>
          <View style={listContainer}>
            <Icon
              name={Platform.OS === "ios" ? "ios-magnet" : "md-magnet"}
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Activities</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.pop}>
          <View style={listContainer}>
            <Icon
              name={
                Platform.OS === "ios" ? "ios-notifications" : "md-notifications"
              }
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Notifications</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.pop}>
          <View style={listContainer}>
            <Icon
              name={Platform.OS === "ios" ? "ios-link" : "md-link"}
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Linked Accounts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.signup}>
          <View style={listContainer}>
            <Icon
              name={Platform.OS === "ios" ? "ios-help" : "md-help"}
              style={listIconStyle}
            />
            <Text style={iconTextStyle}>Help</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            color: "#1E2022",
            fontSize: 13,
            fontWeight: "500",
            marginLeft: 20
          }}
        >
          {/* <TouchableOpacity onPress={Actions.pop}>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative",
                paddingTop: 40
              }}
            >
              <Text
                style={{
                  color: "#DE4437",
                  fontSize: 13,
                  fontWeight: "500"
                }}
              >
                Signout
              </Text>
            </View>
          </TouchableOpacity>
     
      */}
        </View>
      </View>
    );
  }
}

const styles = {
  listContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#D4D7DD",
    padding: 10
  },
  listIconStyle: {
    color: "#5A5F69"
  },
  iconTextStyle: {
    color: "#1E2022",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 20,
    width: "90%"
  },
  container: {
    flex: 1,
    margin: 20
  }
};
export default DrawerContent;
