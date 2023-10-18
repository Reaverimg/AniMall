import React from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
//deleteData, setDeleteData,
function CancelPayment({ handelCloseCancelDialog, handleCancelOrder }) {

    return (
        <div>
            <DialogTitle sx={{ color: 'red' }}>Confirm Cancel Order<WarningAmberOutlinedIcon /></DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to cancel this order?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success"
                    onClick={handleCancelOrder} >
                    Confirm
                </Button>
                <Button variant="outlined" color="error" onClick={handelCloseCancelDialog}>Cancel</Button>
            </DialogActions>
        </div>

    );
}

export default CancelPayment;