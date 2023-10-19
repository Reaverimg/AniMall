import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import AnimalDetail from "./components/AnimalDetail";
import AnimalManage from "./pages/AnimalManage";
import SpeciesManage from "./pages/SpeciesManage";

TrainerFeature.propTypes = {};

function TrainerFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route
          path={`${match.path}/animalManage`}
          component={AnimalManage}
          exact
        ></Route>
        <Route
          path={`${match.path}/animalManage/:id`}
          component={AnimalDetail}
        ></Route>
        <Route
          path={`${match.path}/speciesManage`}
          component={SpeciesManage}
          exact
        ></Route>
      </Switch>
    </div>
  );
}

export default TrainerFeature;
