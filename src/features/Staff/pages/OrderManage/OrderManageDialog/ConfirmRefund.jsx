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
//deleteData, setDeleteData,
function ConfirmRefund({ handelCloseConfirmDialog, handleConfirmOrder }) {

    return (
        <div>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to paid this order?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success"
                    onClick={handleConfirmOrder} >
                    Confirm
                </Button>
                <Button variant="outlined" color="error" onClick={handelCloseConfirmDialog}>Cancel</Button>
            </DialogActions>
        </div>

    );
}

export default ConfirmRefund;