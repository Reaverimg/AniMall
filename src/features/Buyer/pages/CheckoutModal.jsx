import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import "../style/CheckoutModalStyle.css"
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Email } from "@mui/icons-material";

function PaymentModal({ open, onClose, ticketList, ticketQuantities, selectedTicketIds }) {
  const selectedTickets = ticketList.filter((ticket) => ticketQuantities[ticket.ticketName] > 0);
  const [accounts, setAccounts] = useState([]);
  const [loginedUser, setLoginedUser] = useState({});
  const [openMess, setOpenMess] = useState(false);
  const [messContent, setMessContent] = useState("");

  const history = useHistory();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const ticket of selectedTickets) {
      const quantity = ticketQuantities[ticket.ticketName] || 0;
      totalPrice += ticket.ticketPrice * quantity;
    }
    return totalPrice;
  };

  const phoneRegExp = /^[0-9]{10,15}$/;
  const formik = useFormik({
    initialValues: {
      name: loginedUser ? loginedUser.name : "",
      email: loginedUser ? loginedUser.email : "",
      phoneNumber: loginedUser ? loginedUser.phoneNumber : "",

    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Please enter your name!")
        .matches(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces.")
        .trim()
        .min(2, "Name too short!"),
      email: yup
        .string()
        .required("Please enter your email!")
        .email("Email should have format:(ABC@gmail.com).")
        .trim(),
      phoneNumber: yup
        .string()
        .required("Please enter your phone number!")
        .min(10, "Phone number must have at least 10 character!")
        .matches(phoneRegExp, "Phone number should have format:")
        .trim(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  useEffect(() => {

    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
    if (localStorageValue) {
      const parsedAccountLogged = JSON.parse(localStorageValue);
      setLoginedUser(parsedAccountLogged);

      formik.setValues({
        name: parsedAccountLogged.name,
        email: parsedAccountLogged.email,
        phoneNumber: parsedAccountLogged.phoneNumber,
      });

    }

    const apiUrl = 'https://animall-400708.et.r.appspot.com/api/v1/accounts';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setAccounts(result.data);
        console.log("accs", accounts)
      })
      .catch((error) => {
        console.error('There was a problem with the API request:', error);
      });
  }, []);

  const handleSubmit = async (values) => {
    //kiem tra nguoi mua co dang dang nhap khong
    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

    if (localStorageValue == null) { // neu khong dang nhap => gọi API đăng ký guest
      const apiData = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        roleId: 5
      };

      let json = {
        method: 'POST',
        body: JSON.stringify(apiData),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      }
      const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/guest/register`, json)
        .then((res) => res.json())
        .catch((error) => { console.log(error) })
      console.log(response)
      if (response.message == "OPERATION SUCCESSFUL") {
        const guestAccount = { idAccount: response.data.idAccount, email: response.data.email };
        //gọi Tiếp API create order
        apiCreateOrder(guestAccount.idAccount, guestAccount.email)
      } else if (response.message == "Email is already in use") {
        const matchingAccount = accounts.find((account) => account.email === values.email);
        if (matchingAccount.role.roleDesc === "GUEST") {
          // history.push(`/resetPassword`);// điều hướng sang resetpassword page nếu trùng pass && isGuest
          setMessContent("Please check your email and reset your password before continuing to order!")
          setOpenMess(true);
          apiResetPassword(matchingAccount.email)
        } else {// bật login nếu trùng mail && isNotGuest
          // history.push(`/`);
          setMessContent("Please login before continuing to order!")
          setOpenMess(true);
        }
      }
      else {
        console.log(response.message)
      }
    }
    else { //nếu có đăng nhập
      const parsedAccountLogged = JSON.parse(localStorageValue);

      formik.setValues({
        name: parsedAccountLogged.name,
        email: parsedAccountLogged.email,
        phoneNumber: parsedAccountLogged.phoneNumber,
      });
      //gọi truc tiep api create order truyền localStorageValue.idAccount vào
      apiCreateOrder(parsedAccountLogged.idAccount, parsedAccountLogged.email)
    }
  };

  const apiCreateOrder = async (idAccount, email) => {

    const apiData = {
      accountId: idAccount,
      quantity: selectedTicketIds.length,
      email: email,
      ticketIds: selectedTicketIds
    };

    let json = {
      method: 'POST',
      body: JSON.stringify(apiData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/orders/`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log(response)
    if (response.message == "OPERATION SUCCESSFUL") {
      console.log("create order Success!")
      console.log("id ne", response.data[0].idOrder)
      history.push(`/payment?orderId=${response.data[0].idOrder}`);

    }
    else {
      console.log("create order UnSuccess!")
    }

  };

  const handleCloseMess = (event, reason) =>{
    if(reason === 'clickaway'){
      return;
    }
    setOpenMess(false);
  }

  const apiResetPassword = async ( email) => {

    const apiData = {
      email: email
    };

    let json = {
      method: 'POST',
      body: JSON.stringify(apiData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/accounts/password/reset`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log(response)
    if (response.message == "OPERATION SUCCESSFUL") {
      console.log("reset password Success!")
      // history.push(`/payment?orderId=${response.data[0].idOrder}`);
    }
    else {
      console.log("reset password UnSuccess!")
    }

  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-content p-5 " style={{ backgroundColor: "#ffffff", maxWidth: "80%", top: "10%", maxHeight: "80vh", overflowY: "auto" }}>
          <button onClick={onClose} className="close-button" >X</button>
          <h2 className="text-center mb-4">Checkout </h2>

          <div className="row">
            <div className="order-details col-md-7 p-4 border ">
              <h4 className="text-center"> Order Details </h4>
              <div className="row">
                <div className="col-md-6 text-start table-header">
                  Ticket
                </div>

                <div className="col-md-2 text-center table-header">
                  Quantity
                </div>

                <div className="col-md-4 text-end table-header">
                  Amount
                </div>
              </div>
              {selectedTickets.map((ticket, index) => (
                <div className="order-detail-items" key={index}>
                  <div className="order-detail-item row align-items-center mb-3">
                    <div className=" col-md-6">
                      <strong className="block ticket-name">{ticket.ticketName}</strong>
                      <div className="ticket-price"> {ticket.ticketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'}</div>
                    </div>
                    <div className=" col-md-2 ticket-quantity text-center"> {ticketQuantities[ticket.ticketName]} </div>
                    <div className=" col-md-4 text-end ticket-total-price"> {(ticketQuantities[ticket.ticketName] * ticket.ticketPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'} </div>
                  </div>
                </div>
              ))}
              <p className="total my-2 text-end">
                <strong>Total Price:{" "}
                  {calculateTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VND
                </strong>
              </p>
            </div>

            {loginedUser.email ? (
              // Nếu loginedUser có giá trị
              <div className="col-md-5 contact-info border p-4 mx-auto ">
                <h3 className="text-center"> Contact Information  </h3>
                <form onSubmit={formik.handleSubmit}>
                  <TextField id="name" fullWidth
                    label="Full name *"
                    name="name"
                    type="name"
                    value={formik.values.name}
                    InputProps={{
                      readOnly: true,
                    }}

                  />
                  {formik.touched.name && formik.errors.name ? (
                    <Typography variant="caption" color="red" >
                      {formik.errors.name}
                    </Typography>
                  ) : null}

                  <TextField fullWidth
                    id="email"
                    label="Email *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="mt-3"
                    InputProps={{
                      readOnly: true,
                    }}

                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.email}
                    </Typography>
                  ) : null}

                  <TextField
                    fullWidth
                    className="mt-3"
                    id="phoneNumber"
                    label="Phone Number *"
                    name="phoneNumber"
                    type="phone"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.phoneNumber}
                    </Typography>
                  ) : null}

                  <div className=" my-3 text-center">
                    <Button variant="contained" type="submit" className="btn-confirm">
                      Confirm Payment
                    </Button>
                  </div>
                </form>
              </div>
            ) : ( // Nếu loginedUser KO có giá trị
              <div className="col-md-5 contact-info border p-4 mx-auto ">
                <h3 className="text-center"> Contact Information  </h3>
                <form onSubmit={formik.handleSubmit}>
                  <TextField id="name" fullWidth
                    label="Full name *"
                    name="name"
                    type="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}

                  />
                  {formik.touched.name && formik.errors.name ? (
                    <Typography variant="caption" color="red" >
                      {formik.errors.name}
                    </Typography>
                  ) : null}

                  <TextField fullWidth
                    id="email"
                    label="Email *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="mt-3"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.email}
                    </Typography>
                  ) : null}

                  <TextField
                    fullWidth
                    className="mt-3"
                    id="phoneNumber"
                    label="Phone Number *"
                    name="phoneNumber"
                    type="phone"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <Typography variant="caption" color="red">
                      {formik.errors.phoneNumber}
                    </Typography>
                  ) : null}

                  <div className=" my-3 text-center">
                    <Button variant="contained" type="submit" className="btn-confirm">
                      Confirm Payment
                    </Button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>
      </Modal>

      <Snackbar 
      open = {openMess}
      autoHideDuration={5000}
      onClose={handleCloseMess}
      anchorOrigin={
        {
          vertical: 'bottom',
          horizontal: 'right'
        }
      }
      >
        <Alert onClose={handleCloseMess} severity="error" sx={{width: '100%'}}>
          {messContent}
        </Alert>

      </Snackbar>


    </>

  );
}

export default PaymentModal;
