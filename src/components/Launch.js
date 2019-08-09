import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

class Launch extends React.Component {
  render() {
    return (
      <View {...this.props} style={styles.container}>
        <Button title="Go to Home page" onPress={Actions.drawer} />
      </View>
    );
  }
}

export default Launch;
