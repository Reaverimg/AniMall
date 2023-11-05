import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab} from "@mui/material";
import React from "react";
import PaymentStatus from "./PaymentStatus";
import RefundStatus from "./RefundStatus";
import "../styles/OrderManager.css"
export default function OrderManage() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="order-manage-table">
        <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} >
                    <Tab label="Payment Status" value="1" />
                    <Tab label="Refund Status" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1" ><PaymentStatus/></TabPanel>
            <TabPanel value="2"><RefundStatus/></TabPanel>
        </TabContext>
        </div>
    )
}