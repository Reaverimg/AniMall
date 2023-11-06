import React, { useEffect, useState } from "react";
import { Button, Tag } from 'antd';
import { useParams, useLocation } from "react-router-dom";
import '../style/OrderDetailStyle.css'
import { format } from "date-fns";

function OrderDetail() {
    const [order, setOrder] = useState({});
    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
    const { idOrder } = useParams();
    const [ticketCounts, setTicketCounts] = useState(new Map());
    const location = useLocation();
    const { billId, paymentStatus, timeCreated } = location.state;// Trích xuất dữ liệu từ props location

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
    }, []);

    const apiCancelOrder = async () => {

        const apiData = {
            paymentStatus : "Request refund",
            status: 1,
            timeCreate: timeCreated,
            qrCode: ""
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

            <div className="order-detail-container px-5 py-3">

                <h3 className="text-center ">Order Detail</h3>

                <p>

                    <strong>Bill ID:</strong> {billId}
                </p>

                <p>
                    <strong>Quantity:</strong> {order.quantity}
                </p>

                <p>
                    <strong>Status:</strong> <Tag>{paymentStatus}</Tag> 
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
                                <strong className="block ticket-name">{ticket.name}</strong>
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
                        {paymentStatus == "Pending" ? (
                                <Button className="my-3" danger> Cancel Order </Button>
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

        </>

    );
}

export default OrderDetail;
