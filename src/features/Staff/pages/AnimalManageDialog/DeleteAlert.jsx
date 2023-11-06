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
                    Kick This Animal Successfully !!
                </Alert>
            </Paper>
    )
}

export default DeleteAler;