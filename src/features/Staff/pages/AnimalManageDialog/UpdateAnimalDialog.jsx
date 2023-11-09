import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function UpdateDialog({ updateFail2, handleCloseUpdateDialog, formData, setFormData, handleUpdateAnimal, updateFail }) {

    const [idAccountData, setIdAccountData] = useState([]);

    //fetch account
    async function fetchTrainer() {
        try {
            const response = await axios.get("https://animall-400708.et.r.appspot.com/api/v1/accounts");
            const data = response.data.data;
            const getRole = data.filter(account => account.role && account.role.roleDesc === "TRAINER");
            setIdAccountData(getRole);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTrainer();
    }, []);

    return (
        <div>
            <DialogTitle>
                Update Animal
                <IconButton
                    aria-label="close"
                    onClick={handleCloseUpdateDialog}
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
                <Grid container spacing={2}>

                    {/* Name */}
                    <Grid item xs={12}>
                        <TextField style={{ marginTop: '10px' }}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={12}>
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                    </Grid>

                    {/* Trainer */}
                    <Grid item xs={12}>
                        <TextField
                            label="Trainer"
                            variant="outlined"
                            fullWidth
                            select
                            value={formData.idAccount}
                            onChange={(e) => setFormData({ ...formData, idAccount: e.target.value })}
                        >
                            {idAccountData.map((trainer) => (
                                <MenuItem
                                    key={trainer.idAccount}
                                    value={trainer.idAccount}
                                >
                                    {trainer.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12}>
                        <TextField
                            label="Status"
                            variant="outlined"
                            fullWidth
                            select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <MenuItem value="live">Live</MenuItem>
                            <MenuItem value="dead">Dead</MenuItem>
                            <MenuItem value="sick">Sick</MenuItem>
                            <MenuItem value="healing">Healing</MenuItem>
                            <MenuItem value="leave">Leave</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleUpdateAnimal}
                    color="success"
                    variant="contained">
                    Confirm
                </Button>
                <Button
                    onClick={handleCloseUpdateDialog}
                    color="error"
                    variant="outlined">Cancel</Button>

            </DialogActions>

            {/* Fail alert */}
            {updateFail && (
                <div
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20
                    }}>
                    <Paper>
                        <Alert variant="filled" severity="error">
                            Date format dd/mm/yyy !!
                        </Alert>
                    </Paper>
                </div>
            )}

            {updateFail2 && (
                <div
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20
                    }}>
                    <Paper>
                        <Alert variant="filled" severity="error">
                            Name existed !!
                        </Alert>
                    </Paper>
                </div>
            )}
        </div>

    );
}

export default UpdateDialog;