import React from "react";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import PropTypes from "prop-types";

TrainerFeature.propTypes = {};

function TrainerFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      Trainer Role
      <Switch>
        <Route path={match.path} exact></Route>
        <Route path={`${match.path}/:id`}></Route>
      </Switch>
    </div>
  );
}

export default TrainerFeature;
