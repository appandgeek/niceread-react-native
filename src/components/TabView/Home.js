import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  ViewPropTypes,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { authorActions } from "../../actions";
import { Spinner } from "../Common/Spinner/spinner";
const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

class Home extends React.Component {
  state = { hideNavBar: false, hideTabBar: false, books: [] };

  componentDidMount() {
    this.props.dispatch(authorActions.getAuthorBooks());
  }
  static getDerivedStateFromProps(props, state) {
    if (props.books !== state.books) {
      return {
        books: props.books
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
    const { loading } = this.props;
    const {
      bookListContainer,
      bookThumbnailStyle,
      bookRightSectionStyle,
      bookTitleStyle,
      bookAuthorStyle,
      bookDescriptionStyle,
      bookRatingStyle
    } = styles;

    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        {loading ? <Spinner /> : null}
        <FlatList
          data={this.state.books}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.onCardPress(item)}>
              <View style={bookListContainer}>
                <Image
                  source={{ uri: item.image_url[0] }}
                  style={bookThumbnailStyle}
                />
                <View style={bookRightSectionStyle}>
                  <Text numberOfLines={1} style={bookTitleStyle}>
                    By {item.title[0]}
                  </Text>

                  <Text style={bookAuthorStyle}>The Outsider</Text>

                  <Text numberOfLines={3} style={bookDescriptionStyle}>
                    {item.description[0]}
                  </Text>

                  <Text style={bookRatingStyle}>{item.average_rating[0]}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
const mapStateToProps = state => {
  return { books: state.authorBooks.books, loading: state.authorBooks.loading };
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bookListContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D7DD",
    paddingBottom: 10
  },
  bookRightSectionStyle: {
    flex: 1,
    marginLeft: 10
  },

  bookThumbnailStyle: {
    height: 152,
    width: 96,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 6,
    borderWidth: 2,
    borderColor: "#fff"
  },

  bookTitleStyle: {
    color: "#1B1D1F",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 25
  },

  bookAuthorStyle: {
    fontSize: 12
  },
  bookDescriptionStyle: {
    lineHeight: 22,
    color: "#1E2022",
    marginTop: 10
  },
  bookRatingStyle: {
    color: "#FFC107",
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "bold",
    marginTop: 10
  }
};
export default connect(mapStateToProps)(Home);
