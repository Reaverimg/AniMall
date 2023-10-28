import { Alert, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';



const currentDate = new Date();
const currentDateTime = new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // Điều chỉnh múi giờ GMT+8
const currentTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
const currentDateOnly = currentDateTime.toISOString().slice(0, 10);



const UploadQR = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadFail, setUploadFail] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [currentQR, setCurrentQR] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('https://api.cloudinary.com/v1_1/dhuf3diwk/image/upload?upload_preset=animall-qr', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Upload response:', data);

                    setUploadSuccess(true);
                    setTimeout(() => {
                        setUploadSuccess(false);
                    }, 3000);
                    setUploadedImage(data.secure_url);

                    const requestData = {
                        picture: data.secure_url,
                        time: currentTime,
                        date: currentDateOnly,
                    };

                    fetch('https://64a7b284dca581464b8499d0.mockapi.io/QR', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then(response => response.json())
                        .then(responseData => {
                            //console.log('Mock API response:', responseData);
                        })
                        .catch(error => {
                            console.error('Error sending data to mock API:', error);
                        });
                    setUploadSuccess(true);
                    setTimeout(() => {
                        setUploadSuccess(false);
                    }, 3000);

                })
                .catch(error => {
                    console.error('Error:', error);
                    setUploadFail(true);
                    setTimeout(() => {
                        setUploadFail(false);
                    }, 3000);
                });
        }
    };


    const getCurrentQR = () => {
        const currentDate = new Date();
        const currentDateTime = new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Singapore' })); // Điều chỉnh múi giờ GMT+8
        const currentDateTimeString = currentDateTime.toISOString();

        fetch('https://64a7b284dca581464b8499d0.mockapi.io/QR')
            .then(response => response.json())
            .then(data => {
                let closestQR = null;
                let closestDateTimeDiff = Infinity;
                // Lặp qua tất cả các dữ liệu QR
                data.forEach(qrData => {
                    const qrDateTime = new Date(`${qrData.date} ${qrData.time}`);
                    // Tính khoảng thời gian giữa ngày giờ hiện tại và ngày giờ của QR
                    const dateTimeDiff = Math.abs(qrDateTime - currentDateTime);
                    // Kiểm tra xem khoảng thời gian này có gần hơn khoảng thời gian của QR gần nhất hiện tại không
                    if (dateTimeDiff < closestDateTimeDiff) {
                        closestQR = qrData;
                        closestDateTimeDiff = dateTimeDiff;
                    }
                });

                if (closestQR) {
                    setCurrentQR(closestQR);
                   // console.log('Closest QR data:', closestQR);
                } else {
                   // console.log('No QR data found');
                }
            })
            .catch(error => {
                console.error('Error fetching QR data:', error);
            });
    };

    useEffect(() => {
        getCurrentQR();
    }, []);


    return (
        <div>

            {currentQR && (
                <div >
                    <img
                        style={{
                            maxHeight: 300,
                            maxWidth: 300,
                            minHeight: 300,
                            minWidth: 300,
                            borderRadius: 10
                        }}
                        src={currentQR.picture} alt="qr" />
                </div>
            )}

            <Button>
                <Input type="file" onChange={handleFileChange} />
            </Button>

            <Button
                variant='contained'
                color='success'
                onClick={handleUpload}>
                Upload
            </Button>

            {uploadSuccess && (
                <Alert
                    color='success'
                    variant='contained'
                >
                    Upload successful !!
                </Alert>
            )}

            {uploadFail && (
                <Alert
                    color='error'
                    variant='contained'
                >
                    Upload failure !!
                </Alert>
            )}

        </div>
    );
};

export default UploadQR;