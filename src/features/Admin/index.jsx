import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import AdminCms from "./pages/AdminCms";

AdminFeature.propTypes = {};

function AdminFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={AdminCms} exact></Route>
        <Route path={`${match.path}/???`}></Route>
      </Switch>
    </div>
  );
}

export default AdminFeature;
