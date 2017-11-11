import React from "react";
import {
  DrawerNavigator,
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from "react-navigation";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import Loader from "../routes/loader";
import Login from "../routes/login";
import Confirmation from "../routes/confirmation";
import MapScreen from "../routes/Home/HomeContainer";
import Settings from "../routes/settings";
import Drawer from "../routes/drawer";
import Rides from "../routes/rides";
import Ratings from "../routes/ratings";

const Main = StackNavigator(
  {
    Map: {
      screen: MapScreen
    },
    Rides: {
      screen: Rides
    },
    Ratings: {
      screen: Ratings
    },
    Settings: {
      screen: Settings
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Map"
  }
);

const HomeScreen = DrawerNavigator(
  {
    Main: {
      screen: Main
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

export const AppNavigator = StackNavigator(
  {
    Loader: {
      screen: Loader
    },
    Login: {
      screen: Login
    },
    Confirmation: {
      screen: Confirmation
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Loader"
  }
);

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }

  onBackPress() {
    const { dispatch, nav } = this.props;
    // el primer caso evita que se cierre la app cuando se esta en un navegador anidado
    // y vuelve al screen anterior (anidado)
    if (
      nav.routes[0].hasOwnProperty("routes") &&
      nav.routes[0].routes[0].routes[0].index === 1
    ) {
      dispatch(NavigationActions.back());
      return true;
    }
    // cierra la app si es que esta en el root navigator
    if (nav.index === 0) {
      return false;
    } else {
      // en cualquier otro caso solo se devuelve al screen anterior
      dispatch(NavigationActions.back());
      return true;
    }
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
