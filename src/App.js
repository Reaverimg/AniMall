import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import BuyerFeature from "../src/features/Buyer/index";
import TrainerFeature from "../src/features/Trainer/index";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import AdminFeature from "./features/Admin/index";
import StaffFeature from "./features/Staff";
import UserProfileFeature  from "./features/User/pages/UserProfile";
import BuyTicketPage from "./features/Buyer/pages/BuyTicketPage";
import PaymentPage from "./features/Buyer/pages/PaymentPage";
import ResetPassword from "./features/User/forms/ResetPassForm";
import OrderHistory from "./features/Buyer/pages/OrderHistory";
import OrderDetail from "./features/Buyer/pages/OrderDetail";
import { Box } from "@mui/material";
import { useEffect } from "react";


function App() {
  const localeColor = localStorage.getItem("BACKGROUND_COLOR");
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: localeColor }}>

      <Header></Header>

      <Switch>
        <Route path="/" component={BuyerFeature} exact></Route>
        <Route path="/buyTicket" component={BuyTicketPage}></Route>
        <Route path="/payment" component={PaymentPage}></Route>
        <Route path="/trainer" component={TrainerFeature}></Route>
        <Route path="/staff" component={StaffFeature}></Route>
        <Route path="/admin" component={AdminFeature}></Route>
        <Route path="/user/profile" component={UserProfileFeature}></Route>
        <Route path="/buyer/orderHistory" component={OrderHistory}></Route>
        <Route path="/buyer/orderDetail/:idOrder" component={OrderDetail}></Route>
        <Route path="/account/resetpassword/:token" component={ResetPassword}></Route>
      </Switch>

      <Footer></Footer>
    </Box>
  );
}

export default App;
