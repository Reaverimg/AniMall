import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Paper from '@mui/material/Paper';
import DeleteDialog from "./TicketDialog/DeleteDialog";
import RegisterForm from "./TicketDialog/RegistrationForm";
import CloseIcon from '@mui/icons-material/Close';
import UpdateDialog from "./TicketDialog/UpdateDialog";
import UpdateAlert from "./TicketDialog/UpdateAlert";
import DeleteAler from "./TicketDialog/DeleteAlert";
import RegistrationAlert from "./TicketDialog/RegistrationAlert";
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorAlert from "./TicketDialog/ErrorAlert";
import "../pages/styles/TicketManage.css";
import { GET_ALL_TICKET_MANAGE, PUT_TICKET_MANAGE } from "../../../api/SwaggerAPI";
function TicketManage(props) {
    const [searchValue, setSearchValue] = useState("");
    const [ticketData, setTicketData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [filteredTicketData, setFilteredTicketData] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [registereSuccess, setRegisterSuccess] = useState(false);
    const [updateFail, setUpdateFail] = useState(false);
    const [perPage, setPerPage] = useState(10); // Số lượng dữ liệu trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    //Update ticket data
    const [updateData, setUpdateData] = useState({
        idTicket: "",
        ticketName: "",
        ticketPrice: "",
        ticketType: "",
        status: ""
    });

    //Delete ticket data
    const [deleteData, setDeleteData] = useState({
        idTicket: "",
        ticketName: "",
        ticketPrice: "",
        ticketType: "",
        status: "false"
    });

    //Active ticket data
    const [activeData, setActiveData] = useState({
        idTicket: "",
        ticketName: "",
        ticketPrice: "",
        ticketType: "",
        status: "true"
    });

    //Update ticket dialog
    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
    };

    //Handle Update ticket
    const handleUpdateTicket = async () => {
        console.log(updateData);
        if (!updateData.ticketName || !updateData.ticketPrice || !updateData.ticketType) {
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(false);
            }, 2000);
            return;
        }
        try {
            const response = await axios.put(`${PUT_TICKET_MANAGE}${selectedTicket.idTicket}`, updateData);
            console.log("Ticket updated successfully:", response.data.data);
            handleCloseUpdateDialog();
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            fetchData(currentPage);
        } catch (error) {
            console.error("Error updating ticket:", error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(false);
            }, 3000);
        }
    };

    //Open Update dialog
    const handleOpenUpdateDialog = (ticket) => {
        setSelectedTicket(ticket);
        console.log("select ticket", selectedTicket)
        setUpdateData({
            idTicket: ticket.idTicket,
            ticketName: ticket.ticketName,
            ticketPrice: ticket.ticketPrice,
            ticketType: ticket.ticketType,
            status: ticket.status
        });
        setUpdateDialogOpen(true);
    };

    //Create ticket dialog
    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    };

    const handleOpenCreateialog = () => {
        setCreateDialogOpen(true);
    };

    //Open Delete dialog
    const handleOpenDeletetDialog = (ticketD) => {
        setSelectedTicket(ticketD);
        setDeleteData({
            idTicket: ticketD.idTicket,
            ticketName: ticketD.ticketName,
            ticketPrice: ticketD.ticketPrice,
            ticketType: ticketD.ticketType,
            status: "false"
        });
        console.log("delete trươc khi gui", setDeleteData);
        setDeleteDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    //Handle delete ticket
    const handleDeleteTicket = async () => {
        try {
            console.log(deleteData)
            const response = await axios.put(`https://animall-400708.et.r.appspot.com/api/v1/tickets/${selectedTicket.idTicket}`, deleteData);
            console.log("Delete success", response.data.data);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 3000);
            fetchData(currentPage);
            handleCloseDeleteDialog(true);
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    };

    //Un Disable Ticket
    const handleActiveTicket = async (ticketD) => {

        setSelectedTicket(ticketD);
        setActiveData({
            idTicket: ticketD.idTicket,
            ticketName: ticketD.ticketName,
            ticketPrice: ticketD.ticketPrice,
            ticketType: ticketD.ticketType,
            status: "false"
        });
        console.log("Active trươc khi gui", setActiveData);

        try {
            const response = await axios.put(`https://animall-400708.et.r.appspot.com/api/v1/tickets/${selectedTicket.idTicket}`, activeData);
            console.log("Active success", response.data.data);
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            fetchData();
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    };

    // Get all ticket
    async function fetchData(page) {
        try {
            const response = await axios.get(GET_ALL_TICKET_MANAGE);
            const data = response.data.data;
            // Tính toán chỉ số bắt đầu và kết thúc của dữ liệu trên trang hiện tại
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            // Lấy dữ liệu của trang hiện tại bằng cách slice mảng getRoles
            const currentPageData = data.slice(startIndex, endIndex);
            setTotalPages(Math.ceil(data.length / perPage)); // Cập nhật tổng số trang
            console.log(currentPageData)
            setTicketData(currentPageData);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData(1);
    }, []);

    //Handle page
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage); // Cập nhật trang hiện tại khi người dùng chuyển trang
        fetchData(newPage);
    }

    //Search by name
    useEffect(() => {
        filterTicketData();
    }, [searchValue, ticketData]);
    function filterTicketData() {
        if (Array.isArray(ticketData)) {
            const filteredData = ticketData.filter((ticket) =>
                ticket.ticketName.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredTicketData(filteredData);
        }
    }

    //Status color
    const getStatusBackgroundColor = (status) => {
        if (status === "true") {
            return { backgroundColor: "green", color: "white" };
        } else if (status === "false") {
            return { color: "gray" };
        }
    };

    //Body
    return (

        <div className="ticket-manage-account-container">
            <Grid item xs>

                {/* Create new ticket button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenCreateialog}>
                    Create Ticket
                </Button>
                <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
                    <DialogTitle>
                        Create New Ticket
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseCreateDialog}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <RegisterForm
                            currentPage={currentPage}
                            fetchData={fetchData}
                            setRegisterSuccess={setRegisterSuccess}
                            handleCloseCreateDialog={handleCloseCreateDialog}
                        />
                    </DialogContent>
                </Dialog>

                {/* Ticket table */}
                <TableContainer component={Paper}>

                    {/* Table title */}
                    <div className="ticket-manage-table-title">
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginLeft: '20px'
                            }}>
                            Ticket List
                        </span>
                        <TextField
                            label="Search"
                            variant="outlined"
                            size="small"
                            style={{
                                marginLeft: 'auto',
                                marginRight: '10px',
                                backgroundColor: 'white'
                            }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <Table >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* No search results */}
                            {filteredTicketData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2">No results found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Search found
                                filteredTicketData && filteredTicketData.map((ticket) => (
                                    <TableRow key={ticket.idTicket}>
                                        <TableCell align="left">{ticket.ticketName}</TableCell>

                                        <TableCell align="left">
                                            <button className="price-but" style={{width:'60px'}}>
                                                {ticket.ticketPrice}
                                            </button>VND</TableCell>
                                        <TableCell align="left">{ticket.ticketType}</TableCell>
                                        <TableCell align="left">
                                            <div>
                                                <button className="status-but" 
                                                    style={getStatusBackgroundColor(ticket.status.toString())}>
                                                    {ticket.status ? "Active" : "Disable"}
                                                </button>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" sx={{ display: 'flex', gap: '8px' }}>

                                            {ticket.status === true ? (
                                                //Delete button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleOpenDeletetDialog(ticket)}
                                                >
                                                    <DeleteOutlinedIcon />
                                                </Button>
                                            ) : (
                                                //Active button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => { handleActiveTicket(ticket) }}
                                                >
                                                    <RefreshIcon />
                                                </Button>
                                            )}

                                            {/* Update Button */}
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                onClick={() => handleOpenUpdateDialog(ticket)}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        {/* Open Update dialog */}
                        <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
                            <UpdateDialog
                                updateData={updateData}
                                setUpdateData={setUpdateData}
                                handleCloseUpdateDialog={handleCloseUpdateDialog}
                                handleUpdateTicket={handleUpdateTicket}
                                updateFail={updateFail}
                            />
                        </Dialog >

                        {/* Open Delete dialog */}
                        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                            <DeleteDialog
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleDeleteTicket={handleDeleteTicket}
                            />
                        </Dialog>

                        {/* Update alert  */}
                        {updateSuccess && (
                            <UpdateAlert />
                        )}

                        {/* Delete alert  */}
                        {deleteSuccess && (
                            <DeleteAler />
                        )}

                        {/* Delete alert  */}
                        {registereSuccess && (
                            <RegistrationAlert />
                        )}

                        {/* Fail alert */}
                        {/* {updateFail && (
                            <ErrorAlert />
                        )} */}
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </Grid>
        </div>
    );
}

export default TicketManage;
