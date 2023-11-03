import { Alert, Paper } from "@mui/material";
import React from "react";

function UseBillAlert() {

    return (
        <div
            style={{
                position: 'fixed',
                top: 150,
                right: 20
            }}>
            <Paper>
                <Alert variant="filled" severity="success">
                    Use Bill Successfully !!
                </Alert>
            </Paper>
        </div>
    )
}

export default UseBillAlert;