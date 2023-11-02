import { React, useState, useEffect } from "react";
import {
    Button,
    TextField,
    createTheme,
    Typography,
    Dialog,
    IconButton,
    DialogContent

} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Avatar } from 'antd';
import "./UserProfileStyle.css";
import UpdateProfileForm from "../forms/UpdateProfileForm";

const theme = createTheme();

function UserProfile() {

    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

    //state update profile dialog
    const [open, setOpen] = useState(false);
    const [loginedUser, setLoginedUser] = useState("");


    useEffect(() => {
        const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
        if (localStorageValue) {
            setLoginedUser(JSON.parse(localStorageValue));
        }
    }, [localStorageValue]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    //Close update dialog
    const handleClose = () => {
        console.log('close');
        setOpen(false);
    };


    return (
        <>

            <div className="p-5 userProfile-container">

                <div className="row justify-content-center">
                    <div
                        className="avatar text-center col-md-2 p-3 mx-4 border-radius" >
                        <Avatar
                            alt="user avatar"
                            src="https://res.cloudinary.com/dsgm85ekm/image/upload/v1696784550/08jaOdI_rw9ayo.png"
                            size={100} />
                        <h5 className="avatarName mt-2">{loginedUser.name}</h5>

                    </div>

                    <div className="basicInfo col-md-6 text-center p-3 border-radius">

                        <Typography
                            style={{ margin: theme.spacing(2, 0, 2, 0), textAlign: "center", fontWeight: 600 }}
                            component="h3"
                            variant="h5"
                        >
                            User Profile
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Full name"
                            value={loginedUser.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={loginedUser.email}
                            InputProps={{
                                readOnly: true,
                            }}

                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            id="phoneNumber"
                            label="Phone number"
                            name="phoneNumber"
                            type="phoneNumber"
                            value={loginedUser.phoneNumber}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Button
                            className="btn btn-primary"
                            variant="contained"
                            onClick={handleClickOpen}
                            style={
                                {
                                    backgroundColor: "rgb(67, 83, 52)"
                                }
                            }
                        >
                            Update
                        </Button>

                    </div>


                </div>
            </div>

            {/* Dialog update profile */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <IconButton
                    style={{
                        position: "absolute",
                        top: theme.spacing(1),
                        right: theme.spacing(3),
                        color: theme.palette.grey[500],
                        zIndex: 1,
                    }}
                    onClick={handleClose}
                >
                    <Close></Close>
                </IconButton>

                <DialogContent>

                    <UpdateProfileForm onClose={handleClose} />

                </DialogContent>

            </Dialog>

        </>
    )
}
export default UserProfile;