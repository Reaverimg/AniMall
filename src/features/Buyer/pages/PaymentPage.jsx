import React, { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import './PaymentPageStyle.css'
import { useHistory, useLocation } from 'react-router-dom';

function PaymentPage() {

  const location = useLocation();
  const history = useHistory();

  // Lấy giá trị của query parameter 'orderId'
  const orderId = new URLSearchParams(location.search).get("orderId");


  useEffect(() => {
    if (orderId === null) {
      // Nếu orderId là null, tự động chuyển hướng người dùng về trang "buyTicket"
      history.push(`/buyTicket`);
    }
  }, [orderId, history]);

  const handlePaidClick = () => {
    apiCreateBill();
    openModal();

  }

  // State for modal
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleOKClick = () => {
    setShowModal(false);
    history.push(`/buyTicket`);
  };

  const handleCancelClick = () => {
    apiDeleteOrder();
  }

  const apiCreateBill = async () => {
    const apiData = {
      orderId: orderId,
      paymentStatus: "Pending",
      timeCreate: new Date(),
      status: true
    };

    let json = {
      method: 'POST',
      body: JSON.stringify(apiData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    const response = await fetch(`http://animall-400708.et.r.appspot.com/api/v1/bills/`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log(response)
    if (response.message == "OPERATION SUCCESSFUL") {
      console.log("id bill", response.data.idBill)
    }
    else {
      console.log("create bill UnSuccess!")
    }
  };

  const apiDeleteOrder = async () => {

    let json = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    const response = await fetch(`http://animall-400708.et.r.appspot.com/api/v1/orders/${orderId}`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log(response)
    if (response.message == "OPERATION SUCCESSFUL") {
      console.log("delete order Success!")
      history.push(`/buyTicket`);

    }
    else {
      console.log("delete order UnSuccess!")
    }

  };

  return (
    <>

      {orderId && (
        <div className="modal-content p-5" >
          <h2 className="text-center mb-4">Payment QR Code </h2>
          <div className="text-center">
            {/* Hiển thị mã QR code ở đây */}
            <img src="https://www.qrcode-gen.com/images/qrcode-default.png" width={"20%"}></img>
          </div>
          <div className="order-id text-center ">
            This is your booking ID: <strong>{orderId}</strong>
          </div>
          <div className="text-center mb-5">
            Scan this QR code and please include it in your <strong>payment message</strong>! Thank you!
          </div>
          <div className="btn-group">
            <Button id="btn-cancel" className="mx-3" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" id="btn-paid" className="mx-3" onClick={handlePaidClick}>
              Paid
            </Button>
          </div>
        </div>
      )}
      <Modal open={showModal}>
        <div className="modal-content p-3 " style={{ backgroundColor: "#ffffff", maxWidth: "30%", top: "15%", maxHeight: "80vh", alignItems: "center" }}>
          <img src="https://res.cloudinary.com/dsgm85ekm/image/upload/v1697785551/happystate_jxvhg8.gif"
            style={{ maxWidth: "50%" }}></img>
          <h3>Order successfully</h3>
          <p> Check your email for a QR code.<br /> We will see you soon. Thank you!</p>
          <Button className="btn-modal-ok mb-3" onClick={handleOKClick}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default PaymentPage;
