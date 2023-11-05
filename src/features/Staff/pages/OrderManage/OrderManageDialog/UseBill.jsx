import React from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
function UseBill({ handelCloseUseDialog, handleUseBill }) {

    return (
        <div>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to paid this order?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" 
                    onClick={handleUseBill} >
                    Confirm use bill
                </Button>
                <Button variant="outlined" color="error" onClick={handelCloseUseDialog}>Cancel</Button>
            </DialogActions>
        </div>

    );
}

export default UseBill;