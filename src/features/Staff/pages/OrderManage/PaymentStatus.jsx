import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Dialog,
    Grid,
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
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import ConfirmPayment from "./OrderManageDialog/ConfirmPayment";
import ConfirmAlert from "./OrderManageDialog/ConfirmAlert";
import '../styles/PaymentStatus.css';
import CancelPayment from "./OrderManageDialog/CancelPayment";
import CancelAlert from "./OrderManageDialog/CancelAlert";
import ErrorAlert from "./OrderManageDialog/ErrorAlert";
import UseBill from "./OrderManageDialog/UseBill";
import UseBillAlert from "./OrderManageDialog/UseBillAlert";

function PaymentStatus(props) {
    const [searchValue, setSearchValue] = useState("");
    const [orderData, setOrderData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [useDialogOpen, setUseDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [filteredOrderData, setFilteredOrderData] = useState([]);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [useSuccess, setUseSuccess] = useState(false);
    const [cancelSuccess, setCancelSuccess] = useState(false);
    const [updateFail, setUpdateFail] = useState(false);
    const [perPage, setPerPage] = useState(10); // Số lượng dữ liệu trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    //Confirm Data
    const [confirmData, setConfirmData] = useState({
        paymentStatus: "Paid",
        status: "true"
    });

     //Use Bill Data
     const [useData, setUseData] = useState({
        paymentStatus: "Used",
        status: "true"
    });

    //Cancel Data
    const [cancelData, setCancelData] = useState({
        paymentStatus: "Canceled",
        status: "true"
    });

    //Handle use bill
    const handleUseBill = async () => {
        try {
            console.log(useData)
            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/bills/${selectedOrder.idBill}`, useData);
            console.log("Use success", response.data.data);
            handelCloseUseDialog();
            setUseSuccess(true);
            setTimeout(() => {
                setUseSuccess(false);
            }, 3000);
            fetchData(currentPage);
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    };

    //Use Dialog
    const handleOpenUseDialog = (order) => {
        setSelectedOrder(order);
        console.log("select order", selectedOrder)
        setUseData({
            paymentStatus: "Used",
            status: "true",
        });
        setUseDialogOpen(true);
    };

    const handelCloseUseDialog = () => {
        setUseDialogOpen(false);
    }

    //Confirm Handle
    const handleConfirmOrder = async () => {
        try {
            console.log(confirmData)
            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/bills/${selectedOrder.idBill}`, confirmData);
            console.log("Confirm success", response.data.data);
            handelCloseConfirmDialog();
            setConfirmSuccess(true);
            setTimeout(() => {
                setConfirmSuccess(false);
            }, 3000);
            fetchData(currentPage);
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    };

    //Confirm Dialog
    const handleOpenConfirmDialog = (order) => {
        setSelectedOrder(order);
        console.log("select order", selectedOrder)
        setConfirmData({
            paymentStatus: "Paid",
            status: "true",
        });
        setConfirmDialogOpen(true);
    };

    const handelCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    }

    //Cancel Handle
    const handleCancelOrder = async () => {
        try {
            console.log(cancelData)
            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/bills/${selectedOrder.idBill}`, cancelData);
            console.log("Cancel success", response.data.data);
            handelCloseCancelDialog();
            setCancelSuccess(true);
            setTimeout(() => {
                setCancelSuccess(false);
            }, 3000);
            fetchData(currentPage);
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    };

    //Cancel Dialog
    const handleOpenCancelDialog = (order) => {
        setSelectedOrder(order);
        console.log("select order", selectedOrder)
        setCancelData({
            paymentStatus: "Canceled",
            status: "true",
        });
        setCancelDialogOpen(true);
    };

    const handelCloseCancelDialog = () => {
        setCancelDialogOpen(false);
    }

    //Fetch all order list
    async function fetchData(page) {
        try {
            const response = await axios.get(`http://animall-400708.et.r.appspot.com/api/v1/bills/`);
            const data = response.data.data;
            const paymentStatusesToFetch = ["Paid", "Pending", "Used"];
            const getPaymentStatuses = data.filter(
                (bill) =>
                    bill.paymentStatus &&
                    paymentStatusesToFetch.includes(bill.paymentStatus)
            );
            // Tính toán chỉ số bắt đầu và kết thúc của dữ liệu trên trang hiện tại
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            // Lấy dữ liệu của trang hiện tại bằng cách slice mảng getPaymentStatuses
            const currentPageData = getPaymentStatuses.slice(startIndex, endIndex);
            setTotalPages(Math.ceil(getPaymentStatuses.length / perPage)); // Cập nhật tổng số trang
            setOrderData(currentPageData); // Cập nhật dữ liệu tài khoản
        } catch (error) {
            console.error(error);
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(true);
            }, 3000);
        }
    }

    useEffect(() => {
        fetchData(1);
    }, []);

    //Handle Page
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
        fetchData(newPage);
    }

    //Search by idBill
    useEffect(() => {
        filterOrderData();
    }, [searchValue, orderData]);

    function filterOrderData() {
        if (Array.isArray(orderData)) {
            const filteredData = orderData.filter((order) => {
                // Kiểm tra xem searchValue có phải là số hay không
                const isNumber = !isNaN(searchValue);
                // Chuyển đổi số idBill thành chuỗi và so sánh với searchValue
                const idBillString = order.idBill.toString();
                return isNumber && idBillString.includes(searchValue.toString());
            });

            setFilteredOrderData(filteredData);
        }
    }

    //Status color
    const getStatusBackgroundColor = (status) => {
        if (status === "Paid") {
            return { backgroundColor: "green", color: "white" };
        } else if (status === "Pending") {
            return { backgroundColor: "orange", color: "white" };
        } else {
            return { backgroundColor: "white", color: "green", };
        }
        return {};
        // if (status === "Pending")
    };

    //Body
    return (

        <div className="order-manage-container">
            <Grid item xs>
                {/* Order table */}
                <TableContainer component={Paper}>
                    {/* Order title */}
                    <div className="order-manage-table-title">
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginLeft: '20px'
                            }}>
                            Order List
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
                                <TableCell align="left">Bill No.</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Total Price</TableCell>
                                <TableCell align="center">Time Create </TableCell>
                                <TableCell align="left">Payment Status</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* No search results */}
                            {filteredOrderData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2">No results found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Search found
                                filteredOrderData.map((order) => (
                                    <TableRow key={order.idBill}>
                                        <TableCell align="left">{order.idBill}</TableCell>
                                        <TableCell align="center">
                                            <button className="price-but">
                                                {order.quantity}
                                            </button>
                                        </TableCell>
                                        <TableCell align="center">{order.totalPrice}$</TableCell>
                                        <TableCell align="center">
                                            <button className="status-but">
                                                {format(new Date(order.timeCreate), 'dd/MM/yyyy')}
                                            </button>
                                            <button className="status-but"
                                                style={{ marginLeft: '10px' }}>
                                                {format(new Date(order.timeCreate), 'hh:mm a')}
                                            </button>
                                        </TableCell>
                                        <TableCell align="left">

                                            <button className="status-but"
                                                style={getStatusBackgroundColor(order.paymentStatus)}>
                                                {order.paymentStatus}
                                            </button>

                                        </TableCell>
                                        <TableCell align="center" sx={{ display: 'flex', gap: '8px' }}>

                                            {/* Confirm Button */}
                                            {order.paymentStatus === "Used" ? (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    disabled
                                                >
                                                    Use Bill
                                                </Button>

                                            ) : (


                                                order.paymentStatus === "Paid" ? (
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => handleOpenUseDialog(order)}
                                                    >
                                                        Use bill
                                                    </Button>
                                                ) : (

                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="success"
                                                        onClick={() => handleOpenConfirmDialog(order)}
                                                    >
                                                        Confirm
                                                    </Button>
                                                )

                                            )}

                                            {/* Cancel button */}
                                            {order.paymentStatus === "Used" ? (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    disabled
                                                >
                                                    <Typography>
                                                        <CancelOutlinedIcon />
                                                    </Typography>
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleOpenCancelDialog(order)}
                                                >
                                                    <Typography>
                                                        <CancelOutlinedIcon />
                                                    </Typography>
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        {/* Confirm Alert */}
                        {confirmSuccess && (
                            <ConfirmAlert />
                        )}

                        {/* Use Bill Alert */}
                        {useSuccess && (
                            <UseBillAlert />
                        )}

                        {/* Cancel alert */}
                        {cancelSuccess && (
                            <CancelAlert />
                        )}

                        {/* Fail alert */}
                        {updateFail && (
                            <ErrorAlert />
                        )}
                    </Table>
                </TableContainer>

                {/* Confirm Dialog */}
                <Dialog open={confirmDialogOpen} onClose={handelCloseConfirmDialog}>
                    <ConfirmPayment
                        handelCloseConfirmDialog={handelCloseConfirmDialog}
                        handleConfirmOrder={handleConfirmOrder}
                    />
                </Dialog>

                {/* Use Bill Dialog */}
                <Dialog open={useDialogOpen} onClose={handelCloseUseDialog}>
                    <UseBill
                        handelCloseUseDialog={handelCloseUseDialog}
                        handleUseBill={handleUseBill}
                    />
                </Dialog>

                {/* Cancel Dialog */}
                <Dialog open={cancelDialogOpen} onClose={handelCloseCancelDialog}>
                    <CancelPayment
                        handelCloseCancelDialog={handelCloseCancelDialog}
                        handleCancelOrder={handleCancelOrder}
                    />
                </Dialog>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </Grid>
        </div >
    );
}

export default PaymentStatus;
