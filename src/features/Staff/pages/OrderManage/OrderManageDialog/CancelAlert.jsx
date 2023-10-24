import { Alert, Paper } from "@mui/material";
import React from "react";

function CancelAlert() {

    return (
        <div
            style={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
            <Paper>
                <Alert variant="filled" severity="success">
                    Cancel Successfully !!
                </Alert>
            </Paper>
        </div>
    )
}

export default CancelAlert;