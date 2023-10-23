import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import AnimalDetailPage from "./pages/AnimalDetailPage";
import AnimalManage from "./pages/AnimalManage";
import FeedingSchedule from "./pages/FeedingSchedule";
import SpecieDetailPage from "./pages/SpecieDetailPage";
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
          path={`${match.path}/animalManage/:idAnimal`}
          component={AnimalDetailPage}
        ></Route>
        <Route
          path={`${match.path}/speciesManage`}
          component={SpeciesManage}
          exact
        ></Route>
        <Route
          path={`${match.path}/speciesManage/:idSpecie`}
          component={SpecieDetailPage}
        ></Route>
        <Route
          path={`${match.path}/feedingSchedule`}
          component={FeedingSchedule}
        ></Route>
        <Route
          path={`${match.path}/experience`}
          component={FeedingSchedule}
        ></Route>
      </Switch>
    </div>
  );
}

export default TrainerFeature;
