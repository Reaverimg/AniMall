import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import StaffCms from "./pages/StaffCms";
import newsManage from "./pages/newsManage";

import TrainerManage from "./pages/TrainerManage";
import AreaManage from "./pages/areaManage";

StaffFeature.propTypes = {};
// Note
function StaffFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={AreaManage} exact></Route>
        <Route path={`${match.path}/news`} component={newsManage}></Route>
        <Route path={`${match.path}/trainer-manage`} component={TrainerManage}></Route>
      </Switch>
    </div>
  );
}

export default StaffFeature;
