import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import BuyerPage from "./pages/BuyerPage";


BuyerFeature.propTypes = {};

function BuyerFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={BuyerPage} exact></Route>
        <Route path={`${match.path}/???`} ></Route>
      </Switch>
    </div>
  );
}

export default BuyerFeature;
