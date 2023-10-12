import { Alert, Paper } from "@mui/material";
import React from "react";

function DeleteAler() {

    return (
       
            <Paper sx={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
                <Alert variant="filled" severity="success">
                    Delete Account Successfully !!
                </Alert>
            </Paper>
        
    )
}

export default DeleteAler;