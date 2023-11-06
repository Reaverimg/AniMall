import React, { useEffect, useState } from "react";
import {
    Button, List, ListItem, ListItemIcon, ListItemText, TextField, IconButton,
} from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckoutModal from "./CheckoutModal";
import '../style/BuyTicketPageStyle.css'

function BuyerPage() {
    const [ticketList, setTicketList] = useState([]);
    const [ticketQuantities, setTicketQuantities] = useState({});
    const [selectedTicketIds, setSelectedTicketIds] = useState([]);

    const handleIncrease = (ticketName, ticketId) => {
        setTicketQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ticketName]: (prevQuantities[ticketName] || 0) + 1,
        }));
        setSelectedTicketIds((prevIds) => [...prevIds, ticketId]);
    };

    const handleDecrease = (ticketName, ticketId) => {
        setTicketQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ticketName]: Math.max((prevQuantities[ticketName] || 0) - 1, 0),
        }));
        setSelectedTicketIds((prevIds) =>
            prevIds.filter((id) => id !== ticketId)
        );
    };

    const handleQuantityChange = (ticketName, ticketId, newValue) => {
        // Đảm bảo giá trị nhập liệu không âm
        const parsedValue = Math.max(parseInt(newValue, 10), 0);

        setTicketQuantities((prevQuantities) => ({
            ...prevQuantities,
            [ticketName]: parsedValue,
        }));
        // Cập nhật danh sách ID vé được chọn dựa trên số lượng
        const newSelectedIds = [];
        for (const [name, quantity] of Object.entries(ticketQuantities)) {
            for (let i = 0; i < quantity; i++) {
                newSelectedIds.push(ticketId);
            }
        }
        setSelectedTicketIds(newSelectedIds);
    };

    //API call all tickets => add reponse in a list
    useEffect(() => {
        const apiUrl = 'https://animall-400708.et.r.appspot.com/api/v1/tickets/';

        // Gọi API bằng phương thức GET sử dụng fetch
        fetch(apiUrl)
            .then((response) => response.json())
            .then((result) => {
                setTicketList(result.data);

            })
            .catch((error) => {
                console.error('There was a problem with the API request:', error);
            });
    }, []);


    // State for modal
    const [showModal, setShowModal] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    const selectedTickets = ticketList.filter((ticket) => ticketQuantities[ticket.ticketName] > 0);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const ticket of selectedTickets) {
            const quantity = ticketQuantities[ticket.ticketName] || 0;
            totalPrice += ticket.ticketPrice * quantity;
        }
        return totalPrice;
    };

    return (
        <>
            <div id="buy-ticket-container">
                <div id="buy-ticket-banner">
                    <div className="buy-ticket-banner-text">
                        <h1 className="text-heading">ZOO ENTRY TICKET</h1>
                    </div>
                </div>

                <div className="buy-ticket-body p-5">
                    <div className="row justify-content-center ">
                        <div
                            className="buy-ticket-body-left mr-5 col-md-7 px-5" >
                            <h1 className="mb-3">ZOO ENTRY</h1>
                            <img className="entry-img mb-3" src="https://res.cloudinary.com/dsgm85ekm/image/upload/v1697059004/zoo_uh28dr.jpg"></img>
                            <div className="information">

                                <p> <strong>  All tickets </strong></p>
                                <p> <strong>Ticket duration:</strong> 1 Day (approx.) </p>
                                <p> <strong>Payment duration:</strong> 2 Days (approx.) </p>
                                <p> <strong>Location:</strong> FPT University, 9 District, Ho Chi Minh City</p>
                                <p> <strong>Product code:</strong> Zoo Entry</p>

                                <p> Come and visit Viet Nam's first zoo to get up close and personal to native treasures and endangered animals from around the world.</p>

                                <p>Child entry applies for 3-14 year olds, and under 3s are free. All children under the age of 14 must be accompanied by an adult when visiting the Zoo.</p>

                                <p>Zoo Entry Tickets purchased online are valid for 30 Days from purchase date.</p>

                                <p>If you are looking for tickets to a special event or current discounted offer, these cannot be booked here. Please visit the relevant event or offer webpage for more information.</p>

                                <p>Please email us at <a href="mailto:animallzoo@gmail.com">animallzoo@gmail.com</a> for more information.</p>
                            </div>
                        </div>

                        <div className="buy-ticket-body-right  col-md-5 px-3 pt-4rem" >
                            <div className="ticket-list-title">
                                Start Booking Now
                            </div>
                            {ticketList.length > 0 ? (
                                <>
                                    <div className="ticket-list text-end">
                                        <List >
                                            {ticketList.map((ticket, index) => (
                                                <ListItem key={index}>
                                                    <ListItemIcon>
                                                        <ConfirmationNumberIcon />
                                                    </ListItemIcon>

                                                    <ListItemText
                                                        primary={
                                                            <>
                                                                <div className="overflow-ellipsis"> <strong>{ticket.ticketName}</strong> </div>
                                                                <div> {ticket.ticketPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' VND'}</div>
                                                            </>
                                                        }

                                                    />
                                                    <ListItemIcon className="quantity">
                                                        <>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => handleDecrease(ticket.ticketName, ticket.idTicket)}
                                                            >
                                                                <RemoveIcon />
                                                            </IconButton>
                                                            <TextField
                                                                type="number"
                                                                value={ticketQuantities[ticket.ticketName] || 0}
                                                                inputProps={{ min: 1 }}
                                                                onChange={(e) => handleQuantityChange(ticket.ticketName, ticket.idTicket, e.target.value)}
                                                            />
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => handleIncrease(ticket.ticketName, ticket.idTicket)}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </>
                                                    </ListItemIcon>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                    <h1 className="total-price mt-3">Total:  {calculateTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}VND</h1>
                                    <div className="buy-now-button text-right">
                                        <Button
                                            className={(ticketQuantities == 0 || selectedTickets.length === 0) ? "buy-now-btn" : ""}
                                            type="primary"
                                            size="large"
                                            style={
                                                {
                                                    backgroundColor: "#435334",
                                                    color: '#ffffff',

                                                }
                                            }
                                            onClick={openModal}
                                            disabled={ticketQuantities == 0 || selectedTickets.length === 0}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>

                                    <CheckoutModal
                                        open={showModal}
                                        onClose={closeModal}
                                        ticketList={ticketList}
                                        ticketQuantities={ticketQuantities}
                                        selectedTicketIds={selectedTicketIds}
                                    />
                                </>
                            ) : (
                                <div> loading data</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyerPage;