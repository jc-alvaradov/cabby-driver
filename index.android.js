import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./app/reducers";
import TaxiNativeDriver from "./app/navigators/AppNavigator";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.ignoredYellowBox = ["Remote debugger"];

const app = () => (
  <Provider store={store}>
    <TaxiNativeDriver />
  </Provider>
);

AppRegistry.registerComponent("TaxiNativeDriver", () => app);
