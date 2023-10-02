import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AdminCms from "./pages/AdminCms";
import AccountManage from "./pages/AccountManage";

AdminFeature.propTypes = {};

function AdminFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={AdminCms} exact></Route>
        <Route path={`${match.path}/accounts`} componen={AccountManage}></Route>
      </Switch>
    </div>
  );
}

export default AdminFeature;
