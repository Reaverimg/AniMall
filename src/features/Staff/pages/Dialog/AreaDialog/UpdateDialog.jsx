import { Button, DialogContent, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { React, useEffect, useState } from "react";


function UpdateDialog({ handleUpdateArea, setFormData, handleCloseUpdateDialog, formData, handleDeleteCageInArea }) {
    const [dataArea, setDataArea] = useState({});
    const apiUrl = 'http://animall-400708.et.r.appspot.com/api/v1';
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        handleUpdateArea(formData);

    }
    const handleDeleteItem = (id) => {
        handleDeleteCageInArea(id);
    }
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
                                <List>
                                    {formData.cageList.map((item) => (
                                        <ListItem key={item.idCage}>
                                            <ListItemText primary={item.cageName} secondary={'Số lượng: ' + item.quantity} />
                                            <Button variant="contained" color="error" onClick={() => { handleDeleteItem(item.idCage) }}>Delete</Button>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                null
                            )}
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