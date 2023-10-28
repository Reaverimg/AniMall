import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import UploadQR from "./PaymentQRChange";
import { bold } from "@cloudinary/url-gen/qualifiers/fontWeight";
import BackgroundColorChange from "./BackgroundColorChange";



export default function SystemConfiguration() {

    return (

        <div style={{ marginTop: '-5%' }}>
            <span style={{ fontSize: '40px' }}>Setting</span>
            <TableContainer component={Paper} >
                <Table sx={{ maxWidth: 1400, minWidth: 380 }} aria-label="simple table">

                    <TableHead>
                        {/* <TableRow>
                            <TableCell sx={{ fontSize: '30px', backgroundColor: '#f0f0f0' }}>Setting</TableCell>
                        </TableRow> */}
                    </TableHead>
                    <TableBody>

                        {/* Thay đổi QR */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: bold, backgroundColor: '#f0f0f0' }}>QR Payment</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="center">
                                <UploadQR />
                            </TableCell>
                        </TableRow>

                        {/* Thay đổi màu background */}
                        <TableRow>
                            <TableCell sx={{ fontWeight: bold, backgroundColor: '#f0f0f0' }}>Background Color</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell align="center">
                                <BackgroundColorChange />
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}