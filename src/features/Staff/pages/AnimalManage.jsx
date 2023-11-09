import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Alert,
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
import "../pages/styles/TrainerManage.css";
import DeleteDialog from "./AnimalManageDialog/DeleteDialog";
import CloseIcon from '@mui/icons-material/Close';
import UpdateAnimalDialog from "./AnimalManageDialog/UpdateAnimalDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import UpdateAlert from "./AnimalManageDialog/UpdateAlert";
import DeleteAler from "./AnimalManageDialog/DeleteAlert";
import ErrorAlert from "./TrainerManageDialog/ErrorAlert";
import NewAnimalForm from "./AnimalManageDialog/NewAnimalForm";
import NewAnimal from "./AnimalManageDialog/NewAnimal";
import UnbanDialog from "./AnimalManageDialog/UnbanDialog";
import UnbanAler from "./AnimalManageDialog/UnbanAlert";
import { GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";

function TrainerManage(props) {
    const [searchValue, setSearchValue] = useState("");
    const [animalData, setAnimalData] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [unbanDialogOpen, setUnbanDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [filteredAanimal, setFilteredAnimalData] = useState([]);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [updateFail, setUpdateFail] = useState(false);
    const [updateFail2, setUpdateFail2] = useState(false);
    const [unbanFail, setUbanFail] = useState(false);
    const [perPage, setPerPage] = useState(5); // Số lượng dữ liệu trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [unbanSuccess, setUnbanSuccess] = useState(false);

    //Update data
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        dob: "",
        description: "",
        idAccount: "",
    });

    //Delete data
    const [deleteData, setDeleteData] = useState({
        name: "",
        status: "leave",
        dob: "",
        description: "",
        idAccount: "",
    });

    //Unban data
    const [unbanData, setUnbandata] = useState({
        name: "",
        status: "live",
        dob: "",
        description: "",
        idAccount: "",
    });

    //Create animal dialog
    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    };

    const handleOpenCreateialog = () => {
        setCreateDialogOpen(true);
    };

    //Delete animal dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    //Unban animal dialog
    const handleCloseUnbanDialog = () => {
        setUnbanDialogOpen(false);
    };


    //Update animal dialog
    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
    };

    // Handle updating the animal
    const handleUpdateAnimal = async () => {
        if (!formData.name || !formData.description || !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob) || !formData.idAccount) {
            setUpdateFail(true);
            setTimeout(() => {
                setUpdateFail(false);
            }, 2000);
            return;
        }
        const response = await axios.get(`http://animall-400708.et.r.appspot.com/api/v1/animals`);
        const existingAnimal = response.data.data;
        const isNameUnique = !existingAnimal.some(
            (animal) =>
                animal.name.toLowerCase() === formData.name.toLowerCase()
        );

        if (!isNameUnique) {
            setUpdateFail2(true);
            setTimeout(() => {
                setUpdateFail2(false);
            }, 2000);
            return;
        }
        try {
            const response = await axios.put(`https://animall-400708.et.r.appspot.com/api/v1/animals`, formData);
            handleCloseUpdateDialog();
            setUpdateSuccess(true)
            setTimeout(() => {
                setUpdateSuccess(false)
            }, 3000);
            fetchData(currentPage);

        } catch (error) {
            console.error("Error updating animal:", error);
        }
    };

    // Handle open update dialog animal
    const handleOpenUpdateDialog = (animal) => {
        setSelectedAnimal(animal);
        setFormData({
            idAnimal: animal.idAnimal,
            name: animal.name,
            description: animal.description,
            dob: animal.dob,
            idAccount: animal.idAccount,
            status: animal.status
        });
        setUpdateDialogOpen(true);
    };

    //Handle Delete account
    const handleDeleteAnimal = async () => {
        try {

            const response = await axios.put(`https://animall-400708.et.r.appspot.com/api/v1/animals`, deleteData);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false)
            }, 3000);
            handleCloseDeleteDialog();
            fetchData(currentPage);
        } catch (error) {
            console.error("Error delete animal:", error);
        }
    };

    // Handle open delete dialog animal
    const handleOpenDeleteDialog = (animal) => {
        setSelectedAnimal(animal);
        setDeleteData({
            idAnimal: animal.idAnimal,
            name: animal.name,
            description: animal.description,
            dob: animal.dob,
            idAccount: animal.idAccount,
            status: "leave"
        });
        setDeleteDialogOpen(true);
    };

    //Handel Unban animal
    const handleUnbanAnimal = async () => {

        try {
            const response = await axios.put(`https://animall-400708.et.r.appspot.com/api/v1/animals`, unbanData);
            handleCloseUnbanDialog();
            setUnbanSuccess(true);
            fetchData(currentPage);
            setTimeout(() => {
                setUnbanSuccess(false)
            }, 3000);
        } catch (error) {
            console.error("Error unban animal:", error);
            setUbanFail(true)
            setTimeout(() => {
                setUbanFail(false);
            }, 3000);
        }
    };

    // Handle open unban dialog animal
    const handleOpenUnbanDialog = (animal) => {
        setSelectedAnimal(animal);
        setUnbandata({
            idAnimal: animal.idAnimal,
            name: animal.name,
            description: animal.description,
            dob: animal.dob,
            idAccount: animal.idAccount,
            status: "live"
        });
        setUnbanDialogOpen(true);
    };

    // Get all account
    async function fetchData(page) {
        try {
            const response = await axios.get("https://animall-400708.et.r.appspot.com/api/v1/animals");
            const data = response.data.data;

            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            // Lấy dữ liệu của trang hiện tại bằng cách slice mảng getRoles
            const currentPageData = data.slice(startIndex, endIndex);
            setTotalPages(Math.ceil(data.length / perPage)); // Cập nhật tổng số trang
            //  console.log("fetch data",currentPageData)
            setAnimalData(currentPageData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(1);
    }, []);

    //Page Handle
    function handlePageChange(event, newPage) {
        setCurrentPage(newPage);
        fetchData(newPage);
    }

    //Search by name
    useEffect(() => {
        filterAnimalData();
    }, [searchValue, animalData]);
    function filterAnimalData() {
        if (Array.isArray(animalData)) {
            const filteredData = animalData.filter((animal) =>
                animal.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredAnimalData(filteredData);
        }
    }

    //Role color
    const getRowBackgroundColor = (role) => {
        if (role === "TRAINER") {
            return { backgroundColor: "crimson", color: "white" };
        }
        return {};
    };

    //Status color
    const getStatusBackgroundColor = (status) => {
        if (status === "live") {
            return { backgroundColor: "green", color: "white" };
        } else if (status === "dead") {
            return { backgroundColor: "crimson", color: "white" };
        } else if (status === "sick") {
            return { backgroundColor: "orange", color: "white" };
        } else if (status === "healing") {
            return { backgroundColor: "pink", color: "lightblack" };
        } else if (status === "leave") {
            return { color: "gray" };
        }
    };

    //  console.log("data", filteredAccountData)

    //Body
    return (

        <div className="staff-account-container">
            <Grid item xs>

                {/* Add new animal button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenCreateialog}>
                    Create Animal
                </Button>
                <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
                    <DialogTitle>
                        Add New Animal
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
                        <NewAnimalForm
                            fetchData={fetchData}
                            setAddSuccess={setAddSuccess}
                            handleCloseCreateDialog={handleCloseCreateDialog}
                        />
                    </DialogContent>
                </Dialog>

                {/* Account table */}
                <TableContainer component={Paper}>

                    {/* Table title */}
                    <div className="trainer-account-table-title">
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                                marginLeft: '20px'
                            }}>
                            Animal List
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
                                <TableCell align="left">Animal Name</TableCell>
                                <TableCell align="left">Cage</TableCell>
                                <TableCell align="left">Sex</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* No search results */}
                            {filteredAanimal.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2">No results found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Search found
                                filteredAanimal.map((animal) => (
                                    <TableRow key={animal.idAnimal}>
                                        <TableCell align="left">{animal.name}</TableCell>
                                        {/* <TableCell align="left">
                                            <button className="role-but" style={getRowBackgroundColor(animal.role.roleDesc)}>
                                                {animal.role.roleDesc}
                                            </button>
                                        </TableCell> */}
                                        <TableCell align="left">{animal.cage.cageName}</TableCell>
                                        <TableCell align="left">{animal.sex ? "Male" : "Female"}</TableCell>
                                        <TableCell align="left">
                                            <button className="live-but" style={getStatusBackgroundColor(animal.status.toString())}>
                                                {animal.status === "live" && "Live"}
                                                {animal.status === "dead" && "Dead"}
                                                {animal.status === "sick" && "Sick"}
                                                {animal.status === "healing" && "Healing"}
                                                {animal.status === "leave" && "Leave"}
                                            </button>
                                        </TableCell>
                                        <TableCell align="right" sx={{ display: 'flex', gap: '8px' }}>

                                            {animal.status === "leave" ? (
                                                //Unban button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOpenUnbanDialog(animal)}
                                                >
                                                    <RefreshIcon />
                                                </Button>
                                            ) : (

                                                //Delete button
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleOpenDeleteDialog(animal)}
                                                >
                                                    <DeleteOutlinedIcon />
                                                </Button>

                                            )}

                                            {/* Update Button */}
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="success"
                                                onClick={() => handleOpenUpdateDialog(animal)}
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
                            <UpdateAnimalDialog
                                formData={formData}
                                updateFail2={updateFail2}
                                setFormData={setFormData}
                                handleCloseUpdateDialog={handleCloseUpdateDialog}
                                handleUpdateAnimal={handleUpdateAnimal}
                                updateFail={updateFail}
                            />
                        </Dialog >

                        {/* Open Delete dialog */}
                        <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                            <DeleteDialog
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleDeleteAnimal={handleDeleteAnimal}
                            />
                        </Dialog>

                        {/* Open unban dialog */}
                        <Dialog open={unbanDialogOpen} onClose={handleCloseUnbanDialog}>
                            <UnbanDialog
                                handleCloseUnbanDialog={handleCloseUnbanDialog}
                                handleUnbanAnimal={handleUnbanAnimal}
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

                        {/* add alert  */}
                        {addSuccess && (
                            <NewAnimal />
                        )}

                        {/* Unban fail alert */}
                        {unbanFail === 'error' && (
                            <ErrorAlert />
                        )}

                        {/* unban alert  */}
                        {unbanSuccess && (
                            <UnbanAler />
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

export default TrainerManage;
