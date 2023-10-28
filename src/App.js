import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import BuyerFeature from "../src/features/Buyer/index";
import TrainerFeature from "../src/features/Trainer/index";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import AdminFeature from "./features/Admin/index";
import StaffFeature from "./features/Staff";
import { Box } from "@mui/material";
import { useEffect } from "react";


function App() {
  const localeColor = localStorage.getItem("BACKGROUND_COLOR");
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: localeColor }}>

      <Header></Header>

      <Switch>
        <Route path="/" component={BuyerFeature} exact></Route>
        <Route path="/trainer" component={TrainerFeature}></Route>
        <Route path="/staff" component={StaffFeature}></Route>
        <Route path="/admin" component={AdminFeature}></Route>
      </Switch>

      <Footer></Footer>
    </Box>
  );
}

export default App;
