import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import AdminCms from "./pages/AdminCms";
import AccountManage from "./pages/AccountManage";
import TickketManage from "./pages/TicketManage";
import "../Admin/pages/styles/AccountManage.css"
AdminFeature.propTypes = {};

function AdminFeature(props) {
  const match = useRouteMatch();
  return (
    <div className="admin-container">
      <Switch>
        <Route path={match.path} component={AdminCms} exact></Route>
        <Route path={`${match.path}/account`} component={AccountManage}></Route>
        <Route path={`${match.path}/ticket`} component={TickketManage}></Route>
      </Switch>
    </div>
  );
}

export default AdminFeature;
