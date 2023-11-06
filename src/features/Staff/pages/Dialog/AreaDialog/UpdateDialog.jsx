import { FormControl, MenuItem } from "@mui/base";
import { Button, DialogContent, Grid, List, ListItem, ListItemText, Menu, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";


function UpdateDialog({ handleUpdateArea, setFormData, handleCloseUpdateDialog, formData, handleDeleteCageInArea }) {
    const [dataArea, setDataArea] = useState({});
    const [cageData, setCageData] = useState([]);
    const [cageNoArea, setCageNoArea] = useState([]);
    const [selectedCage, setSelectedCage] = useState('');
    const [checkedItems, setCheckedItems] = useState({});
    const apiUrl = 'http://animall-400708.et.r.appspot.com/api/v1';
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        handleUpdateArea(formData);

    }
    const fetchCages = async () => {
        try {
            const response = await fetch(`${apiUrl}/cages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.message === 'OPERATION SUCCESSFUL' && responseData.data) {
                    setCageData(responseData.data);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchCages();
    }, []);
    useEffect(() => {
        filterCageNoArea();
    });
    function filterCageNoArea() {
        const filterdDate = cageData.filter((cage) =>
            cage.area === null
        )
        setCageNoArea(filterdDate);
    }
    const handleDeleteItem = ({ idCage, idArea }) => {
        handleDeleteCageInArea({ idCage, idArea });
    }
    const handleAddCage = async (id) => {
        console.log(id);
        try {
            if (id) {
                console.log('formData.idArea', formData.idArea)
                console.log('id', id);
                // Hiển thị cửa sổ xác nhận
                const confirmed = window.confirm("Bạn có chắc muốn thêm lồng này?");
                if (confirmed) {
                    // Thực hiện yêu cầu API khi người dùng xác nhận
                    const response = await fetch(`${apiUrl}/areas/cta`, {
                        method: 'POST',
                        body: JSON.stringify({
                            idArea: formData.idArea,
                            idCage: id,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.ok) {
                        // Xử lý thành công
                        console.log("Thêm lồng thành công!");
                    } else {
                        // Xử lý lỗi nếu cần
                        console.log("Lỗi khi thêm lồng!");
                        console.log("Message", response.message);
                    }
                } else {
                    // Người dùng không xác nhận, không có hành động gì
                    console.log("Người dùng đã hủy bỏ thao tác.");
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    // const handleCheckboxChange = (id) => {
    //     console.log(id);
    //     setCheckedItems((prevCheckedItems) => ({
    //         ...prevCheckedItems,
    //         [id]: !prevCheckedItems[id],
    //     }));
    //     console.log(checkedItems);
    // };


    return (
        <div style={{ width: 500, padding: 15 }}>
            <Typography>Update area</Typography>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="areaName"
                                name="areaName"
                                label="Area Name"
                                variant="outlined"
                                fullWidth={true}
                                value={formData.areaName}
                                onChange={(e) => { setFormData({ ...formData, areaName: e.target.value }) }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            {formData && formData.cageList && formData.cageList.length > 0 ? (
                                <List style={{ backgroundColor: 'lightgray' }}>
                                    {formData.cageList.map((item) => (
                                        <ListItem key={item.idCage}>
                                            <ListItemText primary={item.cageName} secondary={'Số lượng: ' + item.quantity} />
                                            <Button variant="contained" color="error" onClick={() => { handleDeleteItem({ idCage: item.idCage, idArea: formData.idArea }) }}>Delete</Button>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                null
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Add New Cage Into This Area</Typography>
                        </Grid>
                        <Grid item xs={12}>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Tên chuồng
                                            </TableCell>
                                            <TableCell>
                                                Hành động
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cageNoArea && cageNoArea.map((item) => (
                                            <TableRow key={item.idCage}>
                                                <TableCell>{item.cageName}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => { handleAddCage(item.idCage) }} variant="contained">Thêm chuồng</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                            >
                                Update
                            </Button >
                        </Grid>
                    </Grid>
                </DialogContent>
            </form>
        </div>
    );
}

export default UpdateDialog;