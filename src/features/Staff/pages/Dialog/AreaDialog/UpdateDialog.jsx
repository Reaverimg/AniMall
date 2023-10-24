import { FormControl, MenuItem } from "@mui/base";
import { Button, DialogContent, Grid, List, ListItem, ListItemText, Menu, Select, TextField, Typography } from "@mui/material";
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
    const handleCheckboxChange = (id) => {
        console.log(id);
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id],
        }));
        console.log(checkedItems);
    };


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
                            {cageNoArea && cageNoArea.map((item) => (
                                <div key={item.idCage}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[item.idCage] || false}
                                            onChange={() => handleCheckboxChange(item.idCage)}
                                            style={{ justifyItems: 'space-between' }}
                                        />
                                        {item.cageName}
                                    </label>
                                </div>
                            ))}
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