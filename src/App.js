import React from "react";
import { Platform, StyleSheet } from "react-native";
import { StackViewStyleInterpolator } from "react-navigation-stack";
import { Provider } from "react-redux";
import { store } from "./helpers";
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox
} from "react-native-router-flux";
import Launch from "./components/Launch";
import Register from "./components/Register";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Home from "./components/Home";
import DrawerContent from "./components/drawer/DrawerContent";
// import TabView from "./components/TabView";
import TabDetail from "./components/TabDetail";
import TabIcon from "./components/TabIcon";
import EchoView from "./components/EchoView";
import MessageBar from "./components/MessageBar";
import ErrorModal from "./components/modal/ErrorModal";
import DemoLightbox from "./components/lightbox/DemoLightbox";
import TabHomeView from "./components/TabView/Home";
import TabDiscoverView from "./components/TabView/Discover";
import TabMybooksView from "./components/TabView/MyBooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarStyle: {
    backgroundColor: "#eee",
    borderWidth: 0
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd"
  }
});

const getSceneStyle = () => ({
  backgroundColor: "#FFF",
  shadowOpacity: 1,
  shadowRadius: 3
});
const stateHandler = (prevState, newState, action) => {
  console.log("onStateChange: ACTION:", action);
};
// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid
});

const App = () => (
  <Provider store={store}>
    <Router
      onStateChange={stateHandler}
      getSceneStyle={getSceneStyle}
      uriPrefix={prefix}
      navigationBarStyle={{ backgroundColor: "#286FF4" }}
      titleStyle={{ color: "#FFF" }}
      tintColor="#FFF"
    >
      <Overlay key="overlay">
        <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
          <Lightbox key="lightbox">
            <Stack key="root" titleStyle={{ alignSelf: "center" }} hideNavBar>
              <Scene
                key="echo"
                back
                clone
                component={EchoView}
                getTitle={({ navigation }) => navigation.state.key}
              />
              <Scene
                key="launch"
                component={Launch}
                title="Launch"
                initial
                type={ActionConst.RESET}
              />
              <Stack
                back
                backTitle="Back"
                key="register"
                duration={0}
                navTransparent
              >
                <Scene key="_register" component={Register} title="Register" />

                <Scene
                  key="home"
                  component={Home}
                  title="Replace"
                  type={ActionConst.REPLACE}
                />
              </Stack>

              <Drawer
                hideNavBar
                drawerPosition={"right"}
                key="drawer"
                onExit={() => {
                  console.log("Drawer closed");
                }}
                onEnter={() => {
                  console.log("Drawer opened");
                }}
                contentComponent={DrawerContent}
                drawerWidth={300}
              >
                {/*
                Wrapper Scene needed to fix a bug where the tabs would
                reload as a modal ontop of itself
              */}
                <Scene hideNavBar panHandlers={null}>
                  <Tabs
                    key="tabbar"
                    routeName="tabbar"
                    legacy
                    backToInitial
                    onTabOnPress={({ scene, jumpToIndex }) => {
                      jumpToIndex(scene.index);
                    }}
                    swipeEnabled
                    showLabel={false}
                    tabBarStyle={styles.tabBarStyle}
                    tabBarPosition="bottom"
                    // activeBackgroundColor="#1E2022"
                    // inactiveBackgroundColor="#1B1D1F"
                  >
                    <Stack key="tab_1" title="Home" icon={TabIcon} initial>
                      <Scene
                        key="tab_1_1"
                        component={TabHomeView}
                        title="Home"
                        titleStyle={{ color: "#FFF" }}
                      />
                      <Scene
                        duration={150}
                        animation="fade"
                        key="tab_1_2"
                        component={TabDetail}
                        // title="Home Detail"
                        back
                        titleStyle={{ color: "#FFF", alignSelf: "center" }}
                      />
                    </Stack>

                    <Stack key="tab_2" title="Discover" icon={TabIcon}>
                      {/* <Scene key="tab_2_1" component={TabView} title="Discover" /> */}
                      <Scene
                        key="tab_2_2"
                        component={TabDiscoverView}
                        title="Discover Detail"
                        back
                        hideDrawerButton
                        backTitle="Back!"
                        panHandlers={null}
                      />
                    </Stack>

                    <Stack key="tab_3" icon={TabIcon} title="My books">
                      <Scene
                        key="tab_3_1"
                        component={TabMybooksView}
                        title="My books"
                      />
                    </Stack>
                  </Tabs>
                </Scene>
              </Drawer>
            </Stack>

            <Scene key="demo_lightbox" component={DemoLightbox} />
          </Lightbox>
          <Scene key="error" component={ErrorModal} />
          <Stack
            key="login"
            headerLayoutPreset="center"
            path="login/:data"
            titleStyle={{ alignSelf: "center" }}
          >
            <Scene
              key="loginModal"
              component={Login}
              title="Login"
              onExit={() => console.log("Login: onExit")}
              leftTitle="Cancel"
              onLeft={Actions.pop}
            />
          </Stack>
        </Modal>

        <Scene component={MessageBar} />
      </Overlay>
    </Router>
  </Provider>
);

export default App;
