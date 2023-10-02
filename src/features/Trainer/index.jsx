import React from "react";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import PropTypes from "prop-types";
import TrainerCms from "./pages/TrainerCms";

TrainerFeature.propTypes = {};

function TrainerFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={TrainerCms} exact></Route>
        <Route path={`${match.path}/:id`}></Route>
      </Switch>
    </div>
  );
}

export default TrainerFeature;
