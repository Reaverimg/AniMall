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
import accAPI from "./api/accAPI";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* //Neu check role id la guest thi se hien header cua Landing page
    //Neu khong dung thi se hien UI (Navbar, Sidebar,..) cua CMS (Staff,Admin,Trainer) page
    {accounts.roleId === "id" && <Header></Header>} */}
      <Header></Header>

      <Switch>
        <Route path="/" component={BuyerFeature} exact></Route>
        <Route path="/trainer" component={TrainerFeature}></Route>
        <Route path="/staff" component={StaffFeature}></Route>
        <Route path="/admin" component={AdminFeature}></Route>
      </Switch>

      {/* //Neu check role id la guest thi se hien footer cua Landing page
    //Neu khong dung thi se khong hien footer vi CMS (Staff,Admin,Trainer) page khong can footer
     {accounts.roleId === "id" && <Footer></Footer>} */}
      <Footer></Footer>
    </Box>
  );
}

export default App;
