import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import { Actions } from "react-native-router-flux";
import { parseString } from "react-native-xml2js";
import Card from "../components/Common/Card/Card";
import CardSection from "../components/Common/Card/CardSection";
import axios from "axios";
const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

class TabView extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, books: [] };

  componentDidMount() {
    console.log("props", this.props.name);
    axios
      .get(
        "https://www.goodreads.com/author/list/18541?&key=LuYr2rf9C00TLe2Ub2lbSg"
      )
      .then(response => {
        // handle success
        console.log(response);
        let xml = response.data;
        parseString(xml, (err, result) => {
          this.setState({
            books: result.GoodreadsResponse.author[0].books[0].book
          });
        });
      });
  }

  toggleNavBar = () => {
    this.setState(
      prevState => ({ hideNavBar: !prevState.hideNavBar }),
      () => Actions.refresh({ hideNavBar: this.state.hideNavBar })
    );
  };

  toggleTabBar = () => {
    this.setState(
      prevState => ({ hideTabBar: !prevState.hideTabBar }),
      () => {
        Actions.refresh(
          {
            hideTabBar: this.state.hideTabBar
          },
          "tab_2"
        );
      }
    );
  };
  onCardPress = item => {
    let book = item;
    Actions.tab_1_2({ title: book.title[0], data: book });
  };
  render() {
    console.log(this.state.books);
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <FlatList
          data={this.state.books}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onCardPress(item)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  margin: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D4D7DD"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 10
                  }}
                >
                  <Image
                    source={{ uri: item.image_url[0] }}
                    style={{
                      height: 152,
                      width: 96,
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 6,
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 6,
                      borderWidth: 2,
                      borderColor: "#fff"
                    }}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "#1B1D1F",
                        fontSize: 16,
                        fontWeight: "600",
                        lineHeight: 25
                      }}
                    >
                      By {item.title[0]}
                    </Text>

                    <Text
                      style={{
                        opacity: 0.7,
                        color: "#1B1D1F",
                        fontSize: 12,
                        lineHeight: 20
                      }}
                    >
                      The Outsider
                    </Text>

                    <Text
                      numberOfLines={3}
                      style={{
                        lineHeight: 22,
                        color: "#1E2022",
                        marginTop: 10
                      }}
                    >
                      {item.description[0]}
                    </Text>
                    <Text
                      style={{
                        color: "#FFC107",
                        fontSize: 11,
                        lineHeight: 17,
                        fontWeight: "bold",
                        marginTop: 10
                      }}
                    >
                      {item.average_rating[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <Text>
          Tab title:ee
          {this.props.title} name:
          {this.props.name}
        </Text>
        <Text>Tab data: {this.props.data}</Text>
        {this.props.name === "tab_1_1" && (
          <Button onPress={() => Actions.tab_1_2()}>Detail screen</Button>
        )}
        {this.props.name === "tab_2_1" && (
          <Button onPress={() => Actions.tab_2_2()}>Detail screen</Button>
        )}
        <Button onPress={Actions.pop}>Back</Button>
        <Button
          onPress={() => {
            Actions.tab_1();
          }}
        >
          Switch to tab1
        </Button>
        <Button
          onPress={() => {
            Actions.tab_2();
          }}
        >
          Switch to tab2
        </Button> */}
        {/* <Button
          onPress={() => {
            Actions.tab_3();
          }}
        >
          Switch to tab3
        </Button>
        <Button
          onPress={() => {
            Actions.tab_4_1();
          }}
        >
          Switch to tab4
        </Button>
        <Button
          onPress={() => {
            Actions.tab_5_1({ data: 'test!' });
          }}
        >
          Switch to tab5 with data
        </Button>
        <Button
          onPress={() => {
            Actions.echo();
          }}
        >
          push clone scene (EchoView)
        </Button>
        <Button
          onPress={() => {
            this.toggleNavBar();
          }}
        >
          Toggle NavBar
        </Button>
        <Button
          onPress={() => {
            Actions.replace('tab_2_1')
          }}
        >
          Replace with tab2
        </Button>
        {this.props.name === 'tab_2_1' && (
          <Button onPress={this.toggleTabBar}>Toggle TabBar</Button>
        )} */}
      </View>
    );
  }
}

TabView.propTypes = propTypes;
TabView.defaultProps = defaultProps;

export default TabView;
