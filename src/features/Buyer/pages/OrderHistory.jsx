import React, { useEffect, useState } from "react";
import { Table, ConfigProvider, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import '../style/OrderHistoryStyle.css'
import { format } from "date-fns";

const columns = [
    {
        title: 'ID',
        dataIndex: 'idBill',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        width: '20%',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Time Created',
        dataIndex: 'timeCreate',
        render: (timeCreate) => (
            <div>
                <Tag>{format(new Date(timeCreate), 'dd/MM/yyyy')}</Tag>
                <Tag>{format(new Date(timeCreate), 'HH:mm:ss')}</Tag>
            </div>
        ),
        
    },
    {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        render: (text) => {
            let tagColor;
            if (text === 'Paid') {
                tagColor = 'green'; // Đặt màu xanh cho trạng thái 'Paid'
            } else if (text === 'Pending') {
                tagColor = 'orange'; // Đặt màu cam cho trạng thái 'Pending'
            }
            else if (text === 'Refund') {
                tagColor = 'blue'; // Đặt màu cam cho trạng thái 'Pending'
            }
            else if (text === 'Request refund') {
                tagColor = 'red'; // Đặt màu cam cho trạng thái 'Pending'
            }

            return <Tag color={tagColor}>{text}</Tag>;
        },
        filters: [
            {
                text: 'Paid',
                value: 'Paid',
            },
            {
                text: 'Canceled',
                value: 'Canceled',
            },
            {
                text: 'Pending',
                value: 'Pending',
            },
            {
                text: 'Request refund',
                value: 'Request refund',
            },
            {
                text: 'Refund',
                value: 'Refund',
            },
        ],
        onFilter: (value, record) => record.paymentStatus.indexOf(value) === 0,
    },

];
function OrderHistory() {
    const [bills, setBills] = useState([]);
    const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
    const history = useHistory();
    useEffect(() => {

        let idAccount;
        if (localStorageValue) { // neu khong dang nhap => gọi API đăng ký guest
            const parsedAccountLogged = JSON.parse(localStorageValue);
            idAccount = (parsedAccountLogged.idAccount);
        }

        const apiUrl = `https://animall-400708.et.r.appspot.com/api/v1/bills/account/${idAccount}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((result) => {
                setBills(result.data.reverse());
            })
            .catch((error) => {
                console.error('There was a problem with the API request:', error);
            });
    }, []);

    const handleRowClick = (record) => {
        const orderId = record.orderId;
        const billId = record.idBill;
        const paymentStatus = record.paymentStatus;
        const timeCreated = record.timeCreate;
        history.push({
            pathname: `/buyer/orderDetail/${orderId}`,
            state: { billId: billId, paymentStatus: paymentStatus, timeCreated: timeCreated}
        });
    };


    return (
        <>
            <h3 className="text-center mt-3">Order History</h3>
            <div className="order-history-container">

                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: '#d0e7d280'
                            },

                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={bills}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                </ConfigProvider>
            </div>

        </>

    );
}

export default OrderHistory;
