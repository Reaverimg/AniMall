import { Alert, Paper } from "@mui/material";
import React from "react";

function DeleteAler() {

    return (
        <div
            style={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
            <Paper>
                <Alert variant="filled" severity="success">
                    Delete Ticket Successfully !!
                </Alert>
            </Paper>
        </div>
    )
}

export default DeleteAler;