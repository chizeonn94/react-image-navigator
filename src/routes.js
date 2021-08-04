import React, { useContext } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import ImageNavigator from "./components/ImageNavigator";


export default (props) => {
  const today = new Date();
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ImageNavigator} />
      </Switch>
    </HashRouter>
  );
};
