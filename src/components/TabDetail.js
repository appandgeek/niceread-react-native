import React from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { parseString } from "react-native-xml2js";
import Card from "./Common/Card/Card";
import CardSection from "./Common/Card/CardSection";
import { authorActions } from "../actions";
import { Spinner } from "../components/Common/Spinner/spinner";
import Icon from "react-native-vector-icons/Ionicons";
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

class TabView extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, book: {}, loading: false };
  componentDidMount() {
    this.props.dispatch(authorActions.getBook(this.props.id));
  }
  static getDerivedStateFromProps(props, state) {
    if (props.book !== state.book) {
      return {
        book: props.book
      };
    }
    return null;
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
    const id = item.id[0]._ || item.id;
    Actions.tab_1_2({ title: item.title[0], id: id });
  };
  render() {
    const { loading, book } = this.props;

    const {
      logoImageStyle,
      coverImageStyle,
      averageRatingStyle,
      reviewIconStyle
    } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {loading ? <Spinner /> : null}
        <ScrollView>
          <View style={{ flex: 1 }}>
            {book && !loading ? (
              <View style={{ flex: 1 }}>
                {book.image_url ? (
                  <ImageBackground
                    source={{ uri: book.image_url[0] }}
                    style={{ width: "100%", height: 250 }}
                    blurRadius={10}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      {book.image_url ? (
                        <Image
                          style={coverImageStyle}
                          source={{ uri: book.image_url[0] }}
                        />
                      ) : null}
                      <Text
                        style={{
                          color: "#1B1D1F",
                          fontSize: 16,
                          fontWeight: "600",
                          textAlign: "center"
                        }}
                      >
                        {book.title}
                      </Text>
                      {book.authors &&
                        book.authors[0].author
                          .slice(0, 1)
                          .map((item, index) => (
                            <Text
                              style={{
                                opacity: 0.7,
                                color: "#1B1D1F",
                                fontSize: 13
                              }}
                              key={index}
                            >
                              {item.name}
                            </Text>
                          ))}
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text
                          style={{
                            color: "#FFC107",
                            fontSize: 11,
                            fontWeight: "bold"
                          }}
                        >
                          {book.average_rating}
                        </Text>
                        <Text
                          style={{
                            color: "#BFC3CA",
                            fontSize: 11
                          }}
                        >
                          ({book.ratings_count} {"ratings"})
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                ) : null}
                {book.ratings_count && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderBottomColor: "#D4D7DD",
                      borderTopWidth: 1,
                      borderTopColor: "#D4D7DD",
                      margin: 10
                    }}
                  >
                    <View
                      style={{
                        width: "70%",
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        marginTop: 8
                      }}
                    >
                      <Icon
                        name={
                          Platform.OS === "ios"
                            ? "ios-chatboxes"
                            : "md-chatboxes"
                        }
                        style={reviewIconStyle}
                        size={22}
                      />
                      <Text
                        style={{
                          color: "#377DFF",
                          fontSize: 14,
                          fontWeight: "500"
                        }}
                      >
                        See reviews
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        padding: 10,
                        marginTop: 8,
                        flexDirection: "row"
                      }}
                    >
                      <Icon
                        name={
                          Platform.OS === "ios" ? "ios-bookmark" : "md-bookmark"
                        }
                        style={reviewIconStyle}
                        size={18}
                      />
                      <Icon
                        name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                        style={reviewIconStyle}
                        size={18}
                      />

                      <Icon
                        name={Platform.OS === "ios" ? "ios-share" : "md-share"}
                        style={reviewIconStyle}
                        size={18}
                      />
                    </View>
                  </View>
                )}

                {book.description ? (
                  <View style={{ margin: 10 }}>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 16
                      }}
                    >
                      Description
                    </Text>
                    <Text
                      numberOfLines={7}
                      style={{
                        color: "#1E2022",
                        marginTop: 10,
                        lineHeight: 24
                      }}
                    >
                      {book.description}
                    </Text>
                  </View>
                ) : null}

                {book.buy_links ? (
                  <View style={{ margin: 10 }}>
                    <View
                      style={{
                        borderTopColor: "#D4D7DD",
                        borderTopWidth: 1,
                        borderBottomColor: "#D4D7DD",
                        borderBottomWidth: 1
                      }}
                    >
                      <View
                        style={{
                          margin: 10
                        }}
                      >
                        <Text
                          style={{
                            color: "#377DFF",
                            fontSize: 15,
                            fontWeight: "600",
                            marginBottom: 20
                          }}
                        >
                          Get a copy
                        </Text>
                        <View>
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={book.buy_links[0].buy_link}
                            renderItem={({ item }) => (
                              <View style={{ width: 100, marginRight: 5 }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: "#1E2022",
                                    fontSize: 14,
                                    fontWeight: "600"
                                  }}
                                >
                                  {item.name}
                                </Text>
                                <Text
                                  style={{
                                    color: "#BFC3CA",
                                    fontSize: 12
                                  }}
                                >
                                  1,639 reviews
                                </Text>
                                <Text
                                  style={{
                                    color: "#FFC107",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    marginTop: 10,
                                    marginBottom: 10
                                  }}
                                >
                                  Rs. 260.00/-
                                </Text>
                              </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          borderTopColor: "#D4D7DD",
                          borderTopWidth: 1
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            margin: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#377DFF",
                              fontSize: 15,
                              fontWeight: "600",
                              width: "85%"
                            }}
                          >
                            You may also like
                          </Text>
                          <Text
                            style={{
                              color: "#377DFF",
                              fontSize: 13,
                              width: "15%"
                            }}
                          >
                            See all >
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
                <View style={{ margin: 10 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      marginTop: 5
                    }}
                  >
                    {book.similar_books &&
                      book.similar_books[0].book.map((item, index) => (
                        <TouchableWithoutFeedback
                          onPress={() => this.onCardPress(item)}
                          key={index}
                        >
                          <View
                            style={{
                              marginRight: 10,
                              borderRadius: 10,
                              position: "relative"
                            }}
                            key={item.id}
                          >
                            <Image
                              borderRadius={5}
                              style={logoImageStyle}
                              source={{ uri: item.image_url[0] }}
                              style={{
                                height: 135,
                                width: 98
                              }}
                            />
                            <View
                              style={{
                                position: "absolute",
                                top: 8,
                                left: 5
                              }}
                            >
                              {book.authors &&
                                book.authors[0].author
                                  .slice(0, 1)
                                  .map((item, index) => (
                                    <View
                                      key={index}
                                      style={{
                                        borderWidth: 2,
                                        borderColor: "blue",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 40,
                                        height: 40,
                                        backgroundColor: "transparent",
                                        borderRadius: 40
                                      }}
                                    >
                                      <Image
                                        style={logoImageStyle}
                                        source={{
                                          uri: item.image_url[0]._.trim()
                                        }}
                                        style={{
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 30,
                                          height: 30,
                                          backgroundColor: "transparent",
                                          borderRadius: 30
                                        }}
                                      />
                                    </View>
                                  ))}
                            </View>
                            <Text
                              numberOfLines={1}
                              style={{
                                width: 98,
                                height: 20,
                                width: 94,
                                color: "#1E2022",
                                fontSize: 14,
                                fontWeight: "600"
                              }}
                            >
                              {item.title}
                            </Text>

                            {item.authors &&
                              item.authors[0].author.map((item, index) => (
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    opacity: 0.7,
                                    color: "#1B1D1F",
                                    fontSize: 13,
                                    width: 98
                                  }}
                                  key={index}
                                >
                                  By {item.name}
                                </Text>
                              ))}
                            <Text
                              numberOfLines={1}
                              style={{
                                width: 98
                              }}
                            >
                              {item.average_rating}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      ))}
                  </ScrollView>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

TabView.propTypes = propTypes;
TabView.defaultProps = defaultProps;

const styles = {
  logoImageStyle: {
    width: 98,
    height: 135
  },
  viewStyle: {
    flex: 1,

    alignItems: "center"
  },
  containerStyle: {
    flex: 1
  },
  coverImageStyle: {
    height: 135,
    width: 98,
    marginTop: 20,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderWidth: 2,
    borderColor: "#fff"
  },
  averageRatingStyle: {
    color: "#FFC107"
  },
  ratingCountStyle: {
    color: "#BFC3CA"
  },
  reviewIconStyle: {
    color: "#377DFF",
    marginRight: 10
  }
};

const mapStateToProps = state => {
  return { book: state.authorBooks.book, loading: state.authorBooks.loading };
};

export default connect(mapStateToProps)(TabView);
