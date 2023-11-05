import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Paper from '@mui/material/Paper';
import "../pages/styles/AccountManage.css";
import DeleteDialog from "./AdminDialog/DeleteDialog";
import RegisterForm from "./AdminDialog/RegistrationForm";
import CloseIcon from '@mui/icons-material/Close';
import UpdateDialog from "./AdminDialog/UpdateDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import UpdateAlert from "./AdminDialog/UpdateAlert";
import DeleteAler from "./AdminDialog/DeleteAlert";
import RegistrationAlert from "./AdminDialog/RegistrationAlert";
import ErrorAlert from "./AdminDialog/ErrorAlert";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Link } from 'react-router-dom';

function AccountManage(props) {
    const [searchValue, setSearchValue] = useState("");
    const [accountData, setAccountData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [filteredAccountData, setFilteredAccountData] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [registereSuccess, setRegisterSuccess] = useState(false);
    const [updateFail, setUpdateFail] = useState(false);
    const [unbanFail, setUbanFail] = useState(false);
    const [perPage, setPerPage] = useState(10); // Số lượng dữ liệu trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    //Update data
    const [formData, setFormData] = useState({
        idAccount: "",
        roleId: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: ""
    });

    //Delete data
    const [deleteData, setDeleteData] = useState({
        idAccount: "",
        roleId: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: "false"
    });

    //Unban data
    const [unbanData, setUnbandata] = useState({
        idAccount: "",
        roleId: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: "true"
    });

    //Create account dialog
    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    };

    const handleOpenCreateialog = () => {
        setCreateDialogOpen(true);
    };

    //Delete account dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };


    //Update account dialog
    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
    };

    // Handle updating the account
    const handleUpdateAccount = async () => {
        if (!formData.name || !formData.email || !formData.phoneNumber) {
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(false);
            }, 2000);
            return;
        }
        try {
            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/accounts`, formData);
            console.log("Account updated successfully:", response.data);
            handleCloseUpdateDialog();
            setUpdateSuccess(true)
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            fetchData(currentPage);

        } catch (error) {
            console.error("Error updating account:", error);
            setUbanFail(true);
            setTimeout(() => {
                setUbanFail(false);
            }, 3000);
        }
    };

    const handleOpenUpdateDialog = (account) => {
        setSelectedAccount(account);
        setFormData({
            idAccount: account.idAccount,
            roleId: account.role.id,
            name: account.name,
            email: account.email,
            phoneNumber: account.phoneNumber,
            status: account.status
        });
        setUpdateDialogOpen(true);

    };

    //Handle Delete account
    const handleDeleteAccount = async () => {
        try {

            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/accounts`, deleteData);
            console.log("Account delete successfully:", response.data);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false)
            }, 3000);
            handleCloseDeleteDialog();
            fetchData(currentPage);
        } catch (error) {
            console.error("Error delete account:", error);
            setUbanFail(true);
            setTimeout(() => {
                setUbanFail(false);
            }, 3000);
        }
    };

    const handleOpenDeleteDialog = (accountD) => {
        setSelectedAccount(accountD);
        setDeleteData({
            idAccount: accountD.idAccount,
            roleId: accountD.role.id,
            name: accountD.name,
            email: accountD.email,
            phoneNumber: accountD.phoneNumber,
            status: "false"
        });
        setDeleteDialogOpen(true);
    };

    //Handel Unban acocunt
    const handleUnbanAccount = async (accountID) => {

        setSelectedAccount(accountID);
        setUnbandata({
            idAccount: accountID.idAccount,
            roleId: accountID.role.id,
            name: accountID.name,
            email: accountID.email,
            phoneNumber: accountID.phoneNumber,
            status: "true"
        });

        try {
            const response = await axios.put(`http://animall-400708.et.r.appspot.com/api/v1/accounts`, unbanData);
            console.log("Account unban successfully:", response.data);
            fetchData(currentPage);
            setUpdateSuccess(true);
            setTimeout(() => {
                setUpdateSuccess(false)
            }, 3000);
        } catch (error) {
            console.error("Error unban account:", error);
            setUbanFail(true);
            setTimeout(() => {
                setUbanFail(false);
            }, 3000);
        }
    };

    //get all account
    async function fetchData(page) {
        try {
            const response = await axios.get(
                `http://animall-400708.et.r.appspot.com/api/v1/accounts`
            );
            const data = response.data.data;
            const rolesToFetch = ["TRAINER", "ADMIN", "USER", "STAFF"];
            const getRoles = data.filter(
                (account) =>
                    account.role && rolesToFetch.includes(account.role.roleDesc)
            );
            // Tính toán chỉ số bắt đầu và kết thúc của dữ liệu trên trang hiện tại
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            // Lấy dữ liệu của trang hiện tại bằng cách slice mảng getRoles
            const currentPageData = getRoles.slice(startIndex, endIndex);
            setTotalPages(Math.ceil(getRoles.length / perPage)); // Cập nhật tổng số trang
            setAccountData(currentPageData); // Cập nhật dữ liệu tài khoản
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(1);
    }, []);
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
        fetchData(newPage);
    }

    //Search by name
    useEffect(() => {
        filterAccountData();
    }, [searchValue, accountData]);
    function filterAccountData() {
        const filteredData = accountData.filter((account) =>
            account.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredAccountData(filteredData);
    }

    //Role color
    const getRowBackgroundColor = (role) => {
        if (role === "USER") {
            return { backgroundColor: "deepskyblue", color: "white" };
        } else if (role === "ADMIN") {
            return { backgroundColor: "darkorange", color: "white" };
        } else if (role === "STAFF") {
            return { backgroundColor: "green", color: "white" };
        } else if (role === "TRAINER") {
            return { backgroundColor: "crimson", color: "white" };
        }
    };

    //Status color
    const getStatusBackgroundColor = (status) => {
        if (status === "true") {
            return { backgroundColor: "green", color: "white" };
        } else if (status === "false") {
            return { color: "gray" };
        }
        return {};
    };

    //Body
    return (

        <div className="admin-account-container">
            <Grid item xs>

                {/* Create new account button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenCreateialog}>
                    Create Account
                </Button>

<Link to='/admin/setting'>
                <Button
                    variant="outlined"
                    color="success"
                    sx={{fontSize:'30px'}}
                >   
                   <SettingsSuggestIcon  />
                </Button>
                </Link>

                <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
                    <DialogTitle>
                        Create New Account
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

                {/* Account table */}
                <TableContainer component={Paper}>

                    {/* Table title */}
                    <div className="admin-table-title">
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginLeft: '20px'
                            }}>
                            Account List
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
                                <TableCell align="left">User Name</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Phone Number</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* No search results */}
                            {filteredAccountData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2">No results found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Search found
                                filteredAccountData.map((account) => (
                                    <TableRow key={account.idAccount}>
                                        <TableCell align="left">{account.name}</TableCell>
                                        <TableCell align="left">
                                            <button className="role-but" style={getRowBackgroundColor(account.role.roleDesc)}>
                                                {account.role.roleDesc}
                                            </button>
                                        </TableCell>
                                        <TableCell align="left">{account.email}</TableCell>
                                        <TableCell align="left">{account.phoneNumber}</TableCell>
                                        <TableCell align="left">
                                            <button className="role-but"
                                                style={getStatusBackgroundColor(account.status.toString())}>
                                                {account.status ? "Active" : "Banned"}
                                            </button>
                                        </TableCell>
                                        <TableCell align="right" sx={{ display: 'flex', gap: '8px' }}>

                                            {account.status === true ? (
                                                //Delete button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleOpenDeleteDialog(account)}
                                                >
                                                    <DeleteOutlinedIcon />
                                                </Button>
                                            ) : (
                                                //Unban button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => { handleUnbanAccount(account) }}
                                                >
                                                    <RefreshIcon />
                                                </Button>
                                            )}

                                            {/* Update Button */}
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                onClick={() => handleOpenUpdateDialog(account)}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        {/*Open Update dialog */}
                        <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
                            <UpdateDialog
                                formData={formData}
                                setFormData={setFormData}
                                handleCloseUpdateDialog={handleCloseUpdateDialog}
                                handleUpdateAccount={handleUpdateAccount}
                                updateFail={updateFail}
                            />
                        </Dialog >

                        {/* Open Delete dialog */}
                        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                            <DeleteDialog
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleDeleteAccount={handleDeleteAccount}
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

                        {/* Unban alert */}
                        {unbanFail && (
                            <ErrorAlert />
                        )}
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

export default AccountManage;
