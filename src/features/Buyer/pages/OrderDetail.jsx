import React, { useEffect, useState } from "react";
import { Button, Tag } from 'antd';
import { useParams, useLocation } from "react-router-dom";
import '../style/OrderDetailStyle.css';
import { useSnackbar } from "notistack";
import Dialog from '@mui/material/Dialog';
import {  DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

function OrderDetail() {
    const [order, setOrder] = useState({});
    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
    const { idOrder } = useParams();
    const [ticketCounts, setTicketCounts] = useState(new Map());
    const [detailBill, setDetailBill] = useState({});
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const { billId, paymentStatus, timeCreated } = location.state;// Trích xuất dữ liệu từ props location
    console.log("detailBill", detailBill)

    useEffect(() => {

        let idAccount;
        if (localStorageValue) { // neu khong dang nhap => gọi API đăng ký guest
            const parsedAccountLogged = JSON.parse(localStorageValue);
            idAccount = (parsedAccountLogged.idAccount);
        }

        const apiUrl = `https://animall-400708.et.r.appspot.com/api/v1/orders/${idOrder}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((result) => {
                setOrder(result.data);
                const updatedTicketCounts = new Map(ticketCounts);
                result.data.tickets.forEach((ticket) => {
                    const { idTicket, ticketName, ticketPrice } = ticket;
                    if (!updatedTicketCounts.has(idTicket)) {
                        updatedTicketCounts.set(idTicket, { name: ticketName, count: 1, price: ticketPrice });
                    } else {
                        const currentCount = updatedTicketCounts.get(idTicket).count;
                        updatedTicketCounts.set(idTicket, { name: ticketName, count: currentCount + 1, price: ticketPrice });
                    }
                });
                setTicketCounts(updatedTicketCounts);
            })
            .catch((error) => {
                console.error('There was a problem with the API request:', error);
            });
        apiGetBill();


    }, []);

    const apiGetBill = async () => {
        try {
            const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/bills/${billId}`);
            const result = await response.json();
            setDetailBill(result.data.bill);// Cập nhật state với dữ liệu mới từ cơ sở dữ liệu
        } catch (error) {
            console.error('There was a problem with the API request:', error);
        }
    };

    const apiCancelOrder = async () => {

        const apiData = {
            paymentStatus: "Request refund",
            status: 1,
            timeCreate: timeCreated,
            qrCode: ""
        };

        let json = {
            method: 'PUT',
            body: JSON.stringify(apiData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/bills/${billId}`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
        if (response.message == "OPERATION SUCCESSFUL") {
            console.log("reset password Success!")
            apiGetBill();
        }
        else {
            console.log("reset password UnSuccess!")
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        apiCancelOrder();
        enqueueSnackbar("Request cancel order successfully", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        handleClose();
    };

    const setTagColor = (text) => {
        let tagColor;
        if (text === 'Paid') {
            tagColor = 'green'; // Đặt màu xanh cho trạng thái 'Paid'
        } else if (text === 'Pending') {
            tagColor = 'orange'; // Đặt màu cam cho trạng thái 'Pending'
        } else if (text === 'Refund') {
            tagColor = 'blue'; // Đặt màu xanh cho trạng thái 'Refund'
        } else if (text === 'Request refund') {
            tagColor = 'red'; // Đặt màu đỏ cho trạng thái 'Request refund'
        }
        return tagColor;
    };

    return (
        <>
            {detailBill.idBill ? (
                <div className="order-detail-container px-5 py-3 bg-white">

                    <h3 className="text-center ">Order Detail</h3>

                    <p>

                        <strong>Bill ID:</strong> {billId}
                    </p>

                    <p>
                        <strong>Quantity:</strong> {order.quantity}
                    </p>

                    <p>
                        <strong>Status:</strong> <Tag  color={setTagColor(detailBill.paymentStatus)}>{detailBill.paymentStatus}</Tag>
                    </p>
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
                    {Array.from(ticketCounts.values()).map((ticket, index) => (

                        <div className="order-detail-items" key={index}>
                            <div className="order-detail-item row align-items-center mb-3">
                                <div className=" col-md-6">
                                    <strong className="block ticket-name text-ellipsis">{ticket.name}</strong>
                                    <div className="ticket-price"> {ticket.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'} </div>
                                </div>
                                <div className=" col-md-2 ticket-quantity text-center">  {ticket.count} </div>
                                <div className=" col-md-4 text-end ticket-total-price"> {(ticket.count * ticket.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'} </div>
                            </div>
                        </div>


                    ))}

                    <div className="d-flex justify-content-between row">
                        {order.totalPrice ? (
                            <>
                                <div className="col-md-6">
                                    {(detailBill.paymentStatus == "Pending" || paymentStatus == "Paid") ? (
                                        <Button className="my-3" danger onClick={handleOpen}> Cancel Order </Button>
                                    ) : null}
                                </div>

                                <p className="col-md-6 total p-3 text-end mb-0">

                                    <strong>Total Price :{" "}
                                        {order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'}
                                    </strong>
                                </p>
                            </>
                        ) : null}
                    </div>


                </div>
            ) : null}

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle  className="fw-bold">Are you sure you want to cancel this order?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        When the cancel request order is accepted by staff, you will receive the refund amount!
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="m-auto mb-3">
                    <Button onClick={handleClose} color="primary">
                       No, I don't want to cancel
                    </Button>
                    <Button onClick={handleConfirm} danger>
                    Yes, i want to cancel order
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    );
}

export default OrderDetail;
