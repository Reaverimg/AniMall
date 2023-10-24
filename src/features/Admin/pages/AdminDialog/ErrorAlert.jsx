import { Alert, Paper } from "@mui/material";
import React from "react";

function ErrorAlert() {

    return (
       
            <Paper sx={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
                <Alert variant="filled" severity="error">
                    Error, please try again!!
                </Alert>
            </Paper>
        
    )
}

export default ErrorAlert;