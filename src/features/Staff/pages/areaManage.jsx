import { CheckCircle, Close } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, TextField, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import CreateDialog from './Dialog/AreaDialog/CreateDialog';
import UpdateDialog from './Dialog/AreaDialog/UpdateDialog';
import axios from 'axios';

function AreaManage() {
    const url = "http://animall-400708.et.r.appspot.com/api/v1";
    const [formData, setFormData] = useState({
        idArea: '',
        areaName: '',
        status: false,
        cageList: [],
    });
    const [listArea, setlistArea] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectArea, setSelectedArea] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const fetchListArea = async (value) => {
        console.log('searchValue', value);
        try {
            if (!value) {
                console.log(1);
                // Nếu searchValue không có giá trị, thực hiện API trong fetchAreaList
                const response = await fetch(`${url}/areas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.message === 'OPERATION SUCCESSFUL' && responseData.data) {
                        setlistArea(responseData.data); // Gán dữ liệu vào listArea
                        setErrorMessage('');
                    }
                }
            } else {
                console.log(2);
                setSearchValue(value);
                const response = await fetch(`${url}/areas/byname?name=${value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    console.log(2.1)
                    const responseData = await response.json();
                    if (responseData.message === 'OPERATION SUCCESSFUL' && responseData.data) {
                        setlistArea(responseData.data); // Gán dữ liệu vào listArea
                        setErrorMessage('');
                        console.log(2.2)
                    }
                    else {
                        setErrorMessage('Can not find area');
                    }
                }
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    const fetchAreaDetail = async (id) => {
        try {
            const response = await fetch(`${url}/areas/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const responseData = await response.json();
                setSelectedArea(responseData.data);
                setIsModalOpen(true);
                console.log(id);
            }
            else {
                console.log(response.message);
            }
        }
        catch (error) {
            console.error('Error fetch area', error);
        }
    }
    useEffect(() => {
        fetchListArea(searchValue);
    }, [searchValue]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    }
    const handleOpenCreateDialog = () => {
        setCreateDialogOpen(true);
    }
    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
    }
    const handleOpenUpdateDialog = (area) => {
        console.log('area', area);
        setSelectedArea(area);
        setFormData({
            idArea: area.idArea,
            areaName: area.areaName,
            cageList: area.cageList,
            status: area.status
        })
        setUpdateDialogOpen(true);
    }
    const handleUpdateArea = async (form) => {
        try {
            const response = await fetch(`${url}/areas`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idArea: form.idArea,
                    areaName: form.areaName
                })
            });
            if (response.ok) {
                console.log("Update sucessfully", response.data);
                handleCloseUpdateDialog();
                setUpdateSuccess(true);
                fetchListArea('');
                fetchAreaDetail(form.idArea);

            }
        } catch (e) {
            console.error(e);
        }
    }
    const handleDeleteCageInArea = async ({ idCage, idArea }) => {
        console.log('idCage', idCage);
        console.log('idArea', idArea);
        try {
            const response = await fetch(`${url}/areas/cra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idCage: idCage,
                    idArea: idArea,
                })
            });
            if (response.ok) {
                console.log('Cage delete successfully');
                fetchAreaDetail(idArea);
                handleOpenUpdateDialog(selectArea);
            } else {
                console.log('Cage delete failed');
            }
        } catch (error) {
            console.error('Error deleting cage:', error);
        }
    }



    return (
        <Container>
            <Grid style={{ margin: '20px auto', display: 'flex' }}>
                <Grid xs={10} sx={{ width: '80%' }}>
                    <Typography variant='h2' >
                        Area Manage
                    </Typography>
                </Grid>
                <Grid xs={2} sx={{ paddingTop: 3 }}>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={handleOpenCreateDialog}
                    >
                        Create area
                    </Button>
                </Grid>
            </Grid>
            <TextField
                label='Search'
                variant='outlined'
                size='small'
                style={{
                    marginLeft: 'auto',
                    marginRight: '10px',
                    marginTop: '10px',
                    marginBottom: '10px',
                    backgroundColor: 'white'
                }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            ></TextField>
            {errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
            <Typography variant='h3'>
                <Grid container spacing={2}>
                    {listArea.map((item) => (
                        <Grid item xs={12} sm={5} md={3} lg={3} key={item.idArea}>
                            <Card sx={{ maxWidth: 345, background: '#CEDEBD' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h5">
                                        Area {item.areaName}
                                        {item.status ? (
                                            <CheckCircle style={{ color: 'green', verticalAlign: 'middle', marginLeft: '5px' }}></CheckCircle>
                                        ) : (
                                            <CheckCircle style={{ color: 'red', verticalAlign: 'middle', marginLeft: '5px' }}></CheckCircle>
                                        )}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        fetchAreaDetail(item.idArea)
                                    }}>Detail</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Typography>
            {/* Create Area */}
            <Dialog
                open={createDialogOpen}
                onClose={handleCloseCreateDialog}
            >
                <CreateDialog
                    fetchListArea={fetchListArea}
                    handleCloseCreateDialog={handleCloseCreateDialog}
                ></CreateDialog>
            </Dialog>
            {/* Area detail */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
            >
                <DialogTitle sx={{ m: 0, pt: 2, pb: 2, pr: 10 }} id="customized-dialog-title">
                    {selectArea && `Area Name: ${selectArea.areaName}`}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 12,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    Trạng thái: {selectArea && selectArea.status ? 'Active' : ' Inactive'}
                </DialogContent>
                {selectArea && selectArea.cageList && selectArea.cageList.length > 0 ? (
                    <List>
                        {selectArea.cageList.map((item) => (
                            <ListItem key={item.idCage}>
                                <ListItemText primary={item.cageName} secondary={'Số lượng: ' + item.quantity} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    ""
                )}
                <DialogActions>
                    <Button size="small" onClick={() => {
                        handleOpenUpdateDialog(selectArea ? selectArea : null);
                    }}>Update</Button>
                </DialogActions>

                {/* Update Detail */}
                <Dialog
                    open={updateDialogOpen}
                    onClose={handleCloseUpdateDialog}
                >
                    <UpdateDialog
                        handleUpdateArea={handleUpdateArea}
                        setFormData={setFormData}
                        formData={formData}
                        handleCloseUpdateDialog={handleCloseUpdateDialog}
                        handleDeleteCageInArea={handleDeleteCageInArea}
                    ></UpdateDialog>
                </Dialog>
                {updateSuccess && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 20,
                            right: 20
                        }}>
                        <Paper>
                            <Alert variant="filled" severity="success">
                                Làm tốt lắm contrai nó hoạt động kìa !!
                            </Alert>
                        </Paper>
                    </div>
                )}
            </Dialog>
        </Container >
    );
}

export default AreaManage