import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
// import StaffCms from "./pages/StaffCms";

import TrainerManage from "./pages/TrainerManage";
import AreaManage from "./pages/areaManage";
import OrderManage from "./pages/OrderManage/OrderManage";
import AnimalManage from "./pages/AnimalManage";
import NewsManage from "./pages/newsManage";
import { CageManage } from "./pages/cageManage";


StaffFeature.propTypes = {};
// Note
function StaffFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={AreaManage} exact></Route>
        <Route path={`${match.path}/news`} component={NewsManage}></Route>
        <Route path={`${match.path}/trainer-manage`} component={TrainerManage}></Route>
        <Route path={`${match.path}/order-manage`} component={OrderManage}></Route>
        <Route path={`${match.path}/animal-manage`} component={AnimalManage}></Route>
        <Route path={`${match.path}/cages`} component={CageManage}></Route>
      </Switch>
    </div>
  );
}

export default StaffFeature;
