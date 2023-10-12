import { Button, Dialog, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function CreateDialog({ fetchListArea, handleCloseCreateDialog }) {
    const [formAreaData, setFormAreaData] = useState({ areaName: '' });
    const apiUrl = 'http://animall-400708.et.r.appspot.com/api/v1';
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/areas`, {
                method: 'POST',
                body: JSON.stringify(formAreaData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                alert('Update sucessfully');
                handleCloseCreateDialog(true);
                fetchListArea('');
                setTimeout(() => {
                    handleCloseCreateDialog(true);
                }, 2000)
            }
            else {
                alert('Update failed');
                console.log('Update failed');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{ width: 500, padding: 15 }}>
            <Typography>Create New</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container sx={{ p: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="areaName"
                            name="areaName"
                            label="Area Name"
                            variant='outlined'
                            fullWidth={true}
                            onChange={(e) => { setFormAreaData({ ...formAreaData, areaName: e.target.value }) }}
                        >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth>
                        Create
                    </Button>
                </Grid>
            </form>
        </div>
    )

}

export default CreateDialog;
