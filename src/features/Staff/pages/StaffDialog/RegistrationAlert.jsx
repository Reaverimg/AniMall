import { Alert, Paper } from "@mui/material";
import React from "react";

function RegistrationAlert() {

    return (
        <div
            style={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
            <Paper>
                <Alert variant="filled" severity="success">
                    Create New Account Successfully !!
                </Alert>
            </Paper>
        </div>
    )
}

export default RegistrationAlert;