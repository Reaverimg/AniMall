import { Alert, Paper } from "@mui/material";
import React from "react";

function UnbanAler() {

    return (
            <Paper sx={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
                <Alert variant="filled" severity="success">
                    Your are GOD !!!
                </Alert>
            </Paper>
    )
}

export default UnbanAler;