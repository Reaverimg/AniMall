import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import TrainerFeature from "../src/features/Trainer/index";
import Footer from "./components/footer";
import Header from "./components/header";
import HomePage from "./components/testing/App";
import News from "./components/testing/News";
import NewsDetail from "./components/testing/NewsDetail";
import AdminFeature from "./features/Admin/index";
import BuyTicketPage from "./features/Buyer/pages/BuyTicketPage";
import OrderDetail from "./features/Buyer/pages/OrderDetail";
import OrderHistory from "./features/Buyer/pages/OrderHistory";
import PaymentPage from "./features/Buyer/pages/PaymentPage";
import StaffFeature from "./features/Staff";
import ResetPassword from "./features/User/forms/ResetPassForm";
import UserProfileFeature from "./features/User/pages/UserProfile";
import "./style.css";

function App() {
  const localeColor = localStorage.getItem("BACKGROUND_COLOR");
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: localeColor }}>
      <Header></Header>

      <Switch>
        {/* <Route path="/" component={BuyerFeature} exact></Route> */}
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/buyTicket" component={BuyTicketPage}></Route>
        <Route path="/payment" component={PaymentPage}></Route>
        <Route path="/trainer" component={TrainerFeature}></Route>
        <Route path="/staff" component={StaffFeature}></Route>
        <Route path="/admin" component={AdminFeature}></Route>
        <Route path="/user/profile" component={UserProfileFeature}></Route>
        <Route path="/buyer/orderHistory" component={OrderHistory}></Route>
        <Route
          path="/buyer/orderDetail/:idOrder"
          component={OrderDetail}
        ></Route>
        <Route
          path="/account/resetpassword/:token"
          component={ResetPassword}
        ></Route>
        <Route path="/account/resetpassword" component={ResetPassword}></Route>
        <Route path="/news" exact component={News}></Route>
        <Route path="/news/:idNews" component={NewsDetail}></Route>
      </Switch>

      <Footer></Footer>
    </Box>
  );
}

export default App;
