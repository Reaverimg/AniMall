import { Alert, Paper } from "@mui/material";
import React from "react";

function UpdateAlert() {

    return (
        <div
            style={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
            <Paper>
                <Alert variant="filled" severity="success">
                    Update Animal Successfully !!
                </Alert>
            </Paper>
        </div>
    )
}

export default UpdateAlert;