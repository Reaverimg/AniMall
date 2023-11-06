import React from "react";
import PropTypes from "prop-types";
import {
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom";
import NewsDetail from "./NewsDetail";
import News from "./News";

function index(props) {
  const match = useRouteMatch();
  return (
    <div>

    </div>
  );
}

export default index;
