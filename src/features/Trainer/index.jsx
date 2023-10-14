import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
<<<<<<< Updated upstream
import AnimalDetail from "./components/AnimalDetail";
import AnimalManage from "./pages/AnimalManage";
=======
import AnimalDetailPage from "./pages/AnimalDetailPage";
import AnimalManage from "./pages/AnimalManage";
import FeedingSchedule from "./pages/FeedingSchedule";
import SpecieDetailPage from "./pages/SpecieDetailPage";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          path={`${match.path}/animalManage/:id`}
          component={AnimalDetail}
=======
          path={`${match.path}/animalManage/:idAnimal`}
          component={AnimalDetailPage}
>>>>>>> Stashed changes
        ></Route>
        <Route
          path={`${match.path}/speciesManage`}
          component={SpeciesManage}
          exact
        ></Route>
<<<<<<< Updated upstream
=======
        <Route
          path={`${match.path}/speciesManage/:idSpecie`}
          component={SpecieDetailPage}
        ></Route>
        <Route
          path={`${match.path}/feedingSchedule`}
          component={FeedingSchedule}
        ></Route>
>>>>>>> Stashed changes
      </Switch>
    </div>
  );
}

export default TrainerFeature;
