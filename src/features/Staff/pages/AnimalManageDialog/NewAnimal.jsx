import { Alert, Paper } from "@mui/material";
import React from "react";

function NewAnimal() {

    return (
        <Paper sx={{
            position: 'fixed',
            top: 150,
            right: 20
        }}>
            <Alert variant="filled" severity="success">
               Add New Animal Successfully !!
            </Alert>
        </Paper>

    )
}

export default NewAnimal;