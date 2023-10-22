import { Alert, Paper } from "@mui/material";
import React from "react";

function ErrorAlert() {

    return (
        <div sx={{
            position: 'fixed',
            top: 150,
            right: 20
        }}>
            <Paper >
                <Alert variant="filled" severity="error">
                    Error, please try again !!!
                </Alert>
            </Paper>
        </div>
    )
}

export default ErrorAlert;