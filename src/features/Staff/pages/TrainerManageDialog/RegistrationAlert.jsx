import { Alert, Paper } from "@mui/material";
import React from "react";

function RegistrationAlert() {

    return (
        <Paper sx={{
            position: 'fixed',
            top: 150,
            right: 20
        }}>
            <Alert variant="filled" severity="success">
                Create New Account Successfully !!
            </Alert>
        </Paper>

    )
}

export default RegistrationAlert;